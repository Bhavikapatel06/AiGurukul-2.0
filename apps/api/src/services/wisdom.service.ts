import {
  ConversationRepository,
  MessageRepository,
  WisdomVerseRepository,
  UserRepository,
} from '../repositories/index.js';
import { AIProvider, AIMessage } from '@ai-gurukul/ai';
import { Logger } from '@ai-gurukul/logging';
import {
  CitationReferenceDTO,
  ConversationWithMessagesDTO,
  MessageCitation,
  MessageDTO,
  NotFoundError,
  PersonaInfo,
  StreamDoneEvent,
  WisdomDomain,
  WisdomPersona,
  WisdomVerseDTO,
} from '@ai-gurukul/types';
import {
  PERSONA_REGISTRY,
  buildPersonaSystemPrompt,
  extractCitations,
  cleanCitationMarkup,
  GroundingSourceItem,
} from './persona-prompt.js';
import { RAGService } from './rag.service.js';

export interface StreamCallbacks {
  onToken: (token: string) => void;
  onCitation?: (citation: MessageCitation) => void;
  onDone: (data: StreamDoneEvent) => void;
  onError: (err: Error) => void;
}

export class WisdomService {
  private readonly conversationRepo: ConversationRepository;
  private readonly messageRepo: MessageRepository;
  private readonly verseRepo: WisdomVerseRepository;
  private readonly userRepo: UserRepository;
  private readonly aiProvider: AIProvider;
  private readonly logger: Logger;
  private readonly ragService?: RAGService;

  constructor(
    conversationRepo: ConversationRepository,
    messageRepo: MessageRepository,
    verseRepo: WisdomVerseRepository,
    userRepo: UserRepository,
    aiProvider: AIProvider,
    logger: Logger,
    ragService?: RAGService
  ) {
    this.conversationRepo = conversationRepo;
    this.messageRepo = messageRepo;
    this.verseRepo = verseRepo;
    this.userRepo = userRepo;
    this.aiProvider = aiProvider;
    this.logger = logger;
    this.ragService = ragService;
  }

  /**
   * Returns list of available wisdom personas with metadata and guidance topics.
   */
  public getPersonas(): PersonaInfo[] {
    return Object.values(PERSONA_REGISTRY);
  }

  /**
   * Helper to retrieve grounded passages from RAG service and canonical verse repository.
   */
  /**
   * Normalizes query terms for RAG and verse search, resolving common typos
   * and extracting core search topics.
   */
  private normalizeSearchQuery(rawQuery: string): string {
    let q = rawQuery.toLowerCase();

    // Strip question phrasing prefixes to isolate the core semantic subject
    q = q.replace(
      /\b(who is|who was|who are|what is|what are|what was|tell me about|explain to me|explain|describe|meaning of|give me a shloka on|verse about|teach me about)\b/gi,
      ' '
    );

    // Correct common persona name typos so RAG and verse DB find matches
    q = q
      .replace(/\bl?krishn?[aa]?\b/gi, 'krishna')
      .replace(/\bchank?ya[a]?\b/gi, 'chanakya')
      .replace(/\bcharak[aa]?\b/gi, 'charaka')
      .replace(/\bvyas[aa]?\b/gi, 'vyasa')
      .replace(/\bpatanj[al]i[i]?\b/gi, 'patanjali')
      .replace(/\bdharama\b/gi, 'dharma')
      .replace(/\bkarmma\b/gi, 'karma');

    const cleaned = q.replace(/[^\w\s.-]/g, ' ').replace(/\s+/g, ' ').trim();
    return cleaned || rawQuery;
  }

  /**
   * Helper to retrieve grounded passages from RAG service and canonical verse repository.
   */
  private async retrieveGroundingSources(
    persona: WisdomPersona,
    query: string
  ): Promise<{
    groundingSources: GroundingSourceItem[];
    verseDTOs: WisdomVerseDTO[];
    ragCitations: CitationReferenceDTO[];
    hasSources: boolean;
  }> {
    const domainMap: Record<WisdomPersona, WisdomDomain> = {
      krishna: 'gita',
      chanakya: 'chanakya',
      vaidya: 'ayurveda',
      vyasa: 'mahabharata',
      patanjali: 'classical_texts',
    };
    const domain = domainMap[persona] || 'gita';

    const groundingSources: GroundingSourceItem[] = [];
    const ragCitations: CitationReferenceDTO[] = [];
    const verseDTOs: WisdomVerseDTO[] = [];

    const searchQuery = this.normalizeSearchQuery(query);
    const isHealthQuery =
      /\b(fever|fevr|high temperature|temperature|sick|ill|headache|stomach|pain|cough|cold|infection|nausea|vomiting|dizzy|dizziness|bleeding|injury|wound|flu|disease|symptom|doctor|medicine|medication|clinic|hospital)\b/i.test(
        query
      );

    // If seeker has a health concern and persona is not Charaka, do not inject unrelated statecraft,
    // war, or governance passages into the grounding context.
    const shouldRetrieveDomainGrounding = !isHealthQuery || persona === 'vaidya';

    // 1. Query RAG vector and document store if available and relevant
    if (this.ragService && shouldRetrieveDomainGrounding) {
      try {
        const ragRes = await this.ragService.query({
          query: searchQuery,
          topK: 3,
          domainFilter: domain,
          minScore: 0.1,
        });

        if (ragRes && ragRes.citations && ragRes.citations.length > 0) {
          for (const cit of ragRes.citations) {
            ragCitations.push(cit);
            groundingSources.push({
              title: cit.documentTitle,
              canonicalReference: cit.canonicalReference,
              author: cit.author,
              domain,
              text: cit.snippet,
            });
          }
        }
      } catch (err) {
        this.logger.warn({ err, persona, query: searchQuery }, 'RAG retrieval warning in WisdomService');
      }
    }

    // 2. Query canonical verses matching query terms or domain (skip if health concern for non-vaidya)
    if (shouldRetrieveDomainGrounding) {
      try {
        const searchRes = await this.verseRepo.searchVerses(
          { search: searchQuery, domain },
          { limit: 2 }
        );

        if (searchRes.items.length > 0) {
          for (const v of searchRes.items) {
            const dto = v.toDTO();
            verseDTOs.push(dto);
            groundingSources.push({
              title: dto.canonicalReference,
              canonicalReference: dto.canonicalReference,
              author: dto.speaker,
              domain: dto.domain,
              text: `${dto.englishTranslation}${dto.commentary ? ` (${dto.commentary})` : ''}`,
            });
          }
        }
      } catch (err) {
        this.logger.warn({ err, persona }, 'Verse retrieval warning in WisdomService');
      }
    }

    const hasSources = groundingSources.length > 0;
    return { groundingSources, verseDTOs, ragCitations, hasSources };
  }

  /**
   * Starts a new conversation thread with a selected wisdom persona.
   */
  public async startConversation(
    userId: string,
    persona: WisdomPersona,
    title?: string,
    initialMessage?: string
  ): Promise<ConversationWithMessagesDTO> {
    await this.verseRepo.ensureSeeded();

    const meta = PERSONA_REGISTRY[persona] || PERSONA_REGISTRY.krishna;
    const conversationTitle =
      title ||
      (initialMessage ? initialMessage.slice(0, 40) + '...' : `Dialogue with ${meta.name}`);

    const conversation = await this.conversationRepo.createConversation({
      userId,
      persona,
      title: conversationTitle,
    });

    const messages: MessageDTO[] = [];

    // If initial message supplied, execute initial AI guidance exchange
    if (initialMessage) {
      // 1. Record user message
      const userMsg = await this.messageRepo.createMessage({
        conversationId: conversation._id.toString(),
        sender: 'user',
        content: initialMessage,
      });
      messages.push(userMsg.toDTO());

      // 2. Fetch grounding context
      const { groundingSources, verseDTOs, ragCitations, hasSources } =
        await this.retrieveGroundingSources(persona, initialMessage);

      const user = await this.userRepo.findById(userId);
      const userName = user?.displayName;

      // 3. Generate initial response
      const systemPrompt = buildPersonaSystemPrompt(persona, userName, groundingSources, hasSources);
      const aiResponse = await this.aiProvider.generateCompletion([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: initialMessage },
      ]);

      const citations = extractCitations(aiResponse, verseDTOs, ragCitations);
      const cleanContent = cleanCitationMarkup(aiResponse);
      const assistantMsg = await this.messageRepo.createMessage({
        conversationId: conversation._id.toString(),
        sender: 'assistant',
        content: cleanContent,
        citations,
        tokenUsage: {
          promptTokens: Math.ceil(initialMessage.length / 4),
          completionTokens: Math.ceil(cleanContent.length / 4),
          totalTokens: Math.ceil((initialMessage.length + cleanContent.length) / 4),
        },
      });
      messages.push(assistantMsg.toDTO());

      await this.conversationRepo.updateActivity(conversation._id.toString(), 2);
    }

    return {
      ...conversation.toDTO(),
      messages,
    };
  }

  /**
   * Retrieves user conversations with pagination.
   */
  public async getUserConversations(
    userId: string,
    filters: { persona?: WisdomPersona; status?: string } = {},
    page = 1,
    limit = 20
  ) {
    const paginated = await this.conversationRepo.findUserConversations(userId, filters, {
      page,
      limit,
    });

    return {
      items: paginated.items.map((c) => c.toDTO()),
      total: paginated.total,
      page: paginated.page,
      limit: paginated.limit,
      totalPages: paginated.totalPages,
    };
  }

  /**
   * Retrieves single conversation along with its full chronological message thread.
   */
  public async getConversationWithMessages(
    conversationId: string,
    userId: string
  ): Promise<ConversationWithMessagesDTO> {
    const conversation = await this.conversationRepo.findByIdAndUser(conversationId, userId);
    if (!conversation) {
      throw new NotFoundError('Conversation not found or access denied');
    }

    const messages = await this.messageRepo.findByConversationId(conversationId, 100);

    return {
      ...conversation.toDTO(),
      messages: messages.map((m) => m.toDTO()),
    };
  }

  /**
   * Streams AI completion tokens and citations via Server-Sent Events (SSE).
   */
  public async streamMessage(
    conversationId: string,
    userId: string,
    query: string,
    callbacks: StreamCallbacks
  ): Promise<void> {
    try {
      // 1. Verify conversation ownership and fetch preserved persona
      const conversation = await this.conversationRepo.findByIdAndUser(conversationId, userId);
      if (!conversation) {
        throw new NotFoundError('Conversation not found or access denied');
      }

      // 2. Fetch user profile for personal greeting if available
      const user = await this.userRepo.findById(userId);
      const userName = user?.displayName;

      // 3. Save incoming user message to persistent history
      await this.messageRepo.createMessage({
        conversationId,
        sender: 'user',
        content: query,
      });

      // 4. Retrieve grounded passages from RAG & classical verses
      const { groundingSources, verseDTOs, ragCitations, hasSources } =
        await this.retrieveGroundingSources(conversation.persona, query);

      // 5. Fetch relevant recent conversation history (last 6 messages)
      const recentMessages = await this.messageRepo.getRecentContextWindow(conversationId, 6);

      // 6. Construct persona system prompt with strict anti-injection and quality directives
      const systemPrompt = buildPersonaSystemPrompt(
        conversation.persona,
        userName,
        groundingSources,
        hasSources
      );

      // Extract prior messages, excluding duplicate of current query if already persisted
      const priorHistory = recentMessages.filter(
        (m, idx) => !(idx === recentMessages.length - 1 && m.sender === 'user' && m.content === query)
      );

      const aiMessages: AIMessage[] = [{ role: 'system', content: systemPrompt }];

      for (const m of priorHistory) {
        aiMessages.push({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.content,
        });
      }

      // Explicitly guarantee the exact latest user message reaches the AI model
      aiMessages.push({
        role: 'user',
        content: query,
      });

      // 7. Invoke streaming provider
      let fullContent = '';
      const stream = this.aiProvider.streamCompletion(aiMessages);

      for await (const token of stream) {
        fullContent += token;
        callbacks.onToken(token);
      }

      // 8. Extract citations from grounded content and clean markup
      const citations = extractCitations(fullContent, verseDTOs, ragCitations);
      const cleanContent = cleanCitationMarkup(fullContent);
      if (callbacks.onCitation) {
        for (const citation of citations) {
          callbacks.onCitation(citation);
        }
      }

      // 9. Persist assistant message with citations and token accounting
      const tokenUsage = {
        promptTokens: Math.ceil(query.length / 4),
        completionTokens: Math.ceil(cleanContent.length / 4),
        totalTokens: Math.ceil((query.length + cleanContent.length) / 4),
      };

      const assistantMsg = await this.messageRepo.createMessage({
        conversationId,
        sender: 'assistant',
        content: cleanContent,
        citations,
        tokenUsage,
      });

      // 10. Update conversation activity and message counts
      await this.conversationRepo.updateActivity(conversationId, 2);

      // 11. Signal SSE completion with clean content
      callbacks.onDone({
        conversationId,
        messageId: assistantMsg._id.toString(),
        fullContent: cleanContent,
        citations,
        tokenUsage,
      });
    } catch (err: unknown) {
      this.logger.error({ err, conversationId, userId }, 'Error in wisdom streamMessage');
      callbacks.onError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * Synchronous message fallback (non-streaming).
   */
  public async sendMessageSync(
    conversationId: string,
    userId: string,
    query: string
  ): Promise<MessageDTO> {
    const conversation = await this.conversationRepo.findByIdAndUser(conversationId, userId);
    if (!conversation) {
      throw new NotFoundError('Conversation not found or access denied');
    }

    const user = await this.userRepo.findById(userId);

    // Save user message
    await this.messageRepo.createMessage({
      conversationId,
      sender: 'user',
      content: query,
    });

    const { groundingSources, verseDTOs, ragCitations, hasSources } =
      await this.retrieveGroundingSources(conversation.persona, query);

    const recentMessages = await this.messageRepo.getRecentContextWindow(conversationId, 6);

    const systemPrompt = buildPersonaSystemPrompt(
      conversation.persona,
      user?.displayName,
      groundingSources,
      hasSources
    );

    // Extract prior messages, excluding duplicate of current query if already persisted
    const priorHistory = recentMessages.filter(
      (m, idx) => !(idx === recentMessages.length - 1 && m.sender === 'user' && m.content === query)
    );

    const aiMessages: AIMessage[] = [{ role: 'system', content: systemPrompt }];
    for (const m of priorHistory) {
      aiMessages.push({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.content,
      });
    }

    // Explicitly guarantee the exact latest user message reaches the AI model
    aiMessages.push({
      role: 'user',
      content: query,
    });

    const completion = await this.aiProvider.generateCompletion(aiMessages);
    const citations = extractCitations(completion, verseDTOs, ragCitations);
    const cleanContent = cleanCitationMarkup(completion);

    const assistantMsg = await this.messageRepo.createMessage({
      conversationId,
      sender: 'assistant',
      content: cleanContent,
      citations,
      tokenUsage: {
        promptTokens: Math.ceil(query.length / 4),
        completionTokens: Math.ceil(cleanContent.length / 4),
        totalTokens: Math.ceil((query.length + cleanContent.length) / 4),
      },
    });

    await this.conversationRepo.updateActivity(conversationId, 2);

    return assistantMsg.toDTO();
  }

  /**
   * Archives a conversation.
   */
  public async archiveConversation(conversationId: string, userId: string): Promise<void> {
    const updated = await this.conversationRepo.archiveConversation(conversationId, userId);
    if (!updated) {
      throw new NotFoundError('Conversation not found');
    }
  }

  /**
   * Searches and retrieves canonical Vedic verses with commentaries.
   */
  public async getWisdomVerses(
    query: { domain?: WisdomDomain; theme?: string; search?: string },
    page = 1,
    limit = 20
  ) {
    await this.verseRepo.ensureSeeded();
    const result = await this.verseRepo.searchVerses(query, { page, limit });

    return {
      items: result.items.map((v) => v.toDTO()),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }
}

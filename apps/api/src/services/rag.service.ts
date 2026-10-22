import { DocumentRepository, DocumentChunkRepository } from '../repositories/index.js';
import { EmbeddingProvider } from '@ai-gurukul/embeddings';
import { VectorStoreProvider, VectorRecord } from '@ai-gurukul/vector-store';
import { DocumentChunkModel } from '@ai-gurukul/database';
import {
  CitationReferenceDTO,
  RAGQueryRequestDTO,
  RAGQueryResponseDTO,
  RAGStatsDTO,
} from '@ai-gurukul/types';

export class RAGService {
  private docRepo: DocumentRepository;
  private chunkRepo: DocumentChunkRepository;
  private embeddingProvider: EmbeddingProvider;
  private vectorStore: VectorStoreProvider;
  private isHydrated = false;

  constructor(
    docRepo: DocumentRepository,
    chunkRepo: DocumentChunkRepository,
    embeddingProvider: EmbeddingProvider,
    vectorStore: VectorStoreProvider
  ) {
    this.docRepo = docRepo;
    this.chunkRepo = chunkRepo;
    this.embeddingProvider = embeddingProvider;
    this.vectorStore = vectorStore;
  }

  /**
   * Ensures the vector store is populated from canonical chunks stored in MongoDB.
   * Runs idempotently on server startup or lazily before the first query.
   */
  public async ensureHydrated(): Promise<void> {
    if (this.isHydrated) return;

    try {
      const chunks = await DocumentChunkModel.find().lean().exec();
      if (chunks.length === 0) return;

      // Enrich chunk text with canonical metadata so vector embeddings capture speaker, author, and granth title
      const texts = chunks.map((c) => {
        const meta = c.metadata || {};
        const titleStr = (meta.title as string) || '';
        const authorStr = (meta.author as string) || '';
        const focusStr = (meta.focus as string) || '';
        return `${c.canonicalReference || ''} ${titleStr} ${authorStr} ${focusStr} ${c.text}`.trim();
      });
      const embeddings = await this.embeddingProvider.generateEmbeddings(texts);

      const vectorRecords: VectorRecord[] = chunks.map((chunk, idx) => {
        const meta = chunk.metadata || {};
        return {
          id: `${chunk.documentId}_chunk_${chunk.chunkIndex}`,
          values: embeddings[idx].embedding,
          metadata: {
            documentId: chunk.documentId.toString(),
            title: (meta.title as string) || 'Canonical Vedic Text',
            author: meta.author as string | undefined,
            canonicalReference: chunk.canonicalReference,
            domain: (meta.domain as string || '').toLowerCase(),
            chunkText: chunk.text,
            chunkIndex: chunk.chunkIndex,
          },
        };
      });

      await this.vectorStore.upsert(vectorRecords);
      this.isHydrated = true;
    } catch {
      // Degraded fallback: continues with MongoDB text search if vector store hydration encounters an issue
    }
  }

  public async query(options: RAGQueryRequestDTO): Promise<RAGQueryResponseDTO> {
    await this.ensureHydrated();

    const topK = options.topK ?? 5;
    const minScore = options.minScore ?? 0.05;
    const cleanQuery = options.query.trim();

    // 1. Generate query embedding using semantic provider
    const queryEmb = await this.embeddingProvider.generateEmbedding(cleanQuery);

    const citations: CitationReferenceDTO[] = [];
    const seenRefs = new Set<string>();

    // 2. Query Vector Store with domain mapping for compatible traditions
    const targetDomain = options.domainFilter ? options.domainFilter.toLowerCase() : undefined;
    const domainMapping: Record<string, string[]> = {
      gita: ['gita', 'mahabharata'],
      mahabharata: ['mahabharata', 'gita'],
      chanakya: ['chanakya'],
      ayurveda: ['ayurveda'],
      classical_texts: ['yoga', 'classical_texts'],
      yoga: ['yoga', 'classical_texts'],
    };

    if (targetDomain) {
      const allowedDomains = domainMapping[targetDomain] || [targetDomain];

      for (const d of allowedDomains) {
        const domainResults = await this.vectorStore.query(queryEmb.embedding, {
          topK,
          filter: { domain: d },
          minScore: 0.05,
        });

        for (const vRes of domainResults) {
          const meta = vRes.metadata;
          const ref = (meta.canonicalReference as string) || vRes.id;
          if (!seenRefs.has(ref.toLowerCase())) {
            seenRefs.add(ref.toLowerCase());
            citations.push({
              documentId: (meta.documentId as string) || vRes.id.split('_chunk_')[0],
              documentTitle: (meta.title as string) || 'Canonical Vedic Text',
              author: meta.author as string | undefined,
              canonicalReference: meta.canonicalReference as string | undefined,
              chunkIndex: typeof meta.chunkIndex === 'number' ? meta.chunkIndex : 0,
              snippet: (meta.chunkText as string) || '',
              similarityScore: vRes.score,
            });
          }
        }
      }
    } else {
      // General RAG search across all indexed canonical texts
      const generalResults = await this.vectorStore.query(queryEmb.embedding, {
        topK,
        minScore,
      });

      for (const vRes of generalResults) {
        const meta = vRes.metadata;
        const ref = (meta.canonicalReference as string) || vRes.id;
        if (!seenRefs.has(ref.toLowerCase())) {
          seenRefs.add(ref.toLowerCase());
          citations.push({
            documentId: (meta.documentId as string) || vRes.id.split('_chunk_')[0],
            documentTitle: (meta.title as string) || 'Canonical Vedic Text',
            author: meta.author as string | undefined,
            canonicalReference: meta.canonicalReference as string | undefined,
            chunkIndex: typeof meta.chunkIndex === 'number' ? meta.chunkIndex : 0,
            snippet: (meta.chunkText as string) || '',
            similarityScore: vRes.score,
          });
        }
      }
    }

    // 3. Hybrid fallback: If vector store yielded fewer results than topK, search DocumentChunkModel in MongoDB
    if (citations.length < topK) {
      const queryWords = cleanQuery
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 2);

      const filterCond: Record<string, unknown> = {};
      if (targetDomain) {
        const mongoDomains = domainMapping[targetDomain] || [targetDomain];
        filterCond['metadata.domain'] = { $in: mongoDomains };
      }

      if (queryWords.length > 0) {
        const regexPattern = queryWords.join('|');
        filterCond.$or = [
          { text: { $regex: regexPattern, $options: 'i' } },
          { canonicalReference: { $regex: regexPattern, $options: 'i' } },
        ];
      }

      const existingDocIds = new Set(citations.map((c) => c.documentId));
      const chunkDocs = await DocumentChunkModel.find(filterCond)
        .limit(topK - citations.length)
        .exec();

      for (const cDoc of chunkDocs) {
        const ref = cDoc.canonicalReference || cDoc._id.toString();
        if (!seenRefs.has(ref.toLowerCase()) && !existingDocIds.has(cDoc.documentId.toString())) {
          seenRefs.add(ref.toLowerCase());
          const meta = cDoc.metadata || {};
          citations.push({
            documentId: cDoc.documentId.toString(),
            documentTitle: (meta.title as string) || 'Canonical Vedic Text',
            author: meta.author as string | undefined,
            canonicalReference: cDoc.canonicalReference,
            chunkIndex: cDoc.chunkIndex,
            snippet: cDoc.text,
            similarityScore: 0.85,
          });
        }
      }
    }

    // 5. Synthesize structured provenance context
    let synthesizedContext = '';
    if (citations.length > 0) {
      const contextBlocks = citations.map((c, i) => {
        const refStr = c.canonicalReference ? ` | Ref: ${c.canonicalReference}` : '';
        const authorStr = c.author ? ` | Author: ${c.author}` : '';
        const scorePct = Math.round(c.similarityScore * 100);
        return `[Source ${i + 1}: "${c.documentTitle}"${authorStr}${refStr} | Match: ${scorePct}%]\n${c.snippet}`;
      });

      synthesizedContext = [
        '### Grounded Vedic Source Context:',
        ...contextBlocks,
        '---',
        'Use the above canonical citations to directly anchor answers and verify textual claims.',
      ].join('\n\n');
    } else {
      synthesizedContext = 'No direct textual citations found matching this inquiry.';
    }

    return {
      query: cleanQuery,
      resultsCount: citations.length,
      citations,
      synthesizedContext,
    };
  }

  public async getStats(): Promise<RAGStatsDTO> {
    const docStats = await this.docRepo.getStats();
    const totalChunks = await this.chunkRepo.countTotalChunks();

    return {
      totalDocuments: docStats.totalDocuments,
      indexedDocuments: docStats.indexedDocuments,
      totalChunks,
      totalTokens: docStats.totalTokens,
      domainCounts: docStats.domainCounts,
    };
  }
}

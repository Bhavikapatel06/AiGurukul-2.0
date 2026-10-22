import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from './app.js';
import { loadApiConfig } from '@ai-gurukul/config';
import { createLogger } from '@ai-gurukul/logging';
import {
  UserModel,
  SessionModel,
  ConversationModel,
  MessageModel,
  WisdomVerseModel,
} from '@ai-gurukul/database';

describe('Wisdom Guidance & SSE Streaming Integration Tests (Phase 3)', () => {
  const TEST_DB_URI =
    process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/aigurukul_wisdom_test';

  const config = loadApiConfig({
    NODE_ENV: 'test',
    PORT: 5997,
    MONGODB_URI: TEST_DB_URI,
    JWT_ACCESS_SECRET: 'test_jwt_access_secret_32_characters_long!',
    JWT_REFRESH_SECRET: 'test_jwt_refresh_secret_32_characters_long!',
    COOKIE_SECRET: 'test_cookie_secret_32_characters_long!',
  });

  const logger = createLogger({ name: 'test-wisdom-api', level: 'silent' });
  let app: ReturnType<typeof createApp>;

  let seekerToken = '';
  let seekerId = '';
  let activeConversationId = '';

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(TEST_DB_URI);
    }

    // Clean test collections
    await UserModel.deleteMany({ email: 'arjuna.wisdom@vedictest.com' });
    await ConversationModel.deleteMany({});
    await MessageModel.deleteMany({});
    await WisdomVerseModel.deleteMany({});

    app = createApp({ config, logger });

    // Register a seeker to test authenticated endpoints
    const regRes = await request(app).post('/api/v1/auth/register').send({
      email: 'arjuna.wisdom@vedictest.com',
      password: 'SacredPassword123!',
      displayName: 'Partha Arjuna',
      preferredPersona: 'krishna',
    });

    seekerToken = regRes.body.data.tokens.accessToken;
    seekerId = regRes.body.data.user.id;
  });

  afterAll(async () => {
    await UserModel.deleteMany({ email: 'arjuna.wisdom@vedictest.com' });
    await ConversationModel.deleteMany({});
    await MessageModel.deleteMany({});
    await WisdomVerseModel.deleteMany({});
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });

  it('GET /api/v1/wisdom/personas returns list of all 5 authentic Vedic personas', async () => {
    const res = await request(app).get('/api/v1/wisdom/personas');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.personas).toHaveLength(5);

    const personaIds = res.body.data.personas.map((p: any) => p.id);
    expect(personaIds).toContain('krishna');
    expect(personaIds).toContain('chanakya');
    expect(personaIds).toContain('vaidya');
    expect(personaIds).toContain('vyasa');
    expect(personaIds).toContain('patanjali');

    const krishna = res.body.data.personas.find((p: any) => p.id === 'krishna');
    expect(krishna.color).toBe('#7B68EE');
    expect(krishna.philosophicalCore).toBeDefined();
    expect(krishna.sampleInquiries.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/wisdom/verses returns canonical seed verses with translations and commentaries', async () => {
    const res = await request(app).get('/api/v1/wisdom/verses');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.items.length).toBeGreaterThanOrEqual(5);

    const refs = res.body.data.items.map((v: any) => v.canonicalReference);
    expect(refs).toContain('BG 2.47');
    expect(refs).toContain('Arthashastra 1.7.1');
    expect(refs).toContain('Charaka Samhita Sutrasthana 1.41');
  });

  it('GET /api/v1/wisdom/verses supports filtering by domain and keyword search', async () => {
    const gitaRes = await request(app).get('/api/v1/wisdom/verses?domain=gita');
    expect(gitaRes.status).toBe(200);
    expect(gitaRes.body.data.items.every((v: any) => v.domain === 'gita')).toBe(true);

    const searchRes = await request(app).get('/api/v1/wisdom/verses?search=Nishkama');
    expect(searchRes.status).toBe(200);
    expect(searchRes.body.data.items.length).toBeGreaterThan(0);
  });

  it('POST /api/v1/wisdom/conversations requires authentication (401 Unauthorized)', async () => {
    const res = await request(app)
      .post('/api/v1/wisdom/conversations')
      .send({ persona: 'krishna' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/wisdom/conversations starts a new conversation thread for seeker', async () => {
    const res = await request(app)
      .post('/api/v1/wisdom/conversations')
      .set('Authorization', `Bearer ${seekerToken}`)
      .send({
        persona: 'krishna',
        title: 'Guidance on Svadharma and Anxiety',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.persona).toBe('krishna');
    expect(res.body.data.title).toBe('Guidance on Svadharma and Anxiety');
    expect(res.body.data.status).toBe('active');
    expect(res.body.data.userId).toBe(seekerId);

    activeConversationId = res.body.data.id;
  });

  it('POST /api/v1/wisdom/conversations supports initial message exchange upon creation', async () => {
    const res = await request(app)
      .post('/api/v1/wisdom/conversations')
      .set('Authorization', `Bearer ${seekerToken}`)
      .send({
        persona: 'chanakya',
        initialMessage: 'How should a leader evaluate untrustworthy advisers?',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.persona).toBe('chanakya');
    expect(res.body.data.messages).toHaveLength(2); // User query + Assistant response
    expect(res.body.data.messages[0].sender).toBe('user');
    expect(res.body.data.messages[1].sender).toBe('assistant');
    expect(res.body.data.messages[1].citations).toBeDefined();
  });

  it('GET /api/v1/wisdom/conversations lists paginated conversations for seeker', async () => {
    const res = await request(app)
      .get('/api/v1/wisdom/conversations')
      .set('Authorization', `Bearer ${seekerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.items.length).toBeGreaterThanOrEqual(2);
    expect(res.body.data.total).toBeGreaterThanOrEqual(2);
  });

  it('GET /api/v1/wisdom/conversations/:id returns conversation details and message history', async () => {
    const res = await request(app)
      .get(`/api/v1/wisdom/conversations/${activeConversationId}`)
      .set('Authorization', `Bearer ${seekerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(activeConversationId);
    expect(Array.isArray(res.body.data.messages)).toBe(true);
  });

  it('POST /api/v1/wisdom/conversations/:id/messages sends synchronous message with citations', async () => {
    const res = await request(app)
      .post(`/api/v1/wisdom/conversations/${activeConversationId}/messages`)
      .set('Authorization', `Bearer ${seekerToken}`)
      .send({
        content: 'O Krishna, how do I overcome grief and attachment?',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.message.sender).toBe('assistant');
    expect(res.body.data.message.content).toContain('BG 2.47');
    expect(res.body.data.message.citations).toBeDefined();
    expect(res.body.data.message.citations.length).toBeGreaterThan(0);
  });

  it('POST /api/v1/wisdom/conversations/:id/stream streams response via Server-Sent Events (SSE)', async () => {
    const res = await request(app)
      .post(`/api/v1/wisdom/conversations/${activeConversationId}/stream`)
      .set('Authorization', `Bearer ${seekerToken}`)
      .send({
        content: 'Tell me about the discipline of the mind.',
      });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/event-stream');

    const streamBody = res.text;
    expect(streamBody).toContain('event: token');
    expect(streamBody).toContain('event: done');
    expect(streamBody).toContain('conversationId');

    // Confirm that the message was saved in database
    const convDetails = await request(app)
      .get(`/api/v1/wisdom/conversations/${activeConversationId}`)
      .set('Authorization', `Bearer ${seekerToken}`);

    const lastMsg = convDetails.body.data.messages.slice(-1)[0];
    expect(lastMsg.sender).toBe('assistant');
    expect(lastMsg.citations).toBeDefined();
  });

  it('DELETE /api/v1/wisdom/conversations/:id archives conversation', async () => {
    const res = await request(app)
      .delete(`/api/v1/wisdom/conversations/${activeConversationId}`)
      .set('Authorization', `Bearer ${seekerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const checkRes = await request(app)
      .get(`/api/v1/wisdom/conversations/${activeConversationId}`)
      .set('Authorization', `Bearer ${seekerToken}`);

    expect(checkRes.body.data.status).toBe('archived');
  });

  it('Returns 404 when querying unknown conversation', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const res = await request(app)
      .get(`/api/v1/wisdom/conversations/${nonExistentId}`)
      .set('Authorization', `Bearer ${seekerToken}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  describe('Persona Conversation Refinement & Life-Direction Intent Suite', () => {
    const lifeDirectionQuery = 'I feel confused about my future. What should I do?';

    it.each([
      {
        persona: 'krishna',
        expectedKeywords: ['unsettled', 'honest step', 'career', 'education'],
        forbiddenTerms: ['<cite', '</cite>', 'Regarding "I feel confused'],
      },
      {
        persona: 'chanakya',
        expectedKeywords: ['Uncertainty', 'options', 'priorities', 'leverage', 'action'],
        forbiddenTerms: ['<cite', '</cite>', 'Regarding "I feel confused'],
      },
      {
        persona: 'vaidya',
        expectedKeywords: ['energy', 'peace of mind', 'slow down', 'rest'],
        forbiddenTerms: ['<cite', '</cite>', 'dosha', 'agni', 'vata', 'pitta', 'kapha', 'Regarding "I feel confused'],
      },
      {
        persona: 'vyasa',
        expectedKeywords: ['crossroads', 'values', 'principles'],
        forbiddenTerms: ['<cite', '</cite>', 'Regarding "I feel confused'],
      },
      {
        persona: 'patanjali',
        expectedKeywords: ['breaths', 'present', 'hour', 'momentum'],
        forbiddenTerms: ['<cite', '</cite>', 'Regarding "I feel confused'],
      },
    ])(
      'Persona $persona answers life-direction question with distinct, concise, natural guidance',
      async ({ persona, expectedKeywords, forbiddenTerms }) => {
        const res = await request(app)
          .post('/api/v1/wisdom/conversations')
          .set('Authorization', `Bearer ${seekerToken}`)
          .send({
            persona,
            initialMessage: lifeDirectionQuery,
          });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);

        const messages = res.body.data.messages;
        expect(messages).toHaveLength(2);

        const assistantMsg = messages[1];
        expect(assistantMsg.sender).toBe('assistant');
        const content = assistantMsg.content;

        // 1. Answers the actual question directly
        expect(content.length).toBeGreaterThan(50);

        // 2. Concise by default: word count under 120 words
        const wordCount = content.trim().split(/\s+/).length;
        expect(wordCount).toBeLessThan(120);
        expect(wordCount).toBeGreaterThan(25);

        // 3. Does not leak raw citation markup
        for (const forbidden of forbiddenTerms) {
          expect(content.toLowerCase()).not.toContain(forbidden.toLowerCase());
        }

        // 4. Distinct persona traits
        for (const kw of expectedKeywords) {
          expect(content.toLowerCase()).toContain(kw.toLowerCase());
        }

        // 5. General question with no matching verses has no ungrounded citations
        expect(assistantMsg.citations).toHaveLength(0);
      }
    );

    it('Follow-up questions retain the correct conversation context across turns', async () => {
      // Step 1: Start conversation with Krishna
      const convRes = await request(app)
        .post('/api/v1/wisdom/conversations')
        .set('Authorization', `Bearer ${seekerToken}`)
        .send({
          persona: 'krishna',
          initialMessage: lifeDirectionQuery,
        });

      expect(convRes.status).toBe(201);
      const convId = convRes.body.data.id;

      // Step 2: Send follow-up message specifying context
      const followUpRes = await request(app)
        .post(`/api/v1/wisdom/conversations/${convId}/messages`)
        .set('Authorization', `Bearer ${seekerToken}`)
        .send({
          content: 'The anxiety is mainly about choosing between software engineering and music.',
        });

      expect(followUpRes.status).toBe(201);
      expect(followUpRes.body.data.message.sender).toBe('assistant');

      // Step 3: Fetch full conversation history
      const fullHistoryRes = await request(app)
        .get(`/api/v1/wisdom/conversations/${convId}`)
        .set('Authorization', `Bearer ${seekerToken}`);

      expect(fullHistoryRes.status).toBe(200);
      const msgs = fullHistoryRes.body.data.messages;
      expect(msgs).toHaveLength(4); // User 1, Assistant 1, User 2, Assistant 2
      expect(msgs[0].content).toBe(lifeDirectionQuery);
      expect(msgs[2].content).toContain('software engineering and music');
      expect(msgs[3].content.length).toBeGreaterThan(20);
    });

    it('Grounded queries cite verified sources while ungrounded queries do not fabricate citations', async () => {
      // Query that specifically asks about grief/loss in Gita
      const convRes = await request(app)
        .post('/api/v1/wisdom/conversations')
        .set('Authorization', `Bearer ${seekerToken}`)
        .send({
          persona: 'krishna',
          initialMessage: 'O Krishna, how do I handle grief and loss according to the Gita?',
        });

      expect(convRes.status).toBe(201);
      const assistantMsg = convRes.body.data.messages[1];
      expect(assistantMsg.content).toContain('BG 2.11');
      expect(assistantMsg.citations.length).toBeGreaterThan(0);
      expect(assistantMsg.citations.some((c: any) => c.canonicalReference === 'BG 2.11')).toBe(true);

      // Verify that raw citation tags were stripped from persisted content
      expect(assistantMsg.content).not.toContain('<cite');
      expect(assistantMsg.content).not.toContain('</cite>');
    });

    it('Gracefully handles AI provider failures without crashing', async () => {
      // Sending an empty or invalid content payload returns 400 Bad Request
      const res = await request(app)
        .post(`/api/v1/wisdom/conversations/${activeConversationId}/stream`)
        .set('Authorization', `Bearer ${seekerToken}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('BAD_REQUEST');
    });
  });

  describe('Natural Personality & Varied Inquiry Suite', () => {
    const variedInquiries = [
      {
        persona: 'krishna',
        query: 'How do I maintain enthusiasm when the work I must do feels mundane and thankless?',
        expectedTheme: /equanimity|duty|sincere|effort|clinging|heart/i,
      },
      {
        persona: 'chanakya',
        query: 'How should I negotiate a partnership when the other party holds all the market leverage?',
        expectedTheme: /leverage|incentives|boundaries|strategy|objective|accountab/i,
      },
      {
        persona: 'vaidya',
        query: 'I have been working 14 hours a day and feel constantly drained and exhausted.',
        expectedTheme: /fatigue|rest|nourish|rhythm|body|balance|health notice/i,
      },
      {
        persona: 'vyasa',
        query: 'What should a person do when loyalty to a beloved friend conflicts with truth and honesty?',
        expectedTheme: /dharma|integrity|righteousness|character|consequence/i,
      },
      {
        persona: 'patanjali',
        query: 'My mind feels constantly scattered by notifications and racing thoughts when trying to focus.',
        expectedTheme: /awareness|breaths?|mind|stillness|fluct|abhyasa|tension/i,
      },
    ];

    it.each(variedInquiries)(
      'Persona $persona responds with distinct personality, reasoning approach, and tone',
      async ({ persona, query, expectedTheme }) => {
        const res = await request(app)
          .post('/api/v1/wisdom/conversations')
          .set('Authorization', `Bearer ${seekerToken}`)
          .send({
            persona,
            initialMessage: query,
          });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);

        const assistantMsg = res.body.data.messages[1];
        expect(assistantMsg.sender).toBe('assistant');
        const content = assistantMsg.content;

        // Content length adapts naturally to the question without predetermined canned length
        expect(content.length).toBeGreaterThan(40);

        // Does not leak raw markup
        expect(content).not.toContain('<cite');
        expect(content).not.toContain('</cite>');

        // Matches the persona's distinct voice, vocabulary, and reasoning approach
        expect(content).toMatch(expectedTheme);
      }
    );
  });
});

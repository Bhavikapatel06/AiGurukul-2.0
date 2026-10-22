import { EmbeddingProvider, EmbeddingResult } from './embedding-provider.interface.js';

export class LocalEmbeddingProvider implements EmbeddingProvider {
  public readonly providerName = 'local';
  public readonly dimensions = 384;

  // Semantic Concept Mapping: Group related keywords/stems into shared conceptual coordinate clusters
  private static readonly CONCEPT_CLUSTERS: Record<string, string[]> = {
    krishna_gita: [
      'krishna', 'bhagavad', 'gita', 'arjuna', 'kurukshetra', 'svadharma', 'swadharma',
      'nishkama', 'atman', 'sthitaprajna', 'charioteer', 'karma yoga', 'pandava', 'yadava',
    ],
    chanakya_statecraft: [
      'chanakya', 'kautilya', 'vishnugupta', 'arthashastra', 'neeti', 'chandragupta',
      'upaya', 'upayas', 'saptanga', 'dhanananda', 'pataliputra', 'statecraft', 'counsel',
    ],
    charaka_ayurveda: [
      'charaka', 'caraka', 'samhita', 'ayurveda', 'vaidya', 'dosha', 'doshas', 'vata',
      'pitta', 'kapha', 'agni', 'ama', 'dinacharya', 'ojas', 'dhatu', 'langhana', 'fever', 'jvara',
    ],
    vyasa_mahabharata: [
      'vyasa', 'veda vyasa', 'mahabharata', 'bhishma', 'yudhishthira', 'karna', 'draupadi',
      'duryodhana', 'shanti parva', 'kuru', 'vidura',
    ],
    patanjali_yoga: [
      'patanjali', 'yoga', 'sutras', 'sutra', 'citta', 'chitta', 'vritti', 'nirodha',
      'ashtanga', 'samadhi', 'abhyasa', 'vairagya', 'pranayama', 'pratipaksha', 'drashta',
    ],
    action_duty: [
      'duty', 'action', 'karma', 'svadharma', 'responsibility', 'work', 'career', 'effort',
      'execution', 'prescribed', 'obligation', 'task', 'engagement', 'discipline', 'righteous',
    ],
    outcome_detachment: [
      'fruit', 'fruits', 'outcome', 'outcomes', 'result', 'results', 'anxiety', 'anxious',
      'worry', 'worried', 'detachment', 'asakta', 'nishkama', 'clinging', 'craving', 'success', 'failure',
    ],
    mind_stillness: [
      'mind', 'mental', 'chitta', 'manas', 'vritti', 'stillness', 'calm', 'focus', 'concentration',
      'meditation', 'dhyana', 'dharana', 'thoughts', 'racing', 'turbulent', 'distraction', 'overthinking',
    ],
    equanimity_wisdom: [
      'equanimity', 'sthitaprajna', 'steady', 'poise', 'grief', 'sorrow', 'shoka', 'fear', 'anger',
      'pleasure', 'pain', 'duality', 'peace', 'inner-strength', 'serenity', 'prasadana',
    ],
    strategy_leadership: [
      'strategy', 'leadership', 'leader', 'ruler', 'statecraft', 'arthashastra', 'vinaya', 'discipline',
      'plan', 'foresight', 'prudence', 'governance', 'neeti', 'counsel', 'minister', 'tactics',
    ],
    trust_alliances: [
      'trust', 'loyalty', 'betrayal', 'deceit', 'ally', 'alliances', 'friend', 'friends', 'mitra',
      'adversity', 'partner', 'vetting', 'integrity', 'suspicion', 'testing',
    ],
    health_vitality: [
      'health', 'vitality', 'ayurveda', 'charaka', 'body', 'sharira', 'dosha', 'vata', 'pitta', 'kapha',
      'digest', 'digestion', 'agni', 'sleep', 'fatigue', 'burnout', 'exhaustion', 'tired', 'diet', 'routine',
    ],
    ethics_dharma: [
      'dharma', 'moral', 'morals', 'ethics', 'ethical', 'dilemma', 'crossroads', 'truth', 'satya',
      'shreyas', 'preyas', 'righteousness', 'virtue', 'integrity', 'destiny', 'apaddharma',
    ],
  };

  /**
   * Deterministic 32-bit FNV-1a hash of a token string.
   */
  private fnv1aHash(str: string): number {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  /**
   * Generates a semantic embedding vector from text using feature hashing,
   * concept expansion clusters, and L2 normalization.
   */
  public async generateEmbedding(text: string): Promise<EmbeddingResult> {
    const vector = new Array(this.dimensions).fill(0);

    // Normalize common typos and variations so query embeddings match canonical sources
    const cleanText = text
      .toLowerCase()
      .replace(/\bl?krishn?[aa]?\b/gi, 'krishna')
      .replace(/\bchank?ya[a]?\b/gi, 'chanakya')
      .replace(/\bcharak[aa]?\b/gi, 'charaka')
      .replace(/\bvyas[aa]?\b/gi, 'vyasa')
      .replace(/\bpatanj[al]i[i]?\b/gi, 'patanjali')
      .replace(/\bdharama\b/gi, 'dharma')
      .replace(/\bkarmma\b/gi, 'karma');

    // 1. Extract alphanumeric word tokens (length >= 2)
    const tokens = cleanText
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 2);

    // Stopwords filter for cleaner signal
    const stopWords = new Set([
      'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'in', 'of', 'to', 'for', 'with', 'as',
      'by', 'this', 'that', 'from', 'be', 'are', 'was', 'were', 'it', 'its', 'you', 'your', 'i', 'my',
    ]);

    const meaningfulTokens = tokens.filter((t) => !stopWords.has(t));

    // 2. Token-level feature hashing (position-invariant)
    for (const token of meaningfulTokens) {
      const h1 = this.fnv1aHash(token);
      const h2 = this.fnv1aHash(token + '_sign');
      const index = h1 % this.dimensions;
      const sign = (h2 % 2 === 0 ? 1 : -1);
      vector[index] += sign * 1.5;

      // Also hash character tri-grams for subword robustness
      if (token.length >= 4) {
        for (let j = 0; j <= token.length - 3; j++) {
          const trigram = token.substring(j, j + 3);
          const triHash = this.fnv1aHash(trigram);
          const triIndex = triHash % this.dimensions;
          vector[triIndex] += (triHash % 2 === 0 ? 1 : -1) * 0.4;
        }
      }
    }

    // 3. Concept expansion activation
    for (const [clusterName, clusterWords] of Object.entries(LocalEmbeddingProvider.CONCEPT_CLUSTERS)) {
      let clusterHits = 0;
      for (const cw of clusterWords) {
        if (cleanText.includes(cw)) {
          clusterHits++;
        }
      }

      if (clusterHits > 0) {
        // Boost canonical cluster coordinate bucket
        const clusterBaseIndex = (this.fnv1aHash(clusterName) % (this.dimensions - 10));
        const clusterWeight = Math.min(3.0, 1.0 + clusterHits * 0.6);
        for (let k = 0; k < 5; k++) {
          const idx = (clusterBaseIndex + k) % this.dimensions;
          vector[idx] += clusterWeight;
        }
      }
    }

    // 4. L2 Normalization (Unit Length) for Cosine Similarity
    let sumSquares = 0;
    for (let i = 0; i < this.dimensions; i++) {
      sumSquares += vector[i] * vector[i];
    }
    const norm = Math.sqrt(sumSquares) || 1;
    for (let i = 0; i < this.dimensions; i++) {
      vector[i] = Number((vector[i] / norm).toFixed(6));
    }

    return {
      embedding: vector,
      dimensions: this.dimensions,
    };
  }

  public async generateEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
    return Promise.all(texts.map((t) => this.generateEmbedding(t)));
  }
}

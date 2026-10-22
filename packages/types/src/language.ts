export type SupportedLanguage = 'en' | 'hi' | 'gu' | 'sa' | 'ta' | 'pli';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  script: string;
  family: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  description: string;
  hasVirtualKeyboard: boolean;
}

export const SUPPORTED_LANGUAGES_REGISTRY: Record<SupportedLanguage, LanguageInfo> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    script: 'Latin',
    family: 'Indo-European (Germanic)',
    flag: '🌐',
    direction: 'ltr',
    description: 'International lingua franca for modern philosophical contemplation.',
    hasVirtualKeyboard: false,
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    family: 'Indo-Aryan',
    flag: '🇮🇳',
    direction: 'ltr',
    description: 'Modern standard literary Hindi rooted deeply in classical Sanskrit.',
    hasVirtualKeyboard: true,
  },
  gu: {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    family: 'Indo-Aryan',
    flag: '🪔',
    direction: 'ltr',
    description: 'Language of the great saints, Vallabha tradition, and Narsinh Mehta.',
    hasVirtualKeyboard: true,
  },
  sa: {
    code: 'sa',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    script: 'Devanagari',
    family: 'Indo-Aryan (Classical Vedic)',
    flag: '🕉️',
    direction: 'ltr',
    description: 'The sacred primordial language of the Vedas, Upanishads, and Gita.',
    hasVirtualKeyboard: true,
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    family: 'Dravidian (Classical Sangam)',
    flag: '🛕',
    direction: 'ltr',
    description: 'Ancient classical Dravidian language of the Sangam era and Tirukkural.',
    hasVirtualKeyboard: false,
  },
  pli: {
    code: 'pli',
    name: 'Pali',
    nativeName: 'पाळि / ပါဠિ',
    script: 'Devanagari / Romanized',
    family: 'Middle Indo-Aryan (Prakrit)',
    flag: '☸️',
    direction: 'ltr',
    description: 'Sacred language of the Theravada Buddhist canon and the Dhammapada.',
    hasVirtualKeyboard: true,
  },
};

export type KeyCategory =
  | 'vowel'
  | 'consonant'
  | 'matra'
  | 'sign'
  | 'number'
  | 'control'
  | 'space';

export interface VirtualKeyDef {
  key: string;
  shifted?: string;
  label?: string;
  shiftedLabel?: string;
  category: KeyCategory;
  combining?: boolean; // true if this is a combining matra or virama
}

export interface VirtualKeyboardLayout {
  language: SupportedLanguage;
  name: string;
  script: string;
  rows: VirtualKeyDef[][];
  shiftRows?: VirtualKeyDef[][];
}

export interface ManuscriptWordDTO {
  index: number;
  word: string;
  transliteration: string;
  grammar: string;
  meaning: string;
  dhatuRoot?: string;
  rootMeaning?: string;
}

export interface ManuscriptTranslationDTO {
  targetLanguage: SupportedLanguage;
  translation: string;
  philosophicalCommentary: string;
}

export interface ManuscriptDTO {
  id: string;
  slug: string;
  title: string;
  originalLanguage: SupportedLanguage;
  sourceScript: string;
  originalText: string;
  transliteration: string;
  canonicalSource: string;
  verseReference: string;
  poeticMeter?: string;
  authorOrRishi?: string;
  wordBreakdown: ManuscriptWordDTO[];
  translations: Record<string, ManuscriptTranslationDTO>;
}

export type TranslateSourceLanguage = SupportedLanguage | 'auto';

export interface TranslateRequestDTO {
  sourceLanguage: TranslateSourceLanguage;
  targetLanguage: SupportedLanguage;
  text: string;
  includeEtymology?: boolean;
}

export interface TranslationResultDTO {
  sourceLanguage: SupportedLanguage | 'auto';
  targetLanguage: SupportedLanguage;
  sourceText: string;
  translatedText: string;
  transliteration?: string;
  confidence: number;
  method: 'canonical_cache' | 'dictionary_lexicon' | 'ai_synthesizer' | 'ocr_neural';
  breakdown?: ManuscriptWordDTO[];
  etymologyNotes?: string;
  detectedSourceLanguage?: SupportedLanguage;
}

export interface ImageOCRRequestDTO {
  imageBase64: string;
  mimeType?: string;
  sourceLanguage?: TranslateSourceLanguage;
  targetLanguage?: SupportedLanguage;
}

export interface ImageOCRResultDTO {
  extractedText: string;
  detectedLanguage?: SupportedLanguage | string;
  confidence: number;
  isReadable: boolean;
  warning?: string;
  ocrProvider?: string;
  translatedText?: string;
  transliteration?: string;
  etymologyNotes?: string;
  translation?: TranslationResultDTO;
}

export interface EtymologyEntryDTO {
  root: string; // e.g. "धृ (dhṛ)"
  rootDevanagari: string;
  rootIast: string;
  language: SupportedLanguage;
  rootMeaning: string;
  linguisticFamily: string;
  grammaticalAffixes: string; // e.g. "+ मन् (man) -> धर्म (dharma)"
  derivedWords: string[];
  canonicalCitation: string;
  philosophicalEvolution: string;
}

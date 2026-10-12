import { Schema, model, Document, Model } from 'mongoose';
import {
  ManuscriptDTO,
  SupportedLanguage,
  ManuscriptWordDTO,
  ManuscriptTranslationDTO,
} from '@ai-gurukul/types';

export interface IManuscriptDocument extends Document {
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
  createdAt: Date;
  updatedAt: Date;
  toDTO(): ManuscriptDTO;
}

const ManuscriptWordSchema = new Schema<ManuscriptWordDTO>(
  {
    index: { type: Number, required: true },
    word: { type: String, required: true },
    transliteration: { type: String, required: true },
    grammar: { type: String, required: true },
    meaning: { type: String, required: true },
    dhatuRoot: { type: String },
    rootMeaning: { type: String },
  },
  { _id: false }
);

const ManuscriptTranslationSchema = new Schema<ManuscriptTranslationDTO>(
  {
    targetLanguage: {
      type: String,
      enum: ['en', 'hi', 'gu', 'sa', 'ta', 'pli', 'pa'],
      required: true,
    },
    translation: { type: String, required: true },
    philosophicalCommentary: { type: String, required: true },
  },
  { _id: false }
);

export const ManuscriptSchema = new Schema<IManuscriptDocument>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    originalLanguage: {
      type: String,
      enum: ['en', 'hi', 'gu', 'sa', 'ta', 'pli', 'pa'],
      required: true,
      index: true,
    },
    sourceScript: {
      type: String,
      required: true,
    },
    originalText: {
      type: String,
      required: true,
    },
    transliteration: {
      type: String,
      required: true,
    },
    canonicalSource: {
      type: String,
      required: true,
      index: true,
    },
    verseReference: {
      type: String,
      required: true,
    },
    poeticMeter: {
      type: String,
    },
    authorOrRishi: {
      type: String,
    },
    wordBreakdown: {
      type: [ManuscriptWordSchema],
      default: [],
    },
    translations: {
      type: Map,
      of: ManuscriptTranslationSchema,
      default: {},
    },
  },
  {
    timestamps: true,
    strict: 'throw',
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = String(ret._id);
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

ManuscriptSchema.methods.toDTO = function (): ManuscriptDTO {
  const translationsMap: Record<string, ManuscriptTranslationDTO> = {};
  if (this.translations) {
    if (this.translations instanceof Map) {
      for (const [key, value] of this.translations.entries()) {
        translationsMap[key] = {
          targetLanguage: value.targetLanguage,
          translation: value.translation,
          philosophicalCommentary: value.philosophicalCommentary,
        };
      }
    } else {
      Object.assign(translationsMap, this.translations);
    }
  }

  return {
    id: this._id ? this._id.toString() : '',
    slug: this.slug,
    title: this.title,
    originalLanguage: this.originalLanguage,
    sourceScript: this.sourceScript,
    originalText: this.originalText,
    transliteration: this.transliteration,
    canonicalSource: this.canonicalSource,
    verseReference: this.verseReference,
    poeticMeter: this.poeticMeter,
    authorOrRishi: this.authorOrRishi,
    wordBreakdown: (this.wordBreakdown || []).map((w: any) => ({
      index: w.index,
      word: w.word,
      transliteration: w.transliteration,
      grammar: w.grammar,
      meaning: w.meaning,
      dhatuRoot: w.dhatuRoot,
      rootMeaning: w.rootMeaning,
    })),
    translations: translationsMap,
  };
};

export const ManuscriptModel: Model<IManuscriptDocument> =
  model<IManuscriptDocument>('Manuscript', ManuscriptSchema);

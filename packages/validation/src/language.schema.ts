import { z } from 'zod';

export const SupportedLanguageSchema = z.enum(['en', 'hi', 'gu', 'sa', 'ta', 'pli']);
export const TranslateSourceLanguageSchema = z.enum(['auto', 'en', 'hi', 'gu', 'sa', 'ta', 'pli']).default('auto');

export const TranslateRequestSchema = z.object({
  sourceLanguage: TranslateSourceLanguageSchema,
  targetLanguage: SupportedLanguageSchema,
  text: z.string().min(1, 'Source text cannot be empty').max(10000, 'Text exceeds 10,000 characters limit'),
  includeEtymology: z.boolean().default(false).optional(),
});

export const ImageOCRRequestSchema = z.object({
  imageBase64: z.string().min(1, 'Image data is required'),
  mimeType: z.string().optional(),
  sourceLanguage: TranslateSourceLanguageSchema.optional(),
  targetLanguage: SupportedLanguageSchema.optional(),
});

export const EtymologyQuerySchema = z.object({
  root: z.string().min(1, 'Root word or Dhatu query is required').max(50),
  language: SupportedLanguageSchema.optional(),
});

export const ManuscriptQuerySchema = z.object({
  language: SupportedLanguageSchema.optional(),
  category: z.string().optional(),
  search: z.string().optional(),
});

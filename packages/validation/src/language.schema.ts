import { z } from 'zod';

export const SupportedLanguageSchema = z.enum(['en', 'hi', 'gu', 'sa', 'ta', 'pli']);

export const TranslateRequestSchema = z.object({
  sourceLanguage: SupportedLanguageSchema,
  targetLanguage: SupportedLanguageSchema,
  text: z.string().min(1, 'Source text cannot be empty').max(2000, 'Text exceeds 2000 characters limit'),
  includeEtymology: z.boolean().default(false).optional(),
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

import { AIProvider } from './ai-provider.interface.js';
import { LocalAIProvider } from './local-ai.provider.js';
import { GeminiAIProvider } from './gemini-ai.provider.js';
import { OpenAIProvider } from './openai-ai.provider.js';

export interface AIProviderFactoryOptions {
  apiKey?: string;
  model?: string;
}

export class AIProviderFactory {
  public static create(
    providerType?: string,
    options?: AIProviderFactoryOptions
  ): AIProvider {
    // 1. Determine provider type, checking explicit configuration or available server API keys
    let requestedType = (
      providerType ||
      process.env.AI_PROVIDER ||
      ''
    ).toLowerCase();

    // Auto-detect API key presence if provider wasn't explicitly forced to local
    if (!requestedType || requestedType === 'local') {
      if (options?.apiKey || process.env.GEMINI_API_KEY) {
        requestedType = 'gemini';
      } else if (process.env.OPENAI_API_KEY) {
        requestedType = 'openai';
      } else {
        requestedType = 'local';
      }
    }

    switch (requestedType) {
      case 'gemini': {
        const apiKey = options?.apiKey || process.env.GEMINI_API_KEY;
        if (!apiKey) {
          console.warn(
            '⚠️ [AIProviderFactory] GEMINI_API_KEY not configured. Falling back to LocalAIProvider.'
          );
          return new LocalAIProvider();
        }
        return new GeminiAIProvider(apiKey, options?.model || process.env.GEMINI_MODEL);
      }
      case 'openai': {
        const apiKey = options?.apiKey || process.env.OPENAI_API_KEY;
        if (!apiKey) {
          console.warn(
            '⚠️ [AIProviderFactory] OPENAI_API_KEY not configured. Falling back to LocalAIProvider.'
          );
          return new LocalAIProvider();
        }
        return new OpenAIProvider(apiKey, options?.model || process.env.OPENAI_MODEL);
      }
      case 'anthropic': {
        console.warn(
          '⚠️ [AIProviderFactory] Anthropic provider routed via standard compliant interface / fallback.'
        );
        return new LocalAIProvider();
      }
      case 'local':
      default:
        return new LocalAIProvider();
    }
  }
}

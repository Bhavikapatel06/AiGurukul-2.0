import { AIProvider, AIMessage, AICompletionOptions } from './ai-provider.interface.js';
import { LocalAIProvider } from './local-ai.provider.js';

export class OpenAIProvider implements AIProvider {
  public readonly providerName = 'openai';
  private readonly apiKey: string;
  private readonly modelName: string;
  private readonly fallbackProvider: LocalAIProvider;

  constructor(apiKey: string, modelName: string = 'gpt-4o-mini') {
    this.apiKey = apiKey.trim();
    this.modelName = modelName.trim();
    this.fallbackProvider = new LocalAIProvider();
  }

  public async generateCompletion(
    messages: AIMessage[],
    options?: AICompletionOptions
  ): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.modelName,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          temperature: options?.temperature ?? 0.7,
          max_tokens: options?.maxTokens ?? 1024,
          stop: options?.stopSequences,
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        console.warn(`[OpenAIProvider] HTTP error ${response.status}. Falling back to local provider.`);
        return this.fallbackProvider.generateCompletion(messages, options);
      }

      const data = (await response.json()) as any;
      const text = data.choices?.[0]?.message?.content;
      return typeof text === 'string' && text.trim()
        ? text.trim()
        : this.fallbackProvider.generateCompletion(messages, options);
    } catch (err) {
      console.warn(`[OpenAIProvider] Request failed: ${err}. Falling back.`);
      return this.fallbackProvider.generateCompletion(messages, options);
    }
  }

  public async *streamCompletion(
    messages: AIMessage[],
    options?: AICompletionOptions
  ): AsyncIterable<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.modelName,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          temperature: options?.temperature ?? 0.7,
          max_tokens: options?.maxTokens ?? 1024,
          stop: options?.stopSequences,
          stream: true,
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok || !response.body) {
        console.warn(`[OpenAIProvider] Stream init failed (${response.status}). Falling back to local.`);
        yield* this.fallbackProvider.streamCompletion(messages, options);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let emittedTokens = 0;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.replace(/^data:\s*/, '');
          if (dataStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              emittedTokens++;
              yield delta;
            }
          } catch {
            // Skip parse errors
          }
        }
      }

      if (emittedTokens === 0) {
        yield* this.fallbackProvider.streamCompletion(messages, options);
      }
    } catch (err) {
      console.warn(`[OpenAIProvider] Stream failed: ${err}. Falling back.`);
      yield* this.fallbackProvider.streamCompletion(messages, options);
    }
  }

  public async generateStructuredOutput<T>(messages: AIMessage[], schema: unknown): Promise<T> {
    try {
      const completion = await this.generateCompletion([
        ...messages,
        {
          role: 'system',
          content: `Return valid JSON strictly conforming to: ${JSON.stringify(schema)}. Do not use markdown backticks.`,
        },
      ]);
      const cleaned = completion.replace(/```json\s*/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned) as T;
    } catch {
      return this.fallbackProvider.generateStructuredOutput<T>(messages, schema);
    }
  }
}

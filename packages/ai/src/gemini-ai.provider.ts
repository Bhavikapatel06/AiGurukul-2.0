import { AIProvider, AIMessage, AICompletionOptions } from './ai-provider.interface.js';
import { LocalAIProvider } from './local-ai.provider.js';

export class GeminiAIProvider implements AIProvider {
  public readonly providerName = 'gemini';
  private readonly apiKey: string;
  private readonly modelName: string;
  private readonly fallbackProvider: LocalAIProvider;

  constructor(apiKey: string, modelName: string = 'gemini-1.5-flash') {
    this.apiKey = apiKey.trim();
    this.modelName = modelName.trim();
    this.fallbackProvider = new LocalAIProvider();
  }

  private formatMessages(messages: AIMessage[]) {
    const systemMessage = messages.find((m) => m.role === 'system')?.content || '';
    const nonSystemMessages = messages.filter((m) => m.role !== 'system');

    // Gemini requires alternating roles starting with 'user'
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    for (const msg of nonSystemMessages) {
      const role = msg.role === 'assistant' ? 'model' : 'user';
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += `\n\n${msg.content}`;
      } else {
        contents.push({
          role,
          parts: [{ text: msg.content }],
        });
      }
    }

    if (contents.length === 0) {
      contents.push({ role: 'user', parts: [{ text: 'Greetings' }] });
    } else if (contents[0].role === 'model') {
      contents.unshift({ role: 'user', parts: [{ text: 'Greetings' }] });
    }

    return {
      systemInstruction: systemMessage
        ? { parts: [{ text: systemMessage }] }
        : undefined,
      contents,
    };
  }

  public async generateCompletion(
    messages: AIMessage[],
    options?: AICompletionOptions
  ): Promise<string> {
    try {
      const { systemInstruction, contents } = this.formatMessages(messages);

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        this.modelName
      )}:generateContent?key=${encodeURIComponent(this.apiKey)}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction,
          generationConfig: {
            temperature: options?.temperature ?? 0.7,
            maxOutputTokens: options?.maxTokens ?? 1024,
            stopSequences: options?.stopSequences,
          },
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        if (response.status === 401 || response.status === 403) {
          console.warn(`[GeminiAIProvider] Invalid API credentials (${response.status}). Falling back to local provider.`);
          return this.fallbackProvider.generateCompletion(messages, options);
        }
        if (response.status === 429) {
          console.warn(`[GeminiAIProvider] Rate limit reached (429). Falling back to local provider.`);
          return this.fallbackProvider.generateCompletion(messages, options);
        }
        console.warn(`[GeminiAIProvider] API error ${response.status}: ${errorBody}. Falling back.`);
        return this.fallbackProvider.generateCompletion(messages, options);
      }

      const data = (await response.json()) as any;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text || typeof text !== 'string') {
        return this.fallbackProvider.generateCompletion(messages, options);
      }

      return text.trim();
    } catch (err) {
      console.warn(`[GeminiAIProvider] Request failed or timed out: ${err}. Falling back to local provider.`);
      return this.fallbackProvider.generateCompletion(messages, options);
    }
  }

  public async *streamCompletion(
    messages: AIMessage[],
    options?: AICompletionOptions
  ): AsyncIterable<string> {
    try {
      const { systemInstruction, contents } = this.formatMessages(messages);

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        this.modelName
      )}:streamGenerateContent?alt=sse&key=${encodeURIComponent(this.apiKey)}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction,
          generationConfig: {
            temperature: options?.temperature ?? 0.7,
            maxOutputTokens: options?.maxTokens ?? 1024,
            stopSequences: options?.stopSequences,
          },
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok || !response.body) {
        console.warn(`[GeminiAIProvider] Stream init failed with status ${response.status}. Falling back to local stream.`);
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
          const jsonStr = trimmed.replace(/^data:\s*/, '');
          if (!jsonStr || jsonStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const partText = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (partText) {
              emittedTokens++;
              yield partText;
            }
          } catch {
            // Non-JSON SSE ping, continue
          }
        }
      }

      if (emittedTokens === 0) {
        yield* this.fallbackProvider.streamCompletion(messages, options);
      }
    } catch (err) {
      console.warn(`[GeminiAIProvider] Stream error: ${err}. Falling back to local stream.`);
      yield* this.fallbackProvider.streamCompletion(messages, options);
    }
  }

  public async generateStructuredOutput<T>(messages: AIMessage[], schema: unknown): Promise<T> {
    try {
      const completion = await this.generateCompletion([
        ...messages,
        {
          role: 'system',
          content: `Output ONLY valid JSON matching this schema: ${JSON.stringify(schema)}. Do not include Markdown fences.`,
        },
      ]);
      const cleaned = completion.replace(/```json\s*/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned) as T;
    } catch {
      return this.fallbackProvider.generateStructuredOutput<T>(messages, schema);
    }
  }
}

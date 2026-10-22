import { OCRProvider, OCRResult, OCROptions } from './ocr.interface.js';
import { TesseractOCRProvider } from './tesseract-ocr.provider.js';

export class GeminiVisionOCRProvider implements OCRProvider {
  public readonly providerName = 'gemini-vision';
  private apiKey: string;
  private modelName: string;
  private fallback: TesseractOCRProvider;

  constructor(apiKey: string, modelName: string = 'gemini-1.5-flash') {
    this.apiKey = apiKey.trim();
    this.modelName = modelName.trim();
    this.fallback = new TesseractOCRProvider();
  }

  public async extractText(imageBuffer: Buffer, options?: OCROptions): Promise<OCRResult> {
    if (!this.apiKey) {
      return this.fallback.extractText(imageBuffer, options);
    }

    try {
      const mimeType = options?.mimeType || 'image/jpeg';
      const base64Data = imageBuffer.toString('base64');

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        this.modelName
      )}:generateContent?key=${encodeURIComponent(this.apiKey)}`;

      const prompt = `You are a high-precision OCR transcription system specializing in ancient and modern Indian scripts (Devanagari, Sanskrit, Gujarati, Tamil, Pali, Hindi, and English).
Analyze this image and transcribe the visible text with absolute textual fidelity.
CRITICAL RULES:
- Transcribe EXACTLY what is visible, preserving line breaks, Sanskrit diacritics, and punctuation.
- Never invent, assume, or guess text that is unreadable or clipped.
- If the image contains no readable text, or is severely blurred/corrupted, set isReadable: false and confidence: 0.1.
- Format the response strictly as valid JSON without markdown wrapping:
{
  "text": "Transcribed text string",
  "detectedLanguage": "sa",
  "confidence": 0.95,
  "isReadable": true,
  "warning": null
}`;

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: base64Data,
                },
              },
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: 'application/json',
        },
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(25000),
      });

      if (!response.ok) {
        return this.fallback.extractText(imageBuffer, options);
      }

      const resJson = (await response.json()) as any;
      const candidateText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!candidateText) {
        return this.fallback.extractText(imageBuffer, options);
      }

      const jsonMatch = candidateText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          text: String(parsed.text || '').trim(),
          detectedLanguage: parsed.detectedLanguage ? String(parsed.detectedLanguage) : undefined,
          confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.9,
          isReadable: Boolean(parsed.isReadable && parsed.text && parsed.text.trim().length > 0),
          warning: parsed.warning ? String(parsed.warning) : undefined,
        };
      }

      return this.fallback.extractText(imageBuffer, options);
    } catch {
      return this.fallback.extractText(imageBuffer, options);
    }
  }
}

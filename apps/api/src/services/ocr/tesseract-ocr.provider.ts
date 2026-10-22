import { createWorker } from 'tesseract.js';
import { OCRProvider, OCRResult, OCROptions } from './ocr.interface.js';

export class TesseractOCRProvider implements OCRProvider {
  public readonly providerName = 'tesseract';

  private detectScript(text: string): string {
    if (/[\u0900-\u097F]/.test(text)) return 'sa'; // Devanagari (Sanskrit/Hindi)
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
    return 'en'; // Default Latin/English
  }

  public async extractText(imageBuffer: Buffer, options?: OCROptions): Promise<OCRResult> {
    let worker: any = null;
    try {
      // Map language hint if provided
      let lang = 'eng';
      if (options?.languageHint === 'hin' || options?.languageHint === 'hi') lang = 'hin+eng';
      else if (options?.languageHint === 'san' || options?.languageHint === 'sa') lang = 'san+eng';
      else if (options?.languageHint === 'guj' || options?.languageHint === 'gu') lang = 'guj+eng';
      else if (options?.languageHint === 'tam' || options?.languageHint === 'ta') lang = 'tam+eng';

      worker = await createWorker(lang);
      const ret = await worker.recognize(imageBuffer);
      await worker.terminate();
      worker = null;

      const rawText = ret.data.text ? ret.data.text.trim() : '';
      const confidence =
        typeof ret.data.confidence === 'number'
          ? Math.max(0, Math.min(1, Math.round(ret.data.confidence) / 100))
          : 0.7;

      const isReadable = rawText.length >= 2 && confidence >= 0.3;
      let warning: string | undefined = undefined;

      if (!isReadable) {
        warning =
          'No readable text could be discerned from the image. Please verify that the image is sharply focused, well-lit, and contains legible inscriptions.';
      } else if (confidence < 0.6) {
        warning =
          'OCR confidence is moderate. Extracted text may contain optical noise or imperfect character shapes.';
      }

      const detectedLanguage = isReadable ? this.detectScript(rawText) : undefined;

      return {
        text: rawText,
        detectedLanguage,
        confidence,
        isReadable,
        warning,
        rawConfidence: ret.data.confidence,
      };
    } catch (err: any) {
      if (worker) {
        try {
          await worker.terminate();
        } catch {
          // Ignore worker termination errors
        }
      }
      return {
        text: '',
        confidence: 0,
        isReadable: false,
        warning: `Optical character recognition encountered an error: ${
          err?.message || 'Unable to decode image buffer'
        }`,
      };
    }
  }
}

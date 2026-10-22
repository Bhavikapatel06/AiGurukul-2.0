import { OCRProvider } from './ocr.interface.js';
import { TesseractOCRProvider } from './tesseract-ocr.provider.js';
import { GeminiVisionOCRProvider } from './gemini-vision-ocr.provider.js';

export class OCRProviderFactory {
  public static create(geminiApiKey?: string): OCRProvider {
    if (geminiApiKey && geminiApiKey.trim().length > 0) {
      return new GeminiVisionOCRProvider(geminiApiKey);
    }
    return new TesseractOCRProvider();
  }
}

export * from './ocr.interface.js';
export * from './tesseract-ocr.provider.js';
export * from './gemini-vision-ocr.provider.js';

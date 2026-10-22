export interface OCROptions {
  mimeType?: string;
  languageHint?: string;
}

export interface OCRResult {
  text: string;
  detectedLanguage?: string;
  confidence: number; // 0 to 1
  isReadable: boolean;
  warning?: string;
  rawConfidence?: number;
}

export interface OCRProvider {
  readonly providerName: string;
  extractText(imageBuffer: Buffer, options?: OCROptions): Promise<OCRResult>;
}

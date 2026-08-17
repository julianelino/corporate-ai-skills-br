import { extname } from 'node:path';

export function intakeStrategy(filePath) {
  const suffix = extname(filePath).toLowerCase();
  if (suffix === '.csv') return 'STRUCTURED_PARSE';
  if (['.xlsx', '.docx', '.pdf'].includes(suffix)) return 'NATIVE_EXTRACTION_REQUIRED';
  if (['.png', '.jpg', '.jpeg', '.tiff'].includes(suffix)) return 'OCR_FALLBACK';
  return 'UNSUPPORTED';
}

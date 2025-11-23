/**
 * PDF Text Extraction Utility
 * Uses pdf-parse to extract text from uploaded PDF files
 */

import pdfParse from 'pdf-parse';

export interface PDFExtractionResult {
  text: string;
  numPages: number;
  info: any;
}

export async function extractTextFromPDF(buffer: Buffer): Promise<PDFExtractionResult> {
  try {
    const data = await pdfParse(buffer);
    
    return {
      text: data.text,
      numPages: data.numpages,
      info: data.info,
    };
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.');
  }
}

// Client-side validation (browser File API)
export function validatePDFFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'File must be a PDF' };
  }

  // Check file size (20 MB max)
  const maxSize = 20 * 1024 * 1024; // 20 MB in bytes
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 20 MB' };
  }

  if (file.size === 0) {
    return { valid: false, error: 'File is empty' };
  }

  return { valid: true };
}

// Server-side validation (Node.js Buffer)
export function validatePDFBuffer(buffer: Buffer, filename?: string): { valid: boolean; error?: string } {
  // Check file size (20 MB max)
  const maxSize = 20 * 1024 * 1024; // 20 MB in bytes
  if (buffer.length > maxSize) {
    return { valid: false, error: 'File size must be less than 20 MB' };
  }

  if (buffer.length === 0) {
    return { valid: false, error: 'File is empty' };
  }

  // Basic PDF validation - check for PDF magic bytes
  const pdfMagicBytes = buffer.slice(0, 4).toString();
  if (pdfMagicBytes !== '%PDF') {
    return { valid: false, error: 'File must be a valid PDF' };
  }

  // Check filename extension if provided
  if (filename && !filename.toLowerCase().endsWith('.pdf')) {
    return { valid: false, error: 'File must have .pdf extension' };
  }

  return { valid: true };
}


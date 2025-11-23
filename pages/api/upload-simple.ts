import type { NextApiRequest, NextApiResponse } from 'next';
import { extractTextFromPDF, validatePDFBuffer } from '@/lib/pdf-extractor';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, filename } = req.body;

    if (!file || !filename) {
      return res.status(400).json({ error: 'File and filename are required' });
    }

    // Decode base64 file
    const fileBuffer = Buffer.from(file, 'base64');
    
    // Validate PDF buffer
    const validation = validatePDFBuffer(fileBuffer, filename);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Extract text from PDF
    const result = await extractTextFromPDF(fileBuffer);

    if (!result.text || result.text.trim().length === 0) {
      return res.status(400).json({ error: 'PDF appears to be empty or contains no extractable text' });
    }

    return res.status(200).json({
      success: true,
      text: result.text,
      numPages: result.numPages,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process PDF file',
    });
  }
}


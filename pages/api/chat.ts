import type { NextApiRequest, NextApiResponse } from 'next';
import { callOpenRouter } from '@/lib/openrouter';
import { PROMPTS } from '@/lib/ai-prompts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, question } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Document text is required' });
    }

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Truncate text if too long
    const maxLength = 50000;
    const truncatedText = text.length > maxLength 
      ? text.substring(0, maxLength) + '... [text truncated]'
      : text;

    // Generate answer using chat prompt
    const answer = await callOpenRouter(PROMPTS.chat(truncatedText, question));

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate answer',
    });
  }
}


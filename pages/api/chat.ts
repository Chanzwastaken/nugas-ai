import type { NextRequest } from 'next/server';
import { streamOpenRouter } from '@/lib/openrouter';
import { PROMPTS } from '@/lib/ai-prompts';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { text, question } = await req.json();

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Document text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Question is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Truncate text if too long
    const maxLength = 50000;
    const truncatedText = text.length > maxLength
      ? text.substring(0, maxLength) + '... [text truncated]'
      : text;

    // Generate answer using chat prompt with streaming
    const stream = await streamOpenRouter(PROMPTS.chat(truncatedText, question));

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Failed to generate answer',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


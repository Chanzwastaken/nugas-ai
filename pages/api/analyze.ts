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
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Truncate text if too long (to avoid token limits)
    const maxLength = 50000; // characters
    const truncatedText = text.length > maxLength 
      ? text.substring(0, maxLength) + '... [text truncated]'
      : text;

    // Generate all analyses in parallel for better performance
    const [summary, keywords, concepts, quiz] = await Promise.all([
      callOpenRouter(PROMPTS.summary(truncatedText)),
      callOpenRouter(PROMPTS.keywords(truncatedText)),
      callOpenRouter(PROMPTS.concepts(truncatedText)),
      callOpenRouter(PROMPTS.quiz(truncatedText)),
    ]);

    // Parse quiz JSON
    let quizData;
    try {
      // Clean the quiz response in case there's extra text
      const quizJson = quiz.trim();
      const jsonMatch = quizJson.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        quizData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in quiz response');
      }
    } catch (error) {
      console.error('Failed to parse quiz JSON:', error);
      // Return a fallback quiz structure
      quizData = {
        questions: [{
          question: 'Failed to generate quiz. Please try again.',
          options: { A: 'N/A', B: 'N/A', C: 'N/A', D: 'N/A' },
          correct: 'A',
          explanation: 'Quiz generation encountered an error.',
        }],
      };
    }

    return res.status(200).json({
      success: true,
      summary,
      keywords,
      concepts,
      quiz: quizData,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to analyze document',
    });
  }
}


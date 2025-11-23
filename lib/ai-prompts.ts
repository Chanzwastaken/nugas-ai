/**
 * AI Prompt Templates for Nugas.AI
 * These prompts are optimized for the Gemini 2.0 Flash model via OpenRouter
 */

export const PROMPTS = {
  summary: (text: string) => `You are an expert academic assistant. Analyze the following document and provide a comprehensive summary.

Document Text:
${text}

Please provide:
1. A concise overview (2-3 sentences)
2. Main topics covered
3. Key takeaways

Format your response as a clear, well-structured summary suitable for students studying this material.`,

  keywords: (text: string) => `Extract the most important keywords and key terms from the following academic document. 

Document Text:
${text}

Provide a list of 10-15 keywords that are essential for understanding this document. Format as a comma-separated list, prioritizing:
- Technical terms
- Concepts and theories
- Important names, dates, or places
- Domain-specific vocabulary

Return only the keywords, separated by commas.`,

  concepts: (text: string) => `You are a helpful tutor. Analyze the following document and identify 3-5 difficult or complex concepts that students might struggle with.

Document Text:
${text}

For each concept, provide:
1. The concept name
2. A clear, student-friendly explanation (2-3 sentences)
3. Why it's important in the context of this document

Format your response as a numbered list with clear headings.`,

  quiz: (text: string) => `Create a multiple-choice quiz based on the following document. Generate 5 questions that test understanding of key concepts.

Document Text:
${text}

For each question, provide:
1. A clear question
2. 4 answer options (A, B, C, D)
3. The correct answer (specify which letter)
4. A brief explanation of why that answer is correct

Format your response as JSON with this structure:
{
  "questions": [
    {
      "question": "Question text here",
      "options": {
        "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
      },
      "correct": "A",
      "explanation": "Why this answer is correct"
    }
  ]
}

Return ONLY valid JSON, no additional text.`,

  chat: (text: string, question: string) => `You are an AI study assistant helping a student understand their uploaded document. Answer the student's question based ONLY on the information provided in the document.

Document Text:
${text}

Student's Question: ${question}

Instructions:
- Answer based solely on the document content
- If the answer isn't in the document, say "I cannot find this information in the uploaded document."
- Be clear, concise, and helpful
- Use examples from the document when relevant
- Format your response in a student-friendly way

Provide your answer:`,
};


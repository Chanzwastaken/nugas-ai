# AI Prompt Templates Documentation

This document explains all the AI prompts used in Nugas.AI and how to customize them.

## Overview

All prompts are located in `lib/ai-prompts.ts` and are designed to work with the Google Gemini 2.0 Flash model via OpenRouter. Each prompt is optimized for specific tasks.

## Prompt Templates

### 1. Summary Prompt

**Purpose**: Generate a comprehensive summary of the document

**Template**:
```
You are an expert academic assistant. Analyze the following document and provide a comprehensive summary.

Document Text:
{text}

Please provide:
1. A concise overview (2-3 sentences)
2. Main topics covered
3. Key takeaways

Format your response as a clear, well-structured summary suitable for students studying this material.
```

**Customization Tips**:
- Adjust the number of sentences for overview
- Add specific sections (e.g., methodology, conclusions)
- Change tone (more formal/casual)

### 2. Keywords Prompt

**Purpose**: Extract essential keywords and terms

**Template**:
```
Extract the most important keywords and key terms from the following academic document. 

Document Text:
{text}

Provide a list of 10-15 keywords that are essential for understanding this document. Format as a comma-separated list, prioritizing:
- Technical terms
- Concepts and theories
- Important names, dates, or places
- Domain-specific vocabulary

Return only the keywords, separated by commas.
```

**Customization Tips**:
- Change the number of keywords (10-15)
- Add categories (e.g., "Separate by: concepts, names, dates")
- Request definitions alongside keywords

### 3. Concepts Prompt

**Purpose**: Identify and explain difficult concepts

**Template**:
```
You are a helpful tutor. Analyze the following document and identify 3-5 difficult or complex concepts that students might struggle with.

Document Text:
{text}

For each concept, provide:
1. The concept name
2. A clear, student-friendly explanation (2-3 sentences)
3. Why it's important in the context of this document

Format your response as a numbered list with clear headings.
```

**Customization Tips**:
- Adjust number of concepts (3-5)
- Change explanation length
- Add examples or analogies
- Request visual descriptions

### 4. Quiz Prompt

**Purpose**: Generate multiple-choice quiz questions

**Template**:
```
Create a multiple-choice quiz based on the following document. Generate 5 questions that test understanding of key concepts.

Document Text:
{text}

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

Return ONLY valid JSON, no additional text.
```

**Customization Tips**:
- Change number of questions (5)
- Adjust difficulty level
- Request specific question types (application, analysis, etc.)
- Modify JSON structure if needed

### 5. Chat Prompt

**Purpose**: Answer questions about the document

**Template**:
```
You are an AI study assistant helping a student understand their uploaded document. Answer the student's question based ONLY on the information provided in the document.

Document Text:
{text}

Student's Question: {question}

Instructions:
- Answer based solely on the document content
- If the answer isn't in the document, say "I cannot find this information in the uploaded document."
- Be clear, concise, and helpful
- Use examples from the document when relevant
- Format your response in a student-friendly way

Provide your answer:
```

**Customization Tips**:
- Adjust tone (more formal/casual)
- Change how to handle missing information
- Add context about the student's level
- Request citations or page numbers

## Best Practices

### 1. Clarity
- Use clear, direct instructions
- Specify exact format requirements
- Include examples when helpful

### 2. Context
- Always include the document text
- Provide role context ("You are an expert...")
- Set expectations for output format

### 3. Constraints
- Specify length limits
- Define format requirements (JSON, list, etc.)
- Set boundaries (e.g., "only from document")

### 4. Error Handling
- Instruct model on what to do when information is missing
- Request fallback behaviors
- Specify error message formats

## Testing Prompts

When modifying prompts:

1. **Test with various document types**
   - Academic papers
   - Textbook chapters
   - Lecture notes
   - Research articles

2. **Check output consistency**
   - Run same document multiple times
   - Verify format compliance
   - Check for hallucinations

3. **Validate responses**
   - Ensure JSON is valid (for quiz)
   - Check keyword count matches request
   - Verify concepts are actually in document

## Advanced Customization

### Adding New Prompts

1. Add prompt function to `lib/ai-prompts.ts`:
```typescript
export const PROMPTS = {
  // ... existing prompts
  newFeature: (text: string, param: string) => `Your prompt here...`
};
```

2. Create API endpoint in `pages/api/new-feature.ts`

3. Add UI component to display results

4. Update types in `types/index.ts` if needed

### Prompt Engineering Tips

- **Few-shot learning**: Include examples in prompts
- **Chain of thought**: Ask model to explain reasoning
- **Temperature**: Adjust in `lib/openrouter.ts` (currently 0.7)
- **Max tokens**: Increase in `lib/openrouter.ts` if responses are cut off

## Model-Specific Considerations

### Gemini 2.0 Flash

- Good at following instructions
- Handles JSON well
- Fast response times
- May need explicit format instructions

### Switching Models

If switching to a different model:

1. Update model name in `lib/openrouter.ts`
2. Adjust prompts if needed (some models have different strengths)
3. Test all features thoroughly
4. Update temperature/max_tokens if necessary

---

For questions or improvements, refer to the main [README.md](./README.md) or [ARCHITECTURE.md](./ARCHITECTURE.md).


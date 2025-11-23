export interface DocumentAnalysis {
  summary: string;
  keywords: string;
  concepts: string;
  quiz: QuizData;
}

export interface QuizData {
  questions: Array<{
    question: string;
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    correct: string;
    explanation: string;
  }>;
}

export interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}


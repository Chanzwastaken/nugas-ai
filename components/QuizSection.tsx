import React, { useState } from 'react';
import { QuizData } from '@/types';

interface QuizSectionProps {
  quiz: QuizData;
}

export default function QuizSection({ quiz }: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    if (showResults) return;
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-dark">Quiz</h2>
        {showResults && (
          <span className="text-lg font-semibold text-primary">
            Score: {calculateScore()} / {quiz.questions.length}
          </span>
        )}
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => {
          const isCorrect = selectedAnswers[index] === question.correct;
          const showExplanation = showResults && selectedAnswers[index];

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                showResults
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-200'
              }`}
            >
              <p className="font-semibold text-gray-dark mb-4">
                {index + 1}. {question.question}
              </p>
              <div className="space-y-2">
                {Object.entries(question.options).map(([key, value]) => {
                  const isSelected = selectedAnswers[index] === key;
                  const isCorrectOption = key === question.correct;
                  const showCorrect = showResults && isCorrectOption;

                  return (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelect(index, key)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        showResults && showCorrect
                          ? 'border-green-500 bg-green-100 font-semibold'
                          : showResults && isSelected && !isCorrect
                          ? 'border-red-500 bg-red-100'
                          : isSelected
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                      } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className="font-medium">{key}.</span> {value}
                      {showResults && showCorrect && (
                        <span className="ml-2 text-green-600">✓ Correct</span>
                      )}
                      {showResults && isSelected && !isCorrect && (
                        <span className="ml-2 text-red-600">✗ Your answer</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {showExplanation && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Explanation:</span> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        {!showResults ? (
          <button onClick={handleSubmit} className="btn-primary">
            Submit Quiz
          </button>
        ) : (
          <button onClick={resetQuiz} className="btn-secondary">
            Retake Quiz
          </button>
        )}
      </div>
    </div>
  );
}


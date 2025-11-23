import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import QuizSection from '@/components/QuizSection';
import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import { FiHelpCircle } from 'react-icons/fi';

function QuizPageContent() {
  const { analysis, isLoading } = useDashboard();

  if (isLoading || !analysis) {
    return (
      <DashboardLayout currentPage="quiz">
        <div className="card text-center py-12">
          <p className="text-gray-500">Loading quiz...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPage="quiz">
      <div className="max-w-4xl mx-auto">
        <div className="card mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiHelpCircle className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-dark">Quiz</h1>
          </div>
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
            <p className="text-sm text-gray-700">
              <span className="text-2xl mr-2">🎯</span>
              <strong className="text-gray-dark">Test Your Knowledge</strong>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Answer the questions below to check your understanding of the document.
            </p>
          </div>
        </div>
        <QuizSection quiz={analysis.quiz} />
      </div>
    </DashboardLayout>
  );
}

export default function QuizPage() {
  return (
    <DashboardProvider>
      <QuizPageContent />
    </DashboardProvider>
  );
}


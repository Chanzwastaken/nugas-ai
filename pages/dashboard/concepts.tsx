import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import { FiBook } from 'react-icons/fi';

function ConceptsPageContent() {
  const { analysis, isLoading } = useDashboard();

  if (isLoading || !analysis) {
    return (
      <DashboardLayout currentPage="concepts">
        <div className="card text-center py-12">
          <p className="text-gray-500">Loading concepts...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPage="concepts">
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiBook className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-dark">Key Concepts Explained</h1>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
              <p className="text-sm text-gray-700">
                <span className="text-2xl mr-2">📚</span>
                <strong className="text-gray-dark">Understanding Made Easy</strong>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                These are the complex concepts from your document explained in simple terms.
              </p>
            </div>
            <MarkdownRenderer content={analysis.concepts} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function ConceptsPage() {
  return (
    <DashboardProvider>
      <ConceptsPageContent />
    </DashboardProvider>
  );
}


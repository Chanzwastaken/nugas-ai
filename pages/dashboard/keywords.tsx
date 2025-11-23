import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import { FiTag } from 'react-icons/fi';

function KeywordsPageContent() {
  const { analysis, isLoading } = useDashboard();

  if (isLoading || !analysis) {
    return (
      <DashboardLayout currentPage="keywords">
        <div className="card text-center py-12">
          <p className="text-gray-500">Loading keywords...</p>
        </div>
      </DashboardLayout>
    );
  }

  const keywords = analysis.keywords.split(',').map((k) => k.trim()).filter((k) => k);

  return (
    <DashboardLayout currentPage="keywords">
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiTag className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-dark">Keywords</h1>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 mb-4">
              Here are the key terms and concepts extracted from your document:
            </p>
            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-primary rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-default border border-blue-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-dark">💡 Tip:</strong> These keywords represent the
                most important concepts in your document. Use them to quickly review key topics!
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function KeywordsPage() {
  return (
    <DashboardProvider>
      <KeywordsPageContent />
    </DashboardProvider>
  );
}


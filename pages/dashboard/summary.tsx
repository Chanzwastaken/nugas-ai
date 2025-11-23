import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import { FiFileText } from 'react-icons/fi';

function SummaryPageContent() {
  const { analysis, isLoading } = useDashboard();

  if (isLoading || !analysis) {
    return (
      <DashboardLayout currentPage="summary">
        <div className="card text-center py-12">
          <p className="text-gray-500">Loading summary...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPage="summary">
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiFileText className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-dark">Summary</h1>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <MarkdownRenderer content={analysis.summary} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function SummaryPage() {
  return (
    <DashboardProvider>
      <SummaryPageContent />
    </DashboardProvider>
  );
}


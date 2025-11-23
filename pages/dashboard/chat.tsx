import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChatSection from '@/components/ChatSection';
import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import { FiMessageCircle } from 'react-icons/fi';

function ChatPageContent() {
  const { documentText } = useDashboard();

  return (
    <DashboardLayout currentPage="chat">
      <div className="max-w-4xl mx-auto">
        <div className="card mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiMessageCircle className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-dark">Chat with Document</h1>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-700">
              <span className="text-2xl mr-2">💬</span>
              <strong className="text-gray-dark">Ask Anything</strong>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Have questions about your document? Ask away and get instant AI-powered answers!
            </p>
          </div>
        </div>
        <ChatSection documentText={documentText} />
      </div>
    </DashboardLayout>
  );
}

export default function ChatPage() {
  return (
    <DashboardProvider>
      <ChatPageContent />
    </DashboardProvider>
  );
}


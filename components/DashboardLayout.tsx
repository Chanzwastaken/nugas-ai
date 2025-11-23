import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiFileText,
  FiTag,
  FiBook,
  FiHelpCircle,
  FiMessageCircle,
  FiUpload,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useDashboard } from '@/contexts/DashboardContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function DashboardLayout({ children, currentPage = 'summary' }: DashboardLayoutProps) {
  const router = useRouter();
  const { documentName, isLoading } = useDashboard();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNewDocument = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('documentText');
      sessionStorage.removeItem('documentName');
      sessionStorage.removeItem('documentAnalysis');
    }
    router.push('/');
  };

  const navItems = [
    { id: 'summary', label: 'Summary', icon: FiFileText, path: '/dashboard/summary' },
    { id: 'keywords', label: 'Keywords', icon: FiTag, path: '/dashboard/keywords' },
    { id: 'concepts', label: 'Concepts', icon: FiBook, path: '/dashboard/concepts' },
    { id: 'quiz', label: 'Quiz', icon: FiHelpCircle, path: '/dashboard/quiz' },
    { id: 'chat', label: 'Chat', icon: FiMessageCircle, path: '/dashboard/chat' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your document...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src="/nugas-ai.png"
                  alt="Nugas.AI Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="text-lg font-bold text-gray-dark">Nugas.AI</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 truncate" title={documentName}>
                {documentName}
              </p>
              <p className="text-xs text-gray-500 mt-1">Study Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                        ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gray-100 hover:transform hover:scale-105'
                        }`}
                    >
                      <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleNewDocument}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FiUpload size={20} />
              <span className="font-medium">Upload New</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <FiMenu size={24} />
              </button>
              <div className="flex-1 lg:flex-none">
                <h1 className="text-xl font-bold text-gray-dark">{documentName}</h1>
              </div>
              <button
                onClick={handleNewDocument}
                className="btn-secondary text-sm py-2 px-4"
              >
                <FiUpload className="inline mr-2" size={16} />
                Upload New
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}


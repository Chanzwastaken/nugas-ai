import React, { useState, useEffect } from 'react';
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
  FiCheck,
} from 'react-icons/fi';
import { useDashboard } from '@/contexts/DashboardContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const ANALYSIS_STEPS = [
  { label: 'Reading document content', icon: '📄', duration: 2000 },
  { label: 'Generating summary', icon: '✍️', duration: 7000 },
  { label: 'Extracting keywords', icon: '🔑', duration: 7000 },
  { label: 'Identifying key concepts', icon: '💡', duration: 7000 },
  { label: 'Creating quiz questions', icon: '🧩', duration: 7000 },
];

function AnalyzingLoader() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    // Smoothly animate progress bar up to 92% over ~25 seconds
    const totalDuration = 25000;
    const targetProgress = 92;
    const interval = 80;
    const increment = (targetProgress / totalDuration) * interval;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= targetProgress ? targetProgress : next;
      });
    }, interval);

    // Advance through steps based on cumulative durations
    let elapsed = 0;
    const stepTimers: ReturnType<typeof setTimeout>[] = [];

    ANALYSIS_STEPS.forEach((step, index) => {
      elapsed += step.duration;
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, index]);
        setCurrentStep((prev) => Math.min(prev + 1, ANALYSIS_STEPS.length - 1));
      }, elapsed);
      stepTimers.push(timer);
    });

    return () => {
      clearInterval(progressTimer);
      stepTimers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
              style={{ borderTopColor: 'var(--color-primary, #3b82f6)' }}
            ></div>
            <span className="text-3xl">🧠</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Analyzing your document</h2>
          <p className="text-sm text-gray-500 mt-1">This may take up to 30 seconds</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-500">Progress</span>
            <span className="text-xs font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
                boxShadow: '0 0 8px rgba(99, 102, 241, 0.5)',
              }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {ANALYSIS_STEPS.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = index === currentStep && !isCompleted;
            return (
              <div
                key={index}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-500 ${
                  isCompleted
                    ? 'bg-green-50 opacity-100'
                    : isActive
                    ? 'bg-blue-50 opacity-100'
                    : 'opacity-40'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-blue-500 text-white animate-pulse'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? <FiCheck size={14} /> : <span>{step.icon}</span>}
                </div>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isCompleted
                      ? 'text-green-700'
                      : isActive
                      ? 'text-blue-700'
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
                {isActive && (
                  <span className="ml-auto flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
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
    return <AnalyzingLoader />;
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

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { DocumentAnalysis } from '@/types';

interface DashboardContextType {
  documentText: string;
  documentName: string;
  analysis: DocumentAnalysis | null;
  isLoading: boolean;
  error: string | null;
  refreshAnalysis: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [documentText, setDocumentText] = useState<string>('');
  const [documentName, setDocumentName] = useState<string>('');
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const analyzeDocument = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data);
        sessionStorage.setItem('documentAnalysis', JSON.stringify(data));
      } else {
        throw new Error(data.error || 'Failed to analyze document');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAnalysis = async () => {
    if (documentText) {
      await analyzeDocument(documentText);
    }
  };

  useEffect(() => {
    const text = sessionStorage.getItem('documentText');
    const name = sessionStorage.getItem('documentName');
    const cachedAnalysis = sessionStorage.getItem('documentAnalysis');

    if (!text) {
      router.push('/');
      return;
    }

    setDocumentText(text);
    setDocumentName(name || 'Document');

    // Load cached analysis if available
    if (cachedAnalysis) {
      try {
        const parsed = JSON.parse(cachedAnalysis);
        setAnalysis(parsed);
        setIsLoading(false);
      } catch (e) {
        // If parsing fails, analyze again
        analyzeDocument(text);
      }
    } else {
      analyzeDocument(text);
    }
  }, [router]);

  return (
    <DashboardContext.Provider
      value={{
        documentText,
        documentName,
        analysis,
        isLoading,
        error,
        refreshAnalysis,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}


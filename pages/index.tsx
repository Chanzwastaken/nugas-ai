import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];

        try {
          // Upload and extract text
          const uploadResponse = await fetch('/api/upload-simple', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              file: base64,
              filename: file.name,
            }),
          });

          const uploadData = await uploadResponse.json();

          if (!uploadData.success) {
            throw new Error(uploadData.error || 'Failed to process PDF');
          }

          // Store extracted text in sessionStorage for the dashboard
          sessionStorage.setItem('documentText', uploadData.text);
          sessionStorage.setItem('documentName', file.name);

          // Navigate to dashboard
          router.push('/dashboard/summary');
        } catch (err: any) {
          setError(err.message || 'Failed to process document');
          setIsProcessing(false);
        }
      };

      reader.onerror = () => {
        setError('Failed to read file');
        setIsProcessing(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-dark mb-4">
            Welcome to Nugas.AI
          </h1>
          <p className="text-lg text-gray-600">
            Upload your PDF document and let AI help you study smarter
          </p>
        </div>

        <div className="card">
          <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleProcess}
              disabled={!file || isProcessing}
              className="btn-primary"
            >
              {isProcessing ? 'Processing...' : 'Process Document'}
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl mb-2">📄</div>
            <h3 className="font-semibold text-gray-dark mb-2">Upload PDF</h3>
            <p className="text-sm text-gray-600">
              Upload your academic documents in PDF format
            </p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold text-gray-dark mb-2">AI Analysis</h3>
            <p className="text-sm text-gray-600">
              Get summaries, keywords, and concept explanations
            </p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-dark mb-2">Study Tools</h3>
            <p className="text-sm text-gray-600">
              Take quizzes and chat with your document
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}


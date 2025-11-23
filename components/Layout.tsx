import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-light">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/nugas-ai.png"
                alt="Nugas.AI Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-dark">Nugas.AI</span>
            </Link>
            <p className="text-sm text-gray-600 italic">Biar AI yang bantuin tugas kamu.</p>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}


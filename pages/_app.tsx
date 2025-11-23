import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DashboardProvider } from '@/contexts/DashboardContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nugas.AI - AI-Powered Study Assistant</title>
        <meta name="description" content="Biar AI yang bantuin tugas kamu. Upload PDF and get AI-powered summaries, keywords, concepts, quizzes, and chat." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/nugas-ai.png" />
      </Head>
      <DashboardProvider>
        <Component {...pageProps} />
      </DashboardProvider>
    </>
  );
}

'use client'
import React from 'react';
import Terminal from '../components/Terminal';
import TerminalProvider from '../hooks/TerminalProvider';
import Documentation from '../components/Documentation';

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center p-1 bg-gray-900 main-container">
      <TerminalProvider>
        <Documentation />
        <Terminal />
      </TerminalProvider>
    </main>
  );
} 
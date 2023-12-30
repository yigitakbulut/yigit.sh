'use client'
// Home.js
import React from 'react';
import Terminal from '../components/Terminal';
import TerminalProvider from '../hooks/TerminalProvider';

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center p-1 bg-gray-900">
      <TerminalProvider>
        <Terminal />
      </TerminalProvider>
    </main>
  );
} 
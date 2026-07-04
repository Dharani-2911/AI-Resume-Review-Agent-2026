import React from 'react';
import { Sparkles, FileText } from 'lucide-react';

export default function Navbar({ onReset }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div 
          className="flex items-center gap-2.5 cursor-pointer group transition-all"
          onClick={onReset}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <FileText className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="font-outfit text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-brand-400 bg-clip-text text-transparent">
              CV<span className="text-brand-500">Spark</span>
            </span>
            <span className="ml-1.5 hidden sm:inline-block rounded-md bg-brand-500/10 px-2 py-0.5 font-outfit text-2xs font-medium text-brand-400 border border-brand-500/20">
              AI Review
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <a 
            href="#features" 
            className="hidden md:inline-block text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            How it Works
          </a>
          <button
            onClick={onReset}
            className="relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-brand-500/10 hover:shadow-brand-500/25 hover:from-brand-400 hover:to-indigo-500 transition-all duration-200"
          >
            <Sparkles className="h-4 w-4" />
            <span>New Analysis</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm">
            © {new Date().getFullYear()} CVSpark. Built for developers & recruiters.
          </p>
          <p className="flex items-center gap-1.5 text-xs sm:text-sm">
            <span>Powered by</span>
            <span className="flex items-center gap-1 font-semibold text-brand-400">
              Gemini AI <Sparkles className="h-3 w-3" />
            </span>
            <span>& Client-Side PDF.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

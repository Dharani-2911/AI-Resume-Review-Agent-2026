import React from 'react';
import { Sparkles, ArrowRight, Cpu, ShieldCheck, Gauge, Zap } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="relative isolate overflow-hidden min-h-[calc(100vh-8rem)] flex flex-col justify-center">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 glow-spot"></div>
      <div className="absolute bottom-12 left-1/4 glow-spot"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
        {/* Banner Pill */}
        <div className="mx-auto mb-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-brand-500/35 bg-brand-500/5 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-brand-400 animate-pulse" />
          <span className="font-outfit text-xs font-semibold tracking-wider text-brand-300 uppercase">
            Powered by Gemini AI 1.5 Flash
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Optimize Your Resume For <br />
          <span className="bg-gradient-to-r from-brand-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">
            Maximum Hiring Impact
          </span>
        </h1>

        {/* Hero Paragraph */}
        <p className="mx-auto max-w-2xl text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed mb-10">
          Upload your resume PDF to instantly extract content in-browser, scan for ATS compatibility keywords, and receive developer-targeted career optimizations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStart}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-indigo-600 px-8 py-4 font-outfit text-base font-semibold text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] cursor-pointer active:scale-95 transition-all duration-200"
          >
            <span>Analyze Resume Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center rounded-2xl bg-slate-900/60 border border-slate-800 hover:bg-slate-800/80 px-8 py-4 text-base font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            Learn More
          </a>
        </div>

        {/* Features Highlights Section */}
        <div id="features" className="border-t border-slate-900 pt-16">
          <h2 className="font-outfit text-2xl sm:text-3xl font-bold mb-12 text-slate-200">
            Professional AI Critic Capabilities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 text-left">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-outfit font-semibold text-base text-slate-100 mb-2">In-Browser Extraction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Uses local PDF.js engines to parse resumes client-side, ensuring complete document security and privacy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 text-left">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-outfit font-semibold text-base text-slate-100 mb-2">ATS Readiness Score</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates keyword distributions, formatting metrics, and language readability to optimize search system matching.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 text-left">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-4">
                <Gauge className="h-5 w-5" />
              </div>
              <h3 className="font-outfit font-semibold text-base text-slate-100 mb-2">Job Suitability</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select custom developer roles and analyze matching criteria, missing skills, and dynamic improvements.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 text-left">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-outfit font-semibold text-base text-slate-100 mb-2">Actionable Revisions</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Returns impact-ranked vertical action steps alongside rewrite suggestions for career summaries and project cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

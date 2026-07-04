import React, { useState } from 'react';
import { 
  Briefcase, Sparkles, AlertCircle, CheckCircle2, 
  Terminal, Search, ListPlus, Lightbulb 
} from 'lucide-react';
import { matchResumeWithJobDescription } from '../services/gemini';

export default function JobMatch({ resumeText }) {
  const [jobDescription, setJobDescription] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      setErrorMessage('Please paste a job description first.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const data = await matchResumeWithJobDescription(resumeText, jobDescription);
      setResult(data);
      setStatus('success');
    } catch (error) {
      console.error('Job Match Error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred during match analysis.');
    }
  };

  const handleReset = () => {
    setJobDescription('');
    setResult(null);
    setStatus('idle');
    setErrorMessage('');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // emerald-500
    if (score >= 60) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  const getOverallMatchBadge = (match) => {
    const normalMatch = (match || '').toLowerCase();
    if (normalMatch === 'strong') {
      return (
        <span className="inline-flex items-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
          Strong Fit
        </span>
      );
    }
    if (normalMatch === 'moderate') {
      return (
        <span className="inline-flex items-center rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300">
          Moderate Fit
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-bold text-red-300">
        Weak Fit
      </span>
    );
  };

  return (
    <div className="mt-12 pt-10 border-t border-slate-900 text-left">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400">
          <Briefcase className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-outfit text-2xl font-bold text-white">ATS Job Description Match</h2>
          <p className="text-sm text-slate-400">Compare your uploaded resume against a target job description to verify role compatibility.</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-8 bg-slate-950/40 relative overflow-hidden">
        {/* Decorative subtle background gradient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        {/* Input & Form Area */}
        {status !== 'loading' && status !== 'success' && (
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="jd-textarea" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Target Job Description
              </label>
              <textarea
                id="jd-textarea"
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here (responsibilities, skills, qualifications)..."
                className="w-full rounded-xl bg-slate-950/80 px-4 py-3.5 text-slate-200 border border-slate-800 focus:border-brand-500 hover:border-slate-700 outline-none focus:ring-1 focus:ring-brand-500 transition-all font-sans text-sm leading-relaxed placeholder-slate-600 resize-y"
              />
            </div>

            {status === 'error' && errorMessage && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 text-sm animate-fadeIn">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!jobDescription.trim()}
                className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-450 hover:to-indigo-500 text-white px-6 py-3 text-sm font-semibold shadow-md transition-all shadow-brand-500/10 select-none cursor-pointer ${
                  !jobDescription.trim() ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <Sparkles className="h-4.5 w-4.5" />
                <span>Analyze Match</span>
              </button>
            </div>
          </form>
        )}

        {/* Loading / Processing State */}
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fadeIn">
            <div className="relative flex items-center justify-center">
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-brand-500"></div>
              <Briefcase className="absolute h-6 w-6 text-brand-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="font-outfit text-lg font-bold text-white">Comparing Resume & Job Description...</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Checking skills overlap, parsing key vocabulary mismatch, and evaluating role suitability...
              </p>
            </div>
          </div>
        )}

        {/* Success Output State */}
        {status === 'success' && result && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Score Summary Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-950/60 border border-slate-900 rounded-2xl p-6">
              
              {/* Circular Score Column */}
              <div className="flex flex-col items-center text-center space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">ATS Compatibility</span>
                <div className="relative flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      strokeWidth="8"
                      stroke="#1e293b"
                      fill="transparent"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 56}
                      strokeDashoffset={2 * Math.PI * 56 * (1 - result.matchScore / 100)}
                      strokeLinecap="round"
                      stroke={getScoreColor(result.matchScore)}
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-extrabold text-white font-outfit">{result.matchScore}%</span>
                    <span className="text-3xs text-slate-500 font-medium">Match</span>
                  </div>
                </div>
              </div>

              {/* Status Rating Column */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 md:border-l md:border-slate-900 md:pl-6 py-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Overall Assessment</span>
                <div>
                  {getOverallMatchBadge(result.overallMatch)}
                </div>
                <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
                  Your resume demonstrates a <span className="font-semibold text-slate-300">{result.overallMatch.toLowerCase()}</span> correlation with the core skills requested in this posting.
                </p>
              </div>

              {/* Actions Column */}
              <div className="flex items-center justify-center md:justify-end">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white px-5 py-2.5 text-xs font-semibold cursor-pointer select-none transition-all shadow-sm"
                >
                  <Terminal className="h-4 w-4" />
                  <span>Analyze Another Job</span>
                </button>
              </div>
            </div>

            {/* Results Grid - Skills, Keywords, suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Matching Skills */}
              <div className="glass-panel rounded-2xl p-5 border-t border-slate-800/40">
                <div className="flex items-center gap-2 mb-4 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <h4 className="font-semibold text-slate-200 font-outfit text-sm">Matching Skills ({result.matchingSkills?.length || 0})</h4>
                </div>
                {result.matchingSkills && result.matchingSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchingSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-lg bg-emerald-500/10 px-2 py-0.5 text-2xs font-semibold text-emerald-300 border border-emerald-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No matching skills identified.</p>
                )}
              </div>

              {/* Missing Keywords */}
              <div className="glass-panel rounded-2xl p-5 border-t border-slate-800/40">
                <div className="flex items-center gap-2 mb-4 text-amber-400">
                  <Search className="h-5 w-5 shrink-0" />
                  <h4 className="font-semibold text-slate-200 font-outfit text-sm">Missing Keywords ({result.missingKeywords?.length || 0})</h4>
                </div>
                {result.missingKeywords && result.missingKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((kw, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-lg bg-amber-500/10 px-2 py-0.5 text-2xs font-semibold text-amber-300 border border-amber-500/20"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No missing critical keywords. Well optimized!</p>
                )}
              </div>

              {/* Recommended Skills */}
              <div className="glass-panel rounded-2xl p-5 border-t border-slate-800/40">
                <div className="flex items-center gap-2 mb-4 text-indigo-400">
                  <ListPlus className="h-5 w-5 shrink-0" />
                  <h4 className="font-semibold text-slate-200 font-outfit text-sm">Skills to Add ({result.recommendedSkills?.length || 0})</h4>
                </div>
                {result.recommendedSkills && result.recommendedSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {result.recommendedSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-lg bg-indigo-500/10 px-2 py-0.5 text-2xs font-semibold text-indigo-300 border border-indigo-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No extra skills suggested.</p>
                )}
              </div>

            </div>

            {/* Resume Improvement Suggestions */}
            <div className="glass-panel rounded-2xl p-6 border-t border-slate-800/40">
              <div className="flex items-center gap-2 mb-4 text-brand-400">
                <Lightbulb className="h-5 w-5 shrink-0" />
                <h4 className="font-semibold text-slate-200 font-outfit text-base">Suggestions for Resume Improvement</h4>
              </div>
              {result.suggestions && result.suggestions.length > 0 ? (
                <ul className="space-y-3">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-900/60 text-xs sm:text-sm text-slate-300">
                      <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">No suggestions needed. Your resume is extremely well aligned!</p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

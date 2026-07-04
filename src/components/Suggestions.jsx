import React, { useState } from 'react';
import { 
  Sparkles, ListPlus, Key, ClipboardCopy, CheckCircle, 
  RefreshCcw, BookOpen, Layers 
} from 'lucide-react';

export default function Suggestions({ suggestions }) {
  if (!suggestions) return null;

  const {
    missingSkills = [],
    missingKeywords = [],
    improvements = [],
    actionVerbs = [],
    projectDescriptions = [],
    careerObjective = '',
    skillsSection = '',
  } = suggestions;

  const [copyStates, setCopyStates] = useState({});

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center gap-2.5">
        <Sparkles className="h-6 w-6 text-brand-400" />
        <h3 className="text-xl font-semibold text-slate-200 font-outfit">AI-Powered Suggestions</h3>
      </div>

      {/* Grid of Badges: Keywords & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Skills */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <ListPlus className="h-5 w-5 text-indigo-400" />
            <h4 className="font-semibold text-slate-200 font-outfit">Recommended Missing Skills</h4>
          </div>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No major skills missing found. Great job!</p>
          )}
        </div>

        {/* Missing Keywords */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="h-5 w-5 text-cyan-400" />
            <h4 className="font-semibold text-slate-200 font-outfit">Target Keywords for ATS</h4>
          </div>
          {missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300 border border-cyan-500/20"
                >
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Keyword balance looks highly optimized.</p>
          )}
        </div>
      </div>

      {/* Action Verbs & Project Description rewrites */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Action Verbs Suggestions */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <RefreshCcw className="h-5 w-5 text-emerald-400" />
              <h4 className="font-semibold text-slate-200 font-outfit">Stronger Action Verbs</h4>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Replace weak or passive phrases in your professional history with these impact-driven options:
            </p>
            <div className="space-y-2.5">
              {actionVerbs.map((verb, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-900 text-sm">
                  <span className="text-slate-500 line-through">{verb.original}</span>
                  <span className="text-slate-400 font-bold">→</span>
                  <span className="text-emerald-400 font-semibold">{verb.suggested}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Descriptions Rewrites */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-5 w-5 text-amber-400" />
            <h4 className="font-semibold text-slate-200 font-outfit">Better Project Accomplishments</h4>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Shift from showing basic responsibilities to detailing metric-backed achievements:
          </p>
          <div className="space-y-4">
            {projectDescriptions.map((desc, idx) => (
              <div key={idx} className="space-y-2">
                <div className="p-3 rounded-xl bg-red-950/10 border border-red-500/10 text-xs text-slate-400">
                  <span className="font-bold text-red-400 mr-1.5">[BEFORE]</span>
                  "{desc.original}"
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/10 border border-emerald-500/10 text-xs text-slate-200 relative group">
                  <span className="font-bold text-emerald-400 mr-1.5">[SUGGESTED]</span>
                  "{desc.suggested}"
                  <button
                    onClick={() => handleCopy(desc.suggested, `proj-${idx}`)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800/80 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copyStates[`proj-${idx}`] ? <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copy-pasteable Blocks: Objective & Skills Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Career Objective */}
        <div className="glass-panel rounded-2xl p-6 relative group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <h4 className="font-semibold text-slate-200 font-outfit">Better Career Objective / Summary</h4>
            </div>
            <button
              onClick={() => handleCopy(careerObjective, 'objective')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-850 cursor-pointer transition-all flex items-center gap-1.5 text-xs"
            >
              {copyStates['objective'] ? (
                <>
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <blockquote className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-sm text-slate-300 leading-relaxed italic">
            "{careerObjective}"
          </blockquote>
        </div>

        {/* Recommended Skills Formatting */}
        <div className="glass-panel rounded-2xl p-6 relative group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <h4 className="font-semibold text-slate-200 font-outfit">Suggested Skills Section Layout</h4>
            </div>
            <button
              onClick={() => handleCopy(skillsSection, 'skills')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-850 cursor-pointer transition-all flex items-center gap-1.5 text-xs"
            >
              {copyStates['skills'] ? (
                <>
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap text-left">
            {skillsSection}
          </pre>
        </div>
      </div>

      {/* Resume Improvement Checklist */}
      <div className="glass-panel rounded-2xl p-6">
        <h4 className="font-semibold text-slate-200 font-outfit mb-4">Structural Improvements Checklist</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {improvements.map((improvement, index) => (
            <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-900 text-sm text-slate-300 text-left">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span>{improvement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

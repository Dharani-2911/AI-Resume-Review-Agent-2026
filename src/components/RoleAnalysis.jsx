import React, { useState } from 'react';
import { Target, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';

export default function RoleAnalysis({ roleAnalysis }) {
  if (!roleAnalysis) return null;

  const roles = Object.keys(roleAnalysis);
  const [selectedRole, setSelectedRole] = useState(roles[0] || 'Software Engineer');

  const activeAnalysis = roleAnalysis[selectedRole];

  const getScoreColorClass = (score) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/25 bg-emerald-500/5';
    if (score >= 60) return 'text-amber-400 border-amber-500/25 bg-amber-500/5';
    return 'text-red-400 border-red-500/25 bg-red-500/5';
  };

  const getProgressBarColor = (score) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="glass-panel rounded-2xl p-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5 mb-5">
        <div className="flex items-center gap-2.5">
          <Target className="h-6 w-6 text-brand-400" />
          <div>
            <h3 className="text-xl font-semibold text-slate-200 font-outfit">Job Role Suitability</h3>
            <p className="text-xs text-slate-500 mt-0.5">Evaluate compatibility against target industry specifications</p>
          </div>
        </div>

        {/* Dropdown container */}
        <div className="relative shrink-0">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full sm:w-56 appearance-none rounded-xl bg-slate-950 px-4 py-2.5 pr-10 text-sm font-semibold text-slate-200 border border-slate-800 hover:border-slate-700 outline-none cursor-pointer focus:ring-1 focus:ring-brand-500 transition-colors"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {activeAnalysis ? (
        <div className="space-y-6">
          {/* Match Score Meter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className={`md:col-span-1 rounded-2xl border p-5 flex flex-col items-center justify-center text-center ${getScoreColorClass(activeAnalysis.matchScore)}`}>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Match Rate</span>
              <span className="text-5xl font-extrabold mt-1 font-outfit">{activeAnalysis.matchScore}%</span>
              <span className="text-2xs text-slate-500 mt-2 font-medium">Job spec alignment</span>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="text-slate-400">ATS Match Bar</span>
                  <span className="text-slate-200">{activeAnalysis.matchScore}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3.5 overflow-hidden border border-slate-900 p-0.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${getProgressBarColor(activeAnalysis.matchScore)}`} 
                    style={{ width: `${activeAnalysis.matchScore}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Matches are computed based on required technology stacks, keywords, and responsibilities for standard <b>{selectedRole}</b> roles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Missing Skills */}
            <div className="p-5 rounded-2xl bg-slate-950/65 border border-slate-900/60">
              <h4 className="font-semibold text-slate-200 text-sm font-outfit mb-3.5 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-brand-400" />
                Missing Core Skills
              </h4>
              {activeAnalysis.missingSkills && activeAnalysis.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {activeAnalysis.missingSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center rounded-lg bg-red-500/10 px-2.5 py-1 text-2xs font-semibold text-red-300 border border-red-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">Perfect match! No missing skills identified for this role.</p>
              )}
            </div>

            {/* Recommendations */}
            <div className="p-5 rounded-2xl bg-slate-950/65 border border-slate-900/60">
              <h4 className="font-semibold text-slate-200 text-sm font-outfit mb-3.5 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Suitability Recommendations
              </h4>
              <ul className="space-y-2">
                {activeAnalysis.recommendations && activeAnalysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs text-slate-450 leading-relaxed flex items-start gap-2">
                    <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-slate-500">
          No analysis matching this role is currently available.
        </div>
      )}
    </div>
  );
}

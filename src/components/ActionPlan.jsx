import React from 'react';
import { ListChecks, ShieldAlert, Zap, TrendingUp, Info } from 'lucide-react';

export default function ActionPlan({ actionPlan }) {
  if (!actionPlan || actionPlan.length === 0) return null;

  const getImpactBadgeClass = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 text-left">
      <div className="flex items-center gap-2.5 border-b border-slate-900 pb-5 mb-6">
        <ListChecks className="h-6 w-6 text-brand-400" />
        <div>
          <h3 className="text-xl font-semibold text-slate-200 font-outfit">Priority Action Plan</h3>
          <p className="text-xs text-slate-500 mt-0.5">Top steps recommended to optimize resume for human and ATS reviewers</p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-slate-800 ml-4.5 pl-6 sm:pl-8 space-y-8 pb-4">
        {actionPlan.map((item, index) => {
          return (
            <div key={index} className="relative group">
              {/* Timeline dot */}
              <span className="absolute -left-11 sm:-left-12.5 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 border border-slate-800 text-slate-300 font-outfit font-bold text-sm shadow-md group-hover:border-brand-500 group-hover:text-brand-400 transition-colors">
                {item.priority || index + 1}
              </span>

              {/* Timeline content card */}
              <div className="glass-panel group-hover:bg-slate-900/40 rounded-xl p-4.5 border border-slate-900 hover:border-slate-800/80 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2">
                  <h4 className="font-semibold text-slate-100 text-base font-outfit">
                    {item.action}
                  </h4>
                  <span className={`self-start inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-3xs uppercase tracking-wide font-extrabold ${getImpactBadgeClass(item.impact)}`}>
                    <Zap className="h-2.5 w-2.5 shrink-0" />
                    {item.impact} Impact
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

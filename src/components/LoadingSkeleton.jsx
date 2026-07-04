import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse text-left w-full">
      {/* Upper score card skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score 1 */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col items-center">
          <div className="h-4 w-32 bg-slate-800 rounded-md mb-6"></div>
          <div className="w-32 h-32 rounded-full border-8 border-slate-800 flex items-center justify-center mb-4">
            <div className="h-8 w-12 bg-slate-800 rounded-md"></div>
          </div>
          <div className="h-3 w-48 bg-slate-850 rounded-md mb-2"></div>
          <div className="h-3 w-36 bg-slate-850 rounded-md"></div>
        </div>

        {/* Score 2 */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col items-center">
          <div className="h-4 w-36 bg-slate-800 rounded-md mb-6"></div>
          <div className="w-32 h-32 rounded-full border-8 border-slate-800 flex items-center justify-center mb-4">
            <div className="h-8 w-12 bg-slate-800 rounded-md"></div>
          </div>
          <div className="h-3 w-48 bg-slate-850 rounded-md mb-2"></div>
          <div className="h-3 w-36 bg-slate-850 rounded-md"></div>
        </div>
      </div>

      {/* Strengths & Weaknesses skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex gap-2 items-center">
            <div className="h-8 w-8 bg-slate-800 rounded-lg"></div>
            <div className="h-5 w-28 bg-slate-800 rounded-md"></div>
          </div>
          <div className="space-y-2.5">
            <div className="h-4.5 w-full bg-slate-850 rounded-md"></div>
            <div className="h-4.5 w-[90%] bg-slate-850 rounded-md"></div>
            <div className="h-4.5 w-[95%] bg-slate-850 rounded-md"></div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex gap-2 items-center">
            <div className="h-8 w-8 bg-slate-800 rounded-lg"></div>
            <div className="h-5 w-32 bg-slate-800 rounded-md"></div>
          </div>
          <div className="space-y-2.5">
            <div className="h-4.5 w-full bg-slate-850 rounded-md"></div>
            <div className="h-4.5 w-[90%] bg-slate-850 rounded-md"></div>
            <div className="h-4.5 w-[95%] bg-slate-850 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Core assessments grid skeleton */}
      <div>
        <div className="h-6 w-44 bg-slate-800 rounded-md mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-panel rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-10 w-10 bg-slate-800 rounded-xl"></div>
                <div className="h-5 w-16 bg-slate-800 rounded-md"></div>
              </div>
              <div className="h-4.5 w-40 bg-slate-800 rounded-md"></div>
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-slate-850 rounded-md"></div>
                <div className="h-3.5 w-full bg-slate-850 rounded-md"></div>
                <div className="h-3.5 w-[75%] bg-slate-850 rounded-md"></div>
              </div>
              <div className="pt-2">
                <div className="h-1.5 w-full bg-slate-850 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

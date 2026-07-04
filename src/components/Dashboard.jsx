import React from 'react';
import { 
  Award, CheckCircle2, AlertTriangle, Code2, GraduationCap, 
  Briefcase, FileText, Check, Search, PenTool, TrendingUp 
} from 'lucide-react';

export default function Dashboard({ analysis }) {
  if (!analysis) return null;

  const { overallScore = 0, atsScore = 0, strengths = [], weaknesses = [], assessments = {} } = analysis;

  const getScoreColorClass = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 60) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  // Setup cards config dynamically
  const assessmentCards = [
    {
      title: 'Technical Skills Assessment',
      score: assessments.technicalSkills?.score || 0,
      review: assessments.technicalSkills?.review || 'N/A',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Project Quality Assessment',
      score: assessments.projectQuality?.score || 0,
      review: assessments.projectQuality?.review || 'N/A',
      icon: Briefcase,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Education Assessment',
      score: assessments.education?.score || 0,
      review: assessments.education?.review || 'N/A',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Certifications Assessment',
      score: assessments.certifications?.score || 0,
      review: assessments.certifications?.review || 'N/A',
      icon: Award,
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Formatting Assessment',
      score: assessments.formatting?.score || 0,
      review: assessments.formatting?.review || 'N/A',
      icon: FileText,
      color: 'from-fuchsia-500 to-pink-500',
    },
    {
      title: 'Grammar and Language Assessment',
      score: assessments.grammar?.score || 0,
      review: assessments.grammar?.review || 'N/A',
      icon: PenTool,
      color: 'from-violet-500 to-indigo-500',
    },
    {
      title: 'Keyword Optimization Assessment',
      score: assessments.keywordOptimization?.score || 0,
      review: assessments.keywordOptimization?.review || 'N/A',
      icon: Search,
      color: 'from-sky-500 to-blue-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overall Score & ATS Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Score Circle */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 bg-brand-500/5 text-brand-400 rounded-bl-xl border-l border-b border-slate-800/40">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300 font-outfit mb-4">Overall Resume Score</h3>
          
          <div className="relative flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                strokeWidth="10"
                stroke="#1e293b"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="64"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 64}
                strokeDashoffset={2 * Math.PI * 64 * (1 - overallScore / 100)}
                strokeLinecap="round"
                stroke={overallScore >= 80 ? '#10b981' : overallScore >= 60 ? '#f59e0b' : '#ef4444'}
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold text-white font-outfit">{overallScore}</span>
              <span className="text-xs text-slate-400 font-medium">out of 100</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400 max-w-xs">
            A comprehensive evaluation of structure, language, tech stack match, and impact statements.
          </p>
        </div>

        {/* ATS Score Circle */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 bg-brand-500/5 text-brand-400 rounded-bl-xl border-l border-b border-slate-800/40">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300 font-outfit mb-4">ATS Compatibility Score</h3>
          
          <div className="relative flex items-center justify-center">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                strokeWidth="10"
                stroke="#1e293b"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="64"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 64}
                strokeDashoffset={2 * Math.PI * 64 * (1 - atsScore / 100)}
                strokeLinecap="round"
                stroke={atsScore >= 80 ? '#10b981' : atsScore >= 60 ? '#f59e0b' : '#ef4444'}
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold text-white font-outfit">{atsScore}</span>
              <span className="text-xs text-slate-400 font-medium">out of 100</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400 max-w-xs">
            How readable the resume is to automated filters and Applicant Tracking Systems.
          </p>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths Card */}
        <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 font-outfit">Top Strengths</h3>
          </div>
          <ul className="space-y-3">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-slate-300 text-left">
                <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses Card */}
        <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 font-outfit">Areas for Improvement</h3>
          </div>
          <ul className="space-y-3">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-slate-300 text-left">
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 font-bold text-xs shrink-0 mt-0.5">!</span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Assessment Grid */}
      <div>
        <h3 className="text-xl font-semibold text-slate-200 font-outfit mb-6 text-left">Detailed Core Assessments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessmentCards.map((card, index) => {
            const CardIcon = card.icon;
            return (
              <div key={index} className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between text-left h-full">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${card.color} text-white shadow-md shadow-slate-900/50`}>
                      <CardIcon className="h-5 w-5" />
                    </div>
                    <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-xs font-semibold ${getScoreColorClass(card.score)}`}>
                      Score: {card.score}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-slate-200 font-outfit mb-2">{card.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all duration-300">
                    {card.review}
                  </p>
                </div>
                
                {/* Horizontal progress bar */}
                <div className="mt-4 pt-3 border-t border-slate-900">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-500">Compatibility</span>
                    <span className="text-slate-300 font-semibold">{card.score}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-900">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(card.score)}`} 
                      style={{ width: `${card.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

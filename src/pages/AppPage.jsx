import React, { useState, useEffect } from 'react';
import { 
  FileText, Sparkles, Download, Printer, RefreshCw, 
  Settings, Key, AlertCircle, CheckCircle, LayoutDashboard, 
  Lightbulb, Compass, ListChecks 
} from 'lucide-react';

import ResumeUpload from '../components/ResumeUpload';
import Dashboard from '../components/Dashboard';
import Suggestions from '../components/Suggestions';
import RoleAnalysis from '../components/RoleAnalysis';
import ActionPlan from '../components/ActionPlan';
import LoadingSkeleton from '../components/LoadingSkeleton';
import JobMatch from '../components/JobMatch';

import { extractTextFromPdf } from '../services/pdf';
import { analyzeResumeWithGemini } from '../services/gemini';
import { downloadMarkdownReport } from '../utils/report';

export default function AppPage() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  
  const [status, setStatus] = useState('idle'); // idle, extracting, analyzing, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // overview, suggestions, roles, actions
  
  // Custom API key state (in case .env is not configured)
  const [customKey, setCustomKey] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);

  useEffect(() => {
    // Check if API key is in environment or storage
    const storedKey = localStorage.getItem('CVSPARK_CUSTOM_API_KEY');
    if (storedKey) {
      setCustomKey(storedKey);
    }
  }, []);

  const handleApiKeySave = (e) => {
    e.preventDefault();
    if (customKey.trim()) {
      localStorage.setItem('CVSPARK_CUSTOM_API_KEY', customKey.trim());
      // Set to process env for simple fallback in gemini service
      window.processEnvKey = customKey.trim();
    } else {
      localStorage.removeItem('CVSPARK_CUSTOM_API_KEY');
      window.processEnvKey = null;
    }
    setShowKeyModal(false);
  };

  const handleUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setStatus('extracting');
    setErrorMessage('');
    
    try {
      // 1. Extract text from PDF
      const text = await extractTextFromPdf(uploadedFile);
      setExtractedText(text);
      
      // 2. Analyze using Gemini
      setStatus('analyzing');
      
      // Temporarily inject the custom key into environment variable if configured
      const originalEnvKey = import.meta.env.VITE_GEMINI_API_KEY;
      const finalKey = window.processEnvKey || originalEnvKey;
      
      if (!finalKey) {
        throw new Error('Google Gemini API Key is missing. Click the settings icon in the top right to configure your API key.');
      }
      
      // We overwrite VITE_GEMINI_API_KEY dynamically for this execution if custom key is present
      if (window.processEnvKey) {
        import.meta.env.VITE_GEMINI_API_KEY = window.processEnvKey;
      }
      
      const result = await analyzeResumeWithGemini(text);
      
      // Restore original env key
      if (window.processEnvKey) {
        import.meta.env.VITE_GEMINI_API_KEY = originalEnvKey;
      }

      setAnalysis(result);
      setStatus('success');
    } catch (err) {
      console.error('App Processing Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred during processing.');
    }
  };

  const handleReset = () => {
    setFile(null);
    setExtractedText('');
    setAnalysis(null);
    setStatus('idle');
    setErrorMessage('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (analysis) {
      downloadMarkdownReport(analysis, file?.name || 'resume.pdf');
    }
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Background glow spots */}
      <div className="absolute top-10 left-10 glow-spot"></div>

      {/* Floating Settings Button (API Key setup) */}
      <div className="flex justify-end mb-6 no-print">
        <button
          onClick={() => setShowKeyModal(true)}
          className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 px-4.5 py-2 text-xs font-semibold cursor-pointer select-none transition-all shadow-md"
        >
          <Key className="h-4 w-4" />
          <span>API Key Configuration</span>
        </button>
      </div>

      {/* 1. Idle state (Upload Resume) */}
      {status === 'idle' && (
        <div className="max-w-3xl mx-auto text-center space-y-8 mt-6">
          <div className="space-y-4">
            <h2 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Get Started with Your Review
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Select or drop your resume PDF below. The analysis is done safely in your browser and sent directly to Google Gemini servers.
            </p>
          </div>
          
          <ResumeUpload onUpload={handleUpload} isLoading={false} error={null} />
        </div>
      )}

      {/* 2. Loading State (Extracting / Analyzing) */}
      {(status === 'extracting' || status === 'analyzing') && (
        <div className="max-w-4xl mx-auto space-y-8 mt-6">
          <div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center border-brand-500/20 shadow-xl shadow-brand-500/5">
            <div className="relative flex items-center justify-center mb-6">
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-brand-500"></div>
              <Sparkles className="absolute h-6 w-6 text-brand-400 animate-pulse" />
            </div>
            
            <h3 className="font-outfit text-xl font-bold text-white mb-2">
              {status === 'extracting' ? 'Extracting Resume Text...' : 'Generating AI Critic Insights...'}
            </h3>
            <p className="text-sm text-slate-400 max-w-sm">
              {status === 'extracting' 
                ? 'Parsing PDF.js layout vectors locally to read text...' 
                : 'Formulating scores, keywords, job alignments, and career action plans via Gemini AI...'}
            </p>
          </div>

          <LoadingSkeleton />
        </div>
      )}

      {/* 3. Error state */}
      {status === 'error' && (
        <div className="max-w-2xl mx-auto mt-6 text-center space-y-6">
          <div className="glass-panel border-red-500/20 bg-red-500/5 rounded-2xl p-8 flex flex-col items-center">
            <div className="p-4 rounded-full bg-red-500/10 text-red-400 mb-5">
              <AlertCircle className="h-10 w-10" />
            </div>
            <h3 className="font-outfit text-xl font-bold text-red-300">Processing Interrupted</h3>
            <p className="mt-3 text-sm leading-relaxed text-red-405 max-w-md">
              {errorMessage}
            </p>

            <button
              onClick={handleReset}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Success State (Report Dashboard) */}
      {status === 'success' && analysis && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Printable Report Header */}
          <div className="hidden print-only text-left border-b-2 border-slate-900 pb-5 mb-8">
            <h1 className="font-outfit text-3xl font-extrabold text-slate-900">Resume Critic Review Report</h1>
            <p className="text-slate-600 text-sm mt-1">Generated by CVSpark Resume Review Agent</p>
            <p className="text-slate-500 text-xs mt-0.5">Resume File: {file?.name}</p>
          </div>

          {/* Success Notification Action Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 no-print">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-emerald-300">Analysis Complete!</p>
                <p className="text-xs text-slate-400">Resume "{file?.name}" was successfully evaluated.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3.5 w-full md:w-auto">
              <button
                onClick={handlePrint}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-350 hover:text-white px-4 py-2.5 text-sm font-medium transition-all"
              >
                <Printer className="h-4 w-4" />
                <span>Print PDF</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-400 hover:to-indigo-500 text-white px-4.5 py-2.5 text-sm font-medium shadow-md transition-all shadow-brand-500/15"
              >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-450 hover:text-white hover:bg-slate-850"
                title="Reset Workspace"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Floating Navigation Navigation Index (No-Print) */}
            <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24 h-fit no-print">
              <div className="glass-panel rounded-2xl p-4 text-left">
                <span className="text-2xs font-extrabold text-slate-500 uppercase tracking-widest pl-2">Report Content</span>
                <nav className="mt-3.5 space-y-1">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      activeTab === 'overview' 
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                        : 'text-slate-400 hover:text-slate-200 border border-transparent hover:bg-slate-900/60'
                    }`}
                  >
                    <LayoutDashboard className="h-4.5 w-4.5" />
                    <span>Score Dashboard</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('suggestions')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      activeTab === 'suggestions' 
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                        : 'text-slate-400 hover:text-slate-200 border border-transparent hover:bg-slate-900/60'
                    }`}
                  >
                    <Lightbulb className="h-4.5 w-4.5" />
                    <span>AI Revisions</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('roles')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      activeTab === 'roles' 
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                        : 'text-slate-400 hover:text-slate-200 border border-transparent hover:bg-slate-900/60'
                    }`}
                  >
                    <Compass className="h-4.5 w-4.5" />
                    <span>Role Suitability</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('actions')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      activeTab === 'actions' 
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                        : 'text-slate-400 hover:text-slate-200 border border-transparent hover:bg-slate-900/60'
                    }`}
                  >
                    <ListChecks className="h-4.5 w-4.5" />
                    <span>Priority Actions</span>
                  </button>
                </nav>
              </div>

              {/* Side Stats Card */}
              <div className="glass-panel rounded-2xl p-4.5 text-left bg-gradient-to-br from-slate-950 via-slate-900/20 to-indigo-950/15">
                <h4 className="font-outfit font-semibold text-xs text-slate-400 uppercase tracking-widest mb-3">Overall Performance</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Resume Grade</span>
                    <span className={`font-bold ${analysis.overallScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {analysis.overallScore >= 80 ? 'A - Good' : analysis.overallScore >= 60 ? 'B - Needs Work' : 'C - Warning'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">ATS Readiness</span>
                    <span className="font-bold text-slate-350">{analysis.atsScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Action Plan Priority</span>
                    <span className="font-bold text-slate-350">{analysis.actionPlan?.length || 5} Actions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Tab Outputs (Shown on Screen) */}
              <div className="no-print">
                {activeTab === 'overview' && <Dashboard analysis={analysis} />}
                {activeTab === 'suggestions' && <Suggestions suggestions={analysis.suggestions} />}
                {activeTab === 'roles' && <RoleAnalysis roleAnalysis={analysis.roleAnalysis} />}
                {activeTab === 'actions' && <ActionPlan actionPlan={analysis.actionPlan} />}
              </div>

              {/* Print Stack (Only visible during printing page, displaying all sections consecutively) */}
              <div className="hidden print-only space-y-12">
                <Dashboard analysis={analysis} />
                <hr className="border-slate-800" />
                <Suggestions suggestions={analysis.suggestions} />
                <hr className="border-slate-800" />
                <RoleAnalysis roleAnalysis={analysis.roleAnalysis} />
                <hr className="border-slate-800" />
                <ActionPlan actionPlan={analysis.actionPlan} />
              </div>

            </div>
          </div>

          <div className="no-print">
            <JobMatch resumeText={extractedText} />
          </div>
        </div>
      )}

      {/* API Key Modal Dialog (Overlay) */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 text-left shadow-2xl relative border-brand-500/25">
            <h3 className="font-outfit text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Key className="h-5 w-5 text-brand-400" />
              API Key Setup
            </h3>
            
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Define your Gemini API Key directly in this interface. The key is saved locally in your browser's <code>localStorage</code>, and is never uploaded anywhere except to the official Gemini endpoint.
            </p>

            <form onSubmit={handleApiKeySave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="Enter AIzaSy..."
                  className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-200 border border-slate-800 hover:border-slate-700 outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 px-4 py-2 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-brand-500 text-white px-5.5 py-2 text-xs font-semibold cursor-pointer shadow-md shadow-brand-500/10 hover:bg-brand-450 hover:shadow-brand-500/20 transition-all"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

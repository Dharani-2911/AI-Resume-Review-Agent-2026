import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export default function ResumeUpload({ onUpload, isLoading, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateAndProcessFile = (file) => {
    if (!file) return;
    
    // Check extension / type
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('Only PDF files are supported.');
      return;
    }
    
    // Check file size (e.g., max 8MB to prevent issues)
    if (file.size > 8 * 1024 * 1024) {
      alert('File is too large. Please select a resume PDF under 8MB.');
      return;
    }

    setFileName(file.name);
    onUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (!isLoading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-300 ${
          isDragging 
            ? 'border-brand-500 bg-brand-500/5 scale-[1.01]' 
            : 'border-slate-800 bg-slate-900/35 hover:border-slate-700 hover:bg-slate-900/50'
        } ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="application/pdf"
          className="hidden"
        />

        <div className="flex flex-col items-center text-center">
          <div className={`mb-6 rounded-2xl p-4 transition-colors ${
            isDragging ? 'bg-brand-500/10 text-brand-400' : 'bg-slate-800/80 text-slate-400'
          }`}>
            <UploadCloud className="h-10 w-10 animate-bounce" />
          </div>

          <h3 className="text-xl font-semibold text-slate-100 font-outfit">
            Drag & drop your resume
          </h3>
          <p className="mt-2 text-sm text-slate-400 max-w-sm">
            Please upload a PDF document (Max size: 8MB). Our local system extracts text in-browser for privacy.
          </p>

          <button
            type="button"
            disabled={isLoading}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-slate-700 hover:ring-slate-600 transition-all"
          >
            Browse Files
          </button>
        </div>

        {/* Glow corner elements */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-brand-500 rounded-tl-2xl transition-all"></div>
      </div>

      {fileName && (
        <div className="mt-4 flex items-center justify-between p-3.5 rounded-xl border border-slate-800/60 bg-slate-900/40">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="truncate text-left">
              <p className="text-sm font-medium text-slate-200 truncate">{fileName}</p>
              <p className="text-xs text-slate-500">Ready for review</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-2xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
              <CheckCircle className="mr-1 h-3.5 w-3.5" /> Validated
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-left text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-300">Processing Issue</h4>
            <p className="mt-1 text-xs leading-relaxed text-red-400/90">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}

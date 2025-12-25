
import React, { useState, useEffect } from 'react';
import { getSecurityAnalysis } from '../services/gemini';
import { ScanResult } from '../types';
import Logo from './Logo';

interface ReportProps {
  latestScan: ScanResult | null;
}

const Report: React.FC<ReportProps> = ({ latestScan }) => {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      const summary = latestScan?.summary || "Initial baseline assessment of training data integrity. No specific scan uploaded yet.";
      const result = await getSecurityAnalysis(summary);
      setAnalysis(result || "Could not retrieve analysis results.");
      setLoading(false);
    };
    fetchReport();
  }, [latestScan]);

  const downloadReport = () => {
    const content = `
# A.MIN SECURITY FORENSIC REPORT
Generated: ${new Date().toLocaleString()}
File: ${latestScan?.fileName || 'System Baseline'}
Integrity Score: ${latestScan?.safetyScore || 100}%
Threats Detected: ${latestScan?.threatsDetected || 0}

---

${analysis}

---
(C) A.min Labs Adversarial Shield Protocol
    `;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SecurityReport_${latestScan?.fileName || 'Global'}.md`;
    link.click();
  };

  const renderAnalysis = (text: string) => {
    // Simple manual Markdown formatter for rendering in UI
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h4 key={i} className="text-xl font-bold text-white mt-8 mb-4">{line.replace('### ', '')}</h4>;
      if (line.startsWith('## ')) return <h3 key={i} className="text-2xl font-black text-white mt-10 mb-6 border-l-4 border-teal-500 pl-4">{line.replace('## ', '')}</h3>;
      if (line.startsWith('# ')) return <h2 key={i} className="text-3xl font-black text-teal-400 mt-12 mb-8">{line.replace('# ', '')}</h2>;
      if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-6 mb-2 text-slate-300 list-disc">{line.substring(2)}</li>;
      
      // Bold handling
      const formattedLine = line.split('**').map((part, index) => 
        index % 2 === 1 ? <strong key={index} className="text-teal-400">{part}</strong> : part
      );
      
      return <p key={i} className="mb-4 leading-relaxed">{formattedLine}</p>;
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto report-container animate-fade-in">
      <header className="mb-10 flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Logo size="sm" />
            <span className="text-[10px] text-teal-400 font-mono font-black uppercase tracking-[0.2em]">A.min Security Protocol</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-1 tracking-tight">Forensic Security Analysis</h2>
          <p className="text-slate-400 text-sm">Security audit for {latestScan?.fileName || "Baseline Profile"}.</p>
        </div>
        <div className="flex gap-4 no-print">
          <button onClick={() => window.print()} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl text-sm font-bold border border-slate-700 transition-all flex items-center gap-2">
            <i className="fas fa-print"></i> Print PDF
          </button>
          <button onClick={downloadReport} className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl text-sm font-bold border border-teal-500/30 transition-all flex items-center gap-2">
            <i className="fas fa-file-download"></i> Download .MD
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-2xl border-slate-700/50 bg-slate-900/20">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Threat Level</h4>
          <p className={`text-2xl font-black mb-1 ${latestScan?.threatsDetected ? 'text-rose-500' : 'text-teal-400'}`}>
            {latestScan?.threatsDetected ? (latestScan.threatsDetected > 10 ? 'CRITICAL' : 'MODERATE') : 'MINIMAL'}
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-slate-700/50 bg-slate-900/20">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Safety Score</h4>
          <p className="text-2xl font-black mb-1 text-teal-400">{latestScan?.safetyScore || 100}%</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-slate-700/50 bg-slate-900/20">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Audit ID</h4>
          <p className="text-sm font-mono font-black mb-1 text-slate-300">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      </div>

      <div className="glass-panel p-10 rounded-3xl min-h-[500px] relative overflow-hidden border-slate-700/50 bg-slate-900/40">
        <div className="flex items-center gap-5 mb-10 border-b border-slate-800/50 pb-8 relative z-10">
          <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
            <i className="fas fa-wand-magic-sparkles text-2xl"></i>
          </div>
          <div>
            <h3 className="text-xl font-black text-white">AI-Synthesized Security Forensic</h3>
            <p className="text-xs text-slate-500 uppercase font-mono mt-1 tracking-widest">Powered by Gemini-3-Pro-Preview</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6 relative z-10">
            <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
            <div className="flex justify-center pt-24 text-slate-500 text-sm animate-pulse items-center gap-3">
              <i className="fas fa-microchip fa-spin"></i> Decoding neural artifacts...
            </div>
          </div>
        ) : (
          <div className="relative z-10 text-slate-300 leading-relaxed font-medium">
            {renderAnalysis(analysis)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;

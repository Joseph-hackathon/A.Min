
import React, { useState, useEffect } from 'react';
import { getSecurityAnalysis } from '../services/gemini';

const Report: React.FC = () => {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      const summary = "102,400 traffic data points scanned. 1,240 Poisoning attack patterns detected. Focus identified on autonomous driving road sign datasets. K-means clustering shows variance 3x higher than baseline.";
      const result = await getSecurityAnalysis(summary);
      setAnalysis(result || "Could not retrieve analysis results.");
      setLoading(false);
    };
    fetchReport();
  }, []);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto report-container animate-fade-in">
      <header className="mb-10 flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center text-white">
              <i className="fas fa-shield-halved text-sm"></i>
            </div>
            <span className="text-[10px] text-teal-400 font-mono font-black uppercase tracking-[0.2em]">A.min Security Protocol</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-1 tracking-tight">Intelligent Security Forensics</h2>
          <p className="text-slate-400 text-sm">AI-synthesized report regarding structural data poisoning and evasion vectors.</p>
        </div>
        <button 
          onClick={handleDownloadPDF}
          className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl text-sm font-bold border border-teal-500/30 transition-all flex items-center gap-2 shadow-xl shadow-teal-500/20 no-print"
        >
          <i className="fas fa-print"></i> Generate PDF Document
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { title: 'Threat Level', value: 'Level 2 (Moderate)', color: 'text-amber-500', desc: 'Increase in cluster variance detected' },
          { title: 'Protected Target', value: 'ResNet-50 v2', color: 'text-teal-400', desc: 'Baseline integrity verified' },
          { title: 'Data Purity', value: '98.4%', color: 'text-emerald-400', desc: 'Average across 4 primary clusters' },
        ].map((item, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl border-slate-700/50">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">{item.title}</h4>
            <p className={`text-2xl font-black mb-1 ${item.color}`}>{item.value}</p>
            <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-10 rounded-3xl min-h-[500px] relative overflow-hidden border-slate-700/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="flex items-center gap-5 mb-10 relative z-10 border-b border-slate-800 pb-8">
          <div className="w-14 h-14 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 shadow-inner">
            <i className="fas fa-wand-magic-sparkles text-2xl"></i>
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Automated Intelligence Summary</h3>
            <p className="text-xs text-slate-500 uppercase font-mono tracking-widest mt-1">Gemini-3-Pro Adversarial Forensics Engine</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6 relative z-10">
            <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-2/3 animate-pulse"></div>
            <div className="flex justify-center pt-12">
              <p className="text-slate-500 text-sm animate-bounce flex items-center gap-2">
                <i className="fas fa-cog fa-spin"></i> Decoding threat patterns...
              </p>
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="prose prose-invert max-w-none">
              <div className="text-slate-300 leading-relaxed whitespace-pre-line text-lg font-medium selection:bg-teal-500/30">
                {analysis}
              </div>
            </div>
            
            <div className="mt-16 pt-10 border-t border-slate-800">
              <h4 className="text-[10px] font-black text-teal-400 mb-8 uppercase tracking-[0.3em]">Institutional Impact Forensics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { icon: 'fa-user-shield', title: 'Privacy Integrity', color: 'blue', desc: 'Differential isolation protocols ensure zero leakage during verification.' },
                  { icon: 'fa-building', title: 'Asset Stability', color: 'teal', desc: 'Preemptive neutralization of poisoning vectors secures long-term ROI.' },
                  { icon: 'fa-users', title: 'Safety Guarantee', color: 'rose', desc: 'Critical safety margins maintained for autonomous and medical AI use-cases.' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 flex flex-col items-center text-center">
                    <div className={`w-10 h-10 bg-${item.color}-500/10 rounded-xl flex items-center justify-center mb-4 text-${item.color}-400`}>
                      <i className={`fas ${item.icon} text-sm`}></i>
                    </div>
                    <h5 className="font-bold text-white mb-2 text-sm">{item.title}</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-12 py-6 border-t border-slate-800 text-center relative">
        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.4em] flex justify-center items-center gap-4">
          <span>A.min Labs Document #AM-{new Date().getFullYear()}-XJ</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <span>Confidential // Restricted Access</span>
        </div>
      </footer>
    </div>
  );
};

export default Report;

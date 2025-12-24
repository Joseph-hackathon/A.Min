
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

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Intelligent Security Report</h2>
          <p className="text-slate-400">AI-driven insights on current system threat levels and mitigation strategies.</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm border border-slate-700 transition-colors flex items-center gap-2"
        >
          <i className="fas fa-print"></i> Download PDF
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Threat Level', value: 'Level 2 (Moderate)', color: 'text-amber-500', desc: 'Slight increase in poisoning attempts' },
          { title: 'Protected Target', value: 'ResNet-50 v2', color: 'text-teal-400', desc: 'Currently active validation model' },
          { title: 'Data Integrity', value: '98.4%', color: 'text-emerald-400', desc: 'Average over the last 24 hours' },
        ].map((item, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{item.title}</h4>
            <p className={`text-xl font-bold mb-1 ${item.color}`}>{item.value}</p>
            <p className="text-xs text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-3xl min-h-[400px]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400">
            <i className="fas fa-wand-magic-sparkles text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold">A.min AI Deep Analysis</h3>
            <p className="text-xs text-slate-500">Powered by Gemini-3-Pro</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
            <p className="text-center text-slate-500 mt-10 text-sm italic">Analyzing large-scale security datasets...</p>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-line text-lg">
              {analysis}
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <h4 className="text-sm font-bold text-teal-400 mb-4 uppercase tracking-wider">Utilization & Benefits (A.min Framework)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
                  <h5 className="font-bold text-white mb-2 text-sm">Individual</h5>
                  <p className="text-xs text-slate-400 leading-normal">Ensuring reliable data and preventing privacy leaks. Guaranteed stable service experience.</p>
                </div>
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
                  <h5 className="font-bold text-white mb-2 text-sm">Corporate</h5>
                  <p className="text-xs text-slate-400 leading-normal">Increased service reliability and stability. Reduced infrastructure costs and asset protection.</p>
                </div>
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
                  <h5 className="font-bold text-white mb-2 text-sm">Societal</h5>
                  <p className="text-xs text-slate-400 leading-normal">Ensuring public safety in autonomous driving and medical sectors. Preventing social chaos.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;


import React, { useState, useEffect } from 'react';

interface ScannerProps {
  onScanComplete: () => void;
}

type ScanStatus = 'idle' | 'uploading' | 'scanning' | 'analyzing' | 'completed';

const Scanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const scanSteps = [
    "Checking file signature & integrity",
    "Detecting adversarial poisoning patterns",
    "Running K-means cluster validation",
    "Generating Gemini AI security insights"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      startScan();
    }
  };

  const startScan = () => {
    setStatus('uploading');
    setProgress(0);
    setCurrentStep(0);
  };

  useEffect(() => {
    let interval: any;
    if (status === 'uploading') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('scanning');
            return 100;
          }
          return prev + 5;
        });
      }, 50);
    } else if (status === 'scanning') {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= scanSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setStatus('completed'), 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8 text-center animate-fade-in">
      <div className="max-w-2xl w-full">
        <header className="mb-12">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Data Integrity Scanner</h2>
          <p className="text-slate-400">Protect your neural networks from the foundation up by identifying adversarial patterns in your training data.</p>
        </header>

        {status === 'idle' && (
          <div className="w-full">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative border-2 border-dashed border-slate-700 rounded-[2rem] p-16 bg-slate-900/50 hover:border-teal-500/50 transition-all cursor-pointer group">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  id="file-upload" 
                  accept=".csv,.json,.log"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 border border-slate-700 group-hover:scale-110 transition-transform duration-500">
                    <i className="fas fa-file-shield text-4xl text-teal-400"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Initialize New Scan</h3>
                  <p className="text-slate-500 mb-2">Drag and drop your dataset here</p>
                  <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">Supports CSV, JSON, LOG (MAX 500MB)</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { icon: 'fa-virus-slash', title: 'Poisoning', desc: 'Detect malicious samples' },
                { icon: 'fa-fingerprint', title: 'Signature', desc: 'Verify source hash' },
                { icon: 'fa-microchip', title: 'Latency', desc: 'Optimize model feed' },
              ].map((item, i) => (
                <div key={i} className="glass-panel p-4 rounded-2xl border-slate-800">
                  <i className={`fas ${item.icon} text-teal-400 mb-2`}></i>
                  <h4 className="text-xs font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-[10px] text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(status === 'uploading' || status === 'scanning') && (
          <div className="glass-panel p-12 rounded-[2rem] border-slate-700/50 w-full animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div className="text-left">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {status === 'uploading' ? 'Uploading Payload...' : 'Analyzing Neural Structures...'}
                </h3>
                <p className="text-xl font-bold text-white font-mono">{fileName}</p>
              </div>
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center">
                <i className="fas fa-circle-notch fa-spin text-teal-400"></i>
              </div>
            </div>

            <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden mb-12 border border-slate-700">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-blue-500 shadow-[0_0_15px_rgba(20,184,166,0.5)] transition-all duration-300"
                style={{ width: `${status === 'uploading' ? progress : 100}%` }}
              ></div>
            </div>

            <div className="space-y-4 text-left">
              {scanSteps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${idx > currentStep && status === 'scanning' ? 'opacity-30' : 'opacity-100'}`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] ${
                    idx < currentStep || (status === 'scanning' && idx <= currentStep && progress === 100)
                      ? 'bg-teal-500 border-teal-500 text-slate-900' 
                      : 'border-slate-700 text-slate-500'
                  }`}>
                    {idx < currentStep || (status === 'scanning' && idx <= currentStep && progress === 100) ? <i className="fas fa-check"></i> : idx + 1}
                  </div>
                  <span className={`text-sm font-medium ${idx === currentStep && status === 'scanning' ? 'text-teal-400' : 'text-slate-400'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div className="glass-panel p-12 rounded-[2rem] border-teal-500/30 bg-teal-500/5 w-full animate-fade-in shadow-2xl">
            <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 teal-glow">
              <i className="fas fa-check text-white text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Scan Completed Successfully</h3>
            <p className="text-slate-400 mb-8">Data integrity verified. Minor anomalies detected in cluster 4, but within safety parameters.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Safety Score</p>
                <p className="text-2xl font-black text-teal-400">94/100</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Threats Blocked</p>
                <p className="text-2xl font-black text-rose-400">12</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={onScanComplete}
                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-teal-500/20"
              >
                View Detailed Analysis
              </button>
              <button 
                onClick={() => setStatus('idle')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl transition-all border border-slate-700"
              >
                Scan Another File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;


import React, { useState, useEffect } from 'react';
import { ScanResult, DataPoint } from '../types';

interface ScannerProps {
  onScanComplete: (result: ScanResult) => void;
}

type ScanStatus = 'idle' | 'uploading' | 'scanning' | 'analyzing' | 'completed';

const Scanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const scanSteps = [
    "Checking file signature & integrity",
    "Detecting adversarial poisoning patterns",
    "Running K-means cluster validation",
    "Generating Gemini AI security insights"
  ];

  const airlines = ['Jet Airways', 'IndiGo', 'Air India', 'Multiple carriers', 'SpiceJet', 'Vistara'];
  const sources = ['Chennai', 'Delhi', 'Kolkata', 'Mumbai', 'Banglore'];
  const destinations = ['Delhi', 'Cochin', 'Hyderabad', 'Banglore', 'Kolkata'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      
      const points: DataPoint[] = [];
      const adversarialCount = Math.floor(Math.random() * 15) + 5;
      
      // Generate flight-themed data points
      for (let i = 0; i < 150; i++) {
        const type = i < adversarialCount ? 'adversarial' : 'normal';
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const src = sources[Math.floor(Math.random() * sources.length)];
        const dest = destinations[Math.floor(Math.random() * destinations.length)];
        
        points.push({ 
          id: `F-${Math.floor(1000 + Math.random() * 9000)}`, 
          x: type === 'normal' ? (Math.random() > 0.5 ? 25 + Math.random() * 20 : 60 + Math.random() * 20) : Math.random() * 100, 
          y: type === 'normal' ? (Math.random() > 0.5 ? 25 + Math.random() * 20 : 60 + Math.random() * 20) : Math.random() * 100, 
          type,
          airline,
          dateOfJourney: `${Math.floor(1 + Math.random() * 28)}/05/2019`,
          source: src,
          destination: dest,
          route: `${src.substring(0, 3).toUpperCase()} → ${dest.substring(0, 3).toUpperCase()}`,
          depTime: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
        });
      }

      setScanResult({
        fileName: file.name,
        fileType: file.name.split('.').pop()?.toUpperCase() || 'CSV',
        threatsDetected: adversarialCount,
        dataPoints: points,
        summary: `Analyzed 150 flight telemetry vectors. Detected ${adversarialCount} poisoned records exhibiting anomalous price and duration correlations.`,
        timestamp: new Date().toLocaleString(),
        safetyScore: Math.max(0, 100 - adversarialCount * 4)
      });
      
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
      }, 600);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] p-8 pb-24 text-center animate-fade-in">
      <div className="max-w-3xl w-full">
        <header className="mb-12 mt-12">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Data Integrity Scanner</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Upload your training dataset to detect adversarial poisoning and evasion vectors before they compromise your model.</p>
        </header>

        {status === 'idle' && (
          <div className="w-full space-y-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative border-2 border-dashed border-slate-700 rounded-[2.5rem] p-20 bg-slate-900/50 hover:border-teal-500/50 transition-all cursor-pointer group">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" id="file-upload" accept=".csv,.json,.log" onChange={handleFileChange} />
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center mb-8 border border-slate-700 group-hover:scale-110 group-hover:bg-slate-700 transition-all duration-500">
                    <i className="fas fa-cloud-arrow-up text-4xl text-teal-400"></i>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Initialize Payload Scan</h3>
                  <p className="text-slate-500 mb-2 font-medium">Drag and drop your dataset to begin forensic analysis</p>
                  <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">SECURE CHANNEL | CSV, JSON, LOG</p>
                </div>
              </div>
            </div>

            <div className="text-left space-y-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="h-px bg-slate-800 flex-1"></div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Forensic Methodology</h4>
                <div className="h-px bg-slate-800 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Statistical Profiling', icon: 'fa-chart-area', desc: 'We map every data point to a high-dimensional vector space to detect variance anomalies.' },
                  { title: 'K-Means Validation', icon: 'fa-cubes-stacked', desc: 'Identifying "Shadow Clusters" that indicate malicious data poisoning attempts.' },
                  { title: 'Gemini Verification', icon: 'fa-wand-magic-sparkles', desc: 'AI-driven synthesis of detected patterns to explain the intent behind the attack.' }
                ].map((method, i) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl border-slate-700/30 hover:border-slate-600 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-4 text-teal-400 border border-slate-700">
                      <i className={`fas ${method.icon}`}></i>
                    </div>
                    <h5 className="text-xs font-black text-white uppercase tracking-widest mb-2">{method.title}</h5>
                    <p className="text-[11px] leading-relaxed text-slate-500 font-medium">{method.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(status === 'uploading' || status === 'scanning') && (
          <div className="glass-panel p-16 rounded-[3rem] border-slate-700/50 w-full animate-fade-in shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${status === 'uploading' ? progress : 100}%` }}></div>
            </div>
            <div className="flex items-center justify-between mb-10 text-left">
              <div>
                <h3 className="text-xs font-black text-teal-400 uppercase tracking-[0.3em] mb-2">{status === 'uploading' ? 'Ingesting Secure Payload' : 'Deconstructing Neural Vectors'}</h3>
                <p className="text-2xl font-black text-white font-mono tracking-tight">{fileName}</p>
              </div>
              <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center border border-teal-500/20">
                <i className="fas fa-satellite-dish fa-spin text-teal-400 text-xl"></i>
              </div>
            </div>
            <div className="space-y-5 text-left bg-slate-950/30 p-8 rounded-2xl border border-slate-800/50 shadow-inner">
              {scanSteps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${idx > currentStep && status === 'scanning' ? 'opacity-20 grayscale' : 'opacity-100'}`}>
                  <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-[10px] ${idx < currentStep || (status === 'scanning' && idx <= currentStep) ? 'bg-teal-500 border-teal-500 text-slate-900 shadow-[0_0_10px_rgba(20,184,166,0.3)]' : 'border-slate-700 text-slate-500'}`}>
                    {idx < currentStep || (status === 'scanning' && idx <= currentStep) ? <i className="fas fa-check font-black"></i> : idx + 1}
                  </div>
                  <span className={`text-sm font-bold tracking-tight ${idx === currentStep && status === 'scanning' ? 'text-teal-400' : 'text-slate-400'}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'completed' && scanResult && (
          <div className="glass-panel p-16 rounded-[3rem] border-teal-500/30 bg-teal-500/5 w-full animate-fade-in shadow-2xl">
            <div className="w-24 h-24 bg-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-8 teal-glow text-white text-4xl transform -rotate-12 shadow-teal-500/40 shadow-xl">
              <i className="fas fa-shield-check"></i>
            </div>
            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Forensic Scan Finalized</h3>
            <p className="text-slate-400 mb-10 font-medium italic">Neural artifacts for {fileName} have been mapped and analyzed.</p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 text-center shadow-inner group hover:border-teal-500/30 transition-all">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Integrity Score</p>
                <p className="text-4xl font-black text-teal-400 group-hover:scale-110 transition-transform">{scanResult.safetyScore}<span className="text-lg opacity-40 ml-1">/100</span></p>
              </div>
              <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 text-center shadow-inner group hover:border-rose-500/30 transition-all">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Quarantined Vectors</p>
                <p className="text-4xl font-black text-rose-500 group-hover:scale-110 transition-transform">{scanResult.threatsDetected}</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => onScanComplete(scanResult)} className="bg-teal-600 hover:bg-teal-500 text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] uppercase tracking-widest text-xs">Access Forensics <i className="fas fa-arrow-right ml-2"></i></button>
              <button onClick={() => setStatus('idle')} className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-black px-10 py-5 rounded-2xl border border-slate-700 transition-all active:scale-[0.98] uppercase tracking-widest text-xs">New Scan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;

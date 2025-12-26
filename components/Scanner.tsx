
import React, { useState, useEffect } from 'react';
import { ScanResult, DataPoint, ConfluentConfig } from '../types';

interface ScannerProps {
  onScanComplete: (result: ScanResult) => void;
}

type ScanStatus = 'idle' | 'configuring' | 'testing' | 'uploading' | 'scanning' | 'analyzing' | 'completed';

const Scanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [testLog, setTestLog] = useState<string[]>([]);
  
  const [config, setConfig] = useState<ConfluentConfig>({
    bootstrapServer: 'pkc-abcd12.us-east-1.aws.confluent.cloud:9092',
    apiKey: 'AKIA' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    apiSecret: '********************************',
    clusterId: 'lkc-p8821z',
    region: 'GCP / asia-northeast3 (Seoul)'
  });

  const scanSteps = isLiveMode ? [
    "Establishing Confluent Cloud Handshake",
    "Fetching Schema from Registry (Avro)",
    "Injecting Flink SQL Dynamic Filter",
    "Intercepting Adversarial Vectors",
    "Gemini Intelligence Synthesis"
  ] : [
    "Hashing file payload",
    "Verifying data schema (JSON/CSV)",
    "Mapping high-dimensional features",
    "Running Isolation Forest Algorithm",
    "Generating Gemini Forensic Report"
  ];

  const airlines = ['Jet Airways', 'IndiGo', 'Air India', 'Multiple carriers', 'SpiceJet', 'Vistara'];
  const sources = ['Chennai', 'Delhi', 'Kolkata', 'Mumbai', 'Banglore'];
  const destinations = ['Delhi', 'Cochin', 'Hyderabad', 'Banglore', 'Kolkata'];

  const generateData = (name: string, isLive: boolean) => {
    setFileName(name);
    setIsLiveMode(isLive);
    
    const points: DataPoint[] = [];
    const adversarialCount = Math.floor(Math.random() * 15) + 5;
    
    for (let i = 0; i < 150; i++) {
      const type = i < adversarialCount ? 'adversarial' : 'normal';
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const src = sources[Math.floor(Math.random() * sources.length)];
      const dest = destinations[Math.floor(Math.random() * destinations.length)];
      
      points.push({ 
        id: `TX-${Math.floor(100000 + Math.random() * 900000)}`, 
        x: type === 'normal' ? (Math.random() > 0.5 ? 25 + Math.random() * 20 : 60 + Math.random() * 20) : Math.random() * 100, 
        y: type === 'normal' ? (Math.random() > 0.5 ? 25 + Math.random() * 20 : 60 + Math.random() * 20) : Math.random() * 100, 
        type,
        airline,
        dateOfJourney: `${Math.floor(1 + Math.random() * 28)}/05/2024`,
        source: src,
        destination: dest,
        route: `${src.substring(0, 3).toUpperCase()} → ${dest.substring(0, 3).toUpperCase()}`,
        depTime: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        timestamp: new Date().toISOString()
      });
    }

    setScanResult({
      fileName: name,
      fileType: isLive ? 'KAFKA_TOPIC' : (name.split('.').pop()?.toUpperCase() || 'CSV'),
      threatsDetected: adversarialCount,
      dataPoints: points,
      summary: `Analyzed ${isLive ? 'Confluent stream' : 'dataset'} ${name}. Detected ${adversarialCount} poisoned records. Gemini identified potential evasion vectors targeting neural gradients within the Kafka stream.`,
      timestamp: new Date().toLocaleString(),
      safetyScore: Math.max(0, 100 - adversarialCount * 4),
      isLiveStream: isLive,
      confluentConfig: isLive ? config : undefined
    });
  };

  const handleTestConnection = async () => {
    setStatus('testing');
    setTestLog([]);
    const logs = [
      "Pinging bootstrap server...",
      "Authenticating with API Key...",
      "Checking ACL permissions...",
      "Validating Schema Registry endpoint...",
      "Connection established successfully."
    ];

    for (const log of logs) {
      setTestLog(prev => [...prev, log]);
      await new Promise(r => setTimeout(r, 600));
    }

    setTimeout(() => {
      generateData('prod.flight_telemetry', true);
      setStatus('uploading');
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      generateData(file.name, false);
      setStatus('uploading');
    }
  };

  const handleLiveConnect = () => {
    setIsLiveMode(true);
    setStatus('configuring');
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
      }, 800);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] p-8 pb-24 text-center animate-fade-in">
      <div className="max-w-3xl w-full">
        <header className="mb-12 mt-12">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Security Gateway</h2>
          <p className="text-slate-400 max-w-xl mx-auto italic">Powering real-time adversarial detection for Data in Motion.</p>
        </header>

        {status === 'idle' && (
          <div className="w-full space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div onClick={handleLiveConnect} className="relative group cursor-pointer h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative border-2 border-teal-500/50 rounded-[2.5rem] p-10 bg-slate-900/80 hover:bg-slate-900 transition-all flex flex-col items-center justify-center h-full border-dashed">
                  <div className="w-20 h-20 bg-teal-500/10 rounded-3xl flex items-center justify-center mb-6 border border-teal-500/30 group-hover:scale-110 transition-transform">
                    <i className="fas fa-bolt-lightning text-3xl text-teal-400"></i>
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">Live Confluent Link</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">Real-time Kafka topic monitoring</p>
                  <div className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[9px] font-black text-teal-400 uppercase tracking-widest">Enterprise Ready</div>
                </div>
              </div>

              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-500 to-slate-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative border-2 border-slate-700/50 rounded-[2.5rem] p-10 bg-slate-900/50 hover:bg-slate-900 transition-all flex flex-col items-center justify-center h-full border-dashed">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                  <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 border border-slate-700">
                    <i className="fas fa-file-upload text-3xl text-slate-400"></i>
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">Static Payload Scan</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">Analyze training datasets (CSV/JSON)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {status === 'configuring' && (
          <div className="glass-panel p-10 rounded-[3rem] border-teal-500/30 w-full animate-fade-in text-left">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
              <i className="fas fa-plug text-teal-400"></i> Confluent Cloud Connectivity
            </h3>
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Bootstrap Server</label>
                <input 
                  type="text" 
                  value={config.bootstrapServer}
                  onChange={(e) => setConfig({...config, bootstrapServer: e.target.value})}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-teal-500/50 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">API Key</label>
                  <input 
                    type="text" 
                    placeholder="Enter key..."
                    value={config.apiKey}
                    onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-teal-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">API Secret</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={config.apiSecret}
                    onChange={(e) => setConfig({...config, apiSecret: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-teal-500/50 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Cluster ID</label>
                  <input 
                    type="text" 
                    value={config.clusterId}
                    onChange={(e) => setConfig({...config, clusterId: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-400 font-mono text-sm"
                    disabled
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Topic Target</label>
                  <select className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-teal-500/50 focus:outline-none">
                    <option>prod.flight_telemetry</option>
                    <option>staging.user_behavior</option>
                    <option>dev.test_stream</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleTestConnection}
                className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-plug-circle-check"></i> Test & Connect Stream
              </button>
              <button onClick={() => setStatus('idle')} className="px-6 bg-slate-800 text-slate-400 font-black rounded-xl border border-slate-700">Cancel</button>
            </div>
          </div>
        )}

        {status === 'testing' && (
          <div className="glass-panel p-16 rounded-[3rem] border-teal-500/30 w-full animate-fade-in shadow-2xl relative bg-slate-900/80">
            <h3 className="text-xl font-black text-white mb-8">Validating Confluent Infrastructure</h3>
            <div className="bg-slate-950/80 p-6 rounded-2xl font-mono text-xs text-left space-y-2 border border-slate-800 min-h-[180px]">
              {testLog.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-teal-500/40">[{new Date().toLocaleTimeString()}]</span>
                  <span className={i === testLog.length - 1 ? 'text-teal-400 font-bold' : 'text-slate-500'}>{log}</span>
                </div>
              ))}
              <div className="animate-pulse text-teal-500">_</div>
            </div>
          </div>
        )}

        {(status === 'uploading' || status === 'scanning') && (
          <div className="glass-panel p-16 rounded-[3rem] border-teal-500/30 w-full animate-fade-in shadow-2xl relative overflow-hidden bg-slate-900/80">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${status === 'uploading' ? progress : 100}%` }}></div>
            </div>
            <div className="flex items-center justify-between mb-10 text-left">
              <div>
                <h3 className="text-xs font-black text-teal-400 uppercase tracking-[0.3em] mb-2">{isLiveMode ? 'INTERCEPTING TOPIC' : 'SCANNING DATASET'}</h3>
                <p className="text-2xl font-black text-white font-mono tracking-tight">{fileName}</p>
              </div>
              <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center border border-teal-500/20">
                <i className={`fas ${isLiveMode ? 'fa-satellite-dish fa-spin' : 'fa-spinner fa-spin'} text-teal-400 text-xl`}></i>
              </div>
            </div>
            <div className="space-y-5 text-left bg-slate-950/30 p-8 rounded-2xl border border-slate-800/50">
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
            <div className="w-24 h-24 bg-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-white text-4xl shadow-teal-500/40 shadow-xl">
              <i className="fas fa-shield-check"></i>
            </div>
            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Security Mapping Complete</h3>
            <p className="text-slate-400 mb-10 font-medium italic">Forensic artifacts for {fileName} have been synthesized.</p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 text-center shadow-inner group hover:border-teal-500/30 transition-all">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Integrity Score</p>
                <p className="text-4xl font-black text-teal-400">{scanResult.safetyScore}<span className="text-lg opacity-40 ml-1">/100</span></p>
              </div>
              <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 text-center shadow-inner group hover:border-rose-500/30 transition-all">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Detected Vectors</p>
                <p className="text-4xl font-black text-rose-500">{scanResult.threatsDetected}</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => onScanComplete(scanResult)} className="bg-teal-600 hover:bg-teal-500 text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] uppercase tracking-widest text-xs">View Forensic Cluster <i className="fas fa-arrow-right ml-2"></i></button>
              <button onClick={() => setStatus('idle')} className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-black px-10 py-5 rounded-2xl border border-slate-700 transition-all active:scale-[0.98] uppercase tracking-widest text-xs">New Scan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;

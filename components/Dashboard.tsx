
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const data = [
  { name: 'Mon', threats: 12, safe: 140 },
  { name: 'Tue', threats: 19, safe: 155 },
  { name: 'Wed', threats: 3, safe: 160 },
  { name: 'Thu', threats: 25, safe: 130 },
  { name: 'Fri', threats: 8, safe: 180 },
  { name: 'Sat', threats: 2, safe: 90 },
  { name: 'Sun', threats: 4, safe: 85 },
];

const pieData = [
  { name: 'Normal Data', value: 850 },
  { name: 'Poisoning Attack', value: 120 },
  { name: 'Evasion Attack', value: 30 },
];

const historyData = [
  { 
    id: 'SEC-8821', 
    dataset: 'SignData_Autonomous_v4.json', 
    type: 'JSON', 
    date: '2024-05-20 14:32', 
    status: 'Anomalies Blocked', 
    severity: 'Medium',
    threats: 12
  },
  { 
    id: 'SEC-8819', 
    dataset: 'MedicalImaging_OOD_Test.csv', 
    type: 'CSV', 
    date: '2024-05-19 09:15', 
    status: 'Verified Safe', 
    severity: 'Low',
    threats: 0
  },
  { 
    id: 'SEC-8815', 
    dataset: 'FinancialTimeSeries_X.log', 
    type: 'LOG', 
    date: '2024-05-18 18:44', 
    status: 'Critical Poisoning', 
    severity: 'High',
    threats: 48
  },
  { 
    id: 'SEC-8812', 
    dataset: 'Retail_Customer_Flow.csv', 
    type: 'CSV', 
    date: '2024-05-17 11:20', 
    status: 'Verified Safe', 
    severity: 'Low',
    threats: 0
  }
];

const COLORS = ['#14b8a6', '#f43f5e', '#f59e0b'];

const Dashboard: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const triggerDownload = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadReport = (item: typeof historyData[0]) => {
    setDownloadingId(`${item.id}-report`);
    
    // Simulate generation delay
    setTimeout(() => {
      const reportContent = `
A.MIN ADVERSARIAL SHIELD - FORENSIC REPORT
==========================================
EVENT ID: ${item.id}
TIMESTAMP: ${item.date}
DATASET: ${item.dataset}
FORMAT: ${item.type}

EXECUTIVE SUMMARY:
The security scan for ${item.dataset} has concluded with a status of: ${item.status.toUpperCase()}.
A total of ${item.threats} adversarial threats were identified and successfully quarantined.

THREAT METRICS:
- Severity Level: ${item.severity}
- Neutralized Vectors: ${item.threats}
- Integrity Hash: SHA-256: ${Math.random().toString(16).substring(2, 15).toUpperCase()}

RECOMMENDATION:
${item.severity === 'High' 
  ? 'IMMEDIATE ACTION REQUIRED: Purge training buffers and investigate source IP of dataset origin.' 
  : 'Baseline integrity maintained. Proceed with training after standard OOD verification.'}

------------------------------------------
(c) ${new Date().getFullYear()} A.min Labs Security Intelligence
      `.trim();

      triggerDownload(`Forensic_Report_${item.id}.txt`, reportContent, 'text/plain');
      setDownloadingId(null);
    }, 800);
  };

  const handleDownloadDataset = (item: typeof historyData[0]) => {
    setDownloadingId(`${item.id}-data`);
    
    setTimeout(() => {
      let content = "";
      let filename = `Restored_${item.dataset}`;
      
      if (item.type === 'CSV') {
        content = "feature_x,feature_y,feature_z,label,integrity_status\n";
        content += Array.from({length: 10}, (_, i) => 
          `${Math.random().toFixed(4)},${Math.random().toFixed(4)},${Math.random().toFixed(4)},${i%2},verified`
        ).join("\n");
      } else if (item.type === 'JSON') {
        content = JSON.stringify({
          metadata: { eventId: item.id, source: item.dataset },
          samples: Array.from({length: 5}, () => ({
            id: Math.random().toString(36).substring(7),
            features: [Math.random(), Math.random(), Math.random()],
            status: "CLEAN"
          }))
        }, null, 2);
      } else {
        content = `[${item.date}] SYSTEM_INTEGRITY_CHECK: PASS\n[${item.date}] DATA_VECTOR_SCAN: ${item.threats} ANOMALIES FOUND\n[${item.date}] CLEANING_PROTOCOL: COMPLETED`;
      }

      triggerDownload(filename, content, item.type === 'JSON' ? 'application/json' : 'text/csv');
      setDownloadingId(null);
    }, 800);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700 space-y-8">
      <header className="mb-2">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Security Operations Dashboard</h2>
        <p className="text-slate-400">Real-time monitoring of adversarial attack attempts on training datasets.</p>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Scanned Data', value: '1,024,192', icon: 'fa-database', color: 'text-blue-400' },
          { label: 'Detected Attacks', value: '142', icon: 'fa-virus-slash', color: 'text-rose-400' },
          { label: 'Protected Models', value: '12', icon: 'fa-brain', color: 'text-teal-400' },
          { label: 'System Reliability', value: '99.9%', icon: 'fa-check-circle', color: 'text-emerald-400' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center ${stat.color} shadow-inner`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <span className="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest">+12% vs LW</span>
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-2xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl h-[400px] border-slate-700/50">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fas fa-chart-line text-teal-400"></i>
            Weekly Detection Trends
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorThreat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="threats" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorThreat)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-6 rounded-2xl h-[400px] border-slate-700/50 flex flex-col">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fas fa-virus text-rose-400"></i>
            Attack Type Distribution
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                <span className="flex items-center gap-2 text-slate-400">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i] }}></div>
                  {d.name}
                </span>
                <span className="text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security History Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border-slate-700/50">
        <div className="px-8 py-6 border-b border-slate-800 bg-slate-800/20 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-history text-teal-400"></i>
              Security Event History
            </h3>
            <p className="text-[10px] text-slate-500 uppercase font-bold mt-1 tracking-wider">Historical audit of dataset scans and forensics</p>
          </div>
          <button className="text-[10px] font-black text-teal-400 uppercase tracking-widest hover:text-teal-300 transition-colors">
            View All Events <i className="fas fa-chevron-right ml-1"></i>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800">
                <th className="px-8 py-4">Event ID</th>
                <th className="px-8 py-4">Dataset Signature</th>
                <th className="px-8 py-4 text-center">Format</th>
                <th className="px-8 py-4">Detection Status</th>
                <th className="px-8 py-4">Timestamp</th>
                <th className="px-8 py-4 text-right">Artifacts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {historyData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-8 py-4 text-xs font-mono text-slate-400">{item.id}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-teal-400 transition-colors">
                        <i className={`fas ${item.type === 'JSON' ? 'fa-file-code' : item.type === 'CSV' ? 'fa-file-csv' : 'fa-file-alt'}`}></i>
                      </div>
                      <span className="text-xs font-bold text-slate-200">{item.dataset}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-center">
                    <span className="text-[9px] font-black text-slate-500 px-2 py-0.5 rounded border border-slate-700 bg-slate-900/50">{item.type}</span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex flex-col gap-1">
                      <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                        item.severity === 'High' ? 'text-rose-500' : item.severity === 'Medium' ? 'text-amber-500' : 'text-teal-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.severity === 'High' ? 'bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]' : item.severity === 'Medium' ? 'bg-amber-500' : 'bg-teal-400'
                        }`}></span>
                        {item.status}
                      </div>
                      {item.threats > 0 && <span className="text-[9px] text-slate-500 font-bold ml-3.5">{item.threats} instances neutralized</span>}
                    </div>
                  </td>
                  <td className="px-8 py-4 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{item.date}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleDownloadReport(item)}
                        disabled={!!downloadingId}
                        className={`w-8 h-8 rounded-lg bg-slate-800/80 text-slate-400 hover:bg-teal-500/10 hover:text-teal-400 transition-all border border-slate-700/50 flex items-center justify-center ${downloadingId === `${item.id}-report` ? 'animate-pulse' : ''}`} 
                        title="Download Forensic Report"
                      >
                        {downloadingId === `${item.id}-report` ? <i className="fas fa-circle-notch fa-spin text-[10px]"></i> : <i className="fas fa-file-shield text-xs"></i>}
                      </button>
                      <button 
                        onClick={() => handleDownloadDataset(item)}
                        disabled={!!downloadingId}
                        className={`w-8 h-8 rounded-lg bg-slate-800/80 text-slate-400 hover:bg-teal-500/10 hover:text-teal-400 transition-all border border-slate-700/50 flex items-center justify-center ${downloadingId === `${item.id}-data` ? 'animate-pulse' : ''}`} 
                        title="Download Restored Dataset"
                      >
                        {downloadingId === `${item.id}-data` ? <i className="fas fa-circle-notch fa-spin text-[10px]"></i> : <i className="fas fa-download text-xs"></i>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-8 py-4 bg-slate-900/40 border-t border-slate-800 text-center">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Institutional Verification Hash: A23-XX-0092-B</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

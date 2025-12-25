
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { HistoryItem } from '../types';

interface DashboardProps {
  history: HistoryItem[];
}

const COLORS = ['#14b8a6', '#f43f5e', '#f59e0b'];

const Dashboard: React.FC<DashboardProps> = ({ history }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const totalAttacks = history.reduce((acc, curr) => acc + curr.threats, 0);
  const totalDatasets = history.length;

  const chartData = history.slice(0, 7).reverse().map(h => ({
    name: h.date.split(' ')[0].split('-').pop(),
    threats: h.threats
  }));

  const pieData = [
    { name: 'Normal Data', value: 850 },
    { name: 'Poisoning Attack', value: totalAttacks },
    { name: 'Evasion Attack', value: 30 },
  ];

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

  const handleDownloadReport = (item: HistoryItem) => {
    setDownloadingId(item.id);
    setTimeout(() => {
      const reportContent = `
# A.MIN ADVERSARIAL SHIELD REPORT
---
**Event ID:** ${item.id}
**Dataset Signature:** ${item.dataset}
**Date:** ${item.date}
**Security Status:** ${item.status}
**Detected Threats:** ${item.threats}
**Severity:** ${item.severity}

## Executive Summary
This report documents the forensic analysis of ${item.dataset}. The scanning process identified ${item.threats} adversarial signatures. Mitigation strategies have been deployed to safeguard downstream neural processing.
      `;
      triggerDownload(`Report_${item.id}.md`, reportContent.trim(), 'text/markdown');
      setDownloadingId(null);
    }, 800);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700 space-y-8">
      <header className="mb-2">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Security Operations Dashboard</h2>
        <p className="text-slate-400">Real-time monitoring of adversarial attack attempts on training datasets.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Scanned Files', value: totalDatasets.toString(), icon: 'fa-database', color: 'text-blue-400' },
          { label: 'Neutralized Attacks', value: totalAttacks.toString(), icon: 'fa-virus-slash', color: 'text-rose-400' },
          { label: 'Protected Models', value: '12', icon: 'fa-brain', color: 'text-teal-400' },
          { label: 'System Reliability', value: '99.9%', icon: 'fa-check-circle', color: 'text-emerald-400' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border-slate-700/50 hover:border-teal-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <span className="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest">+Synced</span>
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-2xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl h-[400px] border-slate-700/50">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fas fa-chart-line text-teal-400"></i> Detection Trends
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData}>
              <defs><linearGradient id="colorThreat" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip itemStyle={{ color: '#fff' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="threats" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorThreat)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-panel p-8 rounded-3xl h-[400px] border-slate-700/50 flex flex-col">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><i className="fas fa-virus text-rose-400"></i> Threat Distribution</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                </Pie>
                <Tooltip itemStyle={{ color: '#fff' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden border-slate-700/50 shadow-xl">
        <div className="px-8 py-6 border-b border-slate-800 bg-slate-800/20">
          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2"><i className="fas fa-history text-teal-400"></i> Security Event History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800 bg-slate-900/40">
                <th className="px-8 py-5">Event ID</th>
                <th className="px-8 py-5">Dataset Signature</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-5 text-xs font-mono text-slate-400">{item.id}</td>
                  <td className="px-8 py-5"><span className="text-xs font-bold text-slate-200">{item.dataset}</span></td>
                  <td className="px-8 py-5"><span className={`text-[10px] font-black uppercase ${item.severity === 'High' ? 'text-rose-500' : 'text-teal-400'}`}>{item.status}</span></td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleDownloadReport(item)} 
                      disabled={downloadingId === item.id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 border border-slate-700 transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                      {downloadingId === item.id ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-redo"></i>}
                      Re-download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

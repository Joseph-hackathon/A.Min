
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
  
  const chartData = history.slice(0, 7).reverse().map(h => ({
    name: h.date.split(' ')[0].split('-').pop(),
    threats: h.threats,
    throughput: Math.floor(Math.random() * 500) + 200
  }));

  const pieData = [
    { name: 'Verified Stream', value: 850 },
    { name: 'Poisoning Attempt', value: totalAttacks },
    { name: 'Evasion Vector', value: 30 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700 space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Security Operations Dashboard</h2>
          <p className="text-slate-400">Real-time monitoring of adversarial attacks on Confluent Data Streams.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-slate-900/50 border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confluent Cloud: Online</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Kafka Topics', value: '4', icon: 'fa-diagram-project', color: 'text-blue-400' },
          { label: 'Neutralized Attacks', value: totalAttacks.toString(), icon: 'fa-virus-slash', color: 'text-rose-400' },
          { label: 'Flink SQL Agents', value: '12', icon: 'fa-bolt-lightning', color: 'text-teal-400' },
          { label: 'Stream Throughput', value: '1.2 GB/s', icon: 'fa-gauge-high', color: 'text-emerald-400' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border-slate-700/50 hover:border-teal-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <span className="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest">+LIVE</span>
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-2xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl h-[400px] border-slate-700/50 relative overflow-hidden">
          <div className="absolute top-4 right-8 flex gap-4 text-[10px] font-black uppercase tracking-widest">
            <span className="text-rose-500 flex items-center gap-1"><i className="fas fa-circle text-[6px]"></i> Attacks</span>
            <span className="text-teal-400 flex items-center gap-1"><i className="fas fa-circle text-[6px]"></i> Throughput</span>
          </div>
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fas fa-chart-line text-teal-400"></i> Stream Analysis Trend
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorThreat" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.1}/><stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip itemStyle={{ color: '#fff' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="threats" stroke="#f43f5e" strokeWidth={3} fill="url(#colorThreat)" />
              <Area type="monotone" dataKey="throughput" stroke="#14b8a6" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorThroughput)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="glass-panel p-8 rounded-3xl h-[400px] border-slate-700/50 flex flex-col bg-slate-900/20">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><i className="fas fa-code text-teal-400"></i> Active Flink SQL Logic</h3>
          <div className="flex-1 bg-slate-950/80 p-4 rounded-xl font-mono text-[10px] text-teal-500 overflow-hidden border border-slate-800 shadow-inner">
            <p className="text-slate-500 mb-2">-- Adversarial Shield Normalizer</p>
            <p className="text-white">SELECT</p>
            <p className="pl-4">airline, source, dest,</p>
            <p className="pl-4 text-rose-400">VECTOR_DISTANCE(feature_vector, centroid)</p>
            <p className="text-white">FROM</p>
            <p className="pl-4 text-blue-400">confluent_cloud.flight_telemetry</p>
            <p className="text-white">WHERE</p>
            <p className="pl-4">distance &gt; 0.85;</p>
            <div className="mt-4 pt-4 border-t border-slate-800 text-slate-500">
              <i className="fas fa-sync fa-spin mr-2"></i> Latency: 42ms
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden border-slate-700/50 shadow-xl">
        <div className="px-8 py-6 border-b border-slate-800 bg-slate-800/20 flex justify-between items-center">
          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2"><i className="fas fa-history text-teal-400"></i> Topic Monitoring History</h3>
          <button className="text-[10px] font-black text-teal-400 uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-lg border border-teal-500/20">Refresh Confluent Connectors</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800 bg-slate-900/40">
                <th className="px-8 py-5">Topic ID</th>
                <th className="px-8 py-5">Kafka Cluster</th>
                <th className="px-8 py-5">Security Result</th>
                <th className="px-8 py-5 text-right">Monitoring</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-5 text-xs font-mono text-slate-400">{item.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-bold text-slate-200">GCP-US-EAST-1</span>
                    </div>
                  </td>
                  <td className="px-8 py-5"><span className={`text-[10px] font-black uppercase ${item.severity === 'High' ? 'text-rose-500' : 'text-teal-400'}`}>{item.status}</span></td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500" style={{ width: '85%' }}></div>
                      </div>
                      <i className="fas fa-ellipsis-v text-slate-600"></i>
                    </div>
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

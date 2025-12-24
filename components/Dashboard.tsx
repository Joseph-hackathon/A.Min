
import React from 'react';
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

const COLORS = ['#14b8a6', '#f43f5e', '#f59e0b'];

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Security Operations Dashboard</h2>
        <p className="text-slate-400">Real-time monitoring of adversarial attack attempts on training datasets.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Scanned Data', value: '1,024,192', icon: 'fa-database', color: 'text-blue-400' },
          { label: 'Detected Attacks', value: '142', icon: 'fa-virus-slash', color: 'text-rose-400' },
          { label: 'Protected Models', value: '12', icon: 'fa-brain', color: 'text-teal-400' },
          { label: 'System Reliability', value: '99.9%', icon: 'fa-check-circle', color: 'text-emerald-400' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center ${stat.color}`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <span className="text-xs font-mono text-slate-500">+12% vs last week</span>
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl h-[400px]">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
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
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="threats" stroke="#f43f5e" fillOpacity={1} fill="url(#colorThreat)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-6 rounded-2xl h-[400px]">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-virus text-rose-400"></i>
            Attack Type Distribution
          </h3>
          <ResponsiveContainer width="100%" height="70%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-400">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  {d.name}
                </span>
                <span className="font-bold">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

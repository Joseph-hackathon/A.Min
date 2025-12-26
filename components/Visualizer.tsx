
import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
import { DataPoint } from '../types';

interface VisualizerProps {
  scanData?: DataPoint[];
  fileName?: string;
}

const Visualizer: React.FC<VisualizerProps> = ({ scanData, fileName }) => {
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [activeTab, setActiveTab] = useState<'compact' | 'column'>('compact');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [xDomain, setXDomain] = useState<[number, number] | undefined>(undefined);
  const [yDomain, setYDomain] = useState<[number, number] | undefined>(undefined);

  const displayData = useMemo(() => {
    if (scanData && scanData.length > 0) return scanData;
    
    const points: DataPoint[] = [];
    for (let i = 0; i < 60; i++) points.push({ id: `DN-${i}`, x: 25 + Math.random() * 20, y: 25 + Math.random() * 20, type: 'normal' });
    for (let i = 0; i < 60; i++) points.push({ id: `DN-${i+100}`, x: 55 + Math.random() * 20, y: 55 + Math.random() * 20, type: 'normal' });
    for (let i = 0; i < 15; i++) points.push({ id: `DA-${i}`, x: Math.random() * 100, y: Math.random() * 100, type: 'adversarial' });
    return points;
  }, [scanData]);

  const stats = useMemo(() => {
    const total = displayData.length;
    const attacks = displayData.filter(p => p.type === 'adversarial').length;
    const safe = total - attacks;
    const score = Math.round((safe / total) * 100);
    return { total, attacks, safe, score };
  }, [displayData]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return displayData.slice(start, start + itemsPerPage);
  }, [displayData, currentPage]);

  const totalPages = Math.ceil(displayData.length / itemsPerPage);

  const handlePointClick = (data: any) => {
    const point = data?.payload || data;
    if (!point || !point.id) return;
    setSelectedPoint(point);
    setXDomain([point.x - 15, point.x + 15]);
    setYDomain([point.y - 15, point.y + 15]);
  };

  const resetZoom = () => {
    setSelectedPoint(null);
    setXDomain(undefined);
    setYDomain(undefined);
  };

  const renderColumnAnalysis = () => {
    const columns = [
      {
        name: 'airline_id',
        icon: 'fa-key',
        type: 'numeric',
        stats: { 
          valid: stats.total, mismatched: 0, missing: 0, 
          mean: '311501b', stdDev: '23208572b',
          min: '1.83m', q25: '1.75b', q50: '9.25b', q75: '16.1b', max: '172962268b' 
        },
        distribution: [ { value: 100 } ] // Large block as in image
      },
      {
        name: 'category',
        icon: 'fa-font',
        type: 'categorical',
        stats: { 
          valid: stats.total, mismatched: 0, missing: 0, 
          unique: 143, mostCommon: 'handphone_tablet', frequency: '5%' 
        },
        distribution: [
          { label: 'handphone_tablet', value: 5 },
          { label: 'otomotif', value: 5 },
          { label: 'Other (5007)', value: 90 },
        ]
      },
      {
        name: 'security_status',
        icon: 'fa-shield-halved',
        type: 'categorical',
        stats: { 
          valid: stats.total, mismatched: 0, missing: 0, 
          unique: 2, mostCommon: 'Safe', frequency: `${stats.score}%` 
        },
        distribution: [
          { label: 'Safe', value: stats.score },
          { label: 'Attack', value: 100 - stats.score },
        ]
      }
    ];

    return (
      <div className="bg-white text-slate-900 rounded-b-3xl max-h-[700px] overflow-y-auto">
        <div className="px-10 py-4 flex justify-end sticky top-0 bg-white/90 backdrop-blur-sm z-10 border-b border-slate-100">
           <div className="text-[11px] font-bold text-slate-500 flex items-center gap-2">
             {columns.length} of 11 columns <i className="fas fa-chevron-down text-[8px]"></i>
           </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {columns.map((col, idx) => (
            <div key={idx} className="p-10 animate-fade-in">
              <div className="flex items-center gap-2 mb-8">
                <i className={`fas ${col.icon} text-slate-400 text-xs`}></i>
                <h4 className="text-sm font-black tracking-tight text-slate-800">{col.name}</h4>
              </div>

              <div className="grid grid-cols-12 gap-12">
                {/* Left: Visualization */}
                <div className="col-span-4 flex flex-col justify-end">
                  {col.name === 'airline_id' ? (
                    <div className="w-full h-32 bg-[#007ba1] rounded-sm relative">
                      <div className="absolute -bottom-5 left-0 text-[10px] text-slate-400 font-bold">1.83m</div>
                      <div className="absolute -bottom-5 right-0 text-[10px] text-slate-400 font-bold text-right truncate max-w-[80px]">1729622684b</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {col.distribution.map((d, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-600">{d.label}</span>
                          <span className="text-slate-900">{d.value}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mid-Right: Validation Bars */}
                <div className="col-span-3">
                  <div className="w-full h-1.5 flex rounded-full overflow-hidden bg-slate-100 mb-6">
                    <div className="bg-[#1e7e34]" style={{ width: '100%' }}></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-sm bg-[#1e7e34]"></div> Valid</div>
                      <div className="flex gap-4"><span>{col.stats.valid}</span> <span className="text-slate-400">100%</span></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-sm bg-slate-300"></div> Mismatched</div>
                      <div className="flex gap-4"><span>0</span> <span className="text-slate-400">0%</span></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-sm bg-[#d9534f]"></div> Missing</div>
                      <div className="flex gap-4"><span>0</span> <span className="text-slate-400">0%</span></div>
                    </div>
                  </div>
                </div>

                {/* Right: Detailed Stats Table */}
                <div className="col-span-5 border-l border-slate-100 pl-10">
                  {col.type === 'categorical' ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-500">Unique</span>
                        <span className="text-slate-900">{col.stats.unique}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-500">Most Common</span>
                        <div className="flex gap-2">
                          <span className="text-slate-900">{col.stats.mostCommon}</span>
                          <span className="text-slate-400">{col.stats.frequency}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-y-2">
                       <div className="flex justify-between text-[11px] font-bold">
                         <span className="text-slate-500">Mean</span>
                         <span className="text-slate-900">{col.stats.mean}</span>
                       </div>
                       <div className="flex justify-between text-[11px] font-bold">
                         <span className="text-slate-500">Std. Deviation</span>
                         <span className="text-slate-900">{col.stats.stdDev}</span>
                       </div>
                       <div className="pt-2 border-t border-slate-50 mt-2">
                         <div className="flex justify-between text-[11px] font-bold mb-2">
                           <span className="text-slate-500">Quantiles</span>
                           <div className="flex flex-col items-end gap-1">
                              <div className="flex gap-6"><span>{col.stats.min}</span> <span className="text-slate-400 w-8 text-right">Min</span></div>
                              <div className="flex gap-6"><span>{col.stats.q25}</span> <span className="text-slate-400 w-8 text-right">25%</span></div>
                              <div className="flex gap-6"><span>{col.stats.q50}</span> <span className="text-slate-400 w-8 text-right">50%</span></div>
                              <div className="flex gap-6"><span>{col.stats.q75}</span> <span className="text-slate-400 w-8 text-right">75%</span></div>
                              <div className="flex gap-6"><span>{col.stats.max}</span> <span className="text-slate-400 w-8 text-right">Max</span></div>
                           </div>
                         </div>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
      <header className="mb-2 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-teal-500/10 text-teal-400 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-500/20 uppercase tracking-widest">Visual Forensic Analysis</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Clustering & Anomaly Map</h2>
          </div>
          <p className="text-slate-400">Projecting high-dimensional features into Euclidean vector space.</p>
        </div>
        {selectedPoint && (
          <button onClick={resetZoom} className="bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 border border-slate-700 shadow-xl">
            <i className="fas fa-compress-arrows-alt"></i> Reset Viewport
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="glass-panel p-8 rounded-3xl h-[500px] flex flex-col bg-slate-900/40 relative overflow-hidden border-slate-700/50 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
            <div className="flex-1 w-full z-10">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" dataKey="x" stroke="#94a3b8" fontSize={11} domain={xDomain || [0, 100]} tick={{fill: '#94a3b8'}}>
                    <Label value="Feature Vector X" offset={-20} position="insideBottom" fill="#475569" fontSize={10} fontWeight="bold" />
                  </XAxis>
                  <YAxis type="number" dataKey="y" stroke="#94a3b8" fontSize={11} domain={yDomain || [0, 100]} tick={{fill: '#94a3b8'}}>
                    <Label value="Feature Vector Y" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#475569" fontSize={10} fontWeight="bold" />
                  </YAxis>
                  <ZAxis type="number" dataKey="z" range={[80, 400]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3', stroke: '#334155' }}
                    itemStyle={{ color: '#ffffff' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                  />
                  <Scatter name="Data Point" data={displayData} onClick={handlePointClick}>
                    {displayData.map((entry, index) => (
                      <Cell 
                        key={`${entry.id}-${index}`} 
                        fill={entry.type === 'normal' ? '#14b8a6' : '#f43f5e'} 
                        fillOpacity={selectedPoint ? (selectedPoint.id === entry.id ? 1 : 0.1) : 0.6}
                        stroke={entry.type === 'adversarial' ? '#f43f5e' : 'none'}
                        strokeWidth={2}
                        className="transition-all duration-300 cursor-pointer"
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-panel rounded-3xl p-6 bg-slate-800/10 border-slate-700/50 h-full flex flex-col shadow-xl">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <i className="fas fa-fingerprint text-teal-400"></i> Vector Blueprint
            </h4>
            
            {selectedPoint ? (
              <div className="space-y-6 animate-fade-in flex-1">
                <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700/50">
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2">Endpoint ID</p>
                  <p className="text-sm font-mono text-white break-all">{selectedPoint.id}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800">
                    <p className="text-[9px] text-slate-500 uppercase font-black">Spatial X</p>
                    <p className="text-lg text-teal-400 font-black font-mono">{selectedPoint.x.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800">
                    <p className="text-[9px] text-slate-500 uppercase font-black">Spatial Y</p>
                    <p className="text-lg text-teal-400 font-black font-mono">{selectedPoint.y.toFixed(2)}</p>
                  </div>
                </div>
                <div className={`p-5 rounded-2xl border ${selectedPoint.type === 'adversarial' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-teal-500/10 border-teal-500/20'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedPoint.type === 'adversarial' ? 'bg-rose-500/20 text-rose-500' : 'bg-teal-500/20 text-teal-400'}`}><i className={`fas ${selectedPoint.type === 'adversarial' ? 'fa-skull-crossbones' : 'fa-shield-check'}`}></i></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">{selectedPoint.type} Record</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 flex-1 flex flex-col justify-center">
                <i className="fas fa-crosshairs text-3xl text-slate-700 mb-4 animate-pulse"></i>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Select a coordinate to view its blueprint.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analysis Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Integrity Score', value: `${stats.score}%`, sub: 'Dataset Reliability', color: 'text-teal-400' },
          { label: 'Total Samples', value: stats.total, sub: 'Mapped Points', color: 'text-blue-400' },
          { label: 'Attacks Blocked', value: stats.attacks, sub: 'Poisoned Vectors', color: 'text-rose-500' },
          { label: 'Verified Safe', value: stats.safe, sub: 'Standard Feature Set', color: 'text-emerald-400' },
        ].map((item, i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl border-slate-700/30 bg-slate-900/20 flex flex-col justify-center items-center text-center">
            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{item.label}</h5>
            <p className={`text-3xl font-black ${item.color} mb-1`}>{item.value}</p>
            <p className="text-[9px] text-slate-600 font-bold uppercase">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden border-slate-700/50 bg-[#0f172a]/40 shadow-2xl">
        <div className="px-10 py-8 border-b border-slate-800/60 bg-slate-900/20">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-inner group">
              <i className="fas fa-file-csv text-2xl text-slate-400 group-hover:text-teal-400 transition-colors"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight mb-1">{fileName || 'IndianFlightData - Sheet1.csv'}</h3>
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><i className="fas fa-calendar-alt"></i> MAY 2019</span>
                <span className="flex items-center gap-1.5"><i className="fas fa-table-columns"></i> 11 COLUMNS</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-8 border-b border-slate-800/80 -mb-8">
            <button onClick={() => setActiveTab('compact')} className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === 'compact' ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'}`}>
              Compact {activeTab === 'compact' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 rounded-full"></div>}
            </button>
            <button onClick={() => setActiveTab('column')} className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === 'column' ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'}`}>
              Column {activeTab === 'column' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 rounded-full"></div>}
            </button>
          </div>
        </div>

        {activeTab === 'compact' ? (
          <>
            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800/80 bg-slate-900/40">
                    <th className="px-10 py-5">Airline</th>
                    <th className="px-10 py-5">Date</th>
                    <th className="px-10 py-5">Source</th>
                    <th className="px-10 py-5">Dest</th>
                    <th className="px-10 py-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {paginatedData.map((point) => (
                    <tr key={point.id} onClick={() => handlePointClick(point)} className={`hover:bg-teal-500/5 transition-colors cursor-pointer group ${selectedPoint?.id === point.id ? 'bg-teal-500/10' : ''}`}>
                      <td className="px-10 py-5 text-xs font-bold text-slate-200">{point.airline || 'Jet Airways'}</td>
                      <td className="px-10 py-5 text-xs text-slate-400">{point.dateOfJourney || '27/05/2019'}</td>
                      <td className="px-10 py-5 text-xs text-slate-400">{point.source || 'Chennai'}</td>
                      <td className="px-10 py-5 text-xs text-slate-400">{point.destination || 'Delhi'}</td>
                      <td className="px-10 py-5 text-right">
                        <div className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${point.type === 'adversarial' ? 'text-rose-500' : 'text-teal-400'}`}>
                          <i className={`fas ${point.type === 'adversarial' ? 'fa-biohazard' : 'fa-check-circle'}`}></i>
                          {point.type === 'adversarial' ? 'Attack' : 'Safe'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-10 py-6 bg-slate-900/60 border-t border-slate-800 flex justify-between items-center">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Page {currentPage} of {totalPages}</p>
              <div className="flex gap-2">
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${currentPage === i + 1 ? 'bg-teal-500 text-slate-900 border-teal-500' : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-white'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          renderColumnAnalysis()
        )}
      </div>
    </div>
  );
};

export default Visualizer;


import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DataPoint } from '../types';

const airlines = ['Jet Airways', 'IndiGo', 'Air India', 'SpiceJet', 'Multiple carriers'];
const sources = ['Delhi', 'Kolkata', 'Banglore', 'Mumbai', 'Chennai'];
const destinations = ['Cochin', 'Banglore', 'Delhi', 'New Delhi', 'Hyderabad'];

const Visualizer: React.FC = () => {
  const [pointCount, setPointCount] = useState(150);
  const [noiseLevel, setNoiseLevel] = useState(15);
  const [activeTab, setActiveTab] = useState('Compact');
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  
  // Camera/Zoom domains
  const [xDomain, setXDomain] = useState<[number, number]>([0, 100]);
  const [yDomain, setYDomain] = useState<[number, number]>([0, 100]);

  const generateData = useMemo(() => {
    const points: DataPoint[] = [];
    
    const createPoint = (type: 'normal' | 'adversarial', xRange: [number, number], yRange: [number, number]) => {
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const src = sources[Math.floor(Math.random() * sources.length)];
      const dest = destinations[Math.floor(Math.random() * destinations.length)];
      
      return {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        x: xRange[0] + Math.random() * (xRange[1] - xRange[0]),
        y: yRange[0] + Math.random() * (yRange[1] - yRange[0]),
        type,
        airline,
        dateOfJourney: `${Math.floor(Math.random() * 28 + 1)}/05/2019`,
        source: src,
        destination: dest,
        route: `${src.substr(0, 3).toUpperCase()} → ${dest.substr(0, 3).toUpperCase()}`,
        depTime: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        arrivalTime: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        duration: `${Math.floor(Math.random() * 5) + 1}h ${Math.floor(Math.random() * 60)}m`,
        stops: Math.random() > 0.5 ? '1 stop' : 'non-stop',
        additionalInfo: Math.random() > 0.8 ? 'In-flight meal not included' : 'No info'
      };
    };

    for (let i = 0; i < pointCount * 0.4; i++) points.push(createPoint('normal', [25, 45], [25, 45]));
    for (let i = 0; i < pointCount * 0.4; i++) points.push(createPoint('normal', [55, 75], [55, 75]));
    for (let i = 0; i < noiseLevel; i++) points.push(createPoint('adversarial', [0, 100], [0, 100]));
    
    return points;
  }, [pointCount, noiseLevel]);

  const adversarialPoints = generateData.filter(p => p.type === 'adversarial');
  const normalPoints = generateData.filter(p => p.type === 'normal');
  const totalCount = generateData.length;
  const normalPct = ((normalPoints.length / totalCount) * 100).toFixed(1);
  const adversarialPct = ((adversarialPoints.length / totalCount) * 100).toFixed(1);

  const handlePointClick = (data: DataPoint) => {
    setSelectedPoint(data);
    // Smoothly animate zoom: focus on a 30x30 window around the point
    setXDomain([data.x - 15, data.x + 15]);
    setYDomain([data.y - 15, data.y + 15]);
  };

  const resetZoom = () => {
    setSelectedPoint(null);
    setXDomain([0, 100]);
    setYDomain([0, 100]);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as DataPoint;
      return (
        <div className="glass-panel p-4 rounded-xl border-slate-700 shadow-2xl pointer-events-none min-w-[160px] animate-fade-in">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Point Signature</p>
          <p className="text-xs font-mono text-white mb-3 border-b border-slate-800 pb-2">{data.id}</p>
          
          <div className="space-y-1.5 mb-3">
            <div className="flex justify-between items-center gap-4">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Source</span>
              <span className="text-[10px] text-slate-300 font-semibold">{data.source}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Destination</span>
              <span className="text-[10px] text-slate-300 font-semibold">{data.destination}</span>
            </div>
          </div>

          <div className={`text-[9px] px-2 py-1 rounded-md font-black uppercase tracking-widest text-center border ${
            data.type === 'adversarial' 
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
              : 'bg-teal-500/10 text-teal-400 border-teal-500/30'
          }`}>
            {data.type === 'adversarial' ? <i className="fas fa-biohazard mr-1"></i> : <i className="fas fa-check mr-1"></i>}
            {data.type}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCompactView = () => (
    <div className="overflow-x-auto rounded-xl border border-slate-800 shadow-xl">
      <table className="w-full text-left text-[11px] border-collapse bg-slate-900/40">
        <thead>
          <tr className="bg-slate-800/95 text-slate-200 border-b border-slate-700">
            <th className="px-4 py-4 font-bold uppercase tracking-wider">Airline</th>
            <th className="px-4 py-4 font-bold uppercase tracking-wider">Date</th>
            <th className="px-4 py-4 font-bold uppercase tracking-wider">Source</th>
            <th className="px-4 py-4 font-bold uppercase tracking-wider">Dest</th>
            <th className="px-4 py-4 font-bold uppercase tracking-wider">Route</th>
            <th className="px-4 py-4 font-bold uppercase tracking-wider">Departure</th>
            <th className="px-4 py-4 font-bold uppercase tracking-wider">Arrival</th>
            <th className="px-4 py-4 font-bold uppercase tracking-wider">Duration</th>
            <th className="px-4 py-4 font-bold uppercase tracking-wider">Stops</th>
            <th className="px-4 py-4 font-bold uppercase tracking-wider">Info</th>
            <th className="px-4 py-4 font-bold uppercase tracking-wider text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {[...adversarialPoints.slice(0, 8), ...generateData.filter(p => p.type === 'normal').slice(0, 20)].map((item, idx) => (
            <tr 
              key={item.id} 
              onClick={() => handlePointClick(item)}
              className={`
                transition-all cursor-pointer 
                ${idx % 2 === 0 ? 'bg-slate-800/20' : 'bg-transparent'}
                ${item.type === 'adversarial' ? 'bg-rose-500/10 hover:bg-rose-500/20' : 'hover:bg-slate-700/40'} 
                ${selectedPoint?.id === item.id ? 'ring-2 ring-inset ring-teal-500 !bg-teal-500/10' : ''}
              `}
            >
              <td className="px-4 py-3 text-slate-200 font-medium">{item.airline}</td>
              <td className="px-4 py-3 text-slate-400">{item.dateOfJourney}</td>
              <td className="px-4 py-3 text-slate-400">{item.source}</td>
              <td className="px-4 py-3 text-slate-400">{item.destination}</td>
              <td className="px-4 py-3 text-slate-500 font-mono text-[10px]">{item.route}</td>
              <td className="px-4 py-3 text-slate-400">{item.depTime}</td>
              <td className="px-4 py-3 text-slate-400">{item.arrivalTime}</td>
              <td className="px-4 py-3 text-slate-400">{item.duration}</td>
              <td className="px-4 py-3 text-slate-400">{item.stops}</td>
              <td className="px-4 py-3 text-slate-500 text-[10px] italic">{item.additionalInfo}</td>
              <td className="px-4 py-3 text-right">
                {item.type === 'adversarial' ? 
                  <span className="text-rose-500 font-bold text-[11px] tracking-tight flex items-center justify-end gap-1.5 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]">
                    <i className="fas fa-biohazard"></i> ATTACK
                  </span> : 
                  <span className="text-teal-400 font-bold text-[11px] tracking-tight flex items-center justify-end gap-1.5 drop-shadow-[0_0_8px_rgba(20,184,166,0.3)]">
                    <i className="fas fa-shield-alt"></i> OK
                  </span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderColumnView = () => {
    const columns = [
      { name: 'Airline', icon: 'fa-plane', desc: 'Name of the airline operating the flight', top: [{n:'Jet Airways', p:'36%'}, {n:'IndiGo', p:'19%'}, {n:'Other', p:'45%'}] },
      { name: 'Date_of_Journey', icon: 'fa-calendar-alt', desc: 'Travel date', top: [{n:'18/05/2019', p:'5%'}, {n:'6/06/2019', p:'5%'}, {n:'Other', p:'90%'}] },
      { name: 'Source', icon: 'fa-globe', desc: 'Departure city', top: [{n:'Delhi', p:'42%'}, {n:'Kolkata', p:'27%'}, {n:'Other', p:'31%'}] },
      { name: 'Destination', icon: 'fa-map-marker-alt', desc: 'Arrival city', top: [{n:'Cochin', p:'42%'}, {n:'Banglore', p:'27%'}, {n:'Other', p:'31%'}] },
    ];

    return (
      <div className="space-y-12">
        {columns.map((col, idx) => (
          <div key={idx} className="border-b border-slate-800 pb-8 last:border-0">
            <div className="flex items-center gap-2 mb-4">
              <i className={`fas ${col.icon} text-teal-400`}></i>
              <h5 className="font-bold text-slate-200">{col.name}</h5>
            </div>
            <p className="text-[11px] text-slate-500 mb-6 flex items-center gap-2">
              <i className="fas fa-info-circle"></i> {col.desc}
            </p>
            
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-1/3 space-y-3">
                {col.top.map((t, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{t.n}</span>
                    <span className="font-mono text-teal-400">{t.p}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] uppercase font-bold tracking-widest">
                  <div>
                    <p className="text-slate-500 mb-1">Valid <span className="w-2 h-2 inline-block bg-emerald-500 rounded-sm ml-1"></span></p>
                    <p className="text-slate-200 text-xs">10.7k <span className="text-slate-500 font-normal">100%</span></p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Mismatched <span className="w-2 h-2 inline-block bg-slate-600 rounded-sm ml-1"></span></p>
                    <p className="text-slate-200 text-xs">0 <span className="text-slate-500 font-normal">0%</span></p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Missing <span className="w-2 h-2 inline-block bg-rose-500 rounded-sm ml-1"></span></p>
                    <p className="text-slate-200 text-xs">0 <span className="text-slate-500 font-normal">0%</span></p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1 mb-1">
                      <span className="text-slate-500">Unique</span>
                      <span className="text-slate-200">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Most Common</span>
                      <span className="text-slate-200">{col.top[0].n}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-teal-500/10 text-teal-400 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-500/20 uppercase tracking-widest">Analysis Module</span>
              <h2 className="text-3xl font-bold text-white">Cluster Analysis Visualization</h2>
            </div>
            <p className="text-slate-400">Deep inspection of training data features using statistical distance modeling.</p>
          </div>
          {selectedPoint && (
            <button 
              onClick={resetZoom}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all border border-slate-700 flex items-center gap-2"
            >
              <i className="fas fa-compress-arrows-alt"></i> Reset View
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-bold mb-4 text-teal-400 flex items-center gap-2">
              <i className="fas fa-sliders-h"></i> Simulation Controls
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wider">Data Points</label>
                  <span className="text-xs font-mono text-teal-400">{pointCount}</span>
                </div>
                <input type="range" min="50" max="500" value={pointCount} onChange={(e) => setPointCount(Number(e.target.value))} className="w-full accent-teal-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wider">Attack Noise Level</label>
                  <span className="text-xs font-mono text-rose-400">{noiseLevel}</span>
                </div>
                <input type="range" min="0" max="50" value={noiseLevel} onChange={(e) => setNoiseLevel(Number(e.target.value))} className="w-full accent-rose-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl bg-slate-800/20 space-y-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-chart-pie text-teal-400"></i> Composition Metrics
            </h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-teal-400">Normal Data</span>
                  <span className="text-lg font-mono font-bold text-white">{normalPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-500 transition-all duration-500 ease-out" 
                    style={{ width: `${normalPct}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-rose-500">Adversarial Data</span>
                  <span className="text-lg font-mono font-bold text-white">{adversarialPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 transition-all duration-500 ease-out" 
                    style={{ width: `${adversarialPct}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/50">
              <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold">
                <span>Total Samples</span>
                <span className="text-slate-300">{totalCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 glass-panel p-8 rounded-2xl h-[450px] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart 
                  margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Price Feature" 
                    stroke="#475569" 
                    fontSize={10} 
                    hide 
                    domain={xDomain} 
                    allowDataOverflow 
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Duration Feature" 
                    stroke="#475569" 
                    fontSize={10} 
                    hide 
                    domain={yDomain} 
                    allowDataOverflow 
                  />
                  <ZAxis type="number" dataKey="z" range={[50, 250]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter 
                    name="Data Points" 
                    data={generateData} 
                    onClick={(data) => handlePointClick(data)}
                    cursor="pointer"
                    animationDuration={800}
                    animationEasing="ease-in-out"
                  >
                    {generateData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.type === 'normal' ? '#14b8a6' : '#f43f5e'} 
                        strokeWidth={selectedPoint?.id === entry.id ? 3 : (entry.type === 'adversarial' ? 1 : 0)} 
                        stroke={selectedPoint?.id === entry.id ? '#ffffff' : '#fb7185'}
                        opacity={selectedPoint ? (selectedPoint.id === entry.id ? 1 : 0.3) : 0.8}
                        className="transition-all duration-500"
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Adversarial</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 glass-panel rounded-2xl overflow-hidden border-slate-700/50 flex flex-col min-h-[450px]">
            <div className="p-4 border-b border-slate-700/50 bg-slate-800/40">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-info-circle text-teal-400"></i> Point Details
              </h4>
            </div>
            
            {selectedPoint ? (
              <div className="flex-1 p-5 space-y-5 animate-fade-in overflow-y-auto max-h-[400px]">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">ID Signature</p>
                  <p className="text-sm font-mono text-white break-all">{selectedPoint.id}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/30">
                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">X-Val</p>
                    <p className="text-xs font-mono text-teal-400">{selectedPoint.x.toFixed(2)}</p>
                  </div>
                  <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/30">
                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Y-Val</p>
                    <p className="text-xs font-mono text-teal-400">{selectedPoint.y.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Carrier</p>
                  <p className="text-xs text-slate-200">{selectedPoint.airline}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-bold uppercase">Route</span>
                    <span className="text-slate-300">{selectedPoint.route}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-bold uppercase">Departure</span>
                    <span className="text-slate-300 font-mono">{selectedPoint.depTime}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-bold uppercase">Stops</span>
                    <span className="text-slate-300">{selectedPoint.stops}</span>
                  </div>
                </div>

                <div className={`mt-auto p-3 rounded-xl border ${
                  selectedPoint.type === 'adversarial' 
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                    : 'bg-teal-500/10 border-teal-500/20 text-teal-400'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <i className={`fas ${selectedPoint.type === 'adversarial' ? 'fa-biohazard' : 'fa-shield-alt'} text-xs`}></i>
                    <p className="text-[10px] font-bold uppercase">{selectedPoint.type} detection</p>
                  </div>
                  <p className="text-[9px] leading-relaxed text-slate-400">
                    {selectedPoint.type === 'adversarial' 
                      ? 'Detected as out-of-distribution with high variance. Recommendation: Quarantine and flag for further review.'
                      : 'Verified as within safe clustering bounds. No immediate threat signature found.'
                    }
                  </p>
                </div>
                
                <button 
                  onClick={resetZoom}
                  className="w-full py-2 text-[10px] font-bold text-slate-500 uppercase hover:text-white transition-colors border-t border-slate-700/50 mt-4"
                >
                  Clear Selection & Reset
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-3">
                <i className="fas fa-mouse-pointer text-2xl opacity-20"></i>
                <p className="text-xs leading-relaxed">Select a data point on the map to view detailed forensics and metadata with interactive zoom.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border-slate-700/50">
        <div className="border-b border-slate-700/50 bg-slate-800/40 px-8 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-slate-300">
                <i className="fas fa-file-csv text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-white tracking-tight">IndianFlightData - Sheet1.csv <span className="text-slate-500 font-normal text-sm">(1.11 MB)</span></h3>
                <div className="flex gap-4 mt-1">
                  <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1"><i className="fas fa-calendar"></i> May 2019</span>
                  <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1"><i className="fas fa-table"></i> 11 Columns</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-8">
            {['Detail', 'Compact', 'Column'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 text-sm font-semibold transition-all border-b-2 ${activeTab === tab ? 'text-teal-400 border-teal-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 bg-[#0f172a]/40">
          {activeTab === 'Detail' && (
            <div className="space-y-6">
              <div className="p-6 bg-slate-800/20 rounded-2xl border border-slate-700/30">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-info-circle text-teal-400"></i> About This File
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  This CSV file contains <span className="text-slate-200 font-bold">Indian domestic flight data</span> collected to analyze and predict <span className="text-slate-200 font-bold">flight ticket prices</span>. 
                  Each record represents a single journey, including airline details, route, duration, number of stops, and final fare.
                </p>
                <p className="mt-4 text-sm text-slate-400">
                  Suitable for <span className="text-teal-500 font-semibold">regression modeling, feature engineering</span>, and <span className="text-teal-500 font-semibold">machine learning projects</span>.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Top Airline</p>
                  <p className="text-sm font-bold text-white">Jet Airways <span className="text-teal-400 text-xs font-normal">36%</span></p>
                </div>
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Peak Route</p>
                  <p className="text-sm font-bold text-white">DEL → COK <span className="text-teal-400 text-xs font-normal">22%</span></p>
                </div>
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Avg Duration</p>
                  <p className="text-sm font-bold text-white">5h 25m</p>
                </div>
                <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                  <p className="text-[10px] text-rose-400 uppercase font-bold mb-1">Anomaly Flags</p>
                  <p className="text-sm font-bold text-rose-400">{noiseLevel} Detected</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Compact' && renderCompactView()}

          {activeTab === 'Column' && renderColumnView()}
          
          <div className="mt-8 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest px-2">
            <span>Showing analyzed records from {generateData.length} total samples</span>
            <div className="flex gap-4">
              <button className="hover:text-white transition-colors">Previous Page</button>
              <button className="hover:text-white transition-colors">Next Page</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;

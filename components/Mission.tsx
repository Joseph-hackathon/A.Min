
import React from 'react';

const Mission: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-24 pb-32 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full -z-10"></div>
        <h2 className="text-5xl font-black text-white mb-6 leading-tight">
          Defending the Soul of <span className="text-teal-400 underline decoration-teal-500/30">Artificial Intelligence</span>.
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          AI is eating the world, but its foundation is fragile. We are the gatekeepers ensuring the data that feeds the future remains pure.
        </p>
      </section>

      {/* Act 1: The Problem */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-widest border border-rose-500/20">
            <i className="fas fa-exclamation-triangle"></i> The Threat
          </div>
          <h3 className="text-3xl font-bold text-white">The Invisible Saboteur</h3>
          <p className="text-slate-400 leading-relaxed">
            In the shadows of massive datasets, adversarial actors plant "poisoned" samples. These are subtle, undetectable to the human eye, but catastrophic for a model. A single poisoned stop sign can cause an autonomous vehicle to see "Go"—a silent invitation to chaos.
          </p>
          <div className="glass-panel p-6 rounded-2xl border-rose-500/20 bg-rose-500/5">
            <p className="text-sm italic text-rose-300">
              "Traditional firewalls watch your network. We watch your logic. We stop the attack before the first line of training begins."
            </p>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="glass-panel p-8 rounded-3xl border-rose-500/30 relative">
            <i className="fas fa-biohazard text-6xl text-rose-500 mb-6"></i>
            <div className="space-y-4">
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-3/4 animate-pulse"></div>
              </div>
              <div className="h-2 w-2/3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-1/2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              <p className="text-[10px] font-mono text-rose-400 uppercase tracking-widest">Poisoning Signature Detected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Act 2: The Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 relative group">
          <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full"></div>
          <div className="glass-panel p-10 rounded-3xl border-teal-500/30 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <i className="fas fa-shield-halved text-9xl text-teal-400"></i>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`h-12 rounded-lg ${i === 4 ? 'bg-teal-500 shadow-lg shadow-teal-500/50' : 'bg-slate-800'}`}></div>
              ))}
            </div>
            <p className="text-center mt-6 text-[10px] font-mono text-teal-400 uppercase tracking-widest">A.min Cluster Validation Active</p>
          </div>
        </div>
        <div className="space-y-6 order-1 md:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-widest border border-teal-500/20">
            <i className="fas fa-shield-halved"></i> The Shield
          </div>
          <h3 className="text-3xl font-bold text-white">Data Integrity as a Service</h3>
          <p className="text-slate-400 leading-relaxed">
            A.min isn't just a scanner; it's an immune system for AI. By utilizing advanced K-Means clustering and statistical distance modeling, we isolate anomalies that standard filters miss. We ensure that the data you train on is exactly what you think it is.
          </p>
          <ul className="space-y-3">
            {[
              'Pre-training outlier detection',
              'Real-time adversarial pattern matching',
              'Automated mitigation strategies'
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <i className="fas fa-check-circle text-teal-500"></i> {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Act 3: Our Capabilities */}
      <section className="space-y-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Our Technical Arsenal</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">A comprehensive suite designed for data scientists and security analysts.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Dataset Scanner', 
              icon: 'fa-microscope', 
              desc: 'Deep-level file inspection for corrupted headers and malicious byte patterns.',
              color: 'teal'
            },
            { 
              title: 'Cluster Visualizer', 
              icon: 'fa-project-diagram', 
              desc: 'High-dimensional projection of your data to visually identify "Shadow Clusters".',
              color: 'blue'
            },
            { 
              title: 'AI Intelligence', 
              icon: 'fa-wand-magic-sparkles', 
              desc: 'Gemini-powered security insights that translate complex metrics into actionable defense.',
              color: 'purple'
            }
          ].map((item, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl hover:bg-slate-800/40 transition-all cursor-default group border-transparent hover:border-slate-700">
              <div className={`w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <i className={`fas ${item.icon} text-2xl text-${item.color}-400`}></i>
              </div>
              <h4 className="font-bold text-white mb-3">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="glass-panel p-12 rounded-[3rem] text-center border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-transparent">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Secure Your Model?</h3>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join the leading AI labs using A.min to ensure their future remains untampered.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-teal-500/20">
            Start Scanning
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3 rounded-xl transition-all border border-slate-700">
            Documentation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Mission;

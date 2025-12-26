
import React from 'react';

interface OverviewProps {
  onStartScanning: () => void;
}

const Overview: React.FC<OverviewProps> = ({ onStartScanning }) => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-24 pb-32 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full -z-10"></div>
        
        {/* Partner Logos Section */}
        <div className="flex justify-center gap-8 md:gap-12 mb-12 items-center animate-fade-in">
          <div className="group transition-all duration-300">
            <img 
              src="https://www.vectorlogo.zone/logos/confluent/confluent-ar21.svg" 
              alt="Confluent" 
              className="h-10 md:h-14 opacity-70 group-hover:opacity-100 transition-all filter brightness-0 invert contrast-200" 
            />
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="group transition-all duration-300">
            <img 
              src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-ar21.svg" 
              alt="Google Cloud" 
              className="h-10 md:h-14 opacity-70 group-hover:opacity-100 transition-all" 
            />
          </div>
        </div>

        <h2 className="text-6xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
          Defending <span className="text-teal-400">Data in Motion</span> for the Future of AI.
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          A.Min is a real-time adversarial shield built on Confluent Cloud and Google Cloud. We intercept malicious vectors in the stream before they poison your neural foundation.
        </p>
      </section>

      {/* Act 1: The Problem - Streaming Context */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-widest border border-rose-500/20">
            <i className="fas fa-exclamation-triangle"></i> Stream Injection Threat
          </div>
          <h3 className="text-3xl font-bold text-white">The Real-Time Poison</h3>
          <p className="text-slate-400 leading-relaxed">
            In modern Agentic AI systems, data flows at gigabyte scale via Kafka topics. Traditional security is too slow. Adversarial actors now inject subtle, poisoned telemetry mid-stream, causing autonomous systems to fail "live".
          </p>
          <div className="glass-panel p-6 rounded-2xl border-rose-500/20 bg-rose-500/5">
            <p className="text-sm italic text-rose-300">
              "When your AI is making decisions on data in motion, you can't wait for a weekly batch scan. A.Min intercepts at the Kafka level."
            </p>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="glass-panel p-8 rounded-3xl border-rose-500/30 relative bg-slate-900/40">
            <div className="flex justify-between items-center mb-6">
              <i className="fas fa-bolt-lightning text-4xl text-rose-500"></i>
              <span className="text-[10px] font-black font-mono text-rose-500 uppercase tracking-widest">Kafka Lag Detected</span>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-3/4 animate-pulse"></div>
              </div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-relaxed">Top: prod.flight_telemetry<br/>Partition: 02 | Offset: 1.2M</p>
            </div>
          </div>
        </div>
      </section>

      {/* Act 2: The Solution - Flink & Gemini */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 relative group">
          <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full"></div>
          <div className="glass-panel p-10 rounded-3xl border-teal-500/30 relative overflow-hidden bg-slate-900/40">
            <div className="bg-slate-950/80 p-6 rounded-xl font-mono text-[9px] text-teal-500 border border-slate-800">
              <span className="text-slate-500">-- Flink SQL Integrity Filter</span><br/>
              SELECT * FROM flight_stream<br/>
              WHERE <span className="text-white">FORENSIC_VALIDATE</span>(vector) = 'SAFE';
            </div>
            <p className="text-center mt-6 text-[10px] font-mono text-teal-400 uppercase tracking-widest">Streaming Agent Status: Active</p>
          </div>
        </div>
        <div className="space-y-6 order-1 md:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-widest border border-teal-500/20">
            <i className="fas fa-shield-halved"></i> The Confluent Shield
          </div>
          <h3 className="text-3xl font-bold text-white">Adversarial Defense in Motion</h3>
          <p className="text-slate-400 leading-relaxed">
            By leveraging Confluent Flink SQL, A.Min performs low-latency vector clustering on incoming streams. When an anomaly is detected, we trigger a **Streaming Agent** that uses **Google Gemini** to synthesize a forensic report and quarantine the malicious partition.
          </p>
        </div>
      </section>

      {/* Act 3: Our Capabilities */}
      <section className="space-y-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">The Next-Gen Security Stack</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Seamlessly bridging the gap between real-time data streaming and advanced AI forensics.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Kafka Interceptor', 
              icon: 'fa-diagram-project', 
              desc: 'Continuous monitoring of data topics with zero impact on stream throughput.',
              color: 'teal'
            },
            { 
              title: 'Flink Forensics', 
              icon: 'fa-bolt-lightning', 
              desc: 'Stateless and stateful stream processing to identify "Shadow Clusters" in real-time.',
              color: 'blue'
            },
            { 
              title: 'Gemini Synthesis', 
              icon: 'fa-wand-magic-sparkles', 
              desc: 'Transforming technical stream anomalies into actionable security intelligence.',
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
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join the leading AI labs using A.Min to ensure their future remains untampered.</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={onStartScanning}
            className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-teal-500/20"
          >
            Connect Confluent Topic
          </button>
          <a href="https://docs.confluent.io/cloud/current/ai/overview.html" target="_blank" className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3 rounded-xl transition-all border border-slate-700">
            View Integration Docs
          </a>
        </div>
      </section>
    </div>
  );
};

export default Overview;

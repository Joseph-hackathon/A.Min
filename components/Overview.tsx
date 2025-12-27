
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
          <div className="group transition-all duration-300 mt-4">
            <svg className="h-10 md:h-14 opacity-70 group-hover:opacity-100 transition-all" width="212" height="41" viewBox="0 0 212 41">
              <g fill="#9ca3af" fill-rule="evenodd">
                <path
                    d="M62.065 22.19H64c-.755 3.472-3.705 5.81-7.646 5.81C51.728 28 48 24.55 48 19.989 48 15.427 51.728 12 56.354 12c3.94 0 6.89 2.315 7.646 5.787h-1.935c-.661-2.519-2.785-4.107-5.71-4.107-3.635 0-6.467 2.7-6.467 6.309 0 3.608 2.832 6.332 6.466 6.332 2.926 0 5.05-1.635 5.71-4.131M84 20c0 4.455-3.57 8-8 8s-8-3.545-8-8 3.57-8 8-8 8 3.545 8 8m-1.808 0c0-3.5-2.711-6.318-6.192-6.318-3.48 0-6.192 2.818-6.192 6.318 0 3.5 2.712 6.318 6.192 6.318S82.192 23.5 82.192 20M103 12v16h-1.48l-9.75-12.612V28H90V12h1.435l9.794 12.777V12zM111.86 13.718V19.6h8.15v1.717h-8.15V28H110V12h11v1.718zM138 26.282V28h-11V12h1.914v14.282zM155 20.994c0 4.185-2.79 7.006-7 7.006s-7-2.82-7-7.006V12h1.9v8.994c0 3.075 2.02 5.295 5.1 5.295 3.055 0 5.1-2.22 5.1-5.295V12h1.9v8.994zM163.826 13.718V19.2h8.25v1.718h-8.25v5.365H173V28h-11V12h11v1.718zM191 12v16h-1.48l-9.75-12.612V28H178V12h1.435l9.794 12.777V12zM210 13.718h-5.626V28h-1.77V13.718H197V12h13zM26.375 20.975c.875-.047 1.75-.075 2.625-.139v-.672c-.875-.064-1.75-.092-2.625-.14l-2.625-.081c-1.54-.047-3.08-.06-4.622-.07-.003-1.54-.01-3.082-.051-4.623l-.074-2.625c-.045-.875-.07-1.75-.132-2.625h-.742c-.062.875-.087 1.75-.132 2.625l-.073 2.625c-.02.723-.029 1.447-.036 2.17-.285-.665-.57-1.33-.865-1.991l-1.072-2.397c-.377-.79-.735-1.59-1.127-2.375l-.684.285c.277.831.589 1.65.882 2.475l.937 2.454c.258.675.526 1.346.796 2.018a129.517 129.517 0 0 0-1.56-1.509l-1.908-1.804c-.65-.587-1.287-1.188-1.95-1.763l-.523.524c.574.663 1.175 1.3 1.762 1.95l1.804 1.908c.498.525 1.003 1.043 1.509 1.56-.672-.27-1.343-.538-2.019-.796l-2.453-.937c-.825-.293-1.644-.605-2.476-.883l-.284.685c.785.392 1.584.75 2.375 1.127l2.397 1.072c.66.295 1.325.58 1.99.864-.723.008-1.446.017-2.17.036l-2.624.074c-.875.045-1.75.07-2.625.132v.742c.875.062 1.75.087 2.625.132l2.625.073c1.542.042 3.083.049 4.624.052.01 1.54.022 3.081.069 4.622l.082 2.625c.047.875.075 1.75.139 2.625h.672c.064-.875.092-1.75.14-2.625l.081-2.625c.023-.741.035-1.482.046-2.223.292.681.587 1.361.892 2.037l1.08 2.393c.378.79.738 1.588 1.133 2.373l.62-.259c-.275-.832-.583-1.651-.875-2.478l-.93-2.455c-.262-.694-.534-1.383-.808-2.072.531.517 1.063 1.032 1.604 1.54l1.913 1.799c.652.585 1.29 1.184 1.955 1.758l.476-.476c-.574-.664-1.173-1.303-1.758-1.955l-1.799-1.914a132.32 132.32 0 0 0-1.539-1.603c.688.275 1.377.546 2.07.809l2.457.929c.826.292 1.645.6 2.478.876l.258-.622c-.785-.393-1.582-.755-2.373-1.133l-2.393-1.08c-.676-.304-1.356-.598-2.036-.892.74-.01 1.481-.022 2.222-.045l2.625-.082z"></path>
                <path
                    d="M19 37C9.626 37 2 29.374 2 20 2 10.626 9.626 3 19 3c9.374 0 17 7.626 17 17 0 9.374-7.626 17-17 17m0-32.41C10.503 4.59 3.59 11.502 3.59 20S10.503 35.41 19 35.41 34.41 28.497 34.41 20 27.497 4.59 19 4.59"></path>
              </g>
            </svg>
            {/*<img*/}
            {/*    src="https://www.vectorlogo.zone/logos/confluent/confluent-ar21.svg"*/}
            {/*    alt="Confluent"*/}
            {/*    className="h-10 md:h-14 opacity-70 group-hover:opacity-100 transition-all filter brightness-0 invert contrast-200"*/}
            {/*/>*/}
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
          A.Min is a real-time adversarial shield built on Confluent Cloud and Google Cloud. We intercept malicious
          vectors in the stream before they poison your neural foundation.
        </p>
      </section>

      {/* Act 1: The Problem - Streaming Context */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-widest border border-rose-500/20">
            <i className="fas fa-exclamation-triangle"></i> Stream Injection Threat
          </div>
          <h3 className="text-3xl font-bold text-white">The Real-Time Poison</h3>
          <p className="text-slate-400 leading-relaxed">
            In modern Agentic AI systems, data flows at gigabyte scale via Kafka topics. Traditional security is too
            slow. Adversarial actors now inject subtle, poisoned telemetry mid-stream, causing autonomous systems to
            fail "live".
          </p>
          <div className="glass-panel p-6 rounded-2xl border-rose-500/20 bg-rose-500/5">
            <p className="text-sm italic text-rose-300">
              "When your AI is making decisions on data in motion, you can't wait for a weekly batch scan. A.Min
              intercepts at the Kafka level."
            </p>
          </div>
        </div>
        <div className="relative group">
          <div
              className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
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

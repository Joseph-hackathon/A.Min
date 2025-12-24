
import React, { useState } from 'react';
import { AuthMode } from '../types';

interface AuthProps {
  onLogin: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of authentication
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] relative overflow-hidden p-6">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md glass-panel p-10 rounded-3xl z-10 animate-fade-in shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-4 teal-glow">
            <i className="fas fa-shield-halved text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">A.min</h1>
          <p className="text-teal-400 text-xs font-mono tracking-widest uppercase mt-1">Advanced Security Protocol</p>
        </div>

        <div className="flex mb-8 bg-slate-800/50 p-1 rounded-xl">
          <button 
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'login' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'signup' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2 group"
          >
            {mode === 'login' ? 'Access Shield' : 'Initialize Account'}
            <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500">
          By continuing, you agree to the <span className="text-teal-500 cursor-pointer">Security Protocols</span> and <span className="text-teal-500 cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Auth;

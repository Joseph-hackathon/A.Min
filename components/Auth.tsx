
import React, { useState, useEffect } from 'react';
import { AuthMode } from '../types';
import Logo from './Logo';

interface AuthProps {
  onLogin: (email: string) => void;
  initialMode?: AuthMode;
}

const Auth: React.FC<AuthProps> = ({ onLogin, initialMode = 'login' }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setError(null);
  }, [initialMode]);

  const validate = (): boolean => {
    if (!email.includes('@')) {
      setError("Please enter a valid institutional email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Security protocol requires a minimum of 6 characters.");
      return false;
    }
    // Simulated blacklisted domain
    if (email.endsWith('@malicious.com')) {
      setError("This domain has been blacklisted by A.min Global Intelligence.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setIsLoading(true);

    // Simulation of secure authentication handshake
    setTimeout(() => {
      // 10% chance to simulate a random system failure
      if (Math.random() < 0.1) {
        setError("Encryption handshake failed. Please check your connection and retry.");
        setIsLoading(false);
      } else {
        onLogin(email);
      }
    }, 1500);
  };

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
  };

  return (
    <div className="w-full flex items-center justify-center relative">
      <div className="w-full glass-panel p-10 rounded-3xl z-10 animate-fade-in shadow-2xl bg-slate-900/90 border-slate-700/50">
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" className="mb-4" />
          <h1 className="text-3xl font-black tracking-tighter text-white">A.min</h1>
          <p className="text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase mt-1">Advanced Security Protocol</p>
        </div>

        <div className="flex mb-6 bg-slate-800/50 p-1 rounded-xl border border-slate-700/30">
          <button 
            onClick={() => handleModeChange('login')}
            disabled={isLoading}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${mode === 'login' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => handleModeChange('signup')}
            disabled={isLoading}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${mode === 'signup' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 animate-fade-in">
            <i className="fas fa-circle-exclamation text-rose-500 mt-0.5"></i>
            <div className="flex-1">
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-0.5">Access Denied</p>
              <p className="text-xs text-rose-200/80 leading-relaxed font-medium">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-rose-500/50 hover:text-rose-500">
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Identity Endpoint</label>
            <div className="relative group">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm group-focus-within:text-teal-400 transition-colors"></i>
              <input 
                type="email" 
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="analyst@aminlabs.io"
                className={`w-full bg-slate-950/50 border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${error ? 'border-rose-500/50' : 'border-slate-800 focus:border-teal-500/50'}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Cryptographic Key</label>
            <div className="relative group">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm group-focus-within:text-teal-400 transition-colors"></i>
              <input 
                type="password" 
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="••••••••"
                className={`w-full bg-slate-950/50 border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${error ? 'border-rose-500/50' : 'border-slate-800 focus:border-teal-500/50'}`}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full font-black py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 group relative overflow-hidden ${
              isLoading 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-900/20 active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                <span className="text-xs uppercase tracking-widest">Verifying Protocol...</span>
              </>
            ) : (
              <>
                <span className="text-xs uppercase tracking-widest">{mode === 'login' ? 'Establish Session' : 'Create Identity'}</span>
                <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-slate-600 font-mono leading-relaxed uppercase tracking-tighter">
          Authenticated traffic is monitored under <span className="text-teal-800 font-black cursor-pointer hover:text-teal-600 transition-colors">Directive 14-B</span>.
        </p>
      </div>
    </div>
  );
};

export default Auth;

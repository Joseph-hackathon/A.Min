
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Visualizer from './components/Visualizer';
import Report from './components/Report';
import Auth from './components/Auth';
import { Page } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activePage) {
      case Page.Dashboard:
        return <Dashboard />;
      case Page.Visualizer:
        return <Visualizer />;
      case Page.Report:
        return <Report />;
      case Page.Scanner:
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
            <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-700">
              <i className="fas fa-file-arrow-up text-3xl text-teal-400"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">Dataset Scanner</h2>
            <p className="text-slate-400 max-w-md mb-8">
              Upload dataset files (CSV, JSON, Log) to detect adversarial attack patterns.
              The A.min engine verifies data integrity at the pre-training stage.
            </p>
            <div className="w-full max-w-xl border-2 border-dashed border-slate-700 rounded-3xl p-12 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all cursor-pointer group">
              <input type="file" className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <i className="fas fa-cloud-upload-alt text-4xl text-slate-600 group-hover:text-teal-400 transition-colors mb-4"></i>
                <p className="text-slate-500 group-hover:text-slate-300">Click or drag files here to begin scan</p>
              </label>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-200">
      <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout} />
      
      <main className="flex-1 overflow-y-auto">
        {/* Top Navbar */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-end px-8 sticky top-0 bg-[#0f172a]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-white transition-colors relative">
              <i className="fas fa-bell"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold">{userEmail.split('@')[0]}</p>
                <p className="text-[10px] text-teal-400 uppercase tracking-tighter">Security Analyst</p>
              </div>
              <img 
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${userEmail}`} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[calc(100vh-64px)]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;

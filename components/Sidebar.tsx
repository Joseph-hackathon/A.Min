
import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onLogout }) => {
  const menuItems = [
    { id: Page.Dashboard, label: 'Dashboard', icon: 'fa-chart-pie' },
    { id: Page.Scanner, label: 'Data Scanner', icon: 'fa-microscope' },
    { id: Page.Visualizer, label: 'Cluster Visualizer', icon: 'fa-project-diagram' },
    { id: Page.Report, label: 'Security Report', icon: 'fa-file-shield' },
  ];

  return (
    <div className="w-64 glass-panel border-r border-slate-700 h-screen sticky top-0 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center teal-glow">
          <i className="fas fa-shield-halved text-white text-xl"></i>
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">A.min</h1>
          <p className="text-[10px] text-teal-400 font-mono uppercase tracking-widest">Security System</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activePage === item.id
                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <i className={`fas ${item.icon} w-5`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
        >
          <i className="fas fa-sign-out-alt w-5"></i>
          <span className="font-medium">Logout</span>
        </button>
        
        <div className="pt-6 border-t border-slate-700/50">
          <div className="bg-slate-800/50 p-4 rounded-xl text-xs text-slate-400 text-center font-bold">
            A.min Labs
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

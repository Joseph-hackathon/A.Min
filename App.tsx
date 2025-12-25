
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Visualizer from './components/Visualizer';
import Report from './components/Report';
import Overview from './components/Overview';
import Scanner from './components/Scanner';
import Auth from './components/Auth';
import { Page, AuthMode, ScanResult, HistoryItem } from './types';

const INITIAL_HISTORY: HistoryItem[] = [
  { id: 'SEC-8821', dataset: 'SignData_Autonomous_v4.json', type: 'JSON', date: '2024-05-20 14:32', status: 'Anomalies Blocked', severity: 'Medium', threats: 12 },
  { id: 'SEC-8819', dataset: 'MedicalImaging_OOD_Test.csv', type: 'CSV', date: '2024-05-19 09:15', status: 'Verified Safe', severity: 'Low', threats: 0 },
  { id: 'SEC-8815', dataset: 'FinancialTimeSeries_X.log', type: 'LOG', date: '2024-05-18 18:44', status: 'Critical Poisoning', severity: 'High', threats: 48 },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activePage, setActivePage] = useState<Page>(Page.Overview);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  
  const [latestScan, setLatestScan] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(INITIAL_HISTORY);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setActivePage(Page.Dashboard);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setActivePage(Page.Overview);
  };

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleStartScanning = () => {
    if (!isAuthenticated) {
      openLogin();
    } else {
      setActivePage(Page.Scanner);
    }
  };

  const handleScanComplete = (result: ScanResult) => {
    setLatestScan(result);
    
    // Update history
    const newHistoryItem: HistoryItem = {
      id: `SEC-${Math.floor(1000 + Math.random() * 9000)}`,
      dataset: result.fileName,
      type: result.fileType,
      date: result.timestamp,
      status: result.threatsDetected > 0 ? (result.threatsDetected > 20 ? 'Critical Poisoning' : 'Anomalies Blocked') : 'Verified Safe',
      severity: result.threatsDetected > 20 ? 'High' : result.threatsDetected > 0 ? 'Medium' : 'Low',
      threats: result.threatsDetected
    };
    
    setHistory([newHistoryItem, ...history]);
    setActivePage(Page.Visualizer);
  };

  const renderContent = () => {
    if (!isAuthenticated && activePage !== Page.Overview) {
      return <Overview onStartScanning={handleStartScanning} />;
    }

    switch (activePage) {
      case Page.Dashboard:
        return <Dashboard history={history} />;
      case Page.Visualizer:
        return <Visualizer scanData={latestScan?.dataPoints} fileName={latestScan?.fileName} />;
      case Page.Report:
        return <Report latestScan={latestScan} />;
      case Page.Overview:
        return <Overview onStartScanning={handleStartScanning} />;
      case Page.Scanner:
        return <Scanner onScanComplete={handleScanComplete} />;
      default:
        return <Overview onStartScanning={handleStartScanning} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-200">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onLogout={handleLogout} 
        isAuthenticated={isAuthenticated}
      />
      
      <main className="flex-1 overflow-y-auto relative">
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md">
              <button onClick={() => setIsAuthModalOpen(false)} className="absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors">
                <i className="fas fa-times text-2xl"></i>
              </button>
              <Auth onLogin={handleLogin} initialMode={authMode} />
            </div>
          </div>
        )}

        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 bg-[#0f172a]/80 backdrop-blur-md z-10">
          <div className="text-slate-400 text-xs font-medium italic">
            {isAuthenticated ? 'Authenticated Session' : 'Public Overview Mode'}
          </div>
          <div className="flex items-center gap-6">
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button onClick={openLogin} className="text-slate-300 hover:text-white text-sm font-semibold px-4 py-2">Log In</button>
                <button onClick={openSignup} className="bg-teal-500 hover:bg-teal-400 text-slate-900 text-sm font-bold px-5 py-2 rounded-lg">Sign Up</button>
              </div>
            ) : (
              <>
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
                  <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${userEmail}`} alt="Profile" className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800" />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="min-h-[calc(100vh-64px)]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LandingPage from './LandingPage';
import './styles.css';

const Root = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  return view === 'landing' ? (
    <LandingPage onOpenDashboard={() => setView('dashboard')} />
  ) : (
    <App onBack={() => setView('landing')} />
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
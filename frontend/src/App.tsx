import { useEffect, useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Snapshot {
  id: number;
  capturedAt: string;
  githubCommits: number;
  githubPrs: number;
  githubStars: number;
  leetcodeEasy: number;
  leetcodeMedium: number;
  leetcodeHard: number;
  leetcodeRanking: number;
}

interface AppProps {
  onBack?: () => void;
}

const App = ({ onBack }: AppProps) => {
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [status, setStatus] = useState('Connecting to backend...');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch('/api/history');
        const data = await response.json();
        setHistory(Array.isArray(data) ? data : []);
        setStatus('Connected to backend');
      } catch {
        setHistory([]);
        setStatus('Backend unavailable');
      }
    };

    void loadHistory();
    const interval = window.setInterval(() => {
      void loadHistory();
    }, 10000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const chartData = useMemo(() => history.map((entry) => ({
    label: new Date(entry.capturedAt).toLocaleTimeString(),
    commits: entry.githubCommits,
    prs: entry.githubPrs,
    stars: entry.githubStars,
    easy: entry.leetcodeEasy,
    medium: entry.leetcodeMedium,
    hard: entry.leetcodeHard,
  })), [history]);

  return (
    <div className="app-shell">
      <nav className="top-nav" style={{ padding: 0, marginBottom: '1.5rem' }}>
        <span className="brand">dev<span>graph</span></span>
        {onBack ? (
          <button type="button" className="nav-link" onClick={onBack}>
            ← Back to profile
          </button>
        ) : null}
      </nav>

      <header>
        <h1>Developer Analytics Dashboard</h1>
        <p>Historical snapshots and live updates from the backend.</p>
        <p className="status">{status}</p>
      </header>

      <section className="card-grid">
        {history.length === 0 ? (
          <div className="card empty-state">
            <h2>No snapshot data yet</h2>
            <p>Start the backend and wait for the first refresh.</p>
          </div>
        ) : null}

        <div className="card">
          <h2>GitHub activity</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#2d3748" strokeDasharray="3 3" />
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="commits" stroke="#38bdf8" strokeWidth={2} />
              <Line type="monotone" dataKey="prs" stroke="#34d399" strokeWidth={2} />
              <Line type="monotone" dataKey="stars" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2>LeetCode progress</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#2d3748" strokeDasharray="3 3" />
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="easy" stroke="#60a5fa" strokeWidth={2} />
              <Line type="monotone" dataKey="medium" stroke="#a78bfa" strokeWidth={2} />
              <Line type="monotone" dataKey="hard" stroke="#f472b6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default App;
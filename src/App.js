import { useState, useEffect } from "react";
import Home from "./components/Home";
import Session from "./components/Session";
import Break from "./components/Break";
import Stats from "./components/Stats";
import Learn from "./components/Learn";
import Settings from "./components/Settings";
import Welcome from "./components/Welcome";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  html { font-size: 16px; -webkit-text-size-adjust: 100%; }
  body { background: #080808; color: #EFEFEF; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; height: 100dvh; }
  #root { height: 100dvh; display: flex; flex-direction: column; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
  button { cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; border: none; outline: none; }
  input { font-family: 'Plus Jakarta Sans', sans-serif; outline: none; }

  @keyframes fadeIn  { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-12px); } }
  @keyframes pulse   { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes shake   { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
  @keyframes breatheIn  { from { transform: scale(1); } to { transform: scale(1.4); } }
  @keyframes breatheOut { from { transform: scale(1.4); } to { transform: scale(1); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
  @keyframes roastIn { from { opacity: 0; transform: scale(0.8) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
`;

function getStorage(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function setStorage(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export default function App() {
  const [page, setPage] = useState("home");
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem("fl_welcomed"));
  const [sessionConfig, setSessionConfig] = useState(null);
  const [stats, setStats] = useState(() => getStorage("fl_stats", {
    totalSessions: 0,
    totalMinutes: 0,
    streak: 0,
    lastSessionDate: null,
    weekSessions: [0,0,0,0,0,0,0],
  }));
  const [settings, setSettings] = useState(() => getStorage("fl_settings", {
    sound: "rain",
    volume: 0.4,
    notifications: true,
  }));

  useEffect(() => { setStorage("fl_stats", stats); }, [stats]);
  useEffect(() => { setStorage("fl_settings", settings); }, [settings]);

  const startSession = (config) => {
    setSessionConfig(config);
    setPage("session");
  };

  const completeSession = (minutes) => {
    const today = new Date().toDateString();
    setStats(prev => {
      const lastDate = prev.lastSessionDate;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = lastDate === today ? prev.streak
        : lastDate === yesterday ? prev.streak + 1 : 1;
      const dayOfWeek = new Date().getDay();
      const week = [...prev.weekSessions];
      week[dayOfWeek] = (week[dayOfWeek] || 0) + 1;
      return {
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + minutes,
        streak: newStreak,
        lastSessionDate: today,
        weekSessions: week,
      };
    });
    setPage("break");
  };

  const nav = (p) => setPage(p);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ height: "100dvh", display: "flex", flexDirection: "column", background: "#080808", overflow: "hidden" }}>
        {page === "home"     && <Home onStart={startSession} stats={stats} />}
        {page === "session"  && <Session config={sessionConfig} onComplete={completeSession} onAbandon={() => setPage("home")} settings={settings} />}
        {page === "break"    && <Break onDone={() => setPage("home")} />}
        {page === "stats"    && <Stats stats={stats} onBack={() => setPage("home")} />}
        {page === "learn"    && <Learn onBack={() => setPage("home")} />}
        {page === "settings" && <Settings settings={settings} onChange={setSettings} onBack={() => setPage("home")} />}

        {showWelcome && <Welcome onDone={() => { localStorage.setItem("fl_welcomed","1"); setShowWelcome(false); }} />}
        {/* Bottom Nav */}
        {page !== "session" && page !== "break" && (
          <nav style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "12px 0 max(12px, env(safe-area-inset-bottom))", background: "#0E0E0E", borderTop: "1px solid #1A1A1A", flexShrink: 0 }}>
            {[
              { id: "home",     icon: <TimerIcon />,  label: "Timer"   },
              { id: "stats",    icon: <StatsIcon />,  label: "Stats"   },
              { id: "learn",    icon: <LearnIcon />,  label: "Learn"   },
              { id: "settings", icon: <GearIcon />,   label: "Settings"},
            ].map(({ id, icon, label }) => (
              <button key={id} onClick={() => nav(id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "none", border: "none", padding: "4px 16px", color: page === id ? "#FF6B35" : "#444", transition: "color 0.2s" }}>
                {icon}
                <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}

const TimerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const StatsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const LearnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const GearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

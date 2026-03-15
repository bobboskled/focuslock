const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function Stats({ stats, onBack }) {
  const hrs = Math.floor(stats.totalMinutes / 60);
  const mins = stats.totalMinutes % 60;
  const today = new Date().getDay();
  const maxSessions = Math.max(...stats.weekSessions, 1);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px", overflowY: "auto", animation: "fadeIn 0.4s ease" }}>

      {/* Header */}
      <div style={{ paddingTop: "max(48px, env(safe-area-inset-top))", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF6B35", boxShadow: "0 0 8px #FF6B35" }} />
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#FF6B35", letterSpacing: "0.15em", textTransform: "uppercase" }}>Your Progress</span>
        </div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "28px", fontWeight: "800", color: "#EFEFEF", letterSpacing: "-0.5px" }}>Stats</h1>
      </div>

      {/* Main stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
        {[
          { label: "🔥 Streak",       value: `${stats.streak}d`,    sub: "current" },
          { label: "⏱ Total Focus",   value: hrs > 0 ? `${hrs}h ${mins}m` : `${stats.totalMinutes}m`, sub: "all time" },
          { label: "✅ Sessions",      value: stats.totalSessions,   sub: "completed" },
          { label: "📅 This Week",     value: stats.weekSessions.reduce((a,b)=>a+b,0), sub: "sessions" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#0E0E0E", border: "1px solid #1A1A1A", borderRadius: "14px", padding: "18px 16px" }}>
            <div style={{ fontSize: "11px", color: "#444", fontWeight: "600", marginBottom: "8px" }}>{s.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "24px", fontWeight: "700", color: "#EFEFEF", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "10px", color: "#333", marginTop: "4px" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div style={{ background: "#0E0E0E", border: "1px solid #1A1A1A", borderRadius: "16px", padding: "20px", marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", fontWeight: "700", color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>This Week</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "80px" }}>
          {DAYS.map((day, i) => {
            const count = stats.weekSessions[i] || 0;
            const height = count === 0 ? 4 : Math.max(12, (count / maxSessions) * 80);
            const isToday = i === today;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "100%", height: `${height}px`, background: isToday ? "#FF6B35" : count > 0 ? "#2A1A12" : "#111", borderRadius: "4px", transition: "height 0.3s ease", boxShadow: isToday ? "0 0 8px rgba(255,107,53,0.4)" : "none" }} />
                <span style={{ fontSize: "9px", fontWeight: "600", color: isToday ? "#FF6B35" : "#333", textTransform: "uppercase" }}>{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational message */}
      {stats.totalSessions === 0 ? (
        <div style={{ background: "#0E0E0E", border: "1px solid #1A1A1A", borderRadius: "14px", padding: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "24px", marginBottom: "8px" }}>🔒</p>
          <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>No sessions yet. Your stats will appear here once you lock in for the first time.</p>
        </div>
      ) : stats.streak >= 7 ? (
        <div style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: "14px", padding: "18px", textAlign: "center" }}>
          <p style={{ fontSize: "20px", marginBottom: "6px" }}>🏆</p>
          <p style={{ fontSize: "14px", fontWeight: "700", color: "#FF6B35", marginBottom: "4px" }}>{stats.streak} day streak!</p>
          <p style={{ fontSize: "12px", color: "#666" }}>You're in the top 1% of focus. Seriously.</p>
        </div>
      ) : (
        <div style={{ background: "#0E0E0E", border: "1px solid #1A1A1A", borderRadius: "14px", padding: "18px", textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>
            {stats.totalSessions < 5
              ? "Just getting started. 5 sessions and you'll start feeling the difference."
              : "You're building something real. Keep stacking sessions."}
          </p>
        </div>
      )}

      <div style={{ height: "24px" }} />
    </div>
  );
}

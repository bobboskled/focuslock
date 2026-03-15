import { useState, useEffect } from "react";

const PHASES = [
  { label: "Inhale",  duration: 4, scale: 1.4, color: "#FF6B35" },
  { label: "Hold",    duration: 4, scale: 1.4, color: "#FFB347" },
  { label: "Exhale",  duration: 6, scale: 1.0, color: "#4ECDC4" },
  { label: "Hold",    duration: 2, scale: 1.0, color: "#45B7D1" },
];

const TOTAL_CYCLES = 3;

export default function Break({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(1);
  const [count, setCount] = useState(PHASES[0].duration);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || finished) return;
    const timer = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          const nextPhase = (phase + 1) % PHASES.length;
          if (nextPhase === 0) {
            if (cycle >= TOTAL_CYCLES) {
              setFinished(true);
              clearInterval(timer);
              return 0;
            }
            setCycle(c2 => c2 + 1);
          }
          setPhase(nextPhase);
          return PHASES[nextPhase].duration;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, phase, cycle, finished]);

  const current = PHASES[phase];

  if (!started) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", animation: "fadeIn 0.4s ease", textAlign: "center" }}>
        <div style={{ fontSize: "56px", marginBottom: "24px" }}>🌬️</div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "26px", fontWeight: "800", color: "#EFEFEF", marginBottom: "10px" }}>Take a breath.</h2>
        <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, maxWidth: "280px", marginBottom: "32px" }}>
          You just crushed a focus session. Let's reset your nervous system with 3 cycles of box breathing.
        </p>
        <div style={{ background: "#0E0E0E", border: "1px solid #1A1A1A", borderRadius: "14px", padding: "18px 20px", marginBottom: "32px", width: "100%", maxWidth: "300px", textAlign: "left" }}>
          {PHASES.map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < PHASES.length - 1 ? "1px solid #111" : "none" }}>
              <span style={{ fontSize: "13px", color: "#666" }}>{p.label}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: p.color, fontWeight: "700" }}>{p.duration}s</span>
            </div>
          ))}
        </div>
        <button onClick={() => setStarted(true)}
          style={{ width: "100%", maxWidth: "300px", padding: "16px", background: "#FF6B35", border: "none", borderRadius: "14px", color: "#fff", fontSize: "15px", fontWeight: "800", letterSpacing: "0.05em", marginBottom: "12px", boxShadow: "0 8px 32px rgba(255,107,53,0.25)" }}>
          Start Breathing
        </button>
        <button onClick={onDone}
          style={{ background: "none", border: "none", color: "#333", fontSize: "13px", fontWeight: "600", padding: "8px" }}>
          Skip break →
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", animation: "fadeIn 0.4s ease", textAlign: "center" }}>
        <div style={{ fontSize: "56px", marginBottom: "20px" }}>✨</div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "26px", fontWeight: "800", color: "#EFEFEF", marginBottom: "10px" }}>You're reset.</h2>
        <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, maxWidth: "260px", marginBottom: "36px" }}>
          Your cortisol is down, focus is back up. Ready for another session?
        </p>
        <button onClick={onDone}
          style={{ width: "100%", maxWidth: "300px", padding: "18px", background: "#FF6B35", border: "none", borderRadius: "14px", color: "#fff", fontSize: "15px", fontWeight: "800", letterSpacing: "0.05em", boxShadow: "0 8px 32px rgba(255,107,53,0.25)" }}>
          🔒 Start Next Session
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", textAlign: "center" }}>

      {/* Cycle counter */}
      <div style={{ marginBottom: "32px", display: "flex", gap: "6px" }}>
        {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
          <div key={i} style={{ width: "28px", height: "4px", borderRadius: "2px", background: i < cycle ? "#FF6B35" : "#1A1A1A", transition: "background 0.3s" }} />
        ))}
      </div>

      {/* Breathing circle */}
      <div style={{ position: "relative", width: "220px", height: "220px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" }}>
        {/* Outer glow ring */}
        <div style={{
          position: "absolute", width: "200px", height: "200px", borderRadius: "50%",
          border: `2px solid ${current.color}22`,
          transform: `scale(${current.scale})`,
          transition: `transform ${current.duration}s ease-in-out`,
        }} />
        {/* Main circle */}
        <div style={{
          width: "140px", height: "140px", borderRadius: "50%",
          background: `radial-gradient(circle, ${current.color}22 0%, ${current.color}08 100%)`,
          border: `2px solid ${current.color}66`,
          transform: `scale(${current.scale})`,
          transition: `transform ${current.duration}s ease-in-out, border-color 0.5s`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 40px ${current.color}22`,
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "36px", fontWeight: "700", color: current.color, transition: "color 0.5s" }}>
            {count}
          </span>
        </div>
      </div>

      {/* Phase label */}
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "28px", fontWeight: "800", color: current.color, marginBottom: "6px", transition: "color 0.5s", letterSpacing: "-0.5px" }}>
        {current.label}
      </h3>
      <p style={{ fontSize: "13px", color: "#333", marginBottom: "48px" }}>
        Cycle {cycle} of {TOTAL_CYCLES}
      </p>

      <button onClick={onDone}
        style={{ background: "none", border: "none", color: "#2A2A2A", fontSize: "12px", fontWeight: "600", padding: "8px" }}>
        Skip break →
      </button>
    </div>
  );
}

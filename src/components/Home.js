import { useState } from "react";

const PRESETS = [
  { label: "25 min", value: 25, tag: "Pomodoro" },
  { label: "52 min", value: 52, tag: "52/17" },
  { label: "90 min", value: 90, tag: "Deep Work" },
];

const SOUNDS = [
  { id: "rain",    label: "🌧️ Rain"    },
  { id: "birds",   label: "🐦 Birds"   },
  { id: "silence", label: "🔇 Silence" },
];

export default function Home({ onStart, stats }) {
  const [minutes, setMinutes]   = useState(25);
  const [sound, setSound]       = useState("rain");
  const [inputVal, setInputVal] = useState("25");
  const [shake, setShake]       = useState(false);

  const handleInput = (v) => {
    setInputVal(v);
    const n = parseInt(v);
    if (!isNaN(n) && n > 0 && n <= 300) setMinutes(n);
  };

  const handlePreset = (val) => {
    setMinutes(val);
    setInputVal(String(val));
  };

  const handleStart = () => {
    if (!minutes || minutes < 1) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onStart({ minutes, sound });
  };

  const hrs  = Math.floor(stats.totalMinutes / 60);
  const mins = stats.totalMinutes % 60;

  return (
    <>
      <style>{`
        .preset-btn { transition: all 0.2s ease !important; }
        .preset-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 6px 20px rgba(255,107,53,0.2) !important; }
        .sound-btn { transition: all 0.2s ease !important; }
        .sound-btn:hover { border-color: rgba(255,107,53,0.5) !important; color: #EFEFEF !important; transform: translateY(-1px) !important; }
        .start-btn { transition: all 0.25s ease !important; }
        .start-btn:hover { transform: translateY(-3px) !important; box-shadow: 0 16px 48px rgba(255,107,53,0.5) !important; }
        .start-btn:active { transform: translateY(0px) scale(0.98) !important; }
        .custom-input:focus-within { border-color: #FF6B35 !important; box-shadow: 0 0 0 3px rgba(255,107,53,0.12) !important; }
        .streak-banner { transition: all 0.2s ease; }
        .streak-banner:hover { border-color: rgba(255,107,53,0.4) !important; background: rgba(255,107,53,0.12) !important; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px", overflowY: "auto", animation: "fadeIn 0.4s ease" }}>

        {/* Header */}
        <div style={{ paddingTop: "max(48px, env(safe-area-inset-top))", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF6B35", boxShadow: "0 0 10px #FF6B35", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "10px", fontWeight: "700", color: "#FF6B35", letterSpacing: "0.18em", textTransform: "uppercase" }}>FocusLock</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "30px", fontWeight: "800", color: "#EFEFEF", letterSpacing: "-0.8px", lineHeight: 1.15 }}>
            Ready to<br/><span style={{ color: "#FF6B35", fontStyle: "italic" }}>lock in?</span>
          </h1>
        </div>

        {/* Streak banner */}
        {stats.streak > 0 && (
          <div className="streak-banner" style={{ background: "rgba(255,107,53,0.07)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: "14px", padding: "14px 16px", marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "default" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "22px" }}>🔥</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#FF6B35" }}>{stats.streak} day streak</div>
                <div style={{ fontSize: "11px", color: "#666", marginTop: "1px" }}>Don't break the chain.</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#EFEFEF", fontFamily: "'JetBrains Mono', monospace" }}>
                {hrs > 0 ? `${hrs}h ${mins}m` : `${stats.totalMinutes}m`}
              </div>
              <div style={{ fontSize: "10px", color: "#555", marginTop: "2px" }}>total focus</div>
            </div>
          </div>
        )}


      {/* F11 tip for desktop users */}
      {window.innerWidth > 768 && (
        <div style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.15)", borderRadius: "10px", padding: "9px 14px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px" }}>⌨️</span>
          <p style={{ fontSize: "11px", color: "#666", lineHeight: 1.5 }}>
            Press <kbd style={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: "4px", padding: "1px 6px", fontSize: "11px", color: "#FF6B35", fontFamily: "'JetBrains Mono', monospace" }}>F11</kbd> for fullscreen — way better experience.
          </p>
        </div>
      )}

        {/* Duration label */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ fontSize: "10px", fontWeight: "700", color: "#666", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
            Session Duration
          </label>

          {/* Preset buttons */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {PRESETS.map(p => (
              <button key={p.value} className="preset-btn" onClick={() => handlePreset(p.value)}
                style={{
                  flex: 1, padding: "12px 4px",
                  background: minutes === p.value ? "#FF6B35" : "#111",
                  border: `1px solid ${minutes === p.value ? "#FF6B35" : "#222"}`,
                  borderRadius: "12px",
                  color: minutes === p.value ? "#fff" : "#888",
                  fontSize: "13px", fontWeight: "700",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
                  boxShadow: minutes === p.value ? "0 4px 16px rgba(255,107,53,0.3)" : "none",
                }}>
                <span>{p.label}</span>
                <span style={{ fontSize: "9px", fontWeight: "600", opacity: 0.75, letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.tag}</span>
              </button>
            ))}
          </div>

          {/* Custom input */}
          <div style={{ animation: shake ? "shake 0.5s ease" : "none" }}>
            <div className="custom-input" style={{ display: "flex", alignItems: "center", background: "#0E0E0E", border: "1px solid #222", borderRadius: "12px", padding: "12px 18px", gap: "12px", transition: "all 0.2s" }}>
              <input
                type="number" min="1" max="300" value={inputVal}
                onChange={e => handleInput(e.target.value)}
                style={{ flex: 1, background: "none", border: "none", color: "#EFEFEF", fontSize: "30px", fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", width: "100%", letterSpacing: "-1px" }}
                placeholder="25"
              />
              <span style={{ fontSize: "13px", color: "#555", fontWeight: "600" }}>min</span>
            </div>
            <p style={{ fontSize: "11px", color: "#444", marginTop: "5px", marginLeft: "4px" }}>1 – 300 minutes</p>
          </div>
        </div>

        {/* Sound */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ fontSize: "10px", fontWeight: "700", color: "#666", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
            Background Sound
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            {SOUNDS.map(s => (
              <button key={s.id} className="sound-btn" onClick={() => setSound(s.id)}
                style={{
                  flex: 1, padding: "11px 6px",
                  background: sound === s.id ? "rgba(255,107,53,0.1)" : "#0E0E0E",
                  border: `1px solid ${sound === s.id ? "#FF6B35" : "#222"}`,
                  borderRadius: "12px",
                  color: sound === s.id ? "#FF6B35" : "#777",
                  fontSize: "12px", fontWeight: "600",
                  boxShadow: sound === s.id ? "0 0 12px rgba(255,107,53,0.15)" : "none",
                }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div style={{ background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: "12px", padding: "13px 16px", marginBottom: "20px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "1px" }}>⚠️</span>
          <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.65 }}>
            Once you start, <span style={{ color: "#FF6B35", fontWeight: "700" }}>you cannot pause</span>. The timer runs to the end. No excuses. No crying.
          </p>
        </div>

        {/* Start button */}
        <button className="start-btn" onClick={handleStart}
          style={{
            width: "100%", padding: "18px",
            background: "#FF6B35", border: "none",
            borderRadius: "14px", color: "#fff",
            fontSize: "16px", fontWeight: "800",
            letterSpacing: "0.04em", textTransform: "uppercase",
            marginBottom: "28px",
            boxShadow: "0 8px 32px rgba(255,107,53,0.35)",
            cursor: "pointer",
          }}>
          🔒 Lock In — {minutes} min
        </button>

      </div>
    </>
  );
}

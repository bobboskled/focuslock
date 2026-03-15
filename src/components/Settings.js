const SOUNDS = [
  { id: "rain",       label: "🌧️ Rain",        desc: "Soft rainfall" },
  { id: "whitenoise", label: "🌊 White Noise",  desc: "Pure white noise" },
  { id: "silence",    label: "🔇 Silence",      desc: "No sound" },
];

export default function Settings({ settings, onChange, onBack }) {
  const update = (key, val) => onChange(prev => ({ ...prev, [key]: val }));

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px", overflowY: "auto", animation: "fadeIn 0.4s ease" }}>

      <div style={{ paddingTop: "max(48px, env(safe-area-inset-top))", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF6B35", boxShadow: "0 0 8px #FF6B35" }} />
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#FF6B35", letterSpacing: "0.15em", textTransform: "uppercase" }}>FocusLock</span>
        </div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "28px", fontWeight: "800", color: "#EFEFEF", letterSpacing: "-0.5px" }}>Settings</h1>
      </div>

      {/* Sound */}
      <div style={{ marginBottom: "28px" }}>
        <label style={{ fontSize: "11px", fontWeight: "700", color: "#444", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
          Ambient Sound
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {SOUNDS.map(s => (
            <button key={s.id} onClick={() => update("sound", s.id)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: settings.sound === s.id ? "rgba(255,107,53,0.08)" : "#0E0E0E", border: `1px solid ${settings.sound === s.id ? "rgba(255,107,53,0.3)" : "#1A1A1A"}`, borderRadius: "12px", transition: "all 0.2s" }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: settings.sound === s.id ? "#FF6B35" : "#EFEFEF" }}>{s.label}</div>
                <div style={{ fontSize: "11px", color: "#444", marginTop: "2px" }}>{s.desc}</div>
              </div>
              {settings.sound === s.id && (
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#FF6B35", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Volume */}
      <div style={{ marginBottom: "28px" }}>
        <label style={{ fontSize: "11px", fontWeight: "700", color: "#444", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
          Volume — {Math.round(settings.volume * 100)}%
        </label>
        <input type="range" min="0" max="1" step="0.05" value={settings.volume}
          onChange={e => update("volume", parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: "#FF6B35", height: "4px" }}
        />
      </div>

      {/* About */}
      <div style={{ background: "#0E0E0E", border: "1px solid #1A1A1A", borderRadius: "14px", padding: "20px", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#FF6B35", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🔒</div>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", fontWeight: "800", color: "#EFEFEF" }}>FocusLock</span>
        </div>
        <p style={{ fontSize: "12px", color: "#444", lineHeight: 1.7 }}>
          The focus timer that won't let you quit. Built for students who are serious about their future.
        </p>
      </div>

      {/* Install PWA tip */}
      <div style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.15)", borderRadius: "14px", padding: "16px", marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", fontWeight: "700", color: "#FF6B35", marginBottom: "4px" }}>📱 Install on your phone</p>
        <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.6 }}>
          iPhone: tap the Share button → "Add to Home Screen"<br/>
          Android: tap the menu → "Install app"
        </p>
      </div>

      <div style={{ height: "24px" }} />
    </div>
  );
}

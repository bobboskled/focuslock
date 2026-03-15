import { useState, useEffect, useRef, useCallback } from "react";

const ROAST_MESSAGES = [
  { title: "Bro really?", body: "You have been at this for like 5 minutes. Sit down." },
  { title: "Lock in", body: "Your future self is watching you. Do not embarrass both of you." },
  { title: "Nah fam", body: "The WiFi will still exist after your session. I promise." },
  { title: "That notification can wait.", body: "Your focus cannot. Stay in your seat." },
  { title: "Average people quit.", body: "You are not average... right? RIGHT?" },
  { title: "You were SO close", body: "Just a few more minutes. The internet will survive without you." },
  { title: "Bestie no", body: "You literally just started. Get back to work." },
  { title: "Stay locked in", body: "Every distraction is stealing from your future. Choose wisely." },
  { title: "This ain't it chief.", body: "Quitting now would be a crime against your potential." },
  { title: "One more minute won't hurt.", body: "Actually it will help. A lot. Keep going." },
  { title: "Your phone misses you?", body: "Good. Let it miss you. You have got work to do." },
  { title: "Seriously bro", body: "You set this timer yourself. YOU chose this. Now finish it." },
  { title: "The grind does not pause", body: "Neither does the competition. They are studying right now." },
  { title: "Not today.", body: "Distraction wants you to quit. Prove it wrong." },
  { title: "STAY.", body: "Plant yourself in that chair. You are not done yet." },
  { title: "That can 100% wait.", body: "Whatever pulled your attention is not more important than your future." },
  { title: "You have survived worse.", body: "You can handle a few more minutes of focus. Trust." },
  { title: "Clock is still ticking", body: "And so is your potential. Do not waste either." },
  { title: "Real ones do not fold.", body: "You started this session for a reason. Remember that reason." },
  { title: "Imagine explaining this...", body: "I quit my study session because I got bored. Nah. Not you." },
  { title: "The timer won't stop.", body: "But your excuses can. Get back to work." },
  { title: "You got this fr", body: "No cap, you are closer to the end than you think. Keep going." },
  { title: "Future you is cringing.", body: "Do not make them regret this moment. Lock back in." },
  { title: "One tab. One task.", body: "Close everything else. This is your only job right now." },
  { title: "That is a skill issue.", body: "And the skill is focus. Lucky for you, it is trainable. Start now." },
];

const MOTIVATIONAL = [
  "You're doing amazing 🔥",
  "Half way there. Don't stop now.",
  "Deep work is your superpower.",
  "Every minute counts. Keep going.",
  "Your brain is building new connections right now.",
  "The hardest part was starting. You already won.",
];

const BUILTIN_SCENES = [
  { id: "rain",    label: "🌧️ Rain",    audio: "/sounds/liecio-calming-rain-257596.mp3",                          video: "/videos/rain.mp4" },
  { id: "birds",   label: "🐦 Birds",   audio: "/sounds/nils_vega-birds-singing-in-early-summer-359446.mp3",      video: "/videos/birds.mp4" },
  { id: "silence", label: "🔇 Silence", audio: null, video: null },
];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function TimerRing({ progress, size = 260 }) {
  const r = (size - 20) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - progress);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#FF6B35" strokeWidth="6"
        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s linear", filter: "drop-shadow(0 0 10px rgba(255,107,53,0.8))" }}
      />
    </svg>
  );
}

export default function Session({ config, onComplete, onAbandon, settings }) {
  const totalSeconds = config.minutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [roast, setRoast]         = useState(null);
  const [motiv, setMotiv]         = useState(null);
  const [done, setDone]           = useState(false);
  const [elapsed, setElapsed]     = useState(0);
  const [volume, setVolume]       = useState(settings.volume ?? 0.5);
  const [customAudioUrl, setCustomAudioUrl] = useState(null);
  const [customBgUrl, setCustomBgUrl]       = useState(null);
  const [customBgIsVideo, setCustomBgIsVideo] = useState(false);

  const audioRef    = useRef(null);
  const intervalRef = useRef(null);
  const roastIndex  = useRef(0);

  const scene = BUILTIN_SCENES.find(s => s.id === config.sound) || BUILTIN_SCENES[2];

  // Audio setup
  useEffect(() => {
    const audioSrc = customAudioUrl || scene.audio;
    if (!audioSrc) return;
    const audio = new Audio(audioSrc);
    audio.loop   = true;
    audio.volume = volume;
    audio.play().catch(() => {});
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.audio, customAudioUrl]);

  // Live volume control
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Countdown
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(intervalRef.current); setDone(true); return 0; }
        return r - 1;
      });
      setElapsed(e => e + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Motivational toasts
  useEffect(() => {
    if (elapsed > 0 && elapsed % 300 === 0) {
      const msg = MOTIVATIONAL[Math.floor(elapsed / 300) % MOTIVATIONAL.length];
      setMotiv(msg);
      setTimeout(() => setMotiv(null), 4000);
    }
  }, [elapsed]);

  // Tab leave detection
  useEffect(() => {
    const handleVisibility = () => { if (document.hidden && !done) showRoast(); };
    const handleBeforeUnload = (e) => { if (!done) { e.preventDefault(); e.returnValue = ""; } };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [done, showRoast]);

  const showRoast = useCallback(() => {
    setRoast(ROAST_MESSAGES[roastIndex.current % ROAST_MESSAGES.length]);
    roastIndex.current++;
  }, []);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
    setCustomAudioUrl(URL.createObjectURL(file));
  };

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCustomBgIsVideo(file.type.startsWith("video/"));
    setCustomBgUrl(URL.createObjectURL(file));
  };

  const bgVideoSrc = customBgUrl && customBgIsVideo ? customBgUrl : (!customBgUrl && scene.video ? scene.video : null);
  const bgImgSrc   = customBgUrl && !customBgIsVideo ? customBgUrl : null;

  const progress = 1 - remaining / totalSeconds;
  const pct = Math.round(progress * 100);

  // ── Done screen ──────────────────────────────────
  if (done) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", animation: "fadeIn 0.5s ease", textAlign: "center", background: "#080808" }}>
        <div style={{ fontSize: "72px", marginBottom: "24px" }}>🏆</div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "32px", fontWeight: "800", color: "#EFEFEF", marginBottom: "8px" }}>Session Complete!</h2>
        <p style={{ fontSize: "15px", color: "#555", marginBottom: "8px" }}>You locked in for</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "40px", fontWeight: "700", color: "#FF6B35", marginBottom: "32px" }}>{config.minutes} min</p>
        <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: "16px", padding: "20px 24px", marginBottom: "32px", width: "100%", maxWidth: "320px" }}>
          <p style={{ fontSize: "14px", color: "#888", marginBottom: "4px" }}>You actually did it. No cap.</p>
          <p style={{ fontSize: "13px", color: "#444" }}>Take a short break. You earned it.</p>
        </div>
        <button onClick={() => onComplete(config.minutes)}
          style={{ width: "100%", maxWidth: "320px", padding: "18px", background: "#FF6B35", border: "none", borderRadius: "14px", color: "#fff", fontSize: "16px", fontWeight: "800", boxShadow: "0 8px 32px rgba(255,107,53,0.3)" }}>
          Start Break →
        </button>
      </div>
    );
  }

  // ── Active session ────────────────────────────────
  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

      {/* Background video */}
      {bgVideoSrc && (
        <video src={bgVideoSrc} autoPlay loop muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, zIndex: 0 }}
        />
      )}
      {/* Background image */}
      {bgImgSrc && (
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImgSrc})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35, zIndex: 0 }} />
      )}
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.85) 100%)", zIndex: 1 }} />

      {/* Roast overlay */}
      {roast && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px", animation: "roastIn 0.3s ease" }}>
          <div style={{ background: "#0E0E0E", border: "1px solid #2A2A2A", borderRadius: "20px", padding: "32px 28px", maxWidth: "340px", width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "22px", fontWeight: "800", color: "#EFEFEF", marginBottom: "10px" }}>{roast.title}</h3>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6, marginBottom: "28px" }}>{roast.body}</p>
            <button onClick={() => setRoast(null)}
              style={{ width: "100%", padding: "14px", background: "#FF6B35", border: "none", borderRadius: "12px", color: "#fff", fontSize: "14px", fontWeight: "800", marginBottom: "10px" }}>
              Back to work 💪
            </button>
            <button onClick={() => { setRoast(null); onAbandon(); }}
              style={{ width: "100%", padding: "12px", background: "none", border: "1px solid #222", borderRadius: "12px", color: "#333", fontSize: "12px", fontWeight: "600" }}>
              Give up (not recommended)
            </button>
          </div>
        </div>
      )}

      {/* Motivational toast */}
      {motiv && (
        <div style={{ position: "absolute", top: "16px", left: "50%", transform: "translateX(-50%)", background: "#FF6B35", borderRadius: "20px", padding: "8px 20px", fontSize: "13px", fontWeight: "700", color: "#fff", whiteSpace: "nowrap", zIndex: 10 }}>
          {motiv}
        </div>
      )}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "24px" }}>

        <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF6B35", boxShadow: "0 0 8px #FF6B35", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#FF6B35", letterSpacing: "0.15em", textTransform: "uppercase" }}>Session Active</span>
        </div>

        <div style={{ position: "relative", marginBottom: "16px" }}>
          <TimerRing progress={progress} size={260} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "48px", fontWeight: "700", color: "#EFEFEF", letterSpacing: "-2px", lineHeight: 1, textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
              {formatTime(remaining)}
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "6px" }}>{pct}% done</span>
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "24px" }}>
          {config.minutes} min · {customAudioUrl ? "🎵 Custom audio" : scene.label}
        </p>

        {/* Live volume slider */}
        <div style={{ width: "100%", maxWidth: "280px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "16px" }}>🔈</span>
          <input type="range" min="0" max="1" step="0.05" value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: "#FF6B35" }}
          />
          <span style={{ fontSize: "16px" }}>🔊</span>
        </div>

        {/* Custom upload buttons */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
          <label style={{ padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: customAudioUrl ? "#FF6B35" : "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>
            🎵 {customAudioUrl ? "Audio ✓" : "Custom Audio"}
            <input type="file" accept="audio/*" onChange={handleAudioUpload} style={{ display: "none" }} />
          </label>
          <label style={{ padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: customBgUrl ? "#FF6B35" : "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>
            🖼️ {customBgUrl ? "BG ✓" : "Custom BG"}
            <input type="file" accept="image/*,video/*" onChange={handleBgUpload} style={{ display: "none" }} />
          </label>
        </div>

        <button onClick={showRoast}
          style={{ padding: "10px 24px", background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "rgba(255,255,255,0.15)", fontSize: "12px", fontWeight: "600" }}>
          I want to leave
        </button>
        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.08)", marginTop: "6px" }}>(go ahead, see what happens 👀)</p>
      </div>
    </div>
  );
}

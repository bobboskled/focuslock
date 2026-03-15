import { useState } from "react";

const STEPS = [
  {
    emoji: "🔒",
    title: "Welcome to FocusLock",
    body: "The focus timer built for students who are serious about their future. No fluff. No excuses. Just deep work.",
    cta: "Let's go →",
  },
  {
    emoji: "⏱️",
    title: "Set your timer. Lock in.",
    body: "Pick how long you want to study — 25 minutes, 90 minutes, or any custom time. Once you hit start, the timer runs until the end. No pausing.",
    cta: "Got it →",
  },
  {
    emoji: "😤",
    title: "Try to leave. We dare you.",
    body: "If you try to quit early, we'll roast you back to your seat. Your future self will thank us later.",
    cta: "Sounds fair →",
  },
  {
    emoji: "🌬️",
    title: "Breathe between sessions.",
    body: "After every session, FocusLock guides you through a quick breathing exercise to reset your brain before the next round.",
    cta: "I'm ready →",
  },
  {
    emoji: "📊",
    title: "Track your streaks.",
    body: "Every session builds your streak. Every minute adds to your total focus time. Watch yourself become someone who actually gets things done.",
    cta: "Start focusing 🔒",
  },
];

export default function Welcome({ onDone }) {
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      setExiting(true);
      setTimeout(onDone, 400);
    }
  };

  const current = STEPS[step];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.96)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
      animation: exiting ? "fadeOut 0.4s ease forwards" : "fadeIn 0.4s ease",
    }}>
      <div style={{
        width: "100%", maxWidth: "360px",
        background: "#0A0A0A",
        border: "1px solid #1E1E1E",
        borderRadius: "24px",
        padding: "36px 28px 28px",
        textAlign: "center",
        animation: "slideUp 0.4s ease",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Glow effect */}
        <div style={{ position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Step dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "32px" }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              width: i === step ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === step ? "#FF6B35" : i < step ? "#3A1A0A" : "#1A1A1A",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>

        {/* Emoji */}
        <div style={{ fontSize: "56px", marginBottom: "20px", animation: "fadeIn 0.3s ease" }} key={`emoji-${step}`}>
          {current.emoji}
        </div>

        {/* Title */}
        <h2 key={`title-${step}`} style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "22px", fontWeight: "800",
          color: "#EFEFEF", marginBottom: "14px",
          lineHeight: 1.25, letterSpacing: "-0.3px",
          animation: "fadeIn 0.3s ease",
        }}>
          {current.title}
        </h2>

        {/* Body */}
        <p key={`body-${step}`} style={{
          fontSize: "14px", color: "#888",
          lineHeight: 1.75, marginBottom: "32px",
          animation: "fadeIn 0.3s ease",
        }}>
          {current.body}
        </p>

        {/* CTA button */}
        <button onClick={next} style={{
          width: "100%", padding: "16px",
          background: "#FF6B35", border: "none",
          borderRadius: "14px", color: "#fff",
          fontSize: "15px", fontWeight: "800",
          letterSpacing: "0.03em",
          boxShadow: "0 8px 32px rgba(255,107,53,0.35)",
          transition: "all 0.2s",
          cursor: "pointer",
        }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(255,107,53,0.5)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 32px rgba(255,107,53,0.35)"; }}
        >
          {current.cta}
        </button>

        {/* Skip */}
        {step < STEPS.length - 1 && (
          <button onClick={() => { setExiting(true); setTimeout(onDone, 400); }}
            style={{ background: "none", border: "none", color: "#2A2A2A", fontSize: "12px", fontWeight: "600", marginTop: "14px", cursor: "pointer", padding: "4px", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#555"}
            onMouseLeave={e => e.target.style.color = "#2A2A2A"}
          >
            Skip intro
          </button>
        )}
      </div>
    </div>
  );
}

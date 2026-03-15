import { useState } from "react";

const ARTICLES = [
  {
    id: 1,
    emoji: "🧠",
    tag: "Science",
    title: "Why Your Brain Craves Distraction",
    readTime: "3 min",
    color: "#FF6B35",
    content: [
      { type: "p", text: "Your brain is not broken. It's doing exactly what millions of years of evolution designed it to do — scan for novelty and reward." },
      { type: "h", text: "The Dopamine Loop" },
      { type: "p", text: "Every time you get a notification, your brain releases a tiny hit of dopamine — the same chemical released by gambling, sugar, and social approval. Your phone is basically a slot machine you carry in your pocket." },
      { type: "p", text: "The problem isn't willpower. It's that your environment has been engineered by billion-dollar companies to hijack your attention 24/7." },
      { type: "h", text: "Attention Spans Aren't Shrinking" },
      { type: "p", text: "The popular claim that humans now have shorter attention spans than goldfish is actually a myth. What IS happening is that the threshold for choosing distraction has dropped dramatically. We haven't lost the ability to focus — we've lost the habit." },
      { type: "h", text: "The Good News" },
      { type: "p", text: "The brain is neuroplastic. Every time you resist distraction and push through discomfort, you strengthen the prefrontal cortex — the part of your brain responsible for focus, planning, and self-control. FocusLock exists to help you do exactly this." },
    ]
  },
  {
    id: 2,
    emoji: "⚡",
    tag: "Method",
    title: "Deep Work: The Skill That Pays",
    readTime: "4 min",
    color: "#FFB347",
    content: [
      { type: "p", text: "Cal Newport coined the term 'Deep Work' to describe the ability to focus without distraction on cognitively demanding tasks. It's rare, valuable, and becoming rarer." },
      { type: "h", text: "Shallow vs Deep" },
      { type: "p", text: "Shallow work is emails, meetings, admin — stuff that anyone could do. Deep work is the creative, analytical, and complex stuff that moves the needle. Most people spend 80% of their day on shallow work and wonder why they feel unproductive." },
      { type: "h", text: "The 90-Minute Block" },
      { type: "p", text: "Research shows the human brain operates in ultradian rhythms of approximately 90 minutes. After 90 minutes of focused work, your brain naturally needs a break. This is why our Deep Work timer is 90 minutes — it aligns with your biology, not against it." },
      { type: "h", text: "How to Start" },
      { type: "p", text: "1. Schedule deep work blocks in your calendar like meetings.\n2. Choose ONE task before you start.\n3. Remove all possible interruptions.\n4. Start with shorter sessions (25 min) and build up.\n5. Protect your mornings — willpower depletes throughout the day." },
    ]
  },
  {
    id: 3,
    emoji: "📱",
    tag: "Dopamine",
    title: "How to Break Your Phone Addiction",
    readTime: "5 min",
    color: "#4ECDC4",
    content: [
      { type: "p", text: "The average person checks their phone 96 times per day — once every 10 minutes. Each check interrupts your focus for an average of 23 minutes to fully recover." },
      { type: "h", text: "The Cost of Switching" },
      { type: "p", text: "Every time you switch tasks — even for 2 seconds to check a notification — your brain pays a 'switching cost.' You lose the thread, momentum, and depth of what you were doing. Multiply this by 96 daily interruptions and you've lost hours of productive thinking." },
      { type: "h", text: "Practical Fixes" },
      { type: "p", text: "🔕 Turn off ALL non-essential notifications. You don't need to know about likes in real time.\n\n📦 Put your phone in another room while studying. Out of sight, out of mind is backed by science.\n\n⏰ Set specific times to check messages (e.g., 12pm and 6pm only).\n\n🌑 Use grayscale mode — color screens are more addictive." },
      { type: "h", text: "The 30-Day Challenge" },
      { type: "p", text: "Delete social media apps from your phone for 30 days. You can still access them on desktop. Most people who do this report dramatic improvements in focus, mood, and sleep within the first week." },
    ]
  },
  {
    id: 4,
    emoji: "😴",
    tag: "Recovery",
    title: "Why Rest Is Part of the Work",
    readTime: "3 min",
    color: "#A78BFA",
    content: [
      { type: "p", text: "Grinding 12 hours a day without breaks doesn't make you more productive. It makes you less. Here's why." },
      { type: "h", text: "The Default Mode Network" },
      { type: "p", text: "When you're not actively thinking, your brain switches to what neuroscientists call the Default Mode Network (DMN). This is where your best ideas come from — insights, connections, creativity. The shower thought is real." },
      { type: "p", text: "By never giving yourself true rest, you starve this network. You become a machine that can only execute, never innovate." },
      { type: "h", text: "The Pomodoro Effect" },
      { type: "p", text: "The reason short breaks between focus sessions work isn't just about preventing burnout. The break allows your hippocampus to consolidate what you just learned into long-term memory. Study → break → study is neurologically superior to marathon cramming." },
      { type: "h", text: "What Counts as Rest" },
      { type: "p", text: "Scrolling Instagram is NOT rest. It's more stimulation. Real rest means: walking, breathing exercises (like the one FocusLock provides), light stretching, or staring out a window. Boring? Yes. Effective? Absolutely." },
    ]
  },
  {
    id: 5,
    emoji: "🔥",
    tag: "Mindset",
    title: "The Identity Shift That Changes Everything",
    readTime: "3 min",
    color: "#F472B6",
    content: [
      { type: "p", text: "Most people try to build habits by relying on motivation. \"I'll feel like it tomorrow.\" \"I just need to get inspired.\" This approach fails almost every time." },
      { type: "h", text: "Motivation vs Identity" },
      { type: "p", text: "James Clear in Atomic Habits argues that lasting change comes from identity, not outcomes. Instead of \"I want to study more,\" say \"I am someone who shows up and does the work every day, no matter what.\"" },
      { type: "p", text: "Every time you complete a FocusLock session, you cast a vote for the identity of being a focused, disciplined person. One session might not change your life. But 50 sessions? 100? The compound effect is enormous." },
      { type: "h", text: "The 2-Minute Rule" },
      { type: "p", text: "If you don't feel like starting, tell yourself you only have to do 2 minutes. Just open the book. Just write one sentence. Almost always, starting is the hardest part. Once you're in motion, you'll keep going." },
      { type: "p", text: "FocusLock is not just a timer. It's a commitment device. Every session is a promise you keep to yourself." },
    ]
  },
];

export default function Learn({ onBack }) {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    const article = ARTICLES[selected];
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", animation: "fadeIn 0.3s ease" }}>
        <div style={{ padding: "max(48px, env(safe-area-inset-top)) 24px 24px", borderBottom: "1px solid #111", flexShrink: 0 }}>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#FF6B35", fontSize: "13px", fontWeight: "700", padding: 0, marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
            ← Back to articles
          </button>
          <div style={{ display: "inline-block", background: `${article.color}18`, border: `1px solid ${article.color}33`, borderRadius: "20px", padding: "4px 12px", marginBottom: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: article.color, letterSpacing: "0.08em" }}>{article.tag} · {article.readTime} read</span>
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "22px", fontWeight: "800", color: "#EFEFEF", lineHeight: 1.3 }}>
            {article.emoji} {article.title}
          </h2>
        </div>
        <div style={{ padding: "24px", flex: 1 }}>
          {article.content.map((block, i) => (
            block.type === "h"
              ? <h3 key={i} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "16px", fontWeight: "700", color: article.color, marginBottom: "10px", marginTop: i > 0 ? "24px" : "0" }}>{block.text}</h3>
              : <p key={i} style={{ fontSize: "14px", color: "#888", lineHeight: 1.8, marginBottom: "12px", whiteSpace: "pre-line" }}>{block.text}</p>
          ))}
          <div style={{ height: "32px" }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px", overflowY: "auto", animation: "fadeIn 0.4s ease" }}>
      <div style={{ paddingTop: "max(48px, env(safe-area-inset-top))", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF6B35", boxShadow: "0 0 8px #FF6B35" }} />
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#FF6B35", letterSpacing: "0.15em", textTransform: "uppercase" }}>Knowledge</span>
        </div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "28px", fontWeight: "800", color: "#EFEFEF", letterSpacing: "-0.5px" }}>Learn</h1>
        <p style={{ fontSize: "13px", color: "#444", marginTop: "6px" }}>Understand your brain. Work with it, not against it.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "24px" }}>
        {ARTICLES.map((a, i) => (
          <button key={a.id} onClick={() => setSelected(i)}
            style={{ background: "#0E0E0E", border: "1px solid #1A1A1A", borderRadius: "16px", padding: "18px", textAlign: "left", transition: "border-color 0.2s", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${a.color}18`, border: `1px solid ${a.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
              {a.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                <span style={{ fontSize: "10px", fontWeight: "700", color: a.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{a.tag}</span>
                <span style={{ fontSize: "10px", color: "#333" }}>· {a.readTime}</span>
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", fontWeight: "700", color: "#EFEFEF", lineHeight: 1.35 }}>{a.title}</h3>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "4px" }}>
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

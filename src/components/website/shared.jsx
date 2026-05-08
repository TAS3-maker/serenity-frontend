import { useState } from "react";
/**
 * website/shared.jsx
 * Shared primitives used across all website pages.
 * Keeps each page file lean.
 */
import { C } from "../../tokens";

// ─── Section wrapper ────────────────────────────────────────────
export const Sec = ({ bg = "var(--bg)", className = "", children }) => (
  <section className={`web-section ${className}`} style={{ background: bg }}>
    <div className="web-container">{children}</div>
  </section>
);

// ─── Section heading block ──────────────────────────────────────
export const Heading = ({ tag, h, sub, center = true, light = false, size = 44 }) => (
  <div className={`${center ? "text-center" : ""} mb-14`}>
    {tag && (
      <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-5 ${light ? "" : "web-tag"}`}
        style={light ? { background: "rgba(13,115,119,0.3)", color: C.teal, border: "1px solid rgba(13,115,119,0.4)" } : {}}>
        {tag}
      </div>
    )}
    <h2 className={`font-display font-bold leading-[1.1] tracking-[-1px] mb-4 ${light ? "text-white" : "text-[var(--text)]"}`} style={{ fontSize: size }}>
      {h}
    </h2>
    {sub && <p className={`text-lg max-w-[520px] ${center ? "mx-auto" : ""} leading-[1.75] ${light ? "text-white/50" : "text-[var(--textMuted)]"}`}>{sub}</p>}
  </div>
);

// ─── Dark hero (used by every page) ────────────────────────────
export const Hero = ({ tag, h, sub, children, align = "center" }) => (
  <section className="web-section" style={{ background: C.navy }}>
    <div className="web-container">
      <div className={`${align === "center" ? "text-center max-w-[640px] mx-auto" : "max-w-[700px]"}`}>
        {tag && (
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(13,115,119,0.3)", color: C.teal, border: "1px solid rgba(13,115,119,0.4)" }}>
            {tag}
          </div>
        )}
        <h1 className="font-display font-bold text-white mb-5 leading-[1.08] tracking-[-1.5px]" style={{ fontSize: 54 }}>{h}</h1>
        {sub && <p className="text-lg text-white/55 leading-[1.75]">{sub}</p>}
        {children}
      </div>
    </div>
  </section>
);

// ─── Check list item ────────────────────────────────────────────
export const CheckItem = ({ text, light = false }) => (
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
      style={{ background: light ? "rgba(13,115,119,0.3)" : "var(--tealBg)", border: `1px solid ${light ? "rgba(13,115,119,0.5)" : "var(--tealBorder)"}` }}>
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke={C.teal} strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className={`text-sm leading-[1.75] ${light ? "text-white/70" : "text-[var(--text)]"}`}>{text}</span>
  </div>
);

// ─── Stat card ──────────────────────────────────────────────────
export const StatCard = ({ value, label, accent = C.teal }) => (
  <div className="p-6 rounded-2xl text-center" style={{ background: "var(--bgCard)", border: "1px solid var(--border)", borderTop: `3px solid ${accent}` }}>
    <div className="font-display font-black mb-2 leading-none" style={{ fontSize: 36, color: accent }}>{value}</div>
    <div className="text-xs text-[var(--textMuted)] leading-[1.5]">{label}</div>
  </div>
);

// ─── Star rating ────────────────────────────────────────────────
export const Stars = ({ n = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: n }, (_, i) => (
      <svg key={`star-${i}`} className="w-4 h-4 flex-shrink-0" fill={C.gold} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// ─── Avatar stack ───────────────────────────────────────────────
export const AvatarStack = ({ initials = ["SM","MT","PR","EV","JW"], count = "1,284+" }) => (
  <div className="flex items-center gap-3">
    <div className="flex -space-x-2">
      {initials.map((i) => (
        <div key={`av-${i}`} className="w-8 h-8 rounded-full border-2 border-[var(--bg)] flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: `linear-gradient(135deg,${C.teal},${C.green})` }}>{i}</div>
      ))}
    </div>
    <span className="text-[16px] text-[var(--textMuted)] text-black font-semibold">{count}</span>
  </div>
);

// ─── CTA email bar ──────────────────────────────────────────────
export const EmailBar = ({ onSubmit, dark = false, label = "Start free →" }) => {
  const [email, setEmail] = useState("");
  const submit = () => {
    if (!email.includes("@")) return;
    onSubmit?.(); setEmail("");
  };
  return (
    <div className="flex gap-3 max-w-[460px]">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
        placeholder="your@email.com" className="flex-1 h-[52px] rounded-xl px-5 text-[15px] font-sans border-none outline-none"
        style={dark ? { background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)" } : {}}
        {...(!dark ? { className: "w-input flex-1" } : {})} />
      <button onClick={submit} className={dark ? "w-btn-white flex-shrink-0" : "w-btn-primary flex-shrink-0"}>{label}</button>
    </div>
  );
};

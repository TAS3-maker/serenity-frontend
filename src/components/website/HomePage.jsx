import { useState, useEffect } from "react";
import { C } from "../../tokens";
import { Sec, Heading, Stars, AvatarStack } from "./shared";
import { api } from "../../lib/api";

// Map API accent names → design-token colors so admins can edit copy without
// hard-coding hex values. Anything unknown falls back to teal.
const ACCENT = {
  teal:  { color: C.teal,  bg: "var(--tealBg)",          border: "var(--tealBorder)" },
  gold:  { color: C.gold,  bg: "var(--goldBg)",          border: "rgba(183,134,11,0.2)" },
  navy:  { color: C.navy,  bg: "rgba(26,26,46,0.06)",     border: "rgba(26,26,46,0.15)" },
  green: { color: C.green, bg: "var(--greenBg)",         border: "rgba(30,113,69,0.2)" },
};
const accentOf = (k) => ACCENT[k] || ACCENT.teal;

// Format a count → "1,284" with thousands separators.
const fmt = (n) => (n ?? 0).toLocaleString("en-US");

// ─── Hero ──────────────────────────────────────────────────────
const Hero = ({ showToast }) => {
  const [email, setEmail] = useState("");
  const submit = () => {
    if (!email.includes("@")) { showToast("Enter a valid email.", "error"); return; }
    showToast("You're on the list!"); setEmail("");
  };

  return (
   <section className="relative min-h-[94vh] flex items-center overflow-hidden bg-[rgba(243,245,244,1)]">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{ background: `radial-gradient(ellipse at center,${C.teal} 0%,transparent 70%)` }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: `radial-gradient(ellipse at center,${C.green} 0%,transparent 70%)` }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: `radial-gradient(circle,${"var(--text)"} 1px,transparent 1px)`, backgroundSize: "32px 32px" }} />
      </div>

      <div className="web-container w-full relative z-10 py-14">
        <div className="grid grid-cols-2 gap-20 items-center">

          {/* Copy */}
          <div className="animate-fade-up">
            <h1 className="font-jost font-bold leading-[1.06] tracking-[-2px]  mb-6 text-[40px] gap-8 [word-spacing:6px] " >
              Your money stress isn't <br />
              <span className="text-[var(--teal)]  relative">
                about the numbers.It's about your mind .
              </span>
            </h1>
            <p className="text-lg leading-[1.8] text-[rgba(137,137,137,1)]  mb-10 max-w-[500px]">
Serenity Aligned™ is the world's first complete ecosystem built to decode the psychology of financial stress
— through a proprietary groundbreaking book, a daily practice App, and an Aarav The Serenity Genie™ companion that understands you.      
      </p>
            <div className="flex gap-3 mb-10 max-w-[480px]">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submit()} placeholder="your@email.com" className="w-input flex-1" />
              <button onClick={submit} className="w-btn-primary flex-shrink-0">Start free →</button>
            </div>
            <div className="flex flex-wrap gap-8">
              <AvatarStack />
              <div className="flex items-center gap-2"><Stars /><span className="text-sm text-[var(--textMuted)]">4.9 · 312 reviews</span></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: C.green }} />
                <span className="text-sm text-[var(--textMuted)]">Free · No credit card</span>
              </div>
            </div>
          </div>

          {/* App card mockup */}
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "200ms" }}>
  <div className="relative" style={{ width: 360 }}>
    
    <div
      className="relative z-10 rounded-[28px] p-5 flex flex-col gap-4"
      style={{
        background: "rgba(24,24,43,1)",
        border: "1px solid var(--border)",
        boxShadow: "0 40px 80px rgba(13,115,119,0.14),0 8px 24px rgba(0,0,0,0.07)"
      }}
    >
      
      {/* First Box */}
      <div
        className="rounded-xl"
        style={{
          width: "100%",
          height: 136,
          background: "rgba(13, 115, 119, 1)",
          border: "1px solid var(--border)"
        }}
      />

      {/* Bottom (Middle) Box */}
      <div
        className="rounded-xl"
        style={{
          width: "100%",
          height: 91,
          background: "rgba(32, 32, 49, 1)"
        }}
      />

      {/* Third Box */}
      <div
        className="rounded-xl"
        style={{
          width: "100%",
          height: 75,
          background: "rgba(13, 115, 119, 1)",
          border: "1px solid var(--border)"
        }}
      />

    </div>

    {/* Floating badge top right */}
    <div
      className="float-1 absolute -top-4 -right-5 flex items-center gap-2 px-3 py-2 rounded-xl z-20"
      style={{ background: "var(--bgCard)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
    >
      <div className="w-2 h-2 rounded-full" style={{ background: C.green }} />
      <span className="text-xs font-bold" style={{ color: C.green }}>
        7-day streak
      </span>
    </div>

    {/* Floating badge bottom left */}
    <div
      className="float-2 absolute -bottom-4 -left-6 px-3 py-2.5 rounded-xl z-20"
      style={{ background: "var(--bgCard)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
    >
      <div className="text-[10px] text-[var(--textMuted)] font-medium">
        Weekly goal
      </div>
      <div className="font-display font-bold text-base" style={{ color: C.gold }}>
        Met — well done
      </div>
    </div>

  </div>
</div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 py-3.5 overflow-hidden border-t border-[var(--tealBorder)]"
        style={{ background: "rgba(13,115,119,0.03)" }}>
        <div className="marquee flex gap-16 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, ri) => (
            <div key={`marquee-row-${ri}`} className="flex gap-16">
              {["Free 7-day program","No credit card required","Results in 72 hours","Built on CBT and behavioral economics","Your data is never sold","Used in 47 countries","4.9 stars from 312 verified reviews"].map((t) => (
                <span key={`marquee-${ri}-${t}`} className="text-[13px] font-medium text-[var(--textMuted)]">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Profile cards ──────────────────────────────────────────────
// Defaults preserve the original design when the API isn't loaded yet.
const DEFAULT_PROFILES = [
  { label:"The Avoider",     pct:"48%", accent:"teal",  desc:"You don't open bank emails. Not looking feels protective. But the pile quietly grows, and so does the dread." },
  { label:"Anxious Manager", pct:"32%", accent:"gold",  desc:"You monitor every transaction. You've made fifteen budget versions. Vigilance hasn't brought calm — it's exhausting you." },
  { label:"Silent Stressor", pct:"20%", accent:"navy",  desc:"Everything looks fine from outside. Inside you carry the weight alone. Financial silence has a real and compounding cost." },
];

const Profiles = ({ profiles = DEFAULT_PROFILES }) => (
  <Sec bg="var(--bgMuted)">
    <Heading tag="You are not broken. You are patterned." h="Which one sounds like you?" sub="Every financial behaviour is a stress response. Once you name yours, you can change it." />
    <div className="grid grid-cols-3 gap-6">
      {profiles.map((p) => {
        const a = accentOf(p.accent);
        return (
          <div key={p.label} className="w-card group" data-testid={`home-profile-${(p.label || '').toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="h-1 w-10 rounded-full mb-6 transition-all duration-300 group-hover:w-16" style={{ background: a.color }} />
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-[var(--text)]">{p.label}</h3>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: a.bg, color: a.color, border: `1px solid ${a.border}` }}>{p.pct}</span>
            </div>
            <p className="text-[15px] text-[var(--textMuted)] leading-[1.75]">{p.desc}</p>
          </div>
        );
      })}
    </div>
  </Sec>
);

// ─── Process steps ──────────────────────────────────────────────
const DEFAULT_STEPS = [
  { n:"01", title:"Take the Assessment",      desc:"5 minutes to identify your Financial Stress Profile using a validated psychological questionnaire." },
  { n:"02", title:"Receive Your Program",     desc:"A personalised 7-day mission plan calibrated to your exact pattern — not generic tips, targeted interventions." },
  { n:"03", title:"Complete Daily Missions",  desc:"3–5 minutes each. Exercises from CBT, ACT, and behavioral economics. Designed to fit around your life." },
  { n:"04", title:"Track Your Relief Score",  desc:"Watch your Money Relief Score climb in real time — the only metric that captures how money actually feels." },
];

const Process = ({ steps = DEFAULT_STEPS }) => (
  <section className="web-section" style={{ background: C.navy }}>
    <div className="web-container">
      <Heading tag="The process" h="How SerenityDecoded works" sub="Not a budgeting tool. A behavioral reprogramming system." light />
      <div className="grid grid-cols-2 gap-5">
        {steps.map((s) => (
          <div key={s.n} className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="font-display font-black text-[56px] leading-none mb-5" style={{ color: "rgba(13,115,119,0.35)" }}>{s.n}</div>
            <h3 className="font-display font-semibold text-white text-xl mb-3">{s.title}</h3>
            <p className="text-[15px] text-white/50 leading-[1.75]">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Testimonials ───────────────────────────────────────────────
const DEFAULT_QUOTES = [
  { q:"I stopped avoiding my bank app after day 3. That has never happened in six years.", name:"Sarah M.", role:"The Avoider" },
  { q:"It is the first financial tool that understands why I feel the way I do about money.", name:"Marcus T.", role:"Anxious Manager" },
  { q:"I cried reading the Day 1 mission card. Someone finally understood what I was carrying.", name:"Priya R.", role:"Silent Stressor" },
];

const Testimonials = ({ quotes = DEFAULT_QUOTES, stats }) => {
  const tiles = [
    [stats?.totalUsers ? fmt(stats.totalUsers) : "1,284", "users enrolled"],
    [`${stats?.relievedPct ?? 92}%`,                       "report less financial dread"],
    [String(stats?.rating ?? 4.9),                         "average rating"],
    [stats?.daysToRelief || "7 days",                      "to measurable relief"],
  ];
  return (
    <Sec>
      <Heading tag="Real results" h="What changes in 7 days" />
      <div className="grid grid-cols-3 gap-6 mb-14">
        {quotes.map((t) => (
          <div key={t.name} className="rounded-2xl p-7 flex flex-col" style={{ background: "var(--bgCard)", border: "1px solid var(--border)" }}>
            <Stars />
            <p className="font-serif italic text-[17px] leading-[1.8] text-[var(--text)] flex-1 my-5">"{t.q}"</p>
            <div className="flex items-center gap-3 pt-5 border-t border-[var(--border)]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: `linear-gradient(135deg,${C.teal},${C.green})` }}>{t.name[0]}</div>
              <div>
                <div className="font-semibold text-sm text-[var(--text)]">{t.name}</div>
                <div className="text-xs text-[var(--textMuted)]">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-3xl p-10 grid grid-cols-4 gap-8 text-center"
        style={{ background: `linear-gradient(135deg,${C.teal} 0%,${C.green} 100%)` }}
        data-testid="home-stats-band">
        {tiles.map(([v, l]) => (
          <div key={l}>
            <div className="font-display font-black text-white mb-2 leading-none" style={{ fontSize: 38 }}>{v}</div>
            <div className="text-sm text-white/60">{l}</div>
          </div>
        ))}
      </div>
    </Sec>
  );
};

// ─── CTA ────────────────────────────────────────────────────────
const CTA = ({ showToast }) => {
  const [email, setEmail] = useState("");
  const submit = () => { if (!email.includes("@")) return; showToast("You're on the list!"); setEmail(""); };
  return (
    <Sec bg="var(--bgMuted)">
      <div className="relative rounded-[32px] overflow-hidden px-16 py-20 text-center"
        style={{ background: `linear-gradient(135deg,${C.teal} 0%,${C.green} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 44px)" }} />
        <div className="relative z-10 max-w-[580px] mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}>
            Start today — completely free
          </div>
          <h2 className="font-display font-bold text-white mb-5 leading-[1.1] tracking-[-1.5px]" style={{ fontSize: 48 }}>
            Ready to change<br />how money feels?
          </h2>
          <p className="text-lg text-white/70 mb-10 leading-[1.75]">No budgeting. No tracking. Just the behavioral work that permanently changes your relationship with money.</p>
          <div className="flex gap-3 max-w-[460px] mx-auto mb-5">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="your@email.com" className="flex-1 h-[52px] rounded-xl px-5 text-[15px] font-sans border-none outline-none"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)" }} />
            <button onClick={submit} className="w-btn-white flex-shrink-0">Get started →</button>
          </div>
          <p className="text-[13px] text-white/40">Free forever · No credit card · Unsubscribe any time</p>
        </div>
      </div>
    </Sec>
  );
};


// ─── App Download ───────────────────────────────────────────────
const AppDownload = ({ showToast }) => (
  <Sec bg="var(--bg)">
    <div className="grid grid-cols-2 gap-20 items-center">
      {/* Left copy */}
      <div>
        <div className="web-tag">Mobile App</div>
        <h2 className="font-display font-bold text-[var(--text)] mb-5 leading-[1.1] tracking-[-1px]" style={{ fontSize: 44 }}>
          Your daily missions,<br />always in your pocket.
        </h2>
        <p className="text-[17px] text-[var(--textMuted)] leading-[1.8] mb-8 max-w-[440px]">
          The full SerenityDecoded experience — offline access, morning reminders, streak tracking, and your Money Relief Score — all in one beautifully calm app.
        </p>
        <div className="flex gap-3 mb-10 flex-wrap">
          {[
            { label:"App Store", sub:"iOS 15+", path:"M12 2.5c1.5 0 3 .8 3.9 2C17.6 2.5 20 4 20 6.5c0 5-4 9-8 11.5C8 15.5 4 11.5 4 6.5 4 4 6.4 2.5 8.1 4.5 9 3.3 10.5 2.5 12 2.5z" },
            { label:"Google Play", sub:"Android 8+", path:"M3 20.5v-17l17 8.5-17 8.5z" },
          ].map(({ label, sub, path }) => (
            <button key={label} onClick={() => showToast(`${label} — coming soon`)}
              className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background:"var(--bgCard)", borderColor:"var(--border)", minWidth:180 }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:"var(--text)" }}>
                <svg viewBox="0 0 24 24" fill="var(--bgCard)" width="20" height="20">
                  <path d={path}/>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[10px] font-medium text-[var(--textMuted)] leading-none mb-0.5">Download on the</div>
                <div className="font-display font-bold text-[15px] text-[var(--text)] leading-none">{label}</div>
                <div className="text-[10px] text-[var(--textFaint)] mt-0.5">{sub}</div>
              </div>
            </button>
          ))}
        </div>
        {/* Feature list */}
        <div className="grid grid-cols-2 gap-3">
          {["Offline mission access","Morning reminders","Streak & score tracking","Stress profile insights","Dark mode support","Face ID unlock"].map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-[14px] text-[var(--textMuted)]">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right — QR codes */}
      <div className="flex flex-col gap-6">
        {/* App preview mockup */}
        <div className="rounded-3xl p-8 flex items-center gap-8"
          style={{ background:`linear-gradient(135deg, var(--tealBg), var(--bgMuted))`, border:"1px solid var(--tealBorder)" }}>
          {/* Phone frame */}
          <div className="relative flex-shrink-0">
            <div className="w-[130px] h-[220px] rounded-[26px] flex flex-col overflow-hidden"
              style={{ background:"var(--bgCard)", border:"2px solid var(--border)", boxShadow:"0 20px 60px rgba(13,115,119,0.15)" }}>
              {/* Status bar */}
              <div className="h-7 flex items-center justify-between px-3 flex-shrink-0"
                style={{ background:"var(--teal)" }}>
                <div className="text-[7px] text-white/70 font-semibold">9:41</div>
                <div className="flex gap-1">
                  {[4,3,2].map(w=><div key={w} className="rounded-sm bg-white/70" style={{width:w,height:6}}/>)}
                </div>
              </div>
              {/* Screen content */}
              <div className="flex-1 p-2.5" style={{ background:"var(--bg)" }}>
                <div className="font-display font-bold text-[8px] text-[var(--text)] mb-1.5">Day 3 · The Avoidance Map</div>
                <div className="h-1 rounded-full mb-2 overflow-hidden bg-[var(--bgMuted)]">
                  <div className="h-full rounded-full" style={{ width:"43%", background:`linear-gradient(90deg,#0D7377,#1E7145)` }}/>
                </div>
                <div className="text-[6px] text-[var(--textMuted)] leading-[1.5] mb-2.5">Today we map exactly what you avoid — when it happens and what it costs.</div>
                <div className="h-12 rounded-lg flex items-center justify-center text-[7px] font-bold text-white"
                  style={{ background:`linear-gradient(135deg,#0D7377,#1E7145)` }}>Begin mission →</div>
                <div className="mt-2 p-2 rounded-lg" style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
                  <div className="text-[6px] text-[var(--textMuted)]">Relief Score</div>
                  <div className="font-display font-bold text-[12px]" style={{ color:"var(--teal)" }}>62<span className="text-[7px] font-normal">/100</span></div>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-3 -right-4 px-2.5 py-1.5 rounded-xl text-[10px] font-bold"
              style={{ background:"var(--bgCard)", color:"var(--green)", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
              7-day streak
            </div>
          </div>

          {/* QR codes */}
          <div className="flex-1 space-y-4">
            {[
              { label:"iOS App Store", file:"/assets/qr-ios.svg" },
              { label:"Google Play", file:"/assets/qr-android.svg" },
            ].map(({ label, file }) => (
              <div key={label} className="flex items-center gap-3">
                <img src={file} alt={`QR — ${label}`} className="w-14 h-14 rounded-xl flex-shrink-0"
                  style={{ border:"1px solid var(--border)" }} />
                <div>
                  <div className="font-semibold text-[12px] text-[var(--text)]">{label}</div>
                  <div className="text-[11px] text-[var(--textMuted)]">Scan to download</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-[12px] text-[var(--textFaint)]">
          Coming soon to App Store and Google Play · <button className="underline bg-transparent border-none cursor-pointer text-[var(--textMuted)] font-sans text-[12px]" onClick={() => showToast("Notified!")}>Get notified</button>
        </p>
      </div>
    </div>
  </Sec>
);

export const WebHome = ({ onNav, showToast }) => {
  // Fetch admin-editable site content + public stats in parallel.
  const [site,  setSite]  = useState(null);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.content.site().catch(() => null),
      api.content.siteStats().catch(() => null),
    ]).then(([s, st]) => {
      if (cancelled) return;
      if (s)  setSite(s);
      if (st) setStats(st);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <Hero showToast={showToast} />
      <Profiles profiles={site?.profiles} />
      <Process steps={site?.steps} />
      <Testimonials quotes={site?.testimonials} stats={stats} />
      <AppDownload showToast={showToast} />
      <CTA showToast={showToast} />
    </>
  );
};

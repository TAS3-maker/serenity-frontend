import { useState, useEffect } from "react";
import { C } from "../../tokens";
import { Sec, Heading, Stars, AvatarStack } from "./shared";
import { api } from "../../lib/api";
import profileBox1 from "../../assets/profileBox1.png"
import profileBox2 from "../../assets/profileBox2.png"
import profileBox3 from "../../assets/profileBox3.png"
import IKISDWImg from "../../assets/IKISDW.png"
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
          
              <button onClick={submit} className="w-btn-primary flex-shrink-0">Download the App</button>
            </div>
            <div className="flex flex-wrap gap-8">
              <AvatarStack />
              <div className="flex items-center gap-2"><Stars /><span className="text-sm text-[var(--textMuted)]">4.9 · 312 reviews</span></div>
         
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
        className="rounded-xl flex  flex-col p-2 m-2 gap-2 border border-[rgba(13,115,119,1)]"
        style={{
          width: "100%",
          height: 136,
          background: "rgba(17,43,58,1)",
       
        }}
      >

<span className="text-white text-sm ">YOUR STRESS PROFILE</span>
<h1 className="text-white text-lg text-bold">The Avoider</h1>
<p className="text-white text-md text">Your avoidance is a learned response, not a character flaw.</p>
      </div>

      {/* Bottom (Middle) Box */}
      <div
        className="rounded-xl flex  flex-col p-2 m-2 gap-2"
        style={{
          width: "100%",
          height: 91,
          background: "rgba(17,43,58,1)"
        }}
      >

<span className="text-white text-sm ">TODAY'S MISSION</span>
<h1 className="text-white text-lg text-bold">The Avoidance Map</h1>

      </div>

      {/* Third Box */}
      <div
        className="rounded-xl p-2 m-2 gap-2 border border-[rgba(13,115,119,1)]"
        style={{
          width: "100%",
          height: 75,
          background: "rgba(17,43,58,1)",
        
        }}
      >

<h1 className="text-white">7-day progress</h1>
<span className="text-white">You,re building something real</span>

      </div>

    </div>

    {/* Floating badge top right */}
    <div
      className=" absolute -top-4 -left-20 flex items-center gap-2 px-3 py-2 rounded-full z-20"
      style={{ background: "var(--bgCard)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
    >
      <div className="w-2 h-2 rounded-full" style={{ background: C.green }} />
      <span className="text-xs font-bold" style={{ color: C.green }}>
   Assessment Complete
      </span>
    </div>

    {/* Floating badge bottom left */}
    <div
      className=" absolute -bottom-4 -right-20 px-3 py-2.5 rounded-full z-20 bg-[rgba(13,115,119,1)]"
      
    >
      
      <div className="font-display text-white font-semibold text-base " >
Relief score: 68/100
      </div>
    </div>

  </div>
</div>
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

const Profiles = () => (
  <section className="py-20 bg-white text-center">
    <div className="web-container">
      
      <p className="text-sm font-semibold font-jost  text-[rgba(13,115,119,1)] mb-2">
        The Serenity Aligned™ Ecosystem
      </p>

      <h1 className="text-[40px] font-bold ">
        Three ways to decode the mind.
      </h1>
      <h2 className="text-[40px] font-bold font-jost  text-[var(--teal)] mb-6">
        One connected system.
      </h2>

      <p className="text-md text-[var(--textMuted)] max-w-[700px] mx-auto mb-10">
        Every piece is complete on its own. Together, they create something no single app,
        community, book, or chatbot can — a complete behavioural change ecosystem.
      </p>

      <div className="grid grid-cols-3 gap-6">
        {[
          {
            title: "Decoding Money Serenity™",
            desc: "The psychological framework that explains everything. Why you avoid, overthink, or carry financial stress alone — and what your nervous system is actually doing when money feels hard.",
            btn: "Get the Book",
            img:profileBox1
          },
          {
            title: "Serenity Aligned™",
            desc: "Take the Financial Calm Assessment™, discover your stress profile, and receive a personalised program built around your pattern.",
            btn: "Download the App",
            img:profileBox2
          },
          {
            title: "Aarav The Serenity Genie™",
            desc: "An AI companion built specifically for the psychology of financial stress. Understands how you think and responds accordingly.",
            btn: "Meet Aarav",
            img:profileBox3
          },
        ].map((c, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border-t-4 border-[rgba(13,115,119,1)] bg-white text-left shadow-md"
           
          >
            <div className="w-12 h-12 rounded-full object-cover bg-[var(--teal)] mb-4" >
              <img src={c.img} alt="" />
            </div>

            <h2 className="font-bold font-jost mb-2">{c.title}</h2>

            <p className="text-sm text-[var(--textMuted)] mb-5 leading-[1.6]">
              {c.desc}
            </p>

            <button className="px-4 py-2 text-sm rounded-lg bg-[var(--teal)] text-white">
              {c.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
// ─── Process steps ──────────────────────────────────────────────
const DEFAULT_STEPS = [
  { n:"01", title:"Take the Assessment",      desc:"5 minutes to identify your Financial Stress Profile using a validated psychological questionnaire." },
  { n:"02", title:"Receive Your Program",     desc:"A personalised 7-day mission plan calibrated to your exact pattern — not generic tips, targeted interventions." },
  { n:"03", title:"Complete Daily Missions",  desc:"3–5 minutes each. Exercises from CBT, ACT, and behavioral economics. Designed to fit around your life." },
  { n:"04", title:"Track Your Relief Score",  desc:"Watch your Money Relief Score climb in real time — the only metric that captures how money actually feels." },
];

const Process = ({ profiles = [] }) => (
  <section
    className="py-12 text-center"
    style={{ background: "rgba(243, 245, 244, 1)" }}
  >
    <div className="web-container">

      {/* Top intro */}
      <p className="text-sm  mb-2 text-[rgba(13,115,119,1)]">
        Which pattern do you recognise in yourself?
      </p>

      <h2 className="text-[40px] font-jost font-bold ">
        Financial stress isn’t one thing.
      </h2>

      <h3 className="text-[40px] font-bold font-jost text-[rgba(13,115,119,1)] mb-6">
        It’s one of three.
      </h3>

      <p className="text-sm text-[var(--textMuted)] max-w-[720px] mx-auto mb-12 leading-[1.7]">
        The SerenityAligned framework identifies three deeply wired psychological
        responses to money. All of them make sense. None of them have to be permanent.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6 text-left">
        {profiles.map((p, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white  transition-all duration-200 shadow-md hover:shadow-xl  border border-[rgba(13,115,119,1)]"
      
          >
            {/* LABEL BADGE */}
            <div className="text-lg font-jost  font-bold tracking-wide text-[var(--teal)] mb-3 uppercase">
              {p.label}
            </div>

            {/* BOLD LINE */}
            <p className="font-semibold text-[var(--text)] mb-2 leading-[1.4]">
              {p.short}
            </p>

            {/* DESCRIPTION */}
            <p className="text-[13px] text-[var(--textMuted)] leading-[1.6]">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10">
        <button className="px-6 py-2.5 rounded-lg bg-[var(--teal)] text-white text-sm font-semibold hover:opacity-90 transition">
          Discover Your Profile
        </button>
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



const IKISDW=({showToast})=>{
  return (
  <section
    className="  text-center py-12"
 
  >
    <div className="web-container">

      {/* Top intro */}
      <p className="text-sm  mb-2 text-[rgba(13,115,119,1)]">
        How We Help
      </p>

      <h1 className="text-[40px] font-jost font-bold ">
        From 'I Know I should deal with<br/>
 <span className="text-[var(--teal)]  relative">
            this' to 'I actually have.'
              </span>
      </h1>

      <p className="text-sm text-gray-500  max-w-[720px] mx-auto mb-12 ">
       The SerenityAligned™ ecosystem is built around a single progression: Recognition → Interruption →
Integration. Three stages. Three products. One outcome.

      </p>

    <img src={IKISDWImg} alt="" className="w-full h-full object-cover" srcset="" />
   <p className="text-md text-gray-400  max-w-[720px] mx-auto mb-4  mt-4">
This isn't a three-step process that ends. It's a practice that compounds. Every day you show up, the pattern
shifts a little more.

      </p>
      {/* CTA */}
      <div className="mt-4">
        <button className="px-6 py-2.5 rounded-lg bg-[var(--teal)] text-white text-sm font-semibold hover:opacity-90 transition">
          Begin with the assessment
        </button>
      </div>
    </div>
  </section>

  )
  


}










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
  <Process profiles={site?.profiles} />
 <IKISDW showToast={showToast} />
      <Testimonials quotes={site?.testimonials} stats={stats} />
      <AppDownload showToast={showToast} />
      <CTA showToast={showToast} />
    </>
  );
};

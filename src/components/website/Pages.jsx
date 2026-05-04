import { useState, useEffect } from "react";
import { C } from "../../tokens";
import { FAQItem, PlanCard } from "../ui/index";
import { useFAQs } from "../../FAQContext";
import { PLANS as STATIC_PLANS } from "../../data/index";
import { api } from "../../lib/api";
import { Hero, Sec, Heading, CheckItem, StatCard, Stars } from "./shared";
import HowItWork from "./howitwork/HowItWork";
import Programslayout from "./programs/Programslayout";
import AboutUsLayout from "./aboutus/AboutUsLayout";

// ─── How It Works ───────────────────────────────────────────────
export const WebHowItWorks = ({ showToast }) => (
  <div>
    
    <HowItWork />



    {/* <Hero tag="The science" align="left"
      h="How SerenityDecoded works"
      sub="A behavioral reprogramming system rooted in clinical psychology — not budgeting advice, not spreadsheets, not willpower." /> */}

    {/* <Sec>
      <div className="grid grid-cols-2 gap-x-20 gap-y-14">
        {[
          { n:"01", title:"Stress Profile Assessment",    desc:"A 5-minute questionnaire identifies your Financial Stress Profile — Avoider, Anxious Manager, or Silent Stressor. Your profile is the foundation for everything that follows." },
          { n:"02", title:"Personalised Mission Plan",    desc:"Based on your profile, you receive a targeted 7-day behavioral mission plan. Not generic tips — micro-interventions calibrated to your exact psychological pattern." },
          { n:"03", title:"Daily 3-Minute Missions",      desc:"Each mission takes 3–5 minutes. They draw on CBT, ACT, and behavioral economics to rebuild your emotional relationship with money in the time it takes to make coffee." },
          { n:"04", title:"The Money Relief Score",       desc:"Your Relief Score tracks progress in real time — measuring not just what you do, but how money feels. The only financial metric that actually matters." },
        ].map((s) => (
          <div key={s.n} className="flex gap-8">
            <div className="font-display font-black leading-none flex-shrink-0 mt-1" style={{ fontSize: 64, color: `${C.teal}25` }}>{s.n}</div>
            <div>
              <h3 className="font-display font-bold text-[var(--text)] text-xl mb-3">{s.title}</h3>
              <p className="text-[15px] text-[var(--textMuted)] leading-[1.8]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Sec> */}

    {/* <Sec bg="var(--bgMuted)">
      <Heading tag="Built on evidence" h="The science behind it" sub="Three established frameworks, integrated into a single daily practice." />
      <div className="grid grid-cols-3 gap-6">
        {[
          { label:"Cognitive-Behavioral Therapy",            desc:"Identifies and restructures the automatic thoughts that turn financial tasks into threat responses.",    accent:C.teal },
          { label:"Behavioral Economics",                    desc:"Treats financial decisions as emotional events, not rational calculations. Works with bias, not against it.", accent:C.gold },
          { label:"Acceptance & Commitment Therapy",         desc:"Builds tolerance for financial uncertainty without avoidance. Creates psychological flexibility around money.", accent:C.green },
        ].map((s) => (
          <div key={s.label} className="p-7 rounded-2xl" style={{ background: "var(--bgCard)", border: "1px solid var(--border)" }}>
            <div className="h-1 w-10 rounded-full mb-6" style={{ background: s.accent }} />
            <h3 className="font-display font-bold text-base text-[var(--text)] mb-3">{s.label}</h3>
            <p className="text-sm text-[var(--textMuted)] leading-[1.75]">{s.desc}</p>
          </div>
        ))}
      </div>
    </Sec> */}
  </div>
);

// ─── Programs & Pricing ─────────────────────────────────────────
export const WebPrograms = ({ showToast }) => {
  

  return (
    <div>
      
        <Programslayout />
    
    </div>
  );
};

// ─── About ──────────────────────────────────────────────────────
const DEFAULT_TEAM = [
  { name:"Dr. Aisha Bell",  role:"Chief Psychologist",  bio:"Clinical psychologist with 14 years specialising in financial anxiety and avoidance behaviours.", accent:"teal"  },
  { name:"James Wright",    role:"Behavioral Economist", bio:"Former research lead at the Behavioural Insights Team. Expert in choice architecture and financial decision-making.", accent:"navy"  },
  { name:"Priya Sharma",    role:"Head of Product",      bio:"Previously built consumer mental health products at scale. Passionate about making evidence-based tools accessible.", accent:"green" },
];

const DEFAULT_PRINCIPLES = [
  "Financial stress is a psychological problem, not a discipline problem.",
  "Everyone deserves access to the psychological tools that actually work.",
  "Your data is private. We never sell it. We never will.",
  "Evidence matters. Everything we build is grounded in published research.",
  "Change comes from daily consistency, not from dramatic interventions.",
];

const ACCENT_COLOR = { teal: C.teal, gold: C.gold, navy: C.navy, green: C.green };
const accentColor = (k) => ACCENT_COLOR[k] || C.teal;

export const WebAbout = ({ showToast }) => {
  const [team, setTeam]             = useState(DEFAULT_TEAM);
  const [principles, setPrinciples] = useState(DEFAULT_PRINCIPLES);
  const [stats, setStats]           = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.content.site().catch(() => null),
      api.content.siteStats().catch(() => null),
    ]).then(([s, st]) => {
      if (cancelled) return;
      if (s?.team?.length)       setTeam(s.team);
      if (s?.principles?.length) setPrinciples(s.principles);
      if (st)                    setStats(st);
    });
    return () => { cancelled = true; };
  }, []);

  return (
  <div>


<AboutUsLayout/>


    <Hero tag="Our story" align="left"
      h={<>Money distress is a<br />mental health issue.<br />We built the tool for it.</>}
      sub="SerenityDecoded exists because every financial product we found ignored the emotional reality of money. The advice was correct. The delivery was wrong." />

    <Sec>
      <div className="grid grid-cols-2 gap-20 items-start mb-20">
        <div>
          <div className="web-tag">Why we built this</div>
          <h2 className="font-display font-bold text-[var(--text)] mb-5 leading-[1.1] tracking-[-0.5px]" style={{ fontSize: 38 }}>Nobody was treating the feeling</h2>
          {["Every personal finance product focuses on the numbers. But for the 68% of adults experiencing financial stress, the problem is not the numbers — it is the relationship with money.",
            "Before you can change your finances, you have to change how money feels. That is a psychology problem, not a spreadsheet problem. No existing product was addressing it properly.",
            "SerenityDecoded was built to fill that gap — with the same rigor and evidence-base that clinical psychology brings to other forms of anxiety."].map((t) => (
            <p key={t.slice(0, 40)} className="text-[15px] text-[var(--textMuted)] leading-[1.85] mb-4">{t}</p>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatCard value="68%"    label="of adults experience financial stress"       accent={C.teal} />
          <StatCard value="3×"     label="more effective than budgeting alone"           accent={C.gold} />
          <StatCard value={stats?.daysToRelief || "7 days"} label="to measurable emotional change" accent={C.green} />
          <StatCard value={stats?.totalUsers ? stats.totalUsers.toLocaleString("en-US") : "1,284"}  label="people enrolled"  accent={C.navy} />
        </div>
      </div>

      <Heading tag="The team" h="Built by behavioral scientists" />
      <div className="grid grid-cols-3 gap-6">
        {team.map((p) => {
          const color = accentColor(p.accent);
          return (
            <div key={p.name} className="p-7 rounded-2xl" style={{ background: "var(--bgCard)", border: "1px solid var(--border)" }}>
              <div className="w-14 h-14 rounded-[16px] flex items-center justify-center font-bold text-2xl text-white mb-5"
                style={{ background: `linear-gradient(135deg,${color},${color}cc)` }}>
                {p.name[0]}
              </div>
              <div className="font-display font-bold text-[15px] text-[var(--text)] mb-1">{p.name}</div>
              <div className="text-xs font-semibold mb-4" style={{ color }}>{p.role}</div>
              <p className="text-sm text-[var(--textMuted)] leading-[1.7]">{p.bio}</p>
            </div>
          );
        })}
      </div>
    </Sec>

    <Sec bg="var(--bgMuted)">
      <div className="grid grid-cols-2 gap-16 items-center">
        <div>
          <div className="web-tag">What we believe</div>
          <h2 className="font-display font-bold text-[var(--text)] mb-6 leading-[1.1]" style={{ fontSize: 38 }}>Our principles</h2>
          <div className="space-y-5">{principles.map((t) => <CheckItem key={t} text={t} />)}</div>
        </div>
        <div className="p-10 rounded-[28px] text-white" style={{ background: `linear-gradient(135deg,${C.teal},${C.green})` }}>
          <p className="font-serif italic text-xl leading-[1.85] mb-8">
            "The goal has never been to make you a better budgeter. The goal is to make money stop feeling like a threat."
          </p>
          <div className="flex items-center gap-4 pt-6 border-t border-white/20">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center font-bold text-sm text-white">{(team[0]?.name || 'AB').split(' ').map(s => s[0]).slice(0, 2).join('')}</div>
            <div>
              <div className="font-semibold text-sm">{team[0]?.name || 'Dr. Aisha Bell'}</div>
              <div className="text-sm text-white/60">{team[0]?.role || 'Chief Psychologist'}, SerenityDecoded</div>
            </div>
          </div>
        </div>
      </div>
    </Sec>
  </div>
  );
};

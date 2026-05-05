import { useState, useEffect } from "react";
import { C } from "../../tokens";
import { Sec, Heading, Stars, AvatarStack } from "./shared";
import { api } from "../../lib/api";
import profileBox1 from "../../assets/profileBox1.png"
import profileBox2 from "../../assets/profileBox2.png"
import profileBox3 from "../../assets/profileBox3.png"
import IKISDWImg from "../../assets/IKISDW.png"
import Vector1 from "../../assets/Vector1.png"
import Vector2 from "../../assets/Vector2.png"
import Vector3 from "../../assets/Vector3.png"
import Vector4 from "../../assets/Vector4.png"
import bookImg from "../../assets/book.png"
import GroupNewsLetter from "../../assets/GroupNewsLetter.png"
import DecodingSection from "./howitwork/Decoding";
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
            <h1 className="font-jost font-bold leading-[1.06] tracking-[-2px]   mb-6 text-[40px] gap-8 [word-spacing:6px] " >
              Your money stress isn't <br />
              <span className="text-[var(--teal)] font-jost leading-[1.06] relative text-[40px] tracking-[-2px] gap-8  [word-spacing:6px]">
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
      <h2 className="text-[35px] font-bold font-jost  text-[var(--teal)] mb-4">
        One connected system.
      </h2>

      <p className="text-gray-500  max-w-4xl text-[20px]  mx-auto font-jost break-words mb-10">
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
    className="py-10 text-center"
    style={{ background: "rgba(243,245,244,1)" }}
  >
    <div className="web-container">

      {/* Top intro */}
      <p className="text-sm  font-jost font-semibold text-[rgba(13,115,119,1)]">
        Which pattern do you recognise in yourself?
      </p>

      <h2 className="text-[40px] font-jost font-bold ">
        Financial stress isn’t one thing.
      </h2>

      <h3 className="text-[35px] font-bold font-jost text-[rgba(13,115,119,1)] mb-4">
        It’s one of three.
      </h3>

      <p className="text-gray-500  max-w-3xl text-[20px]  mx-auto font-jost break-words mb-4">
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
    className="  text-center py-12 bg-white"
 
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

      <p className="text-gray-500 text-[20px]  mx-auto mt-5 font-jost [word-spacing:1px] break-words mb-12">
       The SerenityAligned™ ecosystem is built around a single progression: Recognition → Interruption →
Integration. Three stages. Three products. One outcome.

      </p>

    <img src={IKISDWImg} alt="" className="w-full h-full object-cover"  />
   <p className="text-gray-500  max-w-2xl text-[20px]  mx-auto font-jost [word-spacing:1px] break-words mb-4  mt-4">
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



const AaravSection = () => {
  const cards = [
    {
      title: "Knows your pattern before you explain it",
      desc: "Once you’ve completed the Financial Calm Assessment, Aarav knows your profile. The Avoider gets different responses than the Anxious Manager. Silence gets a different kind of presence than anxiety does. One framework. Personalised intelligence.",
      icon: "🧠",
      img:Vector1
    },
    {
      title: "Available at 2am when the anxiety doesn’t sleep",
      desc: "Financial anxiety doesn’t wait for office hours. Aarav is available around the clock — not to give advice, but to help you think, feel, and name what’s actually happening. The kind of conversation that moves something.",
      icon: "⏱️",
      img:Vector2
    },
    {
      title: "Never tells you what to do with your money",
      desc: "Aarav is not a financial advisor and doesn’t pretend to be. It works with your psychology — your patterns, your feelings, your blockers — without judgment, without a script, and without a sales agenda. That’s the difference.",
      icon: "📖",
      img:Vector3
    },
    {
      title: "Speaks the language of the framework fluently.",
      desc: "The Income-Happiness Gap. The Silence Tax. The Behavioural Avoidance Spectrum. Recognition–Interruption–Integration. Aarav understands these not as terms but as lived experiences — and uses them to meet you where you actually are.",
      icon: "🌐",
      img:Vector4
    },
  ];

  return (
    <section className="py-20 bg-[#f4f6f6] text-center">
      <div className="max-w-5xl mx-auto px-4">

        {/* Top small text */}
        <p className="text-sm font-semibold text-teal-700 mb-3">
          Powered by Aarav The Serenity Genie™
        </p>

        {/* Main heading */}
        <h1 className="text-4xl font-bold leading-tight">
          An AI that understands your mind,
        </h1>
        <h2 className="text-4xl font-bold text-teal-700 mb-6">
          not just your money.
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-[20px]  mx-auto mt-5 font-jost [word-spacing:2px]">
          Aarav isn’t a financial chatbot. It’s a psychologically intelligent companion built
          specifically on the SerenityDecoded™ framework — the first AI of its kind trained
          to understand the three financial stress profiles and meet each one differently.
        </p>

        {/* Cards grid */}
        <div className="grid md:mt-10 md:grid-cols-2 gap-8">
          {cards.map((c, i) => (
            <div
              key={i}
              className="relative bg-white rounded-xl shadow-md px-6 pt-12 pb-6 text-center"
            >
              {/* Floating icon */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-teal-700 flex items-center justify-center text-white text-xl shadow-lg">
       <img src={c.img} className="p-3 flex justify-center items-center" alt="" />
              </div>

              <h3 className="font-semibold mb-2 text-sm">
                {c.title}
              </h3>

              <p className="text-gray-500 text-xs leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="mt-12 bg-teal-700 text-white px-6 py-2 rounded-full text-sm shadow-md hover:opacity-90">
          Try Aarav Free
        </button>
      </div>
    </section>
  );
};



const Book=()=>{
return (
 <div className="w-full max-w-[1130px] mx-auto grid md:grid-cols-2 gap-10 pt-10 items-center">
        
           <div className="flex justify-center">
          <img src={bookImg} alt="" className="object-cover max-w-sm" />
        </div>



        <div>
        

          <h2 className="text-5xl font-bold text-[#000000]">
            About <span className="text-[#0D7377]">the book</span>
          </h2>

          <p className="text-[#898989] mt-4 text-md w-full max-w-lg">
          Most financial advice ignores the most important variable: you. Decoding Money Serenity is a psychology-first guide to understanding why money feels the way it does — and what to do about it.
          </p>
<p className="text-gray-500 mt-2 text-md w-full max-w-lg ">

Built on three proprietary financial stress profiles — The Avoider, The Anxious Manager, and The Silent Stressor — this book gives you a map of your own pattern, not a list of rules to follow.
</p>
    
<p className="text-[#898989] mt-2 text-md w-full max-w-lg">

  The result isn't wealth. It's financial calm.
</p>

        </div>

        {/* Right */}
   
      </div>



)





}



const CommunitySection = () => {
  const testimonials = [
    {
      text: `"I opened my banking app and actually stayed. I'd been avoiding it for six months. That was Day 3." Attribution: Early user`,
      name: "The Avoider",
      initials: "TA",
    },
    {
      text: `"I didn’t realise that checking eight times a day wasn’t being responsible. The framework named what was actually happening."`,
      name: "The Anxious Manager",
      initials: "AM",
    },
    {
      text: `"I’d been carrying this alone for years. I didn’t know there was a name for it, or a way through it." Attribution: Early user`,
      name: "The Silent Stressor",
      initials: "PR",
    },
  ];

  return (
    <section className="bg-[#f4f6f6] py-20 text-center">
      <div className="max-w-6xl mx-auto px-4">

        <p className="text-xs font-semibold text-teal-700 mb-3 tracking-wide">
          FROM OUR COMMUNITY
        </p>

        <h2 className="text-3xl md:text-4xl leading-[1.06] [word-spacing:4px] font-bold">
          What shifts first isn’t the bank balance.
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold [word-spacing:4px] text-teal-700 mb-12">
          It’s the relationship with it.
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 text-left"
            >
              <div className="text-yellow-500 mb-3 text-sm">★★★★★</div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {item.text}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs">
                  {item.initials}
                </div>
                <span className="text-sm text-teal-700 font-medium">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};



const NewsletterSection = () => {
  return (
    <section className="bg-[#f4f6f6] py-10">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center ">
          <h1 className="text-3xl md:text-5xl font-jost  font-bold">
            The psychology of financial calm,
          </h1>
          <h2 className="text-3xl md:text-5xl font-jost  font-bold  text-teal-700">
            delivered weekly.
          </h2>

          <p className="text-gray-500 text-[20px] mt-5 p-2 font-jost w-full max-w-full [word-spacing:1px]">
            One email. Every week. Psychology-backed insights on financial stress,
            behaviour patterns, and what it actually takes to feel calmer about money.
            No noise. No pitch. Just the framework, applied.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-4 items-center">

          <div className="flex justify-center">
            <img
              src={GroupNewsLetter} 
              alt="newsletter"
              className="w-[320px] md:w-[380px]"
            />
          </div>

          {/* FORM */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <form className="space-y-4">

              <div>
                <label className="text-xs text-gray-500">First Name</label>
                <input className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700" />
              </div>

              <div>
                <label className="text-xs text-gray-500">Last Name</label>
                <input className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700" />
              </div>

              <div>
                <label className="text-xs text-gray-500">Email Address</label>
                <input type="email" className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700" />
              </div>

              <div>
                <label className="text-xs text-gray-500">Phone Number</label>
                <input className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700" />
              </div>

              <button className="w-40 bg-teal-700 text-white py-2 rounded-md hover:opacity-90">
                Submit
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};





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
 <AaravSection/>
 <DecodingSection bg="#ffffff"/>
 <Book/>
   <CommunitySection/> 
     <NewsletterSection/>
    </>
  );
};
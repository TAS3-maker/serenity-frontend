import { useState, useEffect } from "react";
import { C } from "../../tokens";
import { Sec, Heading, Stars, AvatarStack } from "./shared";
import { api } from "../../lib/api";
import profileBox1 from "../../assets/profileBox1.png";
import profileBox2 from "../../assets/profileBox2.png";
import profileBox3 from "../../assets/profileBox3.png";
import IKISDWImg from "../../assets/IKISDW.png";
import Vector1 from "../../assets/Vector1.png";
import Vector2 from "../../assets/Vector2.png";
import Vector3 from "../../assets/Vector3.png";
import Vector4 from "../../assets/Vector4.png";
import bookImg from "../../assets/book.png";
import GroupNewsLetter from "../../assets/GroupNewsLetter.png";
import chartline from "./assets/Chart_Line.svg";
import phone from "./assets/decodingphn.png";
import qr from "./assets/scannercode.png";
import appstore from "./assets/appstore.png";
import googleplay from "./assets/googleplay.png";

// Map API accent names → design-token colors so admins can edit copy without
// hard-coding hex values. Anything unknown falls back to teal.
const ACCENT = {
  teal: { color: C.teal, bg: "var(--tealBg)", border: "var(--tealBorder)" },
  gold: { color: C.gold, bg: "var(--goldBg)", border: "rgba(183,134,11,0.2)" },
  navy: {
    color: C.navy,
    bg: "rgba(26,26,46,0.06)",
    border: "rgba(26,26,46,0.15)",
  },
  green: {
    color: C.green,
    bg: "var(--greenBg)",
    border: "rgba(30,113,69,0.2)",
  },
};
const accentOf = (k) => ACCENT[k] || ACCENT.teal;

// Format a count → "1,284" with thousands separators.
const fmt = (n) => (n ?? 0).toLocaleString("en-US");

// ─── Hero ──────────────────────────────────────────────────────
const Hero = ({ showToast }) => {
  const [email, setEmail] = useState("");
  const submit = () => {
    if (!email.includes("@")) {
      showToast("Enter a valid email.", "error");
      return;
    }
    showToast("You're on the list!");
    setEmail("");
  };

  return (
    // <section className="relative min-h-[65vh] md:min-h-[75vh] flex items-center overflow-hidden bg-[#F3F5F4] px-3 md:px-4">
    //   {/* Ambient Background */}
    //   <div className="absolute inset-0 pointer-events-none">
    //     <div
    //       className="absolute -top-40 -right-40 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full opacity-[0.06]"
    //       style={{
    //         background: "radial-gradient(circle,#0d7377 0%,transparent 70%)",
    //       }}
    //     />

    //     <div
    //       className="absolute -bottom-40 -left-40 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full opacity-[0.04]"
    //       style={{
    //         background: "radial-gradient(circle,#14a38b 0%,transparent 70%)",
    //       }}
    //     />
    //   </div>

    //   <div className="web-container w-full relative z-10 py-8 md:py-10 lg:py-12">
    //     <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 md:gap-10 items-center">
    //       {/* LEFT CONTENT */}
    //       <div>
    //         <h1 className="font-bold leading-snug tracking-[-1px] text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 text-black">
    //           Your money stress isn't <br />
    //           <span className="text-[#0D7377]">
    //             about the numbers. It's about your mind.
    //           </span>
    //         </h1>

    //         <p className="text-[#898989] text-sm md:text-lg leading-[1.7] mb-5 md:mb-7 max-w-[520px]">
    //           Serenity Aligned™ is the world's first complete ecosystem built to
    //           decode the psychology of financial stress — through a proprietary
    //           book, a daily practice app, and an Aarav The Serenity Genie™
    //           companion.
    //         </p>

    //         <button className="bg-[#0D7377] hover:bg-teal-700 text-white text-sm md:text-base lg:text-lg px-4 md:px-5 py-2 rounded-lg font-medium mb-5 md:mb-7">
    //           Download the App
    //         </button>

    //         <div className="flex items-center gap-4 flex-wrap">
    //           <AvatarStack />
    //         </div>
    //       </div>

    //       {/* RIGHT CARD */}
    //       <div className="flex justify-center">
    //         <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px]">
    //           {/* MAIN CARD */}
    //           <div className="rounded-[22px] py-5 md:py-6 px-5 md:px-7 flex flex-col gap-3 md:gap-4 bg-[#18182B] border border-gray-700 shadow-xl">
    //             <div className="flex justify-center">
    //               <span className="bg-[#353535] rounded-xl h-2 w-20 md:w-24"></span>
    //             </div>

    //             {/* PROFILE */}
    //             <div className="rounded-xl p-3 md:p-4 border border-[#0D7377] bg-[#112B3A]">
    //               <p className="text-[10px] md:text-xs text-[#EAFEFF] font-normal mb-1">
    //                 YOUR STRESS PROFILE
    //               </p>

    //               <h2 className="text-white font-semibold text-base md:text-lg">
    //                 The Avoider
    //               </h2>

    //               <p className="text-white text-xs md:text-sm">
    //                 Your avoidance is a learned response, not a character flaw.
    //               </p>
    //             </div>

    //             {/* MISSION */}
    //             <div className="rounded-2xl p-3 shadow-[0px_0px_28.3px_0px_#00000040] bg-[#202031]">
    //               <div className="flex justify-between text-[10px] md:text-xs text-white mb-1">
    //                 <span>TODAY'S MISSION</span>
    //                 <span>Day 3</span>
    //               </div>

    //               <h2 className="text-white font-semibold text-sm md:text-base mb-2">
    //                 The Avoidance Map
    //               </h2>

    //               {/* PROGRESS BAR */}
    //               <div className="w-full h-1.5 bg-[#E6F6F8] rounded-md overflow-hidden">
    //                 <div className="w-[60%] h-full bg-[#B58308] rounded-md"></div>
    //               </div>
    //             </div>

    //             {/* PROGRESS */}
    //             <div className="rounded-xl p-3 md:p-4 border flex items-center gap-2 border-[#0D7377] bg-[#112B3A]">
    //               <img
    //                 src={chartline}
    //                 alt="chartline"
    //                 className="w-5 h-5 md:w-6 md:h-6"
    //               />

    //               <div>
    //                 <h3 className="text-white font-semibold text-sm md:text-lg">
    //                   7-day progress
    //                 </h3>

    //                 <p className="text-white font-normal text-xs md:text-sm">
    //                   You're building something real
    //                 </p>
    //               </div>
    //             </div>
    //           </div>

    //           {/* TOP BADGE */}
    //           <div className="absolute -top-3 left-[70px] sm:left-2 md:left-0 -translate-x-1/2 bg-white text-[#0D7377] px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-[0px_0px_9.5px_0px_#00000040] text-[10px] md:text-sm font-semibold">
    //             Assessment Complete
    //           </div>

    //           {/* BOTTOM BADGE */}
    //           <div className="absolute -bottom-3 md:-bottom-4 right-[-10px] sm:right-[-30px] md:right-[-70px] bg-[#0D7377] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-sm font-semibold shadow-[0px_0px_9.5px_0px_#00000040]">
    //             Relief score: 68/100
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="relative bg-[#F3F5F4] px-3 md:px-4 py-10 md:py-14 lg:py-16 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle,#0d7377 0%,transparent 70%)",
          }}
        />

        <div
          className="absolute -bottom-40 -left-40 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle,#14a38b 0%,transparent 70%)",
          }}
        />
      </div>

      <div className="web-container relative z-10">
        {/* Center Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1 className="font-bold leading-snug tracking-[-1px] text-3xl md:text-4xl lg:text-5xl text-black">
            Your money stress isn't about the <br />
            <span className="text-[#0D7377]">
              numbers. It's about your mind.
            </span>
          </h1>

          {/* Paragraph */}
          <p className="text-[#898989] text-sm md:text-lg leading-[1.7] mt-4 md:mt-6 max-w-3xl mx-auto">
            Serenity Aligned™ is the world's first complete ecosystem built to
            decode the psychology of financial stress — through a proprietary
            book, a daily practice app, and an Aarav The Serenity Genie™
            companion.
          </p>

          {/* Avatar + Numbers */}
          <div className="flex items-center justify-center mt-4 md:mt-6 lg:mt-8">
            <div className="flex items-center justify-center font-bold">
              <AvatarStack />
            </div>

            <p className="mt-5 md:mt-0 md:pl-2 text-sm md:text-base font-medium text-[#898989]">
              people already started their journey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Profile cards ──────────────────────────────────────────────
// Defaults preserve the original design when the API isn't loaded yet.
const DEFAULT_PROFILES = [
  {
    label: "The Avoider",
    pct: "48%",
    accent: "teal",
    desc: "You don't open bank emails. Not looking feels protective. But the pile quietly grows, and so does the dread.",
  },
  {
    label: "Anxious Manager",
    pct: "32%",
    accent: "gold",
    desc: "You monitor every transaction. You've made fifteen budget versions. Vigilance hasn't brought calm — it's exhausting you.",
  },
  {
    label: "Silent Stressor",
    pct: "20%",
    accent: "navy",
    desc: "Everything looks fine from outside. Inside you carry the weight alone. Financial silence has a real and compounding cost.",
  },
];

const Profiles = () => (
  <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4 text-center">
    <div className="web-container">
      <div className="mx-auto text-center">
        <div className="pb-4 md:py-6 ">
          <p className="text-[#0D7377] font-medium font-jost text-lg md:text-xl">
            The Serenity Aligned™ Ecosystem
          </p>

          <h1 className="text-2xl md:text-4xl lg:text-5xl py-1 md:py-3 lg:py-4 font-bold font-jost text-gray-900 leading-snug w-full m-auto max-w-5xl">
            Three ways to decode the mind.{" "}
            <span className="text-[#0D7377]">One connected system.</span>
          </h1>

          <p className="text-[#898989] font-normal text-sm md:text-lg lg:text-xl w-full max-w-5xl mx-auto">
            Every piece is complete on its own. Together, they create something
            no single app, community, book, or chatbot can — a complete
            behavioural change ecosystem for your relationship with money
          </p>
        </div>
      </div>

      {/* Cards */}
      {/* 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-4 py-2 md:py-3">
        {[
          {
            title: "Decoding Money Serenity™",
            desc: "The psychological framework that explains everything. Why you avoid, overthink, or carry financial stress alone — and what your nervous system is actually doing when money feels hard.",
            btn: "Get the Book",
            img: profileBox1,
          },
          {
            title: "Serenity Aligned™",
            desc: "Take the Financial Calm Assessment™, discover your stress profile, and receive a personalised program built around your pattern.",
            btn: "Download the App",
            img: profileBox2,
          },
          {
            title: "Aarav The Serenity Genie™",
            desc: "An AI companion built specifically for the psychology of financial stress. Understands how you think and responds accordingly.",
            btn: "Meet Aarav",
            img: profileBox3,
          },
        ].map((c, i) => (
          <div
            key={i}
            className="p-4 md:p-5 lg:p-6 rounded-2xl border-t-4 border-[rgba(13,115,119,1)] bg-white text-left shadow-md h-full flex flex-col"
          >
            
            <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-[var(--teal)] mb-3 md:mb-4 flex items-center justify-center flex-shrink-0">
              <img
                src={c.img}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="font-bold font-jost mb-2 text-base md:text-lg lg:text-xl leading-snug">
              {c.title}
            </h2>

            <p className="text-xs md:text-sm lg:text-base text-[var(--textMuted)] mb-4 md:mb-5 leading-[1.6] flex-grow">
              {c.desc}
            </p>

            
            <button className="mt-auto w-fit px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg bg-[var(--teal)] text-white">
              {c.btn}
            </button>
          </div>
        ))}
      </div>
       */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-4 py-2 md:py-3">
        {[
          {
            title: "Decoding Money Serenity™",
            desc: "The psychological framework that explains everything. Why you avoid, overthink, or carry financial stress alone — and what your nervous system is actually doing when money feels hard.",
            btn: "Get the Book",
            img: profileBox1,
          },
          {
            title: "Serenity Aligned™",
            desc: "Take the Financial Calm Assessment™, discover your stress profile, and receive a personalised program built around your pattern.",
            btn: "Download the App",
            img: profileBox2,
          },
          {
            title: "Aarav The Serenity Genie™",
            desc: "An AI companion built specifically for the psychology of financial stress. Understands how you think and responds accordingly.",
            btn: "Meet Aarav",
            img: profileBox3,
          },
        ].map((c, i) => (
          <div
            key={i}
            className="p-4 md:p-5 lg:p-6 rounded-2xl border-t-4 border-[rgba(13,115,119,1)] bg-white text-left shadow-md h-full flex flex-col"
          >
            {/* Image */}
            <div className="w-full h-25% md:h-40% lg:h-50% mb-3 md:mb-4 overflow-hidden rounded-xl flex-shrink-0">
              <img
                src={bookImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h2 className="font-bold font-jost mb-2 text-base md:text-lg lg:text-xl leading-snug">
              {c.title}
            </h2>

            {/* Description */}
            <p className="text-xs md:text-sm lg:text-base text-[var(--textMuted)] mb-4 md:mb-5 leading-[1.6] flex-grow">
              {c.desc}
            </p>

            {/* Button */}
            <button
              onClick={() => {
                document
                  .getElementById("app-download")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-auto w-fit px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg bg-[var(--teal)] text-white"
            >
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
  {
    n: "01",
    title: "Take the Assessment",
    desc: "5 minutes to identify your Financial Stress Profile using a validated psychological questionnaire.",
  },
  {
    n: "02",
    title: "Receive Your Program",
    desc: "A personalised 7-day mission plan calibrated to your exact pattern — not generic tips, targeted interventions.",
  },
  {
    n: "03",
    title: "Complete Daily Missions",
    desc: "3–5 minutes each. Exercises from CBT, ACT, and behavioral economics. Designed to fit around your life.",
  },
  {
    n: "04",
    title: "Track Your Relief Score",
    desc: "Watch your Money Relief Score climb in real time — the only metric that captures how money actually feels.",
  },
];
const Process = ({ profiles = [] }) => (
  <section
    className="py-6 md:py-8 lg:py-12 px-3 md:px-4 text-center"
    style={{ background: "rgba(243,245,244,1)" }}
  >
    <div className="web-container">
      {/* Top intro */}
      <p className="text-sm md:text-xl font-jost font-semibold text-[rgba(13,115,119,1)]">
        Which pattern do you recognise in yourself?
      </p>

      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-jost text-gray-900 leading-snug py-2 md:py-3 w-full m-auto max-w-[44rem]">
        Financial stress isn’t one thing.{" "}
        <span className="text-[#0D7377]">It’s one of three.</span>
      </h1>

      <p className="text-[#898989] font-normal text-sm md:text-lg lg:text-xl mt-3 w-full max-w-4xl mx-auto">
        The SerenityAligned framework identifies three deeply wired
        psychological responses to money. All of them make sense. None of them
        have to be permanent.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 text-left mt-6 md:mt-8">
        {profiles.map((p, i) => (
          <div
            key={i}
            className="p-4 md:p-6 rounded-xl bg-white transition-all duration-200 shadow-md hover:shadow-xl border border-[rgba(13,115,119,1)]"
          >
            {/* LABEL */}
            <div className="text-sm md:text-lg font-jost font-bold tracking-wide text-[var(--teal)] mb-2 md:mb-3 uppercase">
              {p.label}
            </div>

            {/* TITLE */}
            <p className="font-semibold text-sm md:text-base text-[var(--text)] mb-2 leading-[1.4]">
              {p.short}
            </p>

            {/* DESCRIPTION */}
            <p className="text-xs md:text-sm text-[var(--textMuted)] leading-[1.6]">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 md:mt-10">
        <button
          onClick={() => {
            document
              .getElementById("app-download")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg bg-[var(--teal)] text-white text-sm md:text-base font-semibold hover:opacity-90 transition"
        >
          Discover Your Profile
        </button>
      </div>
    </div>
  </section>
);
// ─── Testimonials ───────────────────────────────────────────────
const DEFAULT_QUOTES = [
  {
    q: "I stopped avoiding my bank app after day 3. That has never happened in six years.",
    name: "Sarah M.",
    role: "The Avoider",
  },
  {
    q: "It is the first financial tool that understands why I feel the way I do about money.",
    name: "Marcus T.",
    role: "Anxious Manager",
  },
  {
    q: "I cried reading the Day 1 mission card. Someone finally understood what I was carrying.",
    name: "Priya R.",
    role: "Silent Stressor",
  },
];

const IKISDW = ({ showToast }) => {
  return (
    <section className="text-center py-6 md:py-10 lg:py-12 px-3 md:px-4 bg-white">
      <div className="web-container">
        {/* Small Heading */}
        <p className="text-sm md:text-lg lg:text-xl mb-2 text-[rgba(13,115,119,1)]">
          How We Help
        </p>

        {/* Main Heading */}
        <h1 className="text-xl md:text-4xl lg:text-5xl font-jost font-bold leading-snug">
          From 'I Know I should deal with
          <br />
          <span className="text-[var(--teal)]">
            this' to 'I actually have.'
          </span>
        </h1>

        {/* Paragraph */}
        <p className="text-sm md:text-lg lg:text-xl text-[#898989] mx-auto mt-4 md:mt-5 font-jost max-w-3xl mb-8 md:mb-12">
          The SerenityAligned™ ecosystem is built around a single progression:
          Recognition → Interruption → Integration. Three stages. Three
          products. One outcome.
        </p>

        {/* Image */}
        <img
          src={IKISDWImg}
          alt=""
          className="w-full h-auto object-contain max-w-5xl mx-auto"
        />

        {/* Paragraph */}
        <p className="text-sm md:text-lg lg:text-xl text-[#898989] max-w-2xl mx-auto font-jost mt-4 mb-4">
          This isn't a three-step process that ends. It's a practice that
          compounds. Every day you show up, the pattern shifts a little more.
        </p>

        {/* CTA */}
        <div className="mt-4 md:mt-6">
          <button
            onClick={() =>
              document
                .getElementById("app-download")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg bg-[var(--teal)] text-white text-sm md:text-base font-semibold hover:opacity-90 transition"
          >
            Begin with the assessment
          </button>
        </div>
      </div>
    </section>
  );
};

const AaravSection = () => {
  const cards = [
    {
      title: "Knows your pattern before you explain it",
      desc: "Once you’ve completed the Financial Calm Assessment, Aarav knows your profile. The Avoider gets different responses than the Anxious Manager. Silence gets a different kind of presence than anxiety does. One framework. Personalised intelligence.",
      icon: "🧠",
      img: Vector1,
    },
    {
      title: "Available at 2am when the anxiety doesn’t sleep",
      desc: "Financial anxiety doesn’t wait for office hours. Aarav is available around the clock — not to give advice, but to help you think, feel, and name what’s actually happening. The kind of conversation that moves something.",
      icon: "⏱️",
      img: Vector2,
    },
    {
      title: "Never tells you what to do with your money",
      desc: "Aarav is not a financial advisor and doesn’t pretend to be. It works with your psychology — your patterns, your feelings, your blockers — without judgment, without a script, and without a sales agenda. That’s the difference.",
      icon: "📖",
      img: Vector3,
    },
    {
      title: "Speaks the language of the framework fluently.",
      desc: "The Income-Happiness Gap. The Silence Tax. The Behavioural Avoidance Spectrum. Recognition–Interruption–Integration. Aarav understands these not as terms but as lived experiences — and uses them to meet you where you actually are.",
      icon: "🌐",
      img: Vector4,
    },
  ];

  return (
    <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4 bg-[#f4f6f6] text-center">
      <div className="max-w-5xl mx-auto">
        {/* Small Heading */}
        <p className="text-sm md:text-lg lg:text-xl font-semibold text-teal-700 mb-2 md:mb-3">
          Powered by Aarav The Serenity Genie™
        </p>

        {/* Main Heading (merged) */}
        <h1 className="text-xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
          An AI that understands your mind,
          <br />
          <span className="text-teal-700">not just your money.</span>
        </h1>

        {/* Description */}
        <p className="text-sm md:text-lg lg:text-xl text-[#898989] mx-auto mt-4 md:mt-5 font-jost max-w-3xl">
          Aarav isn’t a financial chatbot. It’s a psychologically intelligent
          companion built specifically on the SerenityDecoded™ framework — the
          first AI of its kind trained to understand the three financial stress
          profiles and meet each one differently.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-8 md:mt-10">
          {cards.map((c, i) => (
            <div
              key={i}
              className="relative bg-white rounded-xl shadow-md px-4 md:px-6 pt-10 md:pt-12 pb-4 md:pb-6 text-center"
            >
              {/* Floating icon */}
              <div className="absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-teal-700 flex items-center justify-center shadow-lg">
                <img
                  src={c.img}
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                  alt=""
                />
              </div>

              {/* Card title */}
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                {c.title}
              </h3>

              {/* Card desc */}
              <p className="text-[#898989] text-xs md:text-sm leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() =>
            document
              .getElementById("app-download")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-8 md:mt-12 bg-teal-700 text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base shadow-md hover:opacity-90"
        >
          Try Aarav Free
        </button>
      </div>
    </section>
  );
};

const DecodingSection = () => {
  return (
    <section
      className="bg-[#F3F5F4] py-6 md:py-8 lg:py-12 px-3 md:px-4 font-jost"
      id="app-download"
    >
      <div className="w-full lg:max-w-[1130px] mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-10">
        {/* Left */}
        <div className="w-full lg:max-w-xl mx-auto lg:mx-0 md:pl-10">
          <p className="text-lg md:text-xl font-medium text-[#0D7377] mb-2">
            Where every SerenityDecoded journey begin
          </p>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#000000] leading-snug">
            Decoding <span className="text-[#0D7377]">Money Serenity™</span>
          </h2>

          <div className="text-[#898989] mt-4 text-base sm:text-lg md:text-[22px] font-normal w-full lg:max-w-xl">
            <p className="mb-2">The book that built the framework.</p>

            <p>
              Most books about money tell you what to do. Decoding Money
              Serenity™ tells you why you're doing what you're already doing —
              and how to change it at the level where it actually lives: your
              psychology.
            </p>
          </div>

          {/* QR + Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-7 md:gap-12 mt-6 relative">
            {/* Left QR */}
            <img src={qr} alt="" className="w-24 sm:w-24 md:w-32 lg:w-32" />

            {/* Left Arrow */}
            <span className="absolute left-[110px] bottom-[54px] md:left-[228px] md:bottom-[82px] lg:bottom-[75px] lg:left-[26%] md:block text-[#0D7377] text-2xl md:text-3xl lg:text-4xl font-light">
              ←
            </span>

            {/* Right Arrow */}
            <span className="absolute left-[233px] bottom-[9px] md:left-[63%] md:bottom-[14px] md:block text-[#0D7377] text-2xl md:text-3xl lg:text-4xl font-light">
              →
            </span>

            {/* Store Buttons */}
            <div className="flex flex-col gap-2">
              <button>
                <img
                  src={appstore}
                  className="w-24 sm:w-28 md:w-40 lg:w-36"
                  alt=""
                />
              </button>

              <button>
                <img
                  src={googleplay}
                  className="w-24 sm:w-28 md:w-40 lg:w-36"
                  alt=""
                />
              </button>
            </div>

            {/* Right QR */}
            <img src={qr} alt="" className="w-24 sm:w-24 md:w-32 lg:w-32" />
          </div>
        </div>

        {/* Right */}
        <div className="w-full flex justify-center">
          <img
            src={phone}
            alt=""
            className="w-full max-w-[300px] md:max-w-[540px] lg:max-w-[630px]"
          />
        </div>
      </div>
    </section>
  );
};

const Book = () => {
  return (
    <div className="w-full max-w-[1130px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 py-6 md:py-8 lg:py-12 px-3 md:px-4 items-center">
      <div className="flex justify-center">
        <img
          src={bookImg}
          alt=""
          className="object-cover w-40 sm:w-56 md:w-full max-w-sm"
        />
      </div>

      <div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#000000]">
          About <span className="text-[#0D7377]">the book</span>
        </h2>

        <p className="text-[#898989] mt-3 md:mt-4 text-sm md:text-lg lg:text-xl w-full max-w-lg">
          Most financial advice ignores the most important variable: you.
          Decoding Money Serenity is a psychology-first guide to understanding
          why money feels the way it does — and what to do about it.
        </p>

        <p className="text-[#898989] mt-2 text-sm md:text-lg lg:text-xl w-full max-w-lg">
          Built on three proprietary financial stress profiles — The Avoider,
          The Anxious Manager, and The Silent Stressor — this book gives you a
          map of your own pattern, not a list of rules to follow.
        </p>

        <p className="text-[#898989] mt-2 text-sm md:text-lg lg:text-xl w-full max-w-lg">
          The result isn't wealth. It's financial calm.
        </p>
      </div>
    </div>
  );
};

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
    <section className="bg-[#f4f6f6] py-6 md:py-8 lg:py-12 px-3 md:px-4 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Small heading */}
        <p className="text-sm md:text-lg lg:text-xl font-semibold font-jost text-teal-700 mb-2 tracking-wide">
          FROM OUR COMMUNITY
        </p>

        {/* Main heading (merged) */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-jost leading-snug mb-6 md:mb-10">
          What shifts first isn’t the bank balance.
          <br />
          <span className="text-teal-700">It’s the relationship with it.</span>
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-4 md:p-6 text-left font-jost h-full flex flex-col justify-between"
            >
              <div>
                <div className="text-yellow-500 mb-2 md:mb-3 text-sm">
                  ★★★★★
                </div>

                <p className="text-sm md:text-base font-jost text-[#898989] leading-relaxed mb-4 md:mb-6">
                  {item.text}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-teal-700 font-jost text-white flex items-center justify-center text-xs">
                  {item.initials}
                </div>
                <span className="text-sm md:text-base text-teal-700 font-medium font-jost">
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
    <section className="bg-[#f4f6f6] py-6 md:py-8 lg:py-12 px-3 md:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-jost font-bold leading-snug">
            The psychology of financial calm,
            <br />
            <span className="text-teal-700">delivered weekly.</span>
          </h1>

          <p className="text-sm md:text-lg lg:text-xl text-[#898989] mt-4 md:mt-5 font-jost max-w-3xl mx-auto">
            One email. Every week. Psychology-backed insights on financial
            stress, behaviour patterns, and what it actually takes to feel
            calmer about money. No noise. No pitch. Just the framework, applied.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-2 gap-6 md:gap-4 lg:gap-2 mt-6 md:mt-10 items-center">
          {/* Image */}
          <div className="flex justify-center px-2 md:px-0">
            <img
              src={GroupNewsLetter}
              alt="newsletter"
              className="w-40 sm:w-56 md:w-full max-w-[420px]"
            />
          </div>

          {/* Form */}
          <div className="px-2 md:pl-4 md:pr-6 lg:px-0">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl w-full max-w-md md:max-w-[520px] mx-auto md:mx-0">
              <form className="space-y-4">
                <div>
                  <label className="text-xs md:text-sm text-gray-500">
                    First Name
                  </label>
                  <input className="w-full mt-1 px-3 md:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700" />
                </div>

                <div>
                  <label className="text-xs md:text-sm text-gray-500">
                    Last Name
                  </label>
                  <input className="w-full mt-1 px-3 md:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700" />
                </div>

                <div>
                  <label className="text-xs md:text-sm text-gray-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full mt-1 px-3 md:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="text-xs md:text-sm text-gray-500">
                    Phone Number
                  </label>
                  <input className="w-full mt-1 px-3 md:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700" />
                </div>

                <button className="w-full md:w-40 bg-teal-700 text-white py-2 rounded-md hover:opacity-90 text-sm md:text-base">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WebHome = ({ onNav, showToast }) => {
  // Fetch admin-editable site content + public stats in parallel.
  const [site, setSite] = useState(null);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.content.site().catch(() => null),
      api.content.siteStats().catch(() => null),
    ]).then(([s, st]) => {
      if (cancelled) return;
      if (s) setSite(s);
      if (st) setStats(st);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Hero showToast={showToast} />
      <Profiles profiles={site?.profiles} />
      <Process profiles={site?.profiles} />
      <IKISDW showToast={showToast} />
      <AaravSection />
      <DecodingSection bg="#ffffff" />
      <Book />
      <CommunitySection />
      <NewsletterSection />
    </>
  );
};

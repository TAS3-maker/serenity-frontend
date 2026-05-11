import { useState, useEffect } from "react";
import { api } from "../../lib/api.js";
import { useApi } from "../../lib/useApi";
import phone from "./assets/decodingphn.png";
import qr from "./assets/scannercode.png";
import appstore from "./assets/appstore.png";
import googleplay from "./assets/googleplay.png";
import Ellipse from "./assets/Ellipse 1.png";


export const WebBlog = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeArticle, setActiveArticle] = useState(null);
  const {
  data: articles = [],
  loading,
  error,
} = useApi(
  () => api.content.blogList(),
  {
    initial: [],
    select: (raw) => {
      const blogs = raw?.items ?? raw?.data ?? raw ?? [];

      return blogs.map((item) => ({
        id: item._id,
        category: item.tag || "Research",
        time: item.readTime || "5 min read",
        title: item.title || "",
        desc:
          item.desc ||
          item.description ||
          item.excerpt ||
          "",
        date: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "",
      }));
    },
  }
);

  const tabs = [
    "All",
    ...new Set(articles.map((item) => item.category)),
  ];

  const currentArticle = articles.find(
  (item) => item.id === activeArticle
);

useEffect(() => {
  if (error && showToast) {
    showToast("Failed to load blogs");
  }
}, [error, showToast]);
 
  const filteredArticles =
    activeTab === "All"
      ? articles
      : articles.filter((item) => item.category === activeTab);

if (currentArticle) {
  const relatedArticles = articles
    .filter((item) => item.id !== currentArticle.id)
    .slice(0, 2);

  return (
    <div className="bg-[#F3F5F4] min-h-screen">

      {/* Reading Progress */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#d9d9d9] z-[200]">
        <div className="h-full w-[40%] bg-[#0D7377]" />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0B1F33] min-h-[520px]">

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(13,115,119,0.25),transparent_60%)]" />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 60px), repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 60px)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">

          {/* Back Button */}
          <button
            onClick={() => setActiveArticle(null)}
            className="text-white/60 hover:text-white transition mb-10"
          >
            ← Back to Blogs
          </button>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">

            <span className="bg-[#0D7377]/20 border border-[#0D7377]/40 text-[#6abbaa] px-4 py-2 rounded-full text-sm font-semibold">
              {currentArticle.category}
            </span>

            <div className="flex items-center gap-5 text-white/50 text-sm">
              <span>{currentArticle.date}</span>
              <span>{currentArticle.time}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-white font-bold leading-[1.1] text-4xl md:text-6xl max-w-4xl mb-6">
            {currentArticle.title}
          </h1>

          {/* Excerpt */}
          <p className="text-white/60 text-lg leading-8 max-w-3xl">
            {currentArticle.desc}
          </p>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#F3F5F4]" />
      </section>

      {/* ARTICLE BODY */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_280px] gap-16">

          {/* MAIN CONTENT */}
          <article>

            {/* Quote */}
            <div className="relative border-l-4 border-[#0D7377] pl-8 mb-10">

              <div className="absolute -left-[14px] top-0 w-7 h-7 rounded-full bg-[#0D7377] text-white flex items-center justify-center text-lg">
                "
              </div>

              <p className="italic text-2xl text-[#111] leading-[1.8]">
                {currentArticle.desc}
              </p>
            </div>

            {/* Body */}
            <div className="space-y-7">
              {(currentArticle.desc || "")
                .split("\n\n")
                .map((para, i) => (
                  <p
                    key={i}
                    className="text-[18px] text-[#5E5E5E] leading-[2]"
                  >
                    {para}
                  </p>
                ))}
            </div>

            {/* Key Takeaways */}
            <div className="mt-14 bg-[#EAF6F5] border border-[#CDE7E5] rounded-3xl p-8">

              <p className="uppercase tracking-[3px] text-sm text-[#0D7377] font-bold mb-5">
                Key Takeaways
              </p>

              <div className="space-y-4">

                {[
                  "Awareness changes financial behavior patterns.",
                  "Stress around money is often psychological, not mathematical.",
                  "Consistency matters more than perfection.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">

                    <div className="w-5 h-5 rounded-full bg-[#0D7377] flex items-center justify-center mt-1">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>

                    <p className="text-[#111] leading-7">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-14 rounded-3xl overflow-hidden">

              <div className="relative bg-gradient-to-r from-[#0D7377] to-[#1E7145] p-10">

                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg,rgba(255,255,255,0.05) 0px,rgba(255,255,255,0.05) 1px,transparent 1px,transparent 40px)",
                  }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                  <div>
                    <h3 className="text-white text-3xl font-bold mb-3">
                      Ready to put this into practice?
                    </h3>

                    <p className="text-white/70 max-w-2xl leading-7">
                      Take the free Financial Stress Assessment and receive
                      personalized insights.
                    </p>
                  </div>

                  <button className="bg-white text-[#0D7377] px-8 h-12 rounded-xl font-semibold hover:scale-[1.03] transition">
                    Start Free →
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">

            <div className="sticky top-24 space-y-5">

              {/* Share */}
              <div className="bg-white border border-[#dcdcdc] rounded-2xl p-5">

                <p className="uppercase tracking-[3px] text-xs text-[#898989] font-bold mb-4">
                  Share Article
                </p>

                <div className="space-y-3">

                  {[
                    "Copy link",
                    "Share on X",
                    "Share on LinkedIn",
                  ].map((btn, i) => (
                    <button
                      key={i}
                      className="w-full h-10 rounded-xl border border-[#dcdcdc] hover:bg-[#F3F5F4] transition text-sm"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reading */}
              <div className="bg-white border border-[#dcdcdc] rounded-2xl p-5">

                <p className="uppercase tracking-[3px] text-xs text-[#898989] font-bold mb-4">
                  Reading Time
                </p>

                <p className="text-[#111] font-semibold">
                  {currentArticle.time}
                </p>
              </div>

              {/* Category */}
              <div className="bg-white border border-[#dcdcdc] rounded-2xl p-5">

                <p className="uppercase tracking-[3px] text-xs text-[#898989] font-bold mb-4">
                  Filed Under
                </p>

                <span className="bg-[#EAF6F5] border border-[#CDE7E5] text-[#0D7377] px-4 py-2 rounded-full text-sm font-semibold">
                  {currentArticle.category}
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* RELATED ARTICLES */}
        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 pt-16 border-t border-[#dcdcdc] mt-16">

            <h2 className="text-3xl font-bold text-[#111] mb-8">
              More from the journal
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {relatedArticles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveArticle(item.id)}
                  className="bg-white border border-[#dcdcdc] rounded-3xl p-7 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition"
                >
                  <span className="text-[#0D7377] text-sm font-semibold uppercase">
                    {item.category}
                  </span>

                  <h3 className="text-2xl font-bold text-[#111] mt-3 mb-3 leading-snug hover:text-[#0D7377] transition">
                    {item.title}
                  </h3>

                  <p className="text-[#898989] leading-7 mb-6 line-clamp-2">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#e5e5e5] pt-5">

                    <span className="text-[#898989] text-sm">
                      {item.date}
                    </span>

                    <span className="text-[#0D7377] font-semibold">
                      Read →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}



  return (
    <div>
      <section className="w-full pb-16 bg-[#F3F5F4]">
        <div className=" mx-auto text-center">
          <div className="bg-[#F3F5F4] pt-12">
            {/* Top Small Heading */}
            <p className="text-[#0D7377] font-medium font-jost text-xl mb-2">
              SERENITYDECODED JOURNAL
            </p>
            {/* Main Heading */}
            <h1 className="text-5xl font-bold font-jost text-gray-900 leading-[1.1] w-full m-auto max-w-5xl">
              The psychology of <br />
              <span className="text-[#0D7377]">financial calm.</span>
            </h1>
            {/* Subtext */}
            <p className="text-[#898989] font-normal text-2xl mt-4 w-full max-w-5xl mx-auto">
              Science-backed insights on behavioral finance, stress patterns,
              and the path to financial contentment.
            </p>
          </div>
        </div>
      </section>
      {/* ---------- Tabs ---------- */}
      <div className="border-t border-[#898989] bg-[#F3F5F4] pt-4">
        <div className="flex w-full max-w-4xl m-auto justify-between gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative  pb-3 text-xl whitespace-nowrap"
            >
              <span
                className={`${
                  activeTab === tab
                    ? "text-[#0D7377] font-normal"
                    : "text-[#898989] font-normal"
                }`}
              >
                {tab}
              </span>
              {activeTab === tab && (
                <div className="absolute left-0 bottom-0 h-[2px] w-full bg-teal-700 rounded-full transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* ---------- Hero Section ---------- */}
      <div className="bg-white py-14">
        <div className="bg-white rounded-2xl w-full max-w-6xl m-auto shadow-md overflow-hidden mb-10">
          <div className="grid md:grid-cols-2">
            <div className="bg-[#1C7C80] text-white py-16 px-8 flex flex-col justify-center">
              <p className="text-xl font-medium tracking-widest mb-3">
                SERENITYDECODED JOURNAL
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-snug mb-4">
                The psychology of financial calm.
              </h2>
              <p className="text-xl font-medium opacity-80">4 min read</p>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <p className="text-xl font-medium text-[#1C7C80] tracking-wide mb-3">
                SERENITYDECODED JOURNAL
              </p>
              <p className="text-[#898989] text-2xl font-normal mb-4">
                Financial avoidance feels protective in the moment. But the
                silence has a price — and it compounds daily.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#898989] text-xl font-medium ">
                  Mar 14, 2026
                </span>
                <button
                    onClick={() => setActiveArticle(articles[0]?.id)}
                    className="text-[#1C7C80] text-xl font-medium hover:underline"
                  >
                    Read article
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ---------- Cards Section (UNCHANGED DESIGN) ---------- */}
      <section className="bg-[#F3F5F4] py-16 px-4 font-jost">
        <div className="w-full max-w-[1130px] mx-auto grid md:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-3 text-center text-gray-400">
              Loading articles...
            </p>
          ) : filteredArticles.length === 0 ? (
            <p className="col-span-3 text-center text-gray-400">
              No articles found.
            </p>
          ) : (
            filteredArticles.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-5 border-t-4 flex flex-col justify-between h-full border-teal-700 hover:shadow-md transition"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-[#0D7377] font-normal text-base uppercase">
                    {item.category}
                  </span>

                  <span className="text-[#898989] font-normal text-lg">
                    {item.time}
                  </span>
                </div>
                <h3 className="font-normal text-xl text-[#000000] mb-2">
                  {item.title}
                </h3>
                <p className="text-lg text-[#898989] font-normal mb-4">
                  {item.desc}
                </p>
                <div className="flex justify-between items-center border-t border-[#898989] pt-5">
                  <span className="text-[#898989] text-base font-medium">
                    {item.date}
                  </span>

                  <button
                    onClick={() => setActiveArticle(item.id)}
                    className="text-[#1C7C80] font-medium text-base hover:underline"
                  >
                    Read article
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Decoding */}
     <section className="bg-[#F3F5F4] py-6 md:py-8 lg:py-12 px-3 md:px-4 font-jost">
           
           <div className="w-full lg:max-w-[1130px] mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-10">
             
             {/* Left */}
             <div className="w-full lg:max-w-xl mx-auto lg:mx-0 md:pl-10">
               
               <p className="text-lg md:text-xl font-medium text-[#0D7377] mb-2">
                 Where every SerenityDecoded journey begin
               </p>
     
               <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#000000] leading-snug">
                 Decoding{" "}
                 <span className="text-[#0D7377]">
                   Money Serenity™
                 </span>
               </h2>
     
               <div className="text-[#898989] mt-4 text-base sm:text-lg md:text-[22px] font-normal w-full lg:max-w-xl">
                 <p className="mb-2">
                   The book that built the framework.
                 </p>
     
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
                 <img
                   src={qr}
                   alt=""
                   className="w-24 sm:w-24 md:w-32 lg:w-32"
                 />
               
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
                 <img
                   src={qr}
                   alt=""
                   className="w-24 sm:w-24 md:w-32 lg:w-32"
                 />
     
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
    </div>
  );
};

import { useState, useEffect } from "react";
import { api } from "../../lib/api.js";
import { useApi } from "../../lib/useApi";

import phone from "./assets/decodingphn.png";
import qr from "./assets/scannercode.png";
import appstore from "./assets/appstore.png";
import googleplay from "./assets/googleplay.png";

const TABS = [
  "All",
  "Behavioral Psychology",
  "Behavioral Science",
  "Stress Profiles",
  "Research",
];

export const WebBlog = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState("All");


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
        category: item.category || "Research",
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

useEffect(() => {
  if (error && showToast) {
    showToast("Failed to load blogs");
  }
}, [error, showToast]);

  // ── Filter Blogs ────────────────────────────────────
  const filteredArticles =
    activeTab === "All"
      ? articles
      : articles.filter((item) => item.category === activeTab);

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
            <h1 className="text-5xl font-bold font-jost text-gray-900 leading-snug w-full m-auto max-w-5xl">
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
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative pb-3 text-sm whitespace-nowrap"
            >
              <span
                className={`${
                  activeTab === tab
                    ? "text-teal-700 font-medium"
                    : "text-gray-500"
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
                <button className="text-[#1C7C80] text-xl font-medium hover:underline">
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

                  <button className="text-[#1C7C80] font-medium text-base hover:underline">
                    Read article
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="bg-white py-16 px-4 font-jost">
        <div className="w-full max-w-[1130px] mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <p className="text-xl font-medium text-[#0D7377] mb-2">
              Where every SerenityDecoded journey begin
            </p>

            <h2 className="text-5xl font-bold text-[#000000]">
              Decoding <span className="text-[#0D7377]">Money Serenity™</span>
            </h2>

            <p className="text-[#898989] mt-4 text-[22px] font-normal w-full max-w-xl">
              <p className="mb-2">
                The book that built the framework.
              </p>

              <p>
                Most books about money tell you what to do. Decoding Money
                Serenity™ tells you why you're doing what you're already doing —
                and how to change it at the level where it actually lives: your
                psychology.
              </p>
            </p>

            {/* QR + Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <img src={qr} className="w-36" />

              <div className="flex flex-col gap-2">
                <button>
                  <img src={appstore} className="w-44" />
                </button>

                <button>
                  <img src={googleplay} className="w-44" />
                </button>
              </div>

              <img src={qr} className="w-36" />
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <img src={phone} alt="" className="max-w-[630px]" />
          </div>
        </div>
      </section>
    </div>
  );
};
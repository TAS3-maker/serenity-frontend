import { useState } from "react";

const tabs = [
  {
    id: "aligned",
    label: "Serenity Aligned™",
    title: "The Human Story",
    content: `You’ve tried budgeting. You’ve tried tracking. You’ve read the books. 
And you still find yourself in the same loop avoiding the account, checking it obsessively, 
or carrying the weight of it in silence.

Serenity Aligned™ is built for that specific gap: the space between knowing what to do 
and actually being able to do it. It doesn’t tell you what to do with your money. 
It works on why you do what you already do.`,
  },
  {
    id: "decoding",
    label: "Decoding Money Serenity™",
    title: "Decoding Your Patterns",
    content: `This section explains how your money behavior forms patterns.
We help you decode emotional triggers and financial habits.`,
  },
  {
    id: "aarav",
    label: "AARAV The Serenity Genie™",
    title: "Your AI Companion",
    content: `AARAV helps you stay consistent by guiding you with smart nudges 
and personalized insights.`,
  },
];

export default function SerenityTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="w-full pb-16 bg-white">
      <div className=" mx-auto text-center">
        <div className="bg-[#F3F5F4] pt-12">
        {/* Top Small Heading */}
        <p className="text-[#0D7377] font-medium font-jost text-xl mb-2">
          How the SerenityDecoded™ Ecosystem Works
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl font-bold font-jost text-gray-900 leading-snug w-full m-auto max-w-6xl">
          Three components. Each complete. Each{" "}
          <span className="text-[#0D7377]">independent. Each connected.</span>
        </h1>

        {/* Subtext */}
        <p className="text-[#898989] font-normal text-2xl mt-4 w-full max-w-2xl mx-auto">
          Select a component to see exactly how it works — and more importantly,
          what changes when you use it.
        </p>

        {/* CTA */}
        <button className="mt-6 bg-[#0D7377] text-xl font-medium text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition">
          Download the App
        </button>

        {/* Tabs */}
        <div className="mt-8 border-t border-[#898989] pt-4 flex justify-center gap-6 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 border-b-2 transition text-2xl font-normal font-jost ${
                activeTab.id === tab.id
                  ? "border-[#0D7377] text-[#0D7377]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        </div>

        {/* Tab Content */}
        <div className="mt-16 text-center">
          <h2 className="text-5xl font-bold text-gray-900">
            <span className="text-[#000000]">
              {activeTab.title.split(" ")[0]}{" "}
            </span>
            <span className="text-[#0D7377]">
              {activeTab.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>

          <p className="mt-4 text-[#898989] max-w-5xl text-2xl font-normal mx-auto leading-relaxed whitespace-pre-line">
            {activeTab.content}
          </p>
        </div>
      </div>
    </section>
  );
}
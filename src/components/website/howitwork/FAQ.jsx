import { useState } from "react";
import { api } from "../../../lib/api.js";
import { useApi } from "../../../lib/useApi";

import arrowDown from "../assets/downarrow.svg";
import arrowUp from "../assets/uparrow.svg";

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  // ── Fetch FAQs from API ─────────────────────────────
  const {
    data: faqs = [],
    loading,
  } = useApi(
    () => api.content.faqList(),
    {
      initial: [],
      select: (raw) => {
        const items = raw?.items ?? raw?.data ?? raw ?? [];

        return items.map((item) => ({
          q: item.q || item.question || "",
          a: item.a || item.answer || "",
        }));
      },
    }
  );

  return (
    <section className="bg-white py-16 px-4 font-jost">
      <div className="max-w-3xl mx-auto text-center">

        <p className="text-xl font-medium text-[#0D7377]">
          COMMON QUESTIONS
        </p>

        <h2 className="text-5xl font-bold text-[#000000] mt-2">
          Answers before <span className="text-[#0D7377]">you begin.</span>
        </h2>

        <div className="mt-8 space-y-4 text-left">

          {loading ? (
            <p className="text-center text-gray-400">
              Loading FAQs...
            </p>
          ) : faqs.length === 0 ? (
            <p className="text-center text-gray-400">
              No FAQs found.
            </p>
          ) : (
            faqs.map((item, i) => {
              const isOpen = open === i;

              return (
                <div
                  key={i}
                  className={`rounded-lg border-[1.6px] transition-all duration-300 ${
                    isOpen
                      ? " bg-[#0D7377] text-white border-[#0D7377]"
                      : "bg-white text-[#000000] border-[#0D7377] shadow-[inset_6.52px_6.52px_13.05px_rgba(0,0,0,0.08),inset_-6.52px_-6.52px_13.05px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  {/* Question */}
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex font-semibold justify-between items-center px-5 py-4 text-2xl"
                  >
                    {item.q}

                    <img
                      src={isOpen ? arrowUp : arrowDown}
                      alt="arrow"
                      className="w-4 h-4"
                    />
                  </button>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-5 pb-4 text-xl font-normal leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })
          )}

        </div>
      </div>
    </section>
  );
}
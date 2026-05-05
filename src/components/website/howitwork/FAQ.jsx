import { useState } from "react";
import arrowDown from "../assets/downarrow.svg";
import arrowUp from "../assets/uparrow.svg";

const faqs = [
  {
    q: "Is this a budgeting app?",
    a: "No. SerenityDecoded never asks for your bank account, income, or spending data. We work on psychological patterns behind your relationship with money — not the numbers.",
  },
  {
    q: "Is this therapy?",
    a: "No, but it is psychology-based guidance to help improve your financial behavior.",
  },
  {
    q: "What if I don’t have the book?",
    a: "You can still use the app independently without the book.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0); // default sab close

  return (
    <section className="bg-white py-10 md:py-16 px-3 md:px-4 font-jost">
      <div className="max-w-3xl mx-auto text-center">
        
        <p className="text-lg md:text-xl font-medium text-[#0D7377]">COMMON QUESTIONS</p>

        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#000000] mt-2">
          Answers before <span className="text-[#0D7377]">you begin.</span>
        </h2>

        <div className="mt-6 md:mt-8 space-y-4 text-left">
          {faqs.map((item, i) => {
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
                  className="w-full flex font-semibold justify-between items-center px-3 md:px-5 py-4 text-xl md:text-2xl"
                >
                  {item.q}

                  {/* Custom Arrow */}
                  <img
                    src={isOpen ? arrowUp : arrowDown}
                    alt="arrow"
                    className="w-4 h-4"
                  />
                </button>

                {/* Smooth content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-4 text-xl font-normal leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
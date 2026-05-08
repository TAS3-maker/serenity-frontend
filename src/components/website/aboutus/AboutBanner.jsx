// About Section 1

import { useState } from "react";

export default function Aboutbanner() {
  return (
    <section className="w-full pb-10 md:pb-16 bg-[#F3F5F4] px-3 md:px-4">
      <div className="mx-auto text-center">
        <div className="bg-[#F3F5F4] pt-10 md:pt-12">
          {/* Top Small Heading */}
          <p className="text-[#0D7377] font-medium font-jost text-lg md:text-xl mb-2">
            About SerenityDecoded™
          </p>

          {/* Main Heading */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-jost text-gray-900 w-full m-auto max-w-5xl leading-tight">
            Financial stress has a psychology. We
            <br />
            <span className="text-[#0D7377]">
              built the ecosystem to address it.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-[#898989] font-normal text-sm md:text-lg lg:text-2xl mt-4 w-full max-w-5xl mx-auto">
            Most financial stress is not a money problem. It is a psychology
            problem. And psychology problems don't respond to spreadsheets,
            budget templates, or generic advice that assumes willpower is the
            missing ingredient.
          </p>

          <p className="text-[#898989] font-normal text-sm md:text-lg lg:text-2xl mt-4 w-full max-w-5xl mx-auto">
            No named founder. No personal brand. No guru. Just the work —
            rigorously built, psychologically grounded, and available to anyone
            who earns enough but can't stop feeling like it isn't.
          </p>
        </div>
      </div>
    </section>
  );
}

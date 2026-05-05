import { useState } from "react";


export default function SerenityTabs() {

  return (
    <section className="w-full pb-16 bg-[#F3F5F4]">
      <div className=" mx-auto text-center">
        <div className="bg-[#F3F5F4] pt-12">
        {/* Top Small Heading */}
        <p className="text-[#0D7377] font-medium font-jost text-xl mb-2">
          The SerenityDecoded™ Ecosystem
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl font-bold font-jost text-gray-900 leading-snug w-full m-auto max-w-5xl">
          Not a product. A complete change in{" "}
          <span className="text-[#0D7377]">how you relate to money.</span>
        </h1>

        {/* Subtext */}
        <p className="text-[#898989] font-normal text-2xl mt-4 w-full max-w-5xl mx-auto">
          Four things built to work together. A book that builds the foundation. An app that builds the practice. An AI
          companion that meets you in the moments the practice hasn't reached yet. And a community of people
          doing the same work. Choose where you start. The ecosystem builds from there.
        </p>

        </div>
      </div>
    </section>
  );
}
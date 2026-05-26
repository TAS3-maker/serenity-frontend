// Program Section 1 
import { useState } from "react";

export default function SerenityTabs() {
  return (
   <section className="w-full pb-6 md:pb-8 lg:pb-16 px-3 bg-[#F3F5F4]">
      <div className="mx-auto text-center">
        <div className="pt-6 md:pt-8">
          <p className="text-[#0D7377] font-medium font-jost text-lg md:text-xl mb-2">
            The SerenityDecoded™ Ecosystem
          </p>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-jost text-gray-900 !leading-tight w-full m-auto max-w-[58rem]">
            Not a product. A complete change in{" "}
            <span className="text-[#0D7377]">how you relate to money.</span>
          </h1>

          <p className="text-[#898989] font-normal text-sm md:text-lg lg:text-xl mt-3 w-full max-w-5xl mx-auto">
            Four things built to work together. A book that builds the
            foundation. An app that builds the practice. An AI companion that
            meets you in the moments the practice hasn't reached yet. And a
            community of people doing the same work. Choose where you start. The
            ecosystem builds from there.
          </p>
        </div>
      </div>
    </section>
  );
}

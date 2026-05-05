import { useState } from "react";

export default function ContactSection() {
  
  return (
    <section className="w-full pb-10 px-3 bg-[#F3F5F4]">
      <div className="mx-auto text-center">
        <div className="bg-[#F3F5F4] pt-12">

          {/* Main Heading */}
          <h1 className="mt-3 md:mt-6 text-4xl md:text-5xl font-bold font-jost text-gray-900 leading-snug w-full mx-auto max-w-6xl">
            Contact{" "}
            <span className="text-[#0D7377]"> Us</span>
          </h1>

          {/* Subtext */}
          <p className="text-[#898989] font-normal text-2xl mt-2 md:mt-4 w-full max-w-5xl mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias, nulla minus laboriosam quia odit quos quam molestiae cupiditate sequi quidem praesentium labore earum, mollitia, nostrum voluptate officiis animi aperiam reprehenderit?
          </p>

        </div>
      </div>
    </section>
  );
}
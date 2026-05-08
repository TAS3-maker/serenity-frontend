// About Section 2

import checkicon from "../assets/checkicon.svg";
import thinkperson from "../assets/thinkperson.png";

const BuiltSection = () => {
  return (
    <section className="bg-white py-6 md:py-8 lg:py-12 px-3 md:px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-10 items-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center">
          Built on a clear line between <br />
          <span className="text-[#0D7377]">psychology and prescription.</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
          {/* Left Content */}
          <div className="w-full max-w-2xl">
            <h4 className="font-medium mb-2 md:mb-3 text-lg md:text-2xl">
              What We Are
            </h4>

            <ul className="space-y-2 md:space-y-3 text-sm md:text-lg lg:text-2xl font-normal text-[#898989]">
              {[
                "A behavioural psychology ecosystem for financial stress",
                "Psychology-informed — built on evidence-based behavioural frameworks",
                "A complete system — book, app, AI companion — designed to work together",
                "Profile-personalised — different tools for The Avoider, The Anxious Manager, The Silent Stressor",
                "Non-judgmental — every tool is built on the principle that the pattern makes sense",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 md:gap-3 items-start">
                  <div className="bg-[#0D7377] w-6 h-6 md:w-8 md:h-8 min-w-[24px] md:min-w-[32px] rounded-lg p-1 flex items-center">
                    <img
                      src={checkicon}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={thinkperson}
              alt="illustration"
              className="w-40 sm:w-52 md:w-64 lg:w-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltSection;

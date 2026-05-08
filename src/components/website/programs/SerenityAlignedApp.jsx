// Program Section 2 

import checkicon from "../assets/checkicon.svg";

const AppSection = () => {
  return (
    <section className="bg-white py-6 md:py-8 lg:py-12 px-3">
      <div className="w-full max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
          SERENITYALIGNED™ <span className="text-[#0D7377]">APP</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left */}
          <div className="border-2 border-dashed border-[#0D7377] rounded-xl p-4 md:p-5 text-left">
            <h3 className="font-normal mb-3 text-lg md:text-xl lg:text-2xl text-[#0D7377]">
              What's in the app
            </h3>

            <ul className="space-y-2 text-sm md:text-lg lg:text-xl text-[#898989]">
              {[
                "10-question Financial Calm Assessment (3 mins, app-only)",
                "30-day personalised mission journey",
                "Private, AES-256 encrypted Money Story Journal",
                "Financial Calm Score (1–100 progress tracking)",
                "Daily insight cards (profile-based)",
                "Aarav AI companion built-in",
                "In-app community access",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <div className="bg-[#0D7377] w-5 h-5 md:w-7 md:h-7 rounded-lg p-1 flex-shrink-0">
                    <img
                      src={checkicon}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="border-2 border-dashed border-[#0D7377] rounded-xl p-4 md:p-5 text-left">
            <h3 className="font-normal mb-3 text-lg md:text-xl lg:text-2xl text-[#0D7377]">
              What you'll get:
            </h3>

            <ul className="space-y-2 text-sm md:text-lg lg:text-xl text-[#898989]">
              {[
                "Clear understanding of your money pattern",
                "A simple daily practice (no willpower needed)",
                "A calmer, more consistent relationship",
                "A calmer, more consistent relationship with money",
                "Visible progress over time",
                "Ability to interrupt patterns in real time",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <div className="bg-[#0D7377] w-5 h-5 md:w-7 md:h-7 rounded-lg p-1 flex-shrink-0">
                    <img
                      src={checkicon}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

       <button
  onClick={() => {
    document
      .getElementById("app-download1")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="mt-6 md:mt-12 bg-[#0D7377] text-white px-3 md:px-6 py-2 rounded-lg text-sm md:text-lg lg:text-xl font-medium w-full sm:w-auto"
>
  Start your practice — Download Serenity Aligned™
</button>
      </div>
    </section>
  );
};

export default AppSection;

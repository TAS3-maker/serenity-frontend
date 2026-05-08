// Program Section 4

import checkicon from "../assets/checkicon.svg";

const CommunitySection = () => {
  return (
    <section className="bg-white py-6 md:py-8 lg:py-12 px-3 md:px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 lg:mb-14">
          SerenityDecoded™ <br />
          <span className="text-[#0D7377] mt-2 block">Community · In-App</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Left */}
          <div className="bg-white shadow-[0px_0px_17.1px_0px_#00000040] rounded-xl overflow-hidden text-left">
            <div className="bg-[#0D7377] text-white px-3 md:px-4 py-2 font-bold text-xl md:text-2xl">
              What's included:
            </div>

            <ul className="space-y-2 md:space-y-3 px-3 md:px-4 py-4 md:py-6 text-sm md:text-lg lg:text-xl font-normal text-[#898989]">
              {[
                "Fully native inside the app (no external platform)",
                "Profile-based discussion spaces",
                "Progress sharing (scores, milestones)",
                "Framework-based conversations",
                "Monthly group sessions",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <div className="bg-[#0D7377] w-6 h-6 md:w-8 md:h-8 rounded-lg p-1 flex-shrink-0">
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

          {/* Right */}
          <div className="bg-white shadow-[0px_0px_17.1px_0px_#00000040] rounded-xl overflow-hidden text-left">
            <div className="bg-[#0D7377] text-white px-3 md:px-4 py-2 font-bold text-xl md:text-2xl">
              What you'll get:
            </div>

            <ul className="space-y-2 md:space-y-3 text-sm md:text-lg lg:text-xl px-3 md:px-4 py-4 md:py-6 font-normal text-[#898989]">
              {[
                "Proof you're not alone",
                "Support without judgement",
                "Shared language and deeper conversations",
                "A place beyond your own internal narrative",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <div className="bg-[#0D7377] w-6 h-6 md:w-8 md:h-8 rounded-lg p-1 flex-shrink-0">
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
        </div>

        <button
          onClick={() => {
            document
              .getElementById("app-download2")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-6 md:mt-12 bg-[#0D7377] text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-lg lg:text-xl font-medium"
        >
          Join the community — via the app
        </button>
      </div>
    </section>
  );
};

export default CommunitySection;

// Program Section 5

import checkicon from "../assets/checkicon.svg";

const Decodingmoney = () => {
  return (
    <section className="bg-[#F3F5F4] py-6 md:py-8 lg:py-12 px-3">
      <div className="w-full max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 lg:mb-14">
          Decoding Money Serenity™·
          <br />
          <span className="text-[#0D7377] mt-2">The Book</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Box */}
          <div className="border-2 border-dashed border-[#0D7377] rounded-xl p-4 md:p-6 text-left">
            <h3 className="font-normal mb-3 md:mb-4 text-lg md:text-xl lg:text-2xl text-[#0D7377]">
              What’s in the book:
            </h3>

            <ul className="space-y-2 md:space-y-3 text-sm md:text-lg lg:text-xl font-normal text-[#898989]">
              {[
                "The 3 stress profiles explained in depth",
                "Income–Happiness Gap research",
                "The Silence Tax concept",
                "Behavioural Avoidance Spectrum",
                "Recognition–Interruption–Integration method",
                "QR codes connecting directly to the app",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <div className="bg-[#0D7377] w-5 h-5 md:w-8 md:h-8 rounded-lg p-1 flex-shrink-0">
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

          {/* Right Box */}
          <div className="border-2 border-dashed border-[#0D7377] rounded-xl p-4 md:p-6 text-left">
            <h3 className="font-normal mb-3 md:mb-4 text-lg md:text-xl lg:text-2xl text-[#0D7377]">
              What you'll get:
            </h3>

            <ul className="space-y-2 md:space-y-3 text-sm md:text-lg lg:text-xl font-normal text-[#898989]">
              {[
                "A clear map of your personal pattern",
                "Deeper engagement with the app",
                "A new understanding of “why”",
                "Direct access to the full ecosystem",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <div className="bg-[#0D7377] w-5 h-5 md:w-8 md:h-8 rounded-lg p-1 flex-shrink-0">
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
              .getElementById("app-download")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-6 md:mt-12 bg-[#0D7377] text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-lg lg:text-xl font-medium w-full sm:w-auto"
        >
          Get the book — DecodingMoneySerenity.com
        </button>
      </div>
    </section>
  );
};

export default Decodingmoney;

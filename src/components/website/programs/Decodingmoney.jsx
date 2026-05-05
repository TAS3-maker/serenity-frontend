import checkicon from "../assets/checkicon.svg"

const Decodingmoney = () => {
  return (
    <section className="bg-[#F3F5F4] py-12 px-4">
      <div className="w-full max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-5xl font-bold mb-8">
          Decoding Money Serenity™·<br/><span className="text-[#0D7377] mt-2">The Book</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Box */}
          <div className="border-2 border-dashed border-[#0D7377] rounded-xl p-6 text-left">
            <h3 className="font-normal mb-4 text-2xl text-[#0D7377]">What’s in the book:</h3>
            <ul className="space-y-3 text-xl font-normal text-[#898989]">
              {[
                "The 3 stress profiles explained in depth",
                "Income–Happiness Gap research",
                "The Silence Tax concept",
                "Behavioural Avoidance Spectrum",
                "Recognition–Interruption–Integration method",
                "QR codes connecting directly to the app",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <div className="bg-[#0D7377] w-8 h-8 rounded-lg p-1"><img src={checkicon} alt="" width="100%" heigth="100%" /></div> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Box */}
          <div className="border-2 border-dashed border-[#0D7377] rounded-xl p-6 text-left">
            <h3 className="font-normal mb-4 text-2xl text-[#0D7377]">What you'll get:</h3>
            <ul className="space-y-3 text-xl font-normal text-[#898989]">
              {[
                "A clear map of your personal pattern",
                "Deeper engagement with the app",
                "A new understanding of “why”",
                "Direct access to the full ecosystem",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <div className="bg-[#0D7377] w-8 h-8 rounded-lg p-1"><img src={checkicon} alt="" width="100%" heigth="100%" /></div> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="mt-8 bg-[#0D7377] text-white px-6 py-2 rounded-lg text-xl font-medium">
          Get the book — DecodingMoneySerenity.com
        </button>
      </div>
    </section>
  );
};

export default Decodingmoney;
import checkicon from "../assets/checkicon.svg"

const AppSection = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="w-full max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-5xl font-bold mb-8">
          SERENITYALIGNED™ <span className="text-[#0D7377]">APP</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Box */}
          <div className="border-2 border-dashed border-[#0D7377] rounded-xl p-6 text-left">
            <h3 className="font-normal mb-4 text-2xl text-[#0D7377]">What's in the app</h3>
            <ul className="space-y-3 text-xl font-normal text-[#898989]">
              {[
                "10-question Financial Calm Assessment (3 mins, app-only)",
                "30-day personalised mission journey",
                "Private, AES-256 encrypted Money Story Journal",
                "Financial Calm Score (1–100 progress tracking)",
                "Daily insight cards (profile-based)",
                "Aarav AI companion built-in",
                "In-app community access",
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
                "Clear understanding of your money pattern",
                "A simple daily practice (no willpower needed)",
                "A calmer, more consistent relationship",
                "A calmer, more consistent relationship with money",
                "Visible progress over time",
                "Ability to interrupt patterns in real time",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <div className="bg-[#0D7377] w-8 h-8 rounded-lg p-1"><img src={checkicon} alt="" width="100%" heigth="100%" /></div> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="mt-8 bg-[#0D7377] text-white px-6 py-2 rounded-lg text-xl font-medium">
          Start your practice — Download Serenity Aligned™
        </button>
      </div>
    </section>
  );
};

export default AppSection;
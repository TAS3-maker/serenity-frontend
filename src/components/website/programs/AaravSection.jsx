import checkicon from "../assets/checkicon.svg"



const AaravSection = () => {
  return (
    <section className="py-12 px-4 bg-[#F3F5F4]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-5xl font-bold mb-14">
          AARAV The <span className="text-[#0D7377]">Serenity Genie™</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Card */}
          <div className="bg-[#FFFFFF] shadow-[0px_0px_20.9px_0px_#00000040] rounded-xl p-6 text-left">
            <h3 className="font-normal mb-4 text-2xl text-[#0D7377]">What Aarav does:</h3>
            <ul className="space-y-3 text-xl font-normal text-[#898989]">
              {[
                "Responds based on your stress profile",
                "Uses the SerenityDecoded™ framework",
                "Available 24/7 (web + in-app)",
                "Focuses on emotions, not financial advice",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <div className="bg-[#0D7377] w-8 h-8 rounded-lg p-1"><img src={checkicon} alt="" width="100%" heigth="100%" /></div> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card */}
          <div className="bg-[#FFFFFF] shadow-[0px_0px_20.9px_0px_#00000040] rounded-xl p-6 text-left">
            <h3 className="font-normal mb-4 text-2xl text-[#0D7377]">What you'll get:</h3>
            <ul className="space-y-3 text-xl font-normal text-[#898989]">
              {[
                "Support during anxious or avoidant moments",
                "Faster pattern recognition",
                "Reduced sense of isolation",
                "Clarity without being told what to do",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <div className="bg-[#0D7377] w-8 h-8 rounded-lg p-1"><img src={checkicon} alt="" width="100%" heigth="100%" /></div> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="mt-8 bg-[#0D7377] text-white px-6 py-2 rounded-lg text-xl font-medium">
          Meet Aarav — No sign-up required  
        </button>
      </div>
    </section>
  );
};

export default AaravSection;
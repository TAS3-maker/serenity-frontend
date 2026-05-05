import checkicon from "../assets/checkicon.svg"


const CommunitySection = () => {
  return (
   <section className="py-4 md:py-10 lg:py-12 px-3 bg-[#F3F5F4]">
  <div className="max-w-5xl mx-auto text-center">

    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-10 lg:mb-14 leading-snug">
      AARAV The <span className="text-[#0D7377]">Serenity Genie™</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      
      {/* Left Card */}
      <div className="bg-[#FFFFFF] shadow-[0px_0px_20.9px_0px_#00000040] rounded-xl p-4 md:p-6 text-left">
        <h3 className="font-normal mb-3 md:mb-4 text-lg md:text-xl lg:text-2xl text-[#0D7377]">
          What Aarav does:
        </h3>

        <ul className="space-y-2 md:space-y-3 text-sm md:text-lg lg:text-xl font-normal text-[#898989]">
          {[
            "Responds based on your stress profile",
            "Uses the SerenityDecoded™ framework",
            "Available 24/7 (web + in-app)",
            "Focuses on emotions, not financial advice",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 items-start leading-[1.5]">
              <div className="bg-[#0D7377] w-5 h-5 md:w-8 md:h-8 rounded-lg p-1 flex-shrink-0">
                <img src={checkicon} alt="" className="w-full h-full object-contain" />
              </div>
              <span className="break-words">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Card */}
      <div className="bg-[#FFFFFF] shadow-[0px_0px_20.9px_0px_#00000040] rounded-xl p-4 md:p-6 text-left">
        <h3 className="font-normal mb-3 md:mb-4 text-lg md:text-xl lg:text-2xl text-[#0D7377]">
          What you'll get:
        </h3>

        <ul className="space-y-2 md:space-y-3 text-sm md:text-lg lg:text-xl font-normal text-[#898989]">
          {[
            "Support during anxious or avoidant moments",
            "Faster pattern recognition",
            "Reduced sense of isolation",
            "Clarity without being told what to do",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 items-start leading-[1.5]">
              <div className="bg-[#0D7377] w-5 h-5 md:w-8 md:h-8 rounded-lg p-1 flex-shrink-0">
                <img src={checkicon} alt="" className="w-full h-full object-contain" />
              </div>
              <span className="break-words">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>

    <button className="mt-6 md:mt-8 bg-[#0D7377] text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-lg lg:text-xl font-medium w-full sm:w-auto">
      Meet Aarav — No sign-up required  
    </button>

  </div>
</section>

  );
};

export default CommunitySection;
import checkicon from "../assets/checkicon.svg"


const CommunitySection = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-5xl font-bold mb-8">
          SerenityDecoded™ <br />
          <span className="text-[#0D7377] mt-2">Community · In-App</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left */}
          <div className="bg-white shadow-[0px_0px_17.1px_0px_#00000040] rounded-xl overflow-hidden text-left">
            <div className="bg-[#0D7377] text-white px-4 py-2 font-bold text-2xl">
              What's included:
            </div>
            <ul className="space-y-3 px-4 py-6 text-xl font-normal text-[#898989]">
              {[
                "Fully native inside the app (no external platform)",
                "Profile-based discussion spaces",
                "Progress sharing (scores, milestones)",
                "Framework-based conversations",
                "Monthly group sessions",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                 <div className="bg-[#0D7377] w-8 h-8 rounded-lg p-1"><img src={checkicon} alt="" width="100%" heigth="100%" /></div> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="bg-white shadow-[0px_0px_17.1px_0px_#00000040] rounded-xl overflow-hidden text-left">
            <div className="bg-[#0D7377] text-white px-4 py-2 font-bold text-2xl">
              What you'll get:
            </div>
            <ul className="space-y-3 text-xl px-4 py-6 font-normal text-[#898989]">
              {[
                "Proof you're not alone",
                "Support without judgement",
                "Shared language and deeper conversations",
                "A place beyond your own internal narrative",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <div className="bg-[#0D7377] w-8 h-8 rounded-lg p-1"><img src={checkicon} alt="" width="100%" heigth="100%" /></div> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="mt-8 bg-[#0D7377] text-white px-6 py-2 rounded-lg text-xl font-medium">
          Join the community — via the app
        </button>
      </div>
    </section>
  );
};

export default CommunitySection;
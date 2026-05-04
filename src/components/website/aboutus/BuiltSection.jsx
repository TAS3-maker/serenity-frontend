import checkicon from "../assets/checkicon.svg";
import thinkperson from "../assets/thinkperson.png";

const BuiltSection = () => {
  return (
    <section className="bg-gray-100 py-14 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 items-center">
         {/* Heading */}
         <h2 className="text-2xl md:text-5xl font-bold mb-6">
            Built on a clear line between <br />
            <span className="text-[#0D7377]">
              psychology and prescription.
            </span>
          </h2>
          <div className="flex gap-8 items-center">
        {/* Left Content */}

        <div className="w-full max-w-2xl">
          

          <h4 className="font-medium mb-3 text-2xl">What We Are</h4>

          <ul className="space-y-3 text-2xl font-normal text-[#898989]">
            {[
              "A behavioural psychology ecosystem for financial stress",
              "Psychology-informed — built on evidence-based behavioural frameworks",
              "A complete system — book, app, AI companion — designed to work together",
              "Profile-personalised — different tools for The Avoider, The Anxious Manager, The Silent Stressor",
              "Non-judgmental — every tool is built on the principle that the pattern makes sense",
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <div className="bg-[#0D7377] w-8 h-8 min-w-8 min-h-8 rounded-lg p-1 flex items-center"><img src={checkicon} alt="" className="w-8 h-8" /></div> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img src={thinkperson} alt="illustration" className="w-64 md:w-80" />
        </div>

        </div>

      </div>
    </section>
  );
};

export default BuiltSection;
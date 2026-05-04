import illustration from "../assets/piggybank.png";
import checkicon from '../assets/checkicon.svg';

const items = [
  {
    icon: checkicon,
    title: "Financial Calm Assessment : ",
    desc: "10-question profile engine shaping all interactions"
  }, 
  {
    icon: checkicon,
    title: "30-Day Mission Library : ",
    desc: "90+ personalized missions, unlocked step-by-step"
  }, 
  {
    icon: checkicon,
    title: "Money Story Journal : ",
    desc: "AES-256 encrypted, private reflections only"
  }, 
  {
    icon: checkicon,
    title: "Financial Calm Score : ",
    desc: "Daily 1–100 progress tracking over time"
  },
  {
    icon: checkicon,
    title: "Daily Insight Cards : ",
    desc: "60 psychology-based, profile-specific insights"
  },
];

export default function PoweringSection() {
  return (
    <section className="bg-white py-16 px-4 font-jost">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left */}
        <div className="">
          <h2 className="text-5xl font-bold text-[#000000] ">
            What’s <span className="text-[#0D7377]">Powering It</span>
          </h2>

          <ul className="mt-6 space-y-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                {/* <span className="text-teal-600 mt-1">✔</span> */}
                <div className="w-[30px] h-[30px] p-1 flex items-center justify-center rounded-[4px] bg-[#0D7377] text-white mb-4">
                   <img src={item.icon} alt="" className="w-[22px] h-[22px] max-w-[22px]" />
                </div>
                <p className="text-[22px] text-[#000000] font-semibold">{item.title}<span className="font-normal text-[#898989]">{item.desc}</span></p>
              </li>
            ))}
          </ul>

          <button className="mt-6 bg-[#0D7377] text-xl font-medium text-white px-5 py-2 rounded-lg">
            Download Serenity Aligned™
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img src={illustration} alt="" className="w-full max-w-md" />
        </div>
      </div>
    </section>
  );
}
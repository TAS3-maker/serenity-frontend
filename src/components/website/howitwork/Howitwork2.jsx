
import download from "../assets/download.svg";
import program from "../assets/program.svg";
import target from "../assets/target.svg";
import thinking from "../assets/thinking.svg";
import artificialintelligence from "../assets/artificialintelligence.svg";

const features = [
  {
    icon: download,
    title: "Download and begin",
    desc: "Starts with an invitation. A 3-minute, 10-question assessment identifies your stress profile and guides everything that follows.",
  },
  {
    icon: target,
    title: "Every day, one mission",
    desc: "Each morning, you get a personalized 5-minute mission based on your stress profile—different for Avoiders and Anxious Managers, not generic.",
  },
  {
    icon: program,
    title: "Reflect and log",
    desc: "After the mission, a quick reflection is stored privately in your encrypted journal.",
  },
  {
    icon: thinking,
    title: "Track your psychological shift.",
    desc: "Your Financial Calm Score updates as you progress, tracking your relationship with money—not your balance—and showing real change.",
  },
  {
    icon: artificialintelligence,
    title: "Aarav is available when you need it",
    desc: "Between sessions, Aarav supports you with anxiety, avoidance, or unspoken questions the mission didn’t address.",
  },
];

export default function FeatureSteps() {
  return (
    <section className="bg-[#f3f5f4] py-16 px-4 font-jost">
      <div className="max-w-6xl mx-auto">
        
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {features.slice(0, 3).map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex flex-col items-center">
                
                {/* Icon Circle */}
                <div className="w-36 h-36 flex items-center justify-center rounded-full bg-[#0D7377] text-white mb-4">
                   <img src={Icon} alt="" className="w-20 h-20" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#000000]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#898989] font-normal mt-2 text-xl max-w-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Row (centered 2 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12 max-w-3xl mx-auto text-center">
          {features.slice(3).map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex flex-col items-center">
                
                {/* Icon Circle */}
                <div className="w-36 h-36 flex items-center justify-center rounded-full bg-teal-700 text-white mb-4">
                  <img src={Icon} alt="" className="w-20 h-20" />

                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#000000]">
                  {item.title}
                </h3>    

                {/* Description */}
                <p className="text-[#898989] font-normal mt-2 text-xl max-w-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
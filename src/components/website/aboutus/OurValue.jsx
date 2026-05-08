// About Section 4

import psychology from "../assets/Psychology.svg";
import access from "../assets/Access.svg";
import privacy from "../assets/Privacy.svg";
import calm from "../assets/Calm.svg";

const ValuesSection = () => {
  return (
    <section className="bg-white py-6 md:py-8 lg:py-12 px-3 md:px-4">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm md:text-xl font-medium text-[#0D7377] mb-2">
          OUR VALUES
        </p>

        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-10">
          What we <span className="text-[#0D7377]">stand for.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
          {[
            {
              icon: psychology,
              title: "Psychology over discipline",
              desc: "Financial stress is a psychological problem, not a willpower problem. Every feature is built on that premise.",
            },
            {
              icon: access,
              title: "Access over exclusivity",
              desc: "The $1,000/month coaching model is broken. Everyone deserves access to the tools that actually work.",
            },
            {
              icon: privacy,
              title: "Privacy as a foundation",
              desc: "Your financial emotions are deeply personal. We will never sell your data or judge your situation.",
            },
            {
              icon: calm,
              title: "Calm over hustle",
              desc: "We reject the hustle narrative. Financial contentment isn't about optimisation — it's about awareness and peace.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white shadow-[0px_0px_12.1px_0px_#00000040] rounded-xl px-4 md:px-6 py-4 text-left"
            >
              <img
                src={card.icon}
                alt="icon"
                className="mb-2 w-8 h-8 md:w-11 md:h-11"
              />

              <h3 className="font-normal text-base md:text-xl text-[#000000] mb-2">
                {card.title}
              </h3>

              <p className="text-sm md:text-lg font-normal text-[#898989]">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;

import psychology from "../assets/Psychology.svg";
import access from "../assets/Access.svg";
import privacy from "../assets/Privacy.svg";
import calm from "../assets/Calm.svg";


const ValuesSection = () => {
  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto text-center">
        
        <p className="text-xl font-medium text-[#0D7377] mb-2">OUR VALUES</p>

        <h2 className="text-2xl md:text-5xl font-bold mb-10">
          What we <span className="text-[#0D7377]">stand for.</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-9">
          
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
              className="bg-white shadow-[0px_0px_12.1px_0px_#00000040] rounded-xl px-6 py-4 text-left"
            >
              <img src={card.icon} alt="icon" className="mb-2 w-11 h-11"/>
              <h3 className="font-normal text-xl text-[#000000] mb-2">{card.title}</h3>
              <p className="text-lg font-normal text-[#898989]">{card.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
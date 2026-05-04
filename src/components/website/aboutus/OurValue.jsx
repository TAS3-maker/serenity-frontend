const ValuesSection = () => {
  return (
    <section className="bg-gray-100 py-14 px-4">
      <div className="max-w-6xl mx-auto text-center">
        
        <p className="text-xs text-gray-500 mb-2">OUR VALUES</p>

        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          What we <span className="text-teal-600">stand for.</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          
          {[
            {
              title: "Psychology over discipline",
              desc: "Financial stress is psychological, not a willpower problem.",
            },
            {
              title: "Access over exclusivity",
              desc: "Everyone deserves access to tools that actually work.",
            },
            {
              title: "Privacy as a foundation",
              desc: "Your financial emotions are deeply personal.",
            },
            {
              title: "Calm over hustle",
              desc: "We reject the hustle narrative — focus on peace.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white shadow-[0px_0px_17.1px_0px_#00000040] rounded-xl p-6 text-left"
            >
              <div className="mb-3 text-teal-600 text-lg">🧠</div>
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
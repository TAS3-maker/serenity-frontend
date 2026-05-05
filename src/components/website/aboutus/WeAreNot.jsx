import statatics from "../assets/statatics.png"
import checkicon from "../assets/checkicon.svg";


const NotSection = () => {
  return (
    <section className="bg-[#F3F5F4] py-14 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Left Image */}
        <div className="flex justify-center order-2 md:order-1">
          <img
            src={statatics}
            alt="illustration"
            className="w-64 md:w-[450px]"
          />
        </div>

        {/* Right Content */}
        <div className="order-1 md:order-2">
          <h2 className="text-2xl md:text-5xl font-bold mb-6">
            What <span className="text-[#0D7377]">We Are Not</span>
          </h2>

          <ul className="space-y-3 text-2xl font-normal text-[#898989]">
            {[
              "A banking app — we do not connect to your accounts",
              "A budgeting tool — we do not track your spending",
              "Financial advice — no investment or planning guidance",
              "Therapy — not a licensed mental health service",
              "A personal brand — no guru or 'my journey' narrative",
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <div className="bg-[#0D7377] w-8 h-8 min-w-8 min-h-8 rounded-lg p-1 flex items-center"><img src={checkicon} alt="" className="w-8 h-8" /></div> {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default NotSection;
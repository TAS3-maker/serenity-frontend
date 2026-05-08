// About Section 3
import statatics from "../assets/statatics.png";
import checkicon from "../assets/checkicon.svg";

const NotSection = () => {
  return (
    <section className="bg-[#F3F5F4] py-6 md:py-8 lg:py-12 px-3 md:px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-10 items-center">
        {/* Left Image */}
        <div className="flex justify-center order-2 md:order-1">
          <img
            src={statatics}
            alt="illustration"
            className="w-40 sm:w-56 md:w-64 lg:w-[450px]"
          />
        </div>

        {/* Right Content */}
        <div className="order-1 md:order-2">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            What <span className="text-[#0D7377]">We Are Not</span>
          </h2>

          <ul className="space-y-2 md:space-y-3 text-sm md:text-lg lg:text-2xl font-normal text-[#898989]">
            {[
              "A banking app — we do not connect to your accounts",
              "A budgeting tool — we do not track your spending",
              "Financial advice — no investment or planning guidance",
              "Therapy — not a licensed mental health service",
              "A personal brand — no guru or 'my journey' narrative",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 md:gap-3 items-start">
                <div className="bg-[#0D7377] w-6 h-6 md:w-8 md:h-8 min-w-[24px] md:min-w-[32px] rounded-lg p-1 flex items-start mt-1">
                  <img
                    src={checkicon}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NotSection;

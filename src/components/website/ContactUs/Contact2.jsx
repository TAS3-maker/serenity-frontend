import form from "../assets/form.png";

export default function FormSection() {
  return (
    <section className="w-full py-6 md:py-10 lg:py-16 px-3 md:px-4 bg-white">
      {/* Heading Section */}
      <div className="mx-auto text-center">
        <h1 className="mt-3 text-2xl md:text-4xl lg:text-5xl font-bold font-jost text-gray-900 leading-snug max-w-6xl mx-auto">
          Get <span className="text-[#0D7377]">In Touch</span>
        </h1>

        <p className="text-[#898989] font-normal text-sm md:text-lg lg:text-2xl mt-4 md:mt-5 max-w-5xl mx-auto">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit...
        </p>
      </div>

      {/* Form + Image Section */}
      <div className="max-w-6xl mx-auto mt-8 md:mt-12 flex flex-col md:flex-row gap-8 md:gap-10 items-center">
        {/* Left Image (40% on tablet) */}
        <div className="flex justify-center w-full md:w-[40%]">
          <img src={form} alt="" className="w-40 sm:w-56 md:w-full max-w-md" />
        </div>

        {/* Right Form (60% on tablet) */}
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-xl w-full md:w-[60%] max-w-md mx-auto">
          <form className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-xs md:text-sm text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-lg px-3 md:px-4 py-2 outline-none focus:ring-2 focus:ring-[#0D7377]"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-lg px-3 md:px-4 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full border rounded-lg px-3 md:px-4 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="w-full border rounded-lg px-3 md:px-4 py-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-[#0D7377] text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import form from "../assets/form.png";

export default function FormSection() {
  return (
    <section className="w-full pb-16 px-3 bg-white">
      {/* Heading Section */}
      <div className="mx-auto text-center px-4">
        <div className="pt-16">
          <h1 className="mt-3 text-4xl md:text-5xl font-bold font-jost text-gray-900 leading-snug max-w-6xl mx-auto">
            Get <span className="text-[#0D7377]">In Touch</span>
          </h1>

          <p className="text-[#898989] font-normal text-lg md:text-2xl mt-5 max-w-5xl mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            nulla minus laboriosam quia odit quos quam molestiae cupiditate
            sequi quidem praesentium labore earum, mollitia, nostrum voluptate
            officiis animi aperiam reprehenderit?
          </p>
        </div>
      </div>

      {/* Form + Image Section */}
      <div className="max-w-6xl mx-auto mt-8 md:mt-12 px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img src={form} alt="" className="w-[80%] md:w-full max-w-md" />
        </div>

        {/* Right Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto">
          <form className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                required
                pattern="[A-Za-z]+"
                title="Only letters allowed"
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#0D7377]"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                required
                pattern="[A-Za-z]+"
                title="Only letters allowed"
                className="w-full border rounded-lg px-4 py-2 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full border rounded-lg px-4 py-2 outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit number"
                className="w-full border rounded-lg px-4 py-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-[#0D7377] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

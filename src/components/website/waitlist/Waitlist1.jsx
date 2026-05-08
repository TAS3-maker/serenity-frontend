import { useState } from "react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <section className="w-full pb-8 px-3 bg-[#F3F5F4]">
      <div className="mx-auto text-center">
        <div className="bg-[#F3F5F4] pt-12">

          {/* Top Small Heading */}
          <p className="text-[#0D7377] font-medium font-jost text-xl mb-2">
            SERENITYDECODED JOURNAL
          </p>

          {/* Main Heading */}
          <h1 className="mt-3 text-3xl md:text-5xl font-bold font-jost text-gray-900 leading-none w-full mx-auto max-w-[40rem]">
            Your money stress isn't{" "}
            <span className="text-[#0D7377]"> about the numbers.</span>
          </h1>

          {/* Subtext */}
          <p className="text-[#898989] font-normal text-xl md:text-2xl mt-3 w-full max-w-5xl mx-auto">
            Decoding Money Serenity is coming. Be the first to know.
          </p>

          {/*Email Subscribe*/}
          <form
            onSubmit={handleSubmit}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#0D7377] placeholder:text-[#0D7377]"
          />

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#0D7377] text-white px-5 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
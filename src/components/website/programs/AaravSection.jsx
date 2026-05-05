const AaravSection = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          AARAV The <span className="text-teal-600">Serenity Genie™</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Card */}
          <div className="bg-gray-50 shadow-md rounded-xl p-6 text-left">
            <h3 className="font-semibold mb-4">What Aarav does:</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Responds based on your stress profile",
                "Uses the SerenityDecoded™ framework",
                "Available 24/7",
                "Focuses on emotions, not financial advice",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span>✅</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card */}
          <div className="bg-gray-50 shadow-md rounded-xl p-6 text-left">
            <h3 className="font-semibold mb-4">What you'll get:</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Support during anxious moments",
                "Faster pattern recognition",
                "Reduced sense of isolation",
                "Clarity without being told what to do",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span>✅</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="mt-8 bg-teal-600 text-white px-6 py-2 rounded-md text-sm">
          Meet Aarav — No sign-up required
        </button>
      </div>
    </section>
  );
};

export default AaravSection;
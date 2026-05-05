const CommunitySection = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          SerenityDecoded™ <br />
          <span className="text-teal-600">Community · In-App</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden text-left">
            <div className="bg-teal-700 text-white px-4 py-2 font-semibold">
              What's included:
            </div>
            <ul className="p-4 space-y-3 text-sm">
              {[
                "Fully native inside the app",
                "Profile-based discussion spaces",
                "Progress sharing",
                "Framework-based conversations",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span>✅</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden text-left">
            <div className="bg-teal-700 text-white px-4 py-2 font-semibold">
              What you'll get:
            </div>
            <ul className="p-4 space-y-3 text-sm">
              {[
                "Proof you're not alone",
                "Support without judgement",
                "Shared language & deeper conversations",
                "A place beyond your own narrative",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span>✅</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
const NotSection = () => {
  return (
    <section className="bg-gray-200 py-14 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Left Image */}
        <div className="flex justify-center order-2 md:order-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="illustration"
            className="w-64 md:w-80"
          />
        </div>

        {/* Right Content */}
        <div className="order-1 md:order-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What <span className="text-teal-600">We Are Not</span>
          </h2>

          <ul className="space-y-3 text-sm">
            {[
              "A banking app — we do not connect to your accounts",
              "A budgeting tool — we do not track your spending",
              "Financial advice — no investment or planning guidance",
              "Therapy — not a licensed mental health service",
              "A personal brand — no guru or 'my journey' narrative",
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span>✅</span> {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default NotSection;
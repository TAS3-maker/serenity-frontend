// Waiting2Section.jsx

import book from "../assets/book.png";


export default function BookSection() {
  return (
    
<section className="bg-white py-10 md:py-20 px-3 md:px-4 font-jost">
  <div className="w-full lg:max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start">
    
    {/* Left - 60% */}
    <div className="w-full lg:w-[55%] lg:py-16">
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold !leading-none text-[#000000]">
        About <span className="text-[#0D7377]">the book</span>
      </h2>

      <div className="text-[#898989] mt-5 text-base sm:text-lg md:text-[22px] font-normal w-full">
        <p>
          Most financial advice ignores the most important variable: you. Decoding Money Serenity is a psychology-first guide to understanding why money feels the way it does — and what to do about it.
        </p>

        <p className="py-4">
          Built on three proprietary financial stress profiles — The Avoider, The Anxious Manager, and The Silent Stressor — this book gives you a map of your own pattern, not a list of rules to follow.
        </p>

        <p>
          The result isn't wealth. It's financial calm.
        </p>
      </div>
    </div> 

    {/* Right - 40% */}
    <div className="w-full lg:w-[45%] flex justify-center">
      <img
        src={book}
        alt=""
        className="w-full max-w-[300px] md:max-w-[440px] lg:max-w-[530px]"
      />
    </div>

  </div>
</section>
  );
}
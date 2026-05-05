// DecodingSection.jsx

import phone from "../assets/decodingphn.png";
import qr from "../assets/scannercode.png";
import appstore from "../assets/appstore.png";
import googleplay from "../assets/googleplay.png";


export default function DecodingSection() {
  return (
    // <section className="bg-[#F3F5F4] py-16 px-4 font-jost">
    //   <div className="w-full max-w-[1130px] mx-auto grid md:grid-cols-2 gap-10 items-center">
        
    //     {/* Left */}
    //     <div>
    //       <p className="text-xl font-medium text-[#0D7377] mb-2">
    //         Where every SerenityDecoded journey begin
    //       </p>

    //       <h2 className="text-5xl font-bold text-[#000000]">
    //         Decoding <span className="text-[#0D7377]">Money Serenity™</span>
    //       </h2>

    //       <p className="text-[#898989] mt-4 text-[22px] font-normal w-full max-w-xl">
    //         <p className="mb-2">The book that built the framework.</p> 
    //         <p>Most books about money tell you what to do. Decoding Money Serenity™ tells you why you're doing what
    //          you're already doing — and how to change it at the level where it actually lives: your psychology.</p>
    //       </p>

    //       {/* QR + Buttons */}
    //       <div className="flex items-center gap-4 mt-6">
    //         <img src={qr} className="w-36" />
    //         <div className="flex flex-col gap-2">
    //           <button className="">
    //             <img src={appstore} className="w-44" />
    //           </button>
    //           <button className="">
    //             <img src={googleplay} className="w-44" />
    //           </button>
    //         </div>
    //         <img src={qr} className="w-36" />
    //       </div>
    //     </div>

    //     {/* Right */}
    //     <div className="flex justify-center">
    //       <img src={phone} alt="" className="max-w-[630px]" />
    //     </div>
    //   </div>
    // </section>

//    

<section className="bg-[#F3F5F4] py-10 md:py-16 px-3 md:px-4 font-jost">
  <div className="w-full lg:max-w-[1130px] mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-10">
    
    {/* Left */}
    <div className="w-full lg:max-w-xl mx-auto lg:mx-0 md:px-10">
      <p className="text-lg md:text-xl font-medium text-[#0D7377] mb-2">
        Where every SerenityDecoded journey begin
      </p>

      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#000000]">
        Decoding <span className="text-[#0D7377]">Money Serenity™</span>
      </h2>

      <div className="text-[#898989] mt-4 text-base sm:text-lg md:text-[22px] font-normal w-full lg:max-w-xl">
        <p className="mb-2">The book that built the framework.</p> 
        <p>
          Most books about money tell you what to do. Decoding Money Serenity™ tells you why you're doing what
          you're already doing — and how to change it at the level where it actually lives: your psychology.
        </p>
      </div>

      {/* QR + Buttons */}
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-10 lg:gap-2 mt-6">
        <img src={qr} className="w-24 sm:w-28 md:w-36" />

        <div className="flex flex-col gap-2">
          <button>
            <img src={appstore} className="w-32 sm:w-36 md:w-44" />
          </button>
          <button>
            <img src={googleplay} className="w-32 sm:w-36 md:w-44" />
          </button>
        </div>

        <img src={qr} className="w-24 sm:w-28 md:w-36" />
      </div>
    </div>

    {/* Right */}
    <div className="w-full flex justify-center">
      <img
        src={phone}
        alt=""
        className="w-full max-w-[300px] md:max-w-[540px] lg:max-w-[630px]"
      />
    </div>

  </div>
</section>
  );
}
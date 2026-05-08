// DecodingSection.jsx

import phone from "../assets/decodingphn.png";
import qr from "../assets/scannercode.png";
import appstore from "../assets/appstore.png";
import googleplay from "../assets/googleplay.png";

export default function DecodingSection({ bg = "#F3F5F4" }) {
  return (
    <section className="bg-[#F3F5F4] py-6 md:py-8 lg:py-12 px-3 md:px-4 font-jost" id="app-download1">
          
          <div className="w-full lg:max-w-[1130px] mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-10">
            
            {/* Left */}
            <div className="w-full lg:max-w-xl mx-auto lg:mx-0 md:pl-10">
              
              <p className="text-lg md:text-xl font-medium text-[#0D7377] mb-2">
                Where every SerenityDecoded journey begin
              </p>
    
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#000000] leading-snug">
                Decoding{" "}
                <span className="text-[#0D7377]">
                  Money Serenity™
                </span>
              </h2>
    
              <div className="text-[#898989] mt-4 text-base sm:text-lg md:text-[22px] font-normal w-full lg:max-w-xl">
                <p className="mb-2">
                  The book that built the framework.
                </p>
    
                <p>
                  Most books about money tell you what to do. Decoding Money
                  Serenity™ tells you why you're doing what you're already doing —
                  and how to change it at the level where it actually lives: your
                  psychology.
                </p>
              </div>
    
              {/* QR + Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-7 md:gap-12 mt-6 relative">
                
                {/* Left QR */}
                <img
                  src={qr}
                  alt=""
                  className="w-24 sm:w-24 md:w-32 lg:w-32"
                />
              
                {/* Left Arrow */}
                <span className="absolute left-[110px] bottom-[54px] md:left-[228px] md:bottom-[82px] lg:bottom-[75px] lg:left-[26%] md:block text-[#0D7377] text-2xl md:text-3xl lg:text-4xl font-light">
                  ←
                </span>
                  
                {/* Right Arrow */}
                <span className="absolute left-[233px] bottom-[9px] md:left-[63%] md:bottom-[14px] md:block text-[#0D7377] text-2xl md:text-3xl lg:text-4xl font-light">
                  →
                </span>
    
                {/* Store Buttons */}
                <div className="flex flex-col gap-2">
                  <button>
                    <img
                      src={appstore}
                      className="w-24 sm:w-28 md:w-40 lg:w-36"
                      alt=""
                    />
                  </button>
    
                  <button>
                    <img
                      src={googleplay}
                      className="w-24 sm:w-28 md:w-40 lg:w-36"
                      alt=""
                    />
                  </button>
                </div>
    
    
                {/* Right QR */}
                <img
                  src={qr}
                  alt=""
                  className="w-24 sm:w-24 md:w-32 lg:w-32"
                />
    
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

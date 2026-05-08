import React from "react";
import logopayment from "./assets/logo-payment.png";

export default function PaymentPage() {
  return (
    <div className="w-full max-h-[calc(100vh-2px)]   bg-[#EEF3F4] p-3 md:p-4 overflow-y-auto">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1210px]   mx-auto bg-white rounded-2xl shadow-[0px_20px_70px_rgba(0,0,0,0.08)] overflow-y-auto">

        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

          {/* ================= LEFT SIDE ================= */}
          <div className="px-4 sm:px-6 lg:px-8 py-5 flex flex-col justify-between">

            {/* TOP CONTENT */}
            <div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#0D7A7F10] border border-[#0D7A7F20] px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#0D7A7F]" />

                <p className="text-[#0D7A7F] text-[8px] sm:text-[10px] font-semibold tracking-wide">
                  PERSONALIZED WELLNESS EXPERIENCE
                </p>
              </div>

              {/* Heading */}
              <div className="mt-4">
                <h1 className="text-[28px] sm:text-[38px] lg:text-[42px] leading-[1] font-bold tracking-[-2px] text-[#111] max-w-[620px]">
                  Build financial calm with guided daily support.
                </h1>

                <p className="text-[#666] text-[13px] sm:text-[14px] leading-[1.7] mt-3 max-w-[560px]">
                  Choose the experience that fits your journey. Reduce stress,
                  improve emotional clarity, and regain control with guided
                  daily sessions.
                </p>
              </div>


              {/* ================= PLANS ================= */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">

                {/* PLAN 1 */}
                <div className="border border-[#E7E7E7] rounded-2xl p-4 bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between">

                  <div>
                    <div className="inline-flex bg-[#0D7A7F10] text-[#0D7A7F] text-[10px] font-semibold px-3 py-1 rounded-full">
                      Beginner Friendly
                    </div>

                    <h2 className="text-[#111] text-[22px] font-bold mt-3 leading-[1.1]">
                      7-Day Foundation
                    </h2>

                    <p className="text-[#666] text-[12px] leading-[1.7] mt-2">
                      Perfect for getting started with stress management and
                      emotional clarity.
                    </p>

                    {/* Included */}
                    <div className="mt-4 space-y-2">
                      {[
                        "7 guided sessions",
                        "Stress tracking",
                        "Daily reflections",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2"
                        >
                          <div className="w-4 h-4 rounded-full bg-[#0D7A7F] text-white flex items-center justify-center text-[9px]">
                            ✓
                          </div>

                          <p className="text-[11px] text-[#444]">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-end gap-1">
                      <span className="text-[38px] font-bold text-[#111] leading-none">
                        $5
                      </span>

                      <span className="text-[20px] font-bold text-[#111] mb-1">
                        .99
                      </span>
                    </div>

                    <button className="w-full mt-4 bg-[#0D7A7F] hover:bg-[#08666A] transition-all duration-300 text-white py-2.5 rounded-xl font-semibold text-[13px]">
                      Start 7-Day Plan
                    </button>
                  </div>
                </div>

                {/* PLAN 2 */}
                <div className="relative border-2 border-[#C99200] rounded-2xl p-4 bg-gradient-to-b from-[#FFFDF8] to-white shadow-[0px_15px_45px_rgba(0,0,0,0.08)] flex flex-col justify-between">

                  {/* Popular Badge */}
                  <div className="absolute top-[-10px] right-4 bg-[#C99200] text-white text-[9px] font-semibold px-3 py-1 rounded-full shadow-md">
                    MOST POPULAR
                  </div>

                  <div>
                    <div className="inline-flex bg-[#0D7A7F12] text-[#0D7A7F] text-[10px] font-semibold px-3 py-1 rounded-full">
                      Complete Experience
                    </div>

                    <h2 className="text-[#111] text-[22px] font-bold mt-3 leading-[1.1]">
                      30-Day Full Journey
                    </h2>

                    <p className="text-[#666] text-[12px] leading-[1.7] mt-2">
                      Complete transformation experience with advanced insights,
                      full support, and deeper reflection sessions.
                    </p>

                    {/* Included */}


                    <div className="flex flex-wrap gap-2 mt-2"> {[ "Full access", "Daily support", "Advanced insights", "Personalized", ].map((item, index) => ( <div key={index} className="bg-[#F4F7F8] border border-[#ECECEC] px-3 py-1 rounded-full text-[8px] font-medium text-[#333]" > {item} </div> ))} </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-end gap-1">
                      <span className="text-[42px] font-bold text-[#111] leading-none">
                        $17
                      </span>

                      <span className="text-[22px] font-bold text-[#111] mb-1">
                        .99
                      </span>
                    </div>

                    <button className="w-full mt-4 bg-gradient-to-r from-[#0D7A7F] to-[#08656A] text-white py-2.5 rounded-xl font-semibold text-[13px] shadow-[0px_10px_25px_rgba(13,122,127,0.22)]">
                      Start Full Journey
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-5 pt-4 border-t border-[#ECECEC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

              <div>
                <p className="text-[#111] font-semibold text-[13px]">
                  Secure checkout experience
                </p>

                <p className="text-[#777] text-[11px] mt-1">
                  All payments are encrypted and secure.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {["Visa", "Mastercard", "PayPal"].map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#F8FAFA] border border-[#ECECEC] px-3 py-1.5 rounded-lg text-[11px] font-semibold text-[#444]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#0D7A7F] to-[#06494D] min-h-full">

            <div className="w-full h-full">
              <img
                src={logopayment}
                alt="logopayment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
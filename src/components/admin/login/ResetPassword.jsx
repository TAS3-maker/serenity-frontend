import { useState, useRef } from "react";
import { api } from "../../../lib/api";
import resetPass from "../../../assets/resetPass.png";
import rectangle from "../../../assets/rectangle.png";
import finalLogo from "../../../assets/finalLogo.svg";
import { useNavigate, useLocation } from "react-router-dom";

export const ResetPassword = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // get email from previous page
  const email = location.state?.email;

  // handle OTP input
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value && index < 6) {
      inputsRef.current[index + 1].focus();
    }
  };

  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

const handleVerify = async () => {
  const finalOtp = otp.join("");

  if (finalOtp.length !== 6) {
    setErr("Enter complete OTP");
    return;
  }

  setLoading(true);
  setErr("");

  try {
    const res = await api.auth.verifyEmailOtp(email, finalOtp);

    if (res?.verified) {
      navigate("/admin/new-password", {
        state: {
          email,
          resetToken: res.resetToken   // ✅ VERY IMPORTANT
        }
      });
    }

  } catch (e) {
    setErr(e?.data?.message || "Invalid or expired OTP");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex relative flex-col md:flex-row h-screen bg-white text-white overflow-hidden">
      
      {/* Logo */}
      <div className="absolute m-3">
        <img src={finalLogo} alt="logo" />
      </div>

      {/* Left */}
      <div className="lg:w-2/4 w-full flex flex-col items-center justify-center p-6">
        <div className="bg-white text-black p-10 rounded-lg w-full max-w-md">

          <h1 className="text-2xl font-bold text-center mb-2">
            Enter OTP
          </h1>

          <p className="text-gray-400 text-center mb-6">
            We sent a code to your email
          </p>

          {/* OTP Boxes */}
          <div className="flex justify-between mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-12 text-center border rounded-lg text-lg"
              />
            ))}
          </div>

          {/* Error */}
          {err && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {err}
            </p>
          )}

          {/* Button */}
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[rgba(13,115,119,1)] text-white"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </div>
      </div>

      {/* Right */}
                <div className="w-3/5 h-full hidden lg:block relative" >
      {/* Background image */}
      <img
        src={rectangle}
        alt="Illustration"
        className="h-full w-full object-cover rounded-3xl"
      />
    
      {/* Centered logo */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <img
          src={resetPass}
          alt="Logo"
          className="w-100 h-100 object-contain"
        />
      </div>
      
    </div>
    </div>
  );
};
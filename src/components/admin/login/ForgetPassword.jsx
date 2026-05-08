import { useState } from "react";
import { Eye, EyeOff } from "../../../lib/icons";
import { C } from "../../../tokens";
import { AInp } from "../AdminShared";
import { api } from "../../../lib/api";
import forgetPassword from "../../../assets/forgetPassword.png"
import rectangle from "../../../assets/rectangle.png"
import finalLogo from "../../../assets/finalLogo.png"
import { useNavigate } from "react-router-dom";



export const ForgetPassword = ({ onSuccess, onBack }) => {
  const [email, setEmail]   = useState("");

  const [err, setErr]       = useState("");
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()
  const hanldeForget = async (e) => {
    e.preventDefault()
    setErr("");
    if (!email) { setErr("Email is required."); return; }
    setLoading(true);
    try {
      const data = await api.auth.forgetPassword(email.trim());
      // The backend has set an httpOnly cookie. We also keep the token
      // in-memory as a fallback for cookie-blocked environments — but never
      // persist it to sessionStorage / localStorage (XSS-safe).
      navigate("/admin/reset-password", {
      state: { email }
    });

    } catch (e) {
      setErr(e?.data?.message || e?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative flex-col md:flex-row h-screen bg-white text-white no-scrollbar overflow-hidden">
            {/* Left Section */}

<div className="absolute m-3">
    <img
    src={finalLogo}
    alt="Illustration"
    className=" object-cover rounded-3xl"
  />
</div>

          
            <div  className="lg:w-2/4 w-full flex flex-col items-center justify-center p-3 md:p-6" >
                <div className="bg-white text-black p-10 rounded-lg min-w-full max-w-md">
             
                    {/* Dynamic Name */}
                    <h1 className="text-2xl flex justify-center items-center font-bold mb-2 text-left ">
                       Forgot Password
                    </h1>
                    <p className=" text-gray-400 flex justify-center items-center mb-6">
                        Enter your email to forgot password.
                    </p>

                    {/* Form */}
                    <form onSubmit={hanldeForget} className="space-y-">
                    <div className="space-y-2 mb-4">
                       
                            <input
                                type="email"
                                id="email"
                                className="w-full mt-1 px-3 py-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                  
    
                

                        {/* Login Button */}
                        {loading ?  ( <button
                            type="submit"
                            className="cursor-not-allowed flex justify-center  bg-[#2c2b2b] w-full py-2 rounded-md text-white"
                        >
                       
                        </button>):(<button
                          type="submit"
                          disabled={!email}
                          className={`w-full py-3 rounded-lg transition
                            ${!email 
                              ? 'bg-[rgba(13,115,119,1)] text-white cursor-not-allowed'
                              : 'bg-[rgba(13,115,119,1)] text-white'}
                          `}
                        >
                         Send
                        </button>

                        )}
                    </form>

                    {/* <p className="text-center text-gray-500 mt-4">
                        Don&apos;t have an account?{" "}
                        <Link to="/" className="text-[#e14a16]">
                        Register Now
                      </Link>
                    </p> */}
                </div>
       
            </div>

            {/* Right Section */}
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
      src={forgetPassword}
      alt="Logo"
      className="w-100 h-100 object-contain"
    />
  </div>
  
</div>




</div>
  );
};

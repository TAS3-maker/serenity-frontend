import { useState } from "react";
import { Eye, EyeOff } from "../../../lib/icons";
import { C } from "../../../tokens";
import { AInp } from "../AdminShared";
import { api } from "../../../lib/api";
import logo from "../../../assets/logo.png"
import rectangle from "../../../assets/rectangle.png"
import finalLogo from "../../../assets/finalLogo.png"
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Demo credentials are read from Vite env vars so they're never hard-coded
// in the bundle. In production set VITE_DEMO_ADMIN_EMAIL / VITE_DEMO_ADMIN_PASSWORD
// to empty strings to hide the auto-fill helper entirely.
const DEMO_EMAIL    = import.meta.env.VITE_DEMO_ADMIN_EMAIL    || "";
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "";
const DEMO_CREDS_AVAILABLE = !!(DEMO_EMAIL && DEMO_PASSWORD);

export const AdminLogin = ({ onSuccess, onBack }) => {
  const [email, setEmail]   = useState("");
  const [pw, setPw]         = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr]       = useState("");
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()
  const doLogin = async (e) => {
    e.preventDefault()
    setErr("");
    if (!email || !pw) { setErr("Email and password required."); return; }
    setLoading(true);
    try {
      const data = await api.auth.adminLogin(email.trim(), pw);
      const token = data.token || data.accessToken;
      if (!token) throw new Error(data.message || "Login failed");
   
      api.setToken(token);
      console.log("token",token);
      
      setLoading(false);
      onSuccess()
      
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
                        Welcome Back
                    </h1>
                    <p className=" text-gray-400 flex justify-center items-center mb-6">
                        Enter your Email and Password to login
                    </p>

                    {/* Form */}
                    <form onSubmit={doLogin} className="space-y-">
                    <div className="space-y-2 mb-4">
                       
                            <input
                                type="email"
                                id="email"
                                className="w-full mt-1 px-3 py-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2 relative">
      
      <input
        type={showPw ? 'text' : 'password'}
        id="password"
        className="w-full mt-1 px-3 py-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 pr-10"
        placeholder="Enter password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        required

        
      />
   <span
  className="absolute right-3 top-5 -translate-y-1/2 cursor-pointer text-gray-600"
  onClick={() => setShowPw(!showPw)}
>

        {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>
    </div>
    
                       
                        {/* Forgot Password */}
                        <div className="text-right m-5" onClick={()=>navigate("/admin/forgot-password")}>
                           
                                {/* Forgot password? */}
                    
                            <span to="/updatepassword" className="text-gray-500 italic text-sm">
                              Forgot password?
                            </span>
                        </div>

                        {/* Login Button */}
               <button
  type="submit"
  disabled={loading || !email || !pw}
  className={`w-full py-2 rounded-md flex items-center justify-center gap-2 transition
    ${loading || !email || !pw
      ? 'bg-[rgba(13,115,119,1)] text-white cursor-not-allowed'
      : 'bg-[rgba(13,115,119,1)] text-white hover:bg-[#2c2b2b]'}
  `}
>
  {loading ? (
    <>
      <Loader2 className="animate-spin" size={18} />
      Logging in...
    </>
  ) : (
    "Login"
  )}
</button>
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
      src={logo}
      alt="Logo"
      className="w-100 h-100 object-contain"
    />
  </div>
  
</div>




</div>
  );
};

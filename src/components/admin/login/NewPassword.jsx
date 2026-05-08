import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../../lib/api";

import forgetPassword from "../../../assets/forgetPassword.png";
import rectangle from "../../../assets/rectangle.png";
import finalLogo from "../../../assets/finalLogo.svg";

export const NewPassword = ({ onSuccess, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();



  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
const { email, resetToken } = location.state || {};

const handleResetPassword = async (e) => {
  e.preventDefault();
  setErr("");

  if (!newPassword || !confirmPassword) {
    setErr("All fields are required.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setErr("Passwords do not match.");
    return;
  }

  if (!email || !resetToken) {
    setErr("Session expired. Please restart the process.");
    return;
  }

  setLoading(true);

  try {
    await api.auth.resetPassword(email, resetToken, newPassword);

    navigate("/admin/login");

  } catch (e) {
    setErr(e?.data?.message || "Failed to reset password.");
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

      <div className="lg:w-2/4 w-full flex flex-col items-center justify-center p-3 md:p-6">
        <div className="bg-white text-black p-10 rounded-lg min-w-full max-w-md">

          <h1 className="text-2xl flex justify-center items-center font-bold mb-2 text-left">
            Set New Password
          </h1>

          <p className=" text-gray-400 flex justify-center items-center mb-6">
            Enter your new password below.
          </p>

          {err && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {err}
            </p>
          )}

          <form onSubmit={handleResetPassword}>

            <div className="space-y-2 mb-4">
              <input
                type="password"
                className="w-full mt-1 px-3 py-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2 mb-4">
              <input
                type="password"
                className="w-full mt-1 px-3 py-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {loading ? (
              <button
                type="submit"
                className="cursor-not-allowed flex justify-center bg-[#2c2b2b] w-full py-2 rounded-md text-white"
              >
              </button>
            ) : (
              <button
                type="submit"
                disabled={!newPassword || !confirmPassword}
                className={`w-full py-3 rounded-lg transition
                  ${!newPassword || !confirmPassword
                    ? 'bg-[rgba(13,115,119,1)] text-white cursor-not-allowed'
                    : 'bg-[rgba(13,115,119,1)] text-white'}
                `}
              >
                Reset Password
              </button>
            )}

          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-3/5 h-full hidden lg:block relative">
        <img
          src={rectangle}
          alt="Illustration"
          className="h-full w-full object-cover rounded-3xl"
        />

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
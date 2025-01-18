import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const TypeCode = () => {
  const [code, setCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate('/forgot-password');
  };

  const handleResendCode = () => {
    // Logic to resend the code
    toast.success("Verification code resent successfully!");
  };

  const handleConfirmCode = () => {
    // Mock code verification logic
    if (code === "123456") { // replace with actual verification logic
      setCodeVerified(true);
      toast.success("Code verified successfully!");
    } else {
      toast.error("Invalid code. Please try again.");
    }
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div>
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <GoChevronLeft
            className="text-gray-600 cursor-pointer"
            onClick={handleBackNavigation}
          />
          <h1
            className="ml-2 text-xl font-semibold text-gray-800 cursor-pointer"
            onClick={handleBackNavigation}
          >
            Forgot Password
          </h1>
        </div>

        {/* Instructions */}
        <p className="text-gray-600 mb-6">Enter the code sent to your email to verify your identity.</p>

        {/* Form */}
        <form className="space-y-6 ml-4">
          <div>
            <label htmlFor="code" className="block text-gray-600 mb-1">Verification Code</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the code"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleConfirmCode}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition duration-150"
          >
            Confirm Code
          </button>

          <button
            type="button"
            onClick={handleResendCode}
            className="w-full text-blue-500 py-3 font-semibold hover:underline transition duration-150"
          >
            Resend Code
          </button>

          {/* Show "Change Password" button if the code is verified */}
          {codeVerified && (
            <button
              type="button"
              onClick={handleChangePassword}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-150 mt-4"
            >
              Change Password
            </button>
          )}
        </form>
      
    </div>
  );
};

export default TypeCode;

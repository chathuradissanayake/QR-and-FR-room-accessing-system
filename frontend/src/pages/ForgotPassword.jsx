import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/user/forgot-password', { emailOrPhone }, {
        withCredentials: true,
      });
      toast.success("Verification code sent!");
      navigate('/verify-code');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Error sending verification code");
    }
  };

  const handleBackNavigation = () => {
    navigate('/signin');
  };

  return (
    <div className="flex  justify-center min-h-screen h-max bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 ml-4">
          <div>
            <label htmlFor="emailOrPhone" className="block text-gray-600 mb-1">Type your Email</label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="abcd@gmail.com"
              required
            />
          </div>

          <p className="text-gray-600 text-sm mb-6">We will send you a code to verify your email</p>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition duration-150"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.put('/user/reset-password', { newPassword }, {
        withCredentials: true,
      });
      toast.success("Password reset successfully!");
      navigate('/login'); // Redirect to login after successful password reset
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "Error resetting password");
    }
  };

  const handleBackNavigation = () => {
    navigate('/forgot-password'); // Go back to the "Forgot Password" page
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
            Reset Password
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 ml-4">
          <div>
            <label htmlFor="newPassword" className="block text-gray-600 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-150"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
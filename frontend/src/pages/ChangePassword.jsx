import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Handle password change logic here
    console.log("Password changed successfully");
  };

  const handleBackNavigation = () => {
    navigate("/profile");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    
    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/profile">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Change Password</span>
    </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 ml-6">
          {[
            {
              label: "Old Password",
              value: oldPassword,
              onChange: setOldPassword,
              showPassword: showOldPassword,
              toggleShowPassword: () => setShowOldPassword(!showOldPassword),
            },
            {
              label: "New Password",
              value: newPassword,
              onChange: setNewPassword,
              showPassword: showNewPassword,
              toggleShowPassword: () => setShowNewPassword(!showNewPassword),
            },
            {
              label: "Confirm Password",
              value: confirmPassword,
              onChange: setConfirmPassword,
              showPassword: showConfirmPassword,
              toggleShowPassword: () => setShowConfirmPassword(!showConfirmPassword),
            },
          ].map(({ label, value, onChange, showPassword, toggleShowPassword }, index) => (
            <div className="relative" key={index}>
              <label className="block text-gray-600 mb-1">{label}</label>
              <div className="flex items-center border border-gray-300 rounded-xl focus-within:ring-1 focus-within:ring-blue-500">
                <input
                  type={showPassword ? "text" : "password"}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full p-3 rounded-xl focus:outline-none"
                  placeholder={`Type your ${label.toLowerCase()}`}
                  required
                />
                <div
                  className="p-2 cursor-pointer text-gray-500"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-150"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

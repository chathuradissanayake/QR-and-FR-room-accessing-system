import React, { useState } from "react";
import { FaChevronLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <FaChevronLeft
            className="text-gray-600 cursor-pointer"
            onClick={handleBackNavigation}
          />
          <h1
            className="ml-2 text-xl font-semibold text-gray-800 cursor-pointer"
            onClick={handleBackNavigation}
          >
            Change Password
          </h1>
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

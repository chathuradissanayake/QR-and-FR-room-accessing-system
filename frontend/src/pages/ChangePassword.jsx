import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem('token'); 
      const { data } = await axios.put('/api/user/change-password', { oldPassword, newPassword }, {
        headers: {
          Authorization: `Bearer ${token}` 
        },
        withCredentials: true,
      });
      toast.success("Password changed successfully!");
      navigate('/profile');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "Error changing password");
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <div>

    
    <div className="title flex items-center space-x-2 mb-8 dark:text-white">
    
        <GoChevronLeft className="cursor-pointer" 
        onClick={handleBackNavigation}/>
    
        <span className='font-semibold'>Change Password</span>
    </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 ml-4">
          <div>
            <label htmlFor="oldPassword" className="block text-gray-600 mb-1 dark:text-slate-200">Old Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring-1 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-500 focus:outline-none"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <FaEye className="dark:text-slate-200"/> : <FaEyeSlash className="dark:text-slate-200" />}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-gray-600 mb-1 dark:text-slate-200">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring-1 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-500 focus:outline-none"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEye className="dark:text-slate-200" /> : <FaEyeSlash className="dark:text-slate-200"/>}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-600 mb-1 dark:text-slate-200">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring-1 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-500 focus:outline-none"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye className="dark:text-slate-200"/> : <FaEyeSlash className="dark:text-slate-200" />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition duration-150"
          >
            Change Password
          </button>
        </form>
      </div>
    
  );
};

export default ChangePassword;
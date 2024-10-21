import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaExclamationCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

const Profile = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      {/* Header with Back Chevron */}
      <div className="w-full max-w-xs flex items-center mb-6">
        <FaChevronLeft className="text-gray-600" onClick={() => handleNavigation('/home')} />
        <h1 className="ml-2 text-lg font-semibold text-gray-800" onClick={() => handleNavigation('/home')}>
          My Profile
        </h1>
      </div>

      {/* Profile Picture and User Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src="https://i.pravatar.cc/150?img=3" // Replace with actual image link
            alt="Profile"
          />
          <button className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full">
            <FiEdit className="text-white" />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">John Smith</h2>
      </div>

      {/* Profile Details */}
      <div className="w-full max-w-xs space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <span className="text-gray-500">User ID</span>
          <span className="text-gray-400">InSP/2020/11/1111</span> {/* Lighter text for disabled */}
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <span className="text-gray-500">User Name</span>
          <span className="text-gray-400">John Smith</span> {/* Lighter text for disabled */}
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/password')}
        >
          <span className="text-gray-500">Password</span>
          <FaChevronRight className="text-gray-600" />
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/face-id')}
        >
          <span className="text-gray-500">Face ID</span>
          <div className="flex items-center space-x-2">
            <FaExclamationCircle className="text-red-500" />
            <FaChevronRight className="text-gray-600" />
          </div>
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/app-info')}
        >
          <span className="text-gray-500">App Information</span>
          <FaChevronRight className="text-gray-600" />
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/customer-care')}
        >
          <span className="text-gray-500">Customer care</span>
          <FaChevronRight className="text-gray-600" />
        </div>

        {/* Log Out */}
        <div className="flex justify-center py-4">
          <button className="text-red-500">Log out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

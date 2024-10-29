import React from "react";
import { useNavigate } from "react-router-dom";
import UserImage from "../assets/user.png";
import { GoChevronLeft, GoChevronRight, GoPencil } from "react-icons/go";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Title Section */}
        <div className="title flex items-center space-x-2 mb-8">
          <Link to="/home">
            <GoChevronLeft className="cursor-pointer" />
          </Link>
          <span className="font-semibold text-lg">My Profile</span>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 relative">
            {/* Profile picture with edit icon */}
            <img
              src={UserImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => navigate("/change-profile-picture")}
              className="absolute bottom-1 right-1 bg-blue-500 p-1 rounded-full"
            >
              <GoPencil className="text-white" />
            </button>
          </div>
          <h2 className="text-2xl font-semibold mt-4">John Smith</h2>
        </div>

        {/* Profile Options */}
        <div className="space-y-4">
          {/* User ID bar */}
          <button
            onClick={() => navigate("/view-user-id")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg flex justify-between items-center"
          >
            <span>User ID</span>
            <span className="text-gray-500">InSP/2020/11/1111</span>
          </button>

          {/* User Name bar */}
          <button
            onClick={() => navigate("/change-username")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg flex justify-between items-center"
          >
            <span>User Name</span>
            <span className="flex items-center text-gray-500">John Smith <GoChevronRight /></span>
          </button>

          {/* Password change option */}
          <button
            onClick={() => navigate("/change-password")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg flex justify-between items-center"
          >
            <span>Password</span>
            <GoChevronRight className="text-gray-500" />
          </button>

          {/* Face ID option */}
          <button
            onClick={() => navigate("/face-id")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg flex justify-between items-center"
          >
            <span>Face ID</span>
            <span className="flex items-center text-red-500">! <GoChevronRight /></span>
          </button>

          {/* App Information option */}
          <button
            onClick={() => navigate("/app-information")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg flex justify-between items-center"
          >
            <span>App Information</span>
            <GoChevronRight className="text-gray-500" />
          </button>

          {/* Customer Care option */}
          <button
            onClick={() => navigate("/customer-care")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg flex justify-between items-center"
          >
            <span>Customer Care</span>
            <GoChevronRight className="text-gray-500" />
          </button>
        </div>

        {/* Log Out */}
        <button
          onClick={() => navigate("/logout")}
          className="mt-6 text-red-500 w-full text-center p-4 bg-white shadow-sm rounded-lg"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default MyProfile;

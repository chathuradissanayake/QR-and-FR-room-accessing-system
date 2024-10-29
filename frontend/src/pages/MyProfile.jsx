import React from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-gray-500 mr-4">
            &lt; Back
          </button>
          <h1 className="text-2xl font-semibold">My Profile</h1>
        </div>

        {/* Profile Picture and Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            {/* Profile picture placeholder */}
            <img
              src="/frontend/src/assets/user.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mt-4">John Smith</h2>
          <p className="text-gray-500">User ID: InSP/2020/11/1111</p>
        </div>

        {/* Profile Options */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/change-username")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg flex justify-between items-center"
          >
            <span>User Name</span>
            <span className="text-gray-500">John Smith &gt;</span>
          </button>
          <button
            onClick={() => navigate("/change-password")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg flex justify-between items-center"
          >
            <span>Password</span>
            <span className="text-gray-500">&gt;</span>
          </button>
          <button
            onClick={() => navigate("/face-id")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg flex justify-between items-center"
          >
            <span>Face ID</span>
            <span className="text-red-500">!</span>
          </button>
          <button
            onClick={() => navigate("/app-information")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg"
          >
            <span>App Information</span>
          </button>
          <button
            onClick={() => navigate("/customer-care")}
            className="w-full text-left p-4 bg-white shadow-sm rounded-lg"
          >
            <span>Customer Care</span>
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

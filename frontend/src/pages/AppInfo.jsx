import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AppInformation = () => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="flex items-center mb-8">
        <FaChevronLeft
          className="text-gray-800 cursor-pointer"
          onClick={handleBackNavigation}
        />
        <h1 className="ml-2 text-xl font-semibold text-gray-800">
          App Information
        </h1>
      </div>

      {/* Content */}
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600 text-lg">Version 1.1.1</p>
      </div>
    </div>
  );
};

export default AppInformation;

import React, { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ChangeUsername = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle username change logic here
    console.log('New Username:', `${firstName} ${lastName}`);
  };

  const handleBackNavigation = () => {
    navigate('/profile');
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
            Change Username
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 ml-6">
          <div>
            <label htmlFor="firstName" className="block text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Mohamed"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Afraar"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-150"
          >
            Change Username
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangeUsername;

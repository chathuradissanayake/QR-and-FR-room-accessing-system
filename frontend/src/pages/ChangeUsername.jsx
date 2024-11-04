import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const ChangeUsername = () => {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put('/user/change-username', { firstName, lastName }, {
        withCredentials: true,
      });
      // Update the user context with the new user data
      setUser(data);
      console.log(`New name: ${data.firstName} ${data.lastName}`);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackNavigation = () => {
    navigate('/profile');
  };

  return (
    <div className="flex  justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    
    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/profile">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Change Username</span>
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
              placeholder={user ? user.firstName : 'First Name'}
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
              placeholder={user ? user.lastName : 'Last Name'}
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
};

export default ChangeUsername;
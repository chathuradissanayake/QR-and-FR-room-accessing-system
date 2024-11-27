import React, { useContext, useEffect, useState } from 'react';
import { FaChevronRight, FaExclamationCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import avatar from '../assets/avatar.png';

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User data not available</div>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    
    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Profile</span>
    </div>

      {/* Profile Picture and User Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src={avatar} 
            alt="Profile"
          />
          <button className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full">
            <FiEdit className="text-white" />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
      </div>

      {/* Profile Details */}
      <div className="w-full  space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <span className="text-gray-500">User ID</span>
          <span className="text-gray-400">{user.userId}</span> 
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer" onClick={() => handleNavigation('/change-username')}>
          <span className="text-gray-500">User Name</span>
          <span className="text-gray-600">{user.firstName} {user.lastName}</span>
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/change-password')}
        >
          <span className="text-gray-500">Password</span>
          <FaChevronRight className="text-gray-600" />
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/face-registration')}
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
          onClick={() => handleNavigation('/contactus')}
        >
          <span className="text-gray-500">Costumer care</span>
          <FaChevronRight className="text-gray-600" />
        </div>

        {/* Log Out */}
        <div className="flex justify-center py-4">
          <button onClick={handleLogout} className="text-red-500">Log out</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
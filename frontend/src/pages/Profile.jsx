import React, { useContext, useEffect, useState } from 'react';
import { FaChevronRight, FaExclamationCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import avatar from "../assets/avatar.png"; // Default avatar image

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
    return <div className="flex justify-center dark:bg-slate-800 items-center min-h-screen">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
  }

  if (!user) {
    return <div>User data not available</div>;
  }

  return (
    <div>

    
    <div className="title flex items-center space-x-2 mb-8 dark:text-white">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Profile</span>
    </div>

      {/* Profile Picture and User Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative ">
          <img
          src={user.profilePicture || avatar}
          onError={(e) => (e.target.src = avatar)}
          className="w-32 h-32 object-cover rounded-full"
          />
          <button className="absolute bottom-0 right-0 p-1 bg-black rounded-full">
          <Link to="/upload-picture">
            <FiEdit className="text-white" />
          </Link>
          </button>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
      </div>

      {/* Profile Details */}
      <div className="w-full  space-y-4 ">
        <div className="flex justify-between items-center py-2 border-b border-gray-300 dark:text-slate-200">
          <span className="text-gray-500 dark:text-slate-200">User ID</span>
          <span className="text-gray-400">{user.userId}</span> 
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer" onClick={() => handleNavigation('/change-username')}>
          <span className="text-gray-500 dark:text-slate-200">User Name</span>
          <span className="text-gray-600 dark:text-slate-300">{user.firstName} {user.lastName}</span>
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/change-password')}
        >
          <span className="text-gray-500 dark:text-slate-200">Password</span>
          <FaChevronRight className="text-gray-600" />
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/upload-picture')}
        >
          <span className="text-gray-500 dark:text-slate-200">Profile Picture</span>
          <div className="flex items-center space-x-2">
            
            <FaChevronRight className="text-gray-600" />
          </div>
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/face-registration')}
        >
          <span className="text-gray-500 dark:text-slate-200">Face ID</span>
          <div className="flex items-center space-x-2">
            {/* <FaExclamationCircle className="text-red-500" /> */}
            <FaChevronRight className="text-gray-600" />
          </div>
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/app-info')}
        >
          <span className="text-gray-500 dark:text-slate-200">App Information</span>
          <FaChevronRight className="text-gray-600" />
        </div>
        <div
          className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
          onClick={() => handleNavigation('/contactus')}
        >
          <span className="text-gray-500 dark:text-slate-200">Costumer care</span>
          <FaChevronRight className="text-gray-600" />
        </div>

        {/* Log Out */}
        <div className="flex justify-center py-4">
          <button onClick={handleLogout} className="text-red-500">Log out</button>
        </div>
      </div>
    
    </div>
  );
};

export default Profile;
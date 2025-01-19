import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext';

const ChangeUsername = () => {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const token = localStorage.getItem('token'); 
      const { data } = await axios.put('/api/user/change-username', 
        { firstName, lastName }, 
        {
          headers: {
            Authorization: `Bearer ${token}` 
          },
          withCredentials: true,
        }
      );
      setUser(data);
      toast.success("Username updated successfully!");
      navigate('/profile');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Error updating username");
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="title flex items-center space-x-2 mb-8 dark:text-white">
        <GoChevronLeft className="cursor-pointer" onClick={handleBackNavigation} />
        <span className='font-semibold'>App Info</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 ml-4">
        <div>
          <label htmlFor="firstName" className="block text-gray-500 mb-1 dark:text-slate-200">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring-1 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-600 mb-1 dark:text-slate-200">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring-1 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your last name"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition duration-150"
        >
          Update Username
        </button>
      </form>
    </div>
  );
};

export default ChangeUsername;
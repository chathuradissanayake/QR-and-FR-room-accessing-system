import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import logo from "../assets/logo.png";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { UserContext } from '../../context/userContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/signin', {
        email,
        password,
      });

      if (data.error) {
        return toast.error(data.error);
      } else {
        toast.success('Logged in successfully');
        localStorage.setItem('token', data.token); // Store the token in local storage
        setUser(data.user); // Set the user context
        navigate('/'); // Navigate to the home page
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="h-12"
          />
        </div>
        
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center">LOG IN</h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <div className="flex items-center border rounded shadow appearance-none w-full py-3 px-4 focus:outline-none focus:shadow-outline">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-gray-700"
                required
              />
            </div>
          </div>
          
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <div className="flex items-center border rounded shadow appearance-none w-full py-3 px-4 focus:outline-none focus:shadow-outline">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none text-gray-700"
                required
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Forgot Password?</span>
            {/* <a href="/forgot-password" className="text-blue-600 hover:underline">Click Here</a> */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-lg transition duration-300"
          >
            Log in
          </button>
        </form>

        {/* Footer */}
        {/* <div className="text-center mt-6 text-sm text-gray-600">
          Having trouble logging in?{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact us!
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;
// src/pages/SignIn.js
import React, { useState } from 'react';
import logo from "../assets/logo.png"

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo} // Replace with your logo's URL
            alt="Logo"
            className="w-20 h-20"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          LOG IN
        </h1>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password? <span className="font-semibold">Click Here</span>
            </a>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Log in
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Having trouble logging in?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Contact us!
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
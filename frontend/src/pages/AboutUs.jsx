import React from 'react';
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const AboutUs = () => {
    const navigate = useNavigate();
    const handleBackNavigation = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600 ">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800">

    
    <div className="title flex items-center space-x-2 mb-8 dark:text-white">
    
        <GoChevronLeft className="cursor-pointer" 
        onClick={handleBackNavigation}/>
    
        <span className='font-semibold dark:text-white'>About us</span>
    </div>

    <div className="flex justify-center mb-6">
          <img
            src={logo} // Replace with your logo's URL
            alt="Logo"
            className="h-40"
          />
        </div>

        <p className="text-gray-600 text-sm mb-6 dark:text-slate-200">
          Welcome to <span className="font-semibold">TechWave Solutions</span>, where innovation meets excellence. We are a team of passionate developers, designers, and strategists dedicated to delivering top-notch digital solutions tailored to your needs.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-3 dark:text-slate-100">Our Mission</h2>
        <p className="text-gray-600 mb-6 text-sm dark:text-slate-200">
          Our mission is to empower businesses by providing cutting-edge technology solutions that drive growth and efficiency. We believe in building strong, long-term relationships with our clients and exceeding their expectations through quality and creativity.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-3 dark:text-slate-100">Our Vision</h2>
        <p className="text-gray-600 mb-6 text-sm dark:text-slate-200">
          To be a global leader in the digital landscape, known for our innovative approach and commitment to excellence. We aim to transform ideas into reality and create impactful experiences for users worldwide.
        </p>

        

    </div>
    </div>
  )
}

export default AboutUs

import React from 'react';
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const AboutUs = () => {
  const navigate = useNavigate();
  const handleBackNavigation = () => {
    navigate(-1); // Go back to the previous page
  };

  const items = [
    { 
      img: "https://github.com/chathuradissanayake/SecurePassAI-Developers/blob/main/Developers/Chathura_Dissanayake.jpg?raw=true", 
      text: "Chathura Dissanayake", 
      link: "https://www.linkedin.com/in/chathura-dissanayake/" 
    },
    { 
      img: "https://github.com/chathuradissanayake/SecurePassAI-Developers/blob/main/Developers/Yoosuf_Aathil.jpg?raw=true", 
      text: "Yoosuf Aathil", 
      link: "https://www.linkedin.com/in/yoosuf-aathil/" 
    },
    { 
      img: "https://github.com/chathuradissanayake/SecurePassAI-Developers/blob/main/Developers/Shavindu_Rajapaksha.jpeg?raw=true", 
      text: "Shavindu Rajapaksha", 
      link: "http://www.linkedin.com/in/shavindu-rajapaksha-953007223" 
    },
    { 
      img: "https://github.com/chathuradissanayake/SecurePassAI-Developers/blob/main/Developers/Mohamed_Afraar.jpg?raw=true", 
      text: "Mohamed Afraar", 
      link: "https://www.linkedin.com/in/mohamed-afraar/" 
    },
  ];

  return (
    <div>
      <div className="title flex items-center space-x-2 mb-8 dark:text-white">
        <GoChevronLeft className="cursor-pointer" onClick={handleBackNavigation} />
        <span className="font-semibold dark:text-white">About us</span>
      </div>

      <div className="flex justify-center mb-6">
        <img src={logo} alt="Logo" className="h-40" />
      </div>

      <p className="text-gray-600 text-sm mb-6 dark:text-slate-200">
          Welcome to <span className="font-semibold">SecurePass AI</span>,  an innovative room access solution designed to simplify and modernize access management for enterprises and companies. Say goodbye to the hassle of physical keycards. With our system, users can unlock doors using their mobile devices by scanning a QR code and verifying their identity through facial recognition.

As part of SLT’s mission to empower Sri Lankan businesses, SecurePass AI offers an advanced and seamless way to manage access to rooms and facilities, ensuring enhanced security, ease of use, and improved workflows.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-3 dark:text-slate-100">Our Mission</h2>
        <p className="text-gray-600 mb-6 text-sm dark:text-slate-200">
        To revolutionize room access management by providing businesses with a hassle-free, efficient, and modern solution that promotes smooth workflows and eliminates the need for physical tools.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-3 dark:text-slate-100">Our Vision</h2>
        <p className="text-gray-600 mb-6 text-sm dark:text-slate-200">
        Our mission is to deliver a secure, user-friendly, and efficient room access system that simplifies access management for enterprises. By integrating QR code and facial recognition technology, we aim to help Sri Lankan businesses enhance workplace security, streamline daily operations, and transition to a more modern and digital approach, reducing the dependence on physical tools.
        </p>

      <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-slate-100">Meet the Developers</h3>
      <div className="flex justify-center rounded-full space-x-4 mt-6">
        {items.map((item, index) => (
          <div key={index} className="text-center">
            <img
              src={item.img}
              alt={item.text}
              className="w-36 h-36 object-cover rounded-md shadow-md"
            />
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 text-gray-500 hover:underline text-xs"
            >
              {item.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;

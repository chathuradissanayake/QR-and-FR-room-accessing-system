import React from 'react';
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const AppInformation = () => {
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
    
        <span className='font-semibold'>App Info</span>
    </div>
        <div className='ml-3'>
        <h2 className="text-lg font-semibold text-gray-800 mb-3 dark:text-slate-100 ">App Details</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6 text-sm dark:text-slate-200">
          <li><strong>Version:</strong> 1.0.0</li>
          <li><strong>Developer:</strong> SLT Mobitel</li>
          <li><strong>Release Date:</strong> November 2024</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-3">Features</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-slate-200 mb-6 text-sm">
          <li>Simple and user-friendly interface</li>
          <li>Real-time updates and notifications</li>
          <li>Secure login with multiple authentication options</li>
          <li>Cross-platform support (Web, iOS, Android)</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-3">Contact Support</h2>
        <p className="text-gray-600 dark:text-slate-200 mb-6 text-sm">
          For any issues or inquiries, please reach out to our support team at{" "}
          <a href="mailto:support@sltmobitel.com" className="text-blue-500 underline">
            support@sltmobitel.com
          </a>.
        </p>

        <div className="text-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Learn More
          </button>
        </div>
        </div>

      </div>
    </div>
  );
};

export default AppInformation;

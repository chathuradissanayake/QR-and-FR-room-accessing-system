import React from 'react';
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Languages = () => {
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
    
        <span className='font-semibold dark:text-white'>Languages</span>
    </div>

    <button
          className={`flex items-center w-full p-3 rounded-md cursor-pointer bg-slate-100 dark:bg-slate-700 dark:text-slate-200`}>
          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center bg-slate-400`}>
            
          </div>
          Englsh
        </button>

    

        

    </div>
    </div>
  )
}

export default Languages

import React from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';

const SuccessLeave = () => {
    const navigate = useNavigate();

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    
    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/home">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Mark Leave</span>
    </div>

        
   


      </div>
    </div>
    </>
  );
};

export default SuccessLeave;




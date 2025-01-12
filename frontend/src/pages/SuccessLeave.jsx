import React from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';

const SuccessLeave = () => {
    const navigate = useNavigate();

  return (
    <>
    <div>

    
    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Mark Leave</span>
    </div>

        
   


      
    </div>
    </>
  );
};

export default SuccessLeave;




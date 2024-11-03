import React from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';

export default function MarkLeave() {
    const navigate = useNavigate();
    
  return (

    <>
    <div className="flex justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    
    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Leave</span>
    </div>

    
    <div>
    <h3 className="text-sm text-blue-500 mb-3 ml-4">Do you want to leave?</h3>
    </div>
    

    <div className="text-left ml-4">
            <p className="text-sm text-black-500">
            If you want to leave, <span className="font-semibold">Confirm</span>
            </p>
            <p className="text-sm text-black-500 mb-6">
            otherwise <span className="font-semibold ">Cancel</span>
            </p>
    </div>
    

    
    <div className='ml-3'>
          <button
              onClick={() => navigate('/successleave')}
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 mb-2"
          >
              Confirm
          </button>
      
          <button
              onClick={() => navigate('/')}
              type="cancel"
              className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-300"
          >
              Cancel
          </button>
      </div>
      </div>
      </div>
      </>

  )
}

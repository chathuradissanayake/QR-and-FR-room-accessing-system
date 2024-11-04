import React, { useState } from "react";
import { FaLock, FaQrcode, FaUnlock } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import QRScanner from "../components/QRScanner";

const EntrancePage = () => {

  const navigate = useNavigate();
  const [data, setData] = useState('');  // State to hold the scanned QR code data
  const [error, setError] = useState(null);

  const handleScan = (result) => {
    if (result) {
      setData(result); // Update state with QR code data
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error accessing the camera');
  };

  return (
    
    <div className="flex  justify-center min-h-screen h-max bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    
    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Scan QR</span>
    </div>


    {/* QR Code Scanner */}
    <div className="w-full max-w-md">
        <QRScanner onScan={handleScan} onError={handleError} />
      </div>


      <div className="mt-4 text-center mb-4">
        {data ? (
          <p className="text-green-600 font-medium">Room Details: {data}</p>
        ) : (
          <p className="text-gray-500">Point the camera at a QR code</p>
        )}
        {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
      </div>
    


      {/* Action Buttons */}
      <div className="flex justify-center">
          <button 
          className={`${
            data ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
          } "bg-blue-500 hover:bg-blue-700 text-white font-sans py-1 rounded-full mb-2 w-40 flex justify-between pl-10 pr-5`}
        >

            <span>Scan QR</span>
            <FaQrcode className="mt-1" />
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/facescan')}
            disabled={!data} // Disable until QR code data is available
            className={`${
              data ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            } text-white font-sans py-1 rounded-full mb-2 w-40 flex justify-between pl-10 pr-5`}
          >
            <span>Scan Face</span>
            <FaLock className="mt-1" />
          </button>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-sans py-1 rounded-full mb-2 w-40 flex justify-between pl-10 pr-5">
            <span>Unlock</span>
            <FaUnlock className="mt-1" />
          </button>
        </div>
 


      <div className="mt-6 text-sm text-center text-gray-500">
        Having trouble to Log in? <a href="#" className="text-blue-500">Contact us!</a>
      </div>
      </div>
      </div>
)
}
export default EntrancePage;

import React from "react";
import { GoChevronLeft } from "react-icons/go";
import { QrReader } from "react-qr-reader";
import { Link, useNavigate } from 'react-router-dom';

const QRScan = () => {

  const navigate = useNavigate();

  const handleScan = (result) => {
    if (result) {
      alert(`Scanned QR Code: ${result.text}`);
      // Handle the scanned data (e.g., send to backend, navigate, etc.)
    }
  };

  const handleError = (error) => {
    console.error("QR Scan Error:", error);
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
    <div className="w-full max-w-md bg-black rounded-lg p-4 flex items-center justify-center h-80 mb-6">
        <QrReader
          onResult={(result, error) => {
            if (result) handleScan(result);
            if (error) handleError(error);
          }}
          style={{ width: "100%" }}
          constraints={{ facingMode: "environment" }} // Use back camera if available
        />
    </div>




      {/* Action Buttons */}
      
      <div className="flex justify-center ">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-sans py-1 rounded-full mb-2 w-40 flex justify-between pl-10 pr-5">
          <span>Scan QR</span>
          <i className="fas fa-qrcode mt-1"></i> {/* Placeholder for QR icon */}
        </button>
      </div>
      <div className="flex justify-center ">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-sans py-1 rounded-full mb-2 w-40 flex justify-between pl-10 pr-5">
          <span>Scan Face</span>
          <i className="fas fa-lock mt-1"></i> {/* Placeholder for Face Scan icon */}
        </button>
      </div>
      <div className="flex justify-center ">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-sans py-1 rounded-full mb-2 w-40  flex justify-between pl-10 pr-5">
          <span>Unlock</span>
          <i className="fas fa-unlock mt-1"></i> {/* Placeholder for Unlock icon */}
        </button>
      </div>



      <div className="mt-6 text-sm text-center text-gray-500">
        Having trouble to Log in? <a href="#" className="text-blue-500">Contact us!</a>
      </div>
      </div>
      </div>
)
}
export default QRScan;

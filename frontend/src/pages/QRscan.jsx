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
    
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    
    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Scan QR</span>
    </div>


    {/* QR Code Scanner */}
    <div className="w-full max-w-md bg-black rounded-lg p-4 flex items-center justify-center h-36 mb-6">
        <QrReader
          onResult={(result, error) => {
            if (result) handleScan(result);
            if (error) handleError(error);
          }}
          style={{ width: "100%" }}
          constraints={{ facingMode: "environment" }} // Use back camera if available
        />
      </div>
      </div>
      </div>
)
}
export default QRScan;

import React, { useState, useEffect, useRef } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = ({ scanning, onScanSuccess }) => {
  const [doorCode, setDoorCode] = useState('');
  const hasScanned = useRef(false); // Ref to track if a scan has been processed

  useEffect(() => {
    if (!scanning) {
      setDoorCode(''); // Reset doorCode when scanning stops
      hasScanned.current = false; // Reset the scan flag
    }
  }, [scanning]);

  const handleResult = (result, error) => {
    if (result && !hasScanned.current) {
      const code = result?.text;
      setDoorCode(code); // Update state with QR code data
      onScanSuccess(code); // Notify parent component of successful scan
      hasScanned.current = true; // Set the scan flag to true
    }
    if (error) {
      console.error('Error scanning QR code:', error);
    }
  };

  return (
    <div className="w-full max-w-md p-8">
      {scanning && (
        <>
          <h3 className="text-2xl font-bold text-red-600 bg-yellow-100 p-4 border-l-4 border-red-600 rounded shadow-md mb-4">
            Please Scan the QR code...
          </h3>

          {/* Wrapper to enforce 1:1 aspect ratio */}
          <div className="relative w-full pt-[100%] bg-gray-200 rounded overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <QrReader
                onResult={handleResult}
                constraints={{ facingMode: 'environment' }} // Use rear camera if available
                className="absolute inset-0 w-full h-full object-cover transform scale-150"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QRScanner;

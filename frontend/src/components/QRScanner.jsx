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
    <div className="w-full max-w-md">
      {scanning && (
        <QrReader
          onResult={handleResult}
          constraints={{ facingMode: 'environment' }} // Use rear camera if available
          style={{ width: '100%' }}
          className="rounded-lg shadow-lg"
        />
      )}
    </div>
  );
};

export default QRScanner;
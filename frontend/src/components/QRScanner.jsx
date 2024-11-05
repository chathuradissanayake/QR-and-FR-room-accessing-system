// QRScanner.jsx
import React from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = ({ onScan, onError }) => {
  return (
    <div className="w-full max-w-md">
      <QrReader
        onResult={(result, error) => {
          if (result) {
            onScan(result?.text); // Pass scanned data back to parent
          }
          if (error) {
            onError(error);
          }
        }}
        constraints={{ facingMode: 'environment' }} // Use rear camera if available
        style={{ width: '100%' }}
        className="rounded-lg shadow-lg"
      />
      
    </div>
  );
};

export default QRScanner;

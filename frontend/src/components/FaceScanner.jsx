import React from "react";

const FaceScanner = ({ onScan }) => {
  // Simulate face scanning result
  const handleFaceScan = () => {
    const result = true; // Simulate a successful face scan
    onScan(result);
  };

  return (
    <div className="w-full max-w-md">
      <button
        onClick={handleFaceScan}
        className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Simulate Face Scan
      </button>
    </div>
  );
};

export default FaceScanner;
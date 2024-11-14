// CaptureImage.jsx
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const CaptureImage = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();

  // Function to capture image
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  // Function to retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
  };

  // Function to save and proceed with the captured image
  const savePhoto = () => {
    // Here you can send the capturedImage to your server or database
    console.log("Image saved:", capturedImage);
    navigate('/profile'); // Redirect to profile or any other page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Capture Your Image</h2>

      {!capturedImage ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user" // Switch to front camera
            }}
            className="rounded-lg shadow-md"
          />

          <button
            onClick={capturePhoto}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600"
          >
            Capture Photo
          </button>
        </>
      ) : (
        <>
          <img src={capturedImage} alt="Captured" className="rounded-lg shadow-md" />
          <div className="flex space-x-4 mt-6">
            <button
              onClick={retakePhoto}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-600"
            >
              Retake
            </button>
            <button
              onClick={savePhoto}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600"
            >
              Save Photo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CaptureImage;

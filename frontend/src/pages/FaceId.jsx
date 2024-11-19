import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Faceid = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();

  // Capture the photo from the webcam
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  // Save the photo to the backend
  const savePhoto = async () => {
    if (!capturedImage) {
      toast.error("Please capture an image first.");
      return;
    }

    // Retrieve userId dynamically (example: from localStorage)
    const userId = localStorage.getItem("userId"); // Replace with actual source
    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      // Replace with the correct backend URL
      const response = await axios.post("http://localhost:8000/face/save-face-image", {
        userId,
        faceImage: capturedImage,
      });

      if (response.data.success) {
        toast.success("Face registered successfully!");
        navigate("/profile"); // Redirect after successful registration
      } else {
        toast.error(response.data.message || "Error storing the image.");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("Failed to save the image. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Register Your Face ID</h2>

      {!capturedImage ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="rounded-lg shadow-md"
          />
          <button
            onClick={capturePhoto}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold"
          >
            Capture Photo
          </button>
        </>
      ) : (
        <>
          <img
            src={capturedImage}
            alt="Captured"
            className="rounded-lg shadow-md"
          />
          <div className="flex mt-6 space-x-4">
            <button
              onClick={savePhoto}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold"
            >
              Save Photo
            </button>
            <button
              onClick={() => setCapturedImage(null)}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg font-semibold"
            >
              Retake Photo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Faceid;

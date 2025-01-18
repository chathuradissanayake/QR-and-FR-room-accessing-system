import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../../context/userContext"; // Import UserContext
import { toast } from 'react-hot-toast';

const FaceScanner = ({ onSuccess }) => {
  const { user } = useContext(UserContext); // Access user context values
  const [message, setMessage] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Log user context values to console
    if (user) {
      console.log("User Context Values:", user);
    }

    startCamera(); // Automatically start the camera when the component loads
  }, [user]);

  useEffect(() => {
    // Verification loop to periodically check face verification
    const verificationLoop = setInterval(() => {
      captureAndVerifyImage();
    }, 2000); // Adjust the interval for responsiveness

    return () => clearInterval(verificationLoop); // Clear the interval when the component unmounts
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setMessage("Unable to access the camera.");
    }
  };

  const captureAndVerifyImage = async () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image', blob);

        const headers = {
          'api': import.meta.env.VITE_API,
          'user': import.meta.env.VITE_USER,
          'other': import.meta.env.VITE_OTHER,
        };

        try {
          const response = await fetch('https://ientrada.raccoon-ai.io/api/verify_face', {
            method: 'POST',
            headers: headers,
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();
            console.log(result); // Log the result to check the API response

            // Check if the userId in API response matches the userId in context
            if (result.user === user.userId) {
              console.log('User Verified'); // Log success if user IDs match
              toast.success('Face verified successfully!');

              if (onSuccess) {
                onSuccess(); // Notify parent component
              }
            } else {
              console.error('Access Denied: User ID does not match');
              toast.error('Access Denied: User ID does not match');
            }

          } else {
            console.error('Verification failed:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }, 'image/jpeg');
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md p-8 ">
        <h3 className="text-2xl font-bold text-red-600 bg-yellow-100 p-4 border-l-4 border-red-600 rounded shadow-md mb-4">
          Please Wait! Verifying your identity...
        </h3>

        <div className="relative w-full bg-gray-200 rounded h-80">
          <video
            ref={videoRef}
            className="object-cover w-full h-full rounded"
            autoPlay
            muted
          />
        </div>

        <canvas ref={canvasRef} className="hidden" width={640} height={480}></canvas>

        {message && <p className="mt-4 text-center text-blue-500">{message}</p>}
      </div>
    </div>
  );
};

export default FaceScanner;

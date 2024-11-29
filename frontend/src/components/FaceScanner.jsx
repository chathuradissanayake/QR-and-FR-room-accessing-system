import React, { useRef, useState } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';

const FaceScanner = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState(null); 
  const navigate = useNavigate(); // Hook for navigation

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

  const captureImage = () => {
      if (canvasRef.current && videoRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
              setImage(blob); // Set captured image as a Blob
              const imageUrl = URL.createObjectURL(blob);
              setImagePreview(imageUrl); // Create a preview URL for the image
          }, 'image/jpeg');
      }
  };

  const recaptureImage = () => {
      setImage(null);
      setImagePreview(null);
      startCamera(); // Restart the camera
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!image) {
          setMessage('Please capture an image.');
          return;
      }

      const formData = new FormData();
      formData.append('image', image);

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
              setMessage('Image uploaded successfully');
              setResult(result);
              console.log(result);

              // Redirect if the result matches the condition
              if (result.msg === "Verification Success.") {
                  navigate('/success'); // Change '/success' to your desired route
              }
          } else {
              setMessage('Failed to upload image');
              console.error('Error:', response.statusText);
          }
      } catch (error) {
          setMessage('Error uploading image');
          console.error('Error:', error);
      }
  };

  return (
<div className="flex justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">

                <div className="flex items-center mb-8 space-x-2 title">
                    <Link to="/">
                        <GoChevronLeft className="cursor-pointer" />
                    </Link>
                    <span className="font-semibold">Face Scan</span>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="my-4">
                        <div className="relative w-full bg-gray-200 rounded h-80">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Captured"
                                    className="object-cover w-full h-full rounded"
                                />
                            ) : (
                                <video
                                    ref={videoRef}
                                    className="object-cover w-full h-full rounded"
                                    autoPlay
                                    muted
                                />
                            )}
                        </div>
                        <canvas ref={canvasRef} className="hidden" width={640} height={480}></canvas>
                        {!imagePreview ? (
                            <div className='flex justify-between'>
                                <button
                                    type="button"
                                    onClick={startCamera}
                                    className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded"
                                >
                                    Start Camera
                                </button>
                                <button
                                    type="button"
                                    onClick={captureImage}
                                    className="w-full px-4 py-2 mt-2 ml-2 text-white bg-green-500 rounded"
                                >
                                    Capture Image
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={recaptureImage}
                                className="w-full px-4 py-2 mt-2 text-white bg-orange-500 rounded"
                            >
                                Recapture
                            </button>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-4 text-white bg-indigo-500 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-blue-500">{message}</p>}
                {result && (
                    <div className='mt-4 text-center text-green-500'>
                        <pre>{JSON.stringify(result.msg, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
  );
};

export default FaceScanner;
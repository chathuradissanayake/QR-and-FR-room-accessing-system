import React, { useState } from 'react';

const Faceid = () => {
  const [nic, setNic] = useState('');
  const [loc, setLoc] = useState(''); 
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  
  const handleNicChange = (e) => {
    setNic(e.target.value);
  };

  const handleLocChange = (e) => {
    setLoc(e.target.value);  
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both NIC, loc, and image are provided
    if (!nic || !loc || !image) {
      setMessage('Please provide NIC, loc, and image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    const headers = {
      'api': import.meta.env.VITE_API, // 'api' header from .env
      'user': import.meta.env.VITE_USER, // 'user' header from .env
      'nic': nic, // 'nic' header input
      'loc': loc, // 'loc' header input
    };

    try {
 
      const response = await fetch('https://ientrada.raccoon-ai.io/api/register_face', {
        method: 'POST',
        headers: headers,
        body: formData, // Sending the image as form data
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('File uploaded successfully');
        console.log(result); 
      } else {
        setMessage('Failed to upload file');
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      setMessage('Error uploading file');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nic">NIC:</label>
          <input
            type="text"
            id="nic"
            value={nic}
            onChange={handleNicChange}
            required
          />
        </div>
        <div>
          <label htmlFor="loc">Location:</label>
          <input
            type="text"
            id="loc"
            value={loc}
            onChange={handleLocChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Faceid;















// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const Faceid = () => {
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const navigate = useNavigate();

//   // Capture the photo from the webcam
//   const capturePhoto = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);
//   };

//   // Save the photo to the backend
//   const savePhoto = async () => {
//     if (!capturedImage) {
//       toast.error("Please capture an image first.");
//       return;
//     }

//     // Retrieve userId dynamically (example: from localStorage)
//     const userId = localStorage.getItem("userId"); // Replace with actual source
//     if (!userId) {
//       toast.error("User ID is missing. Please log in again.");
//       return;
//     }

//     try {
//       // Replace with the correct backend URL
//       const response = await axios.post("http://localhost:8000/face/save-face-image", {
//         userId,
//         faceImage: capturedImage,
//       });

//       if (response.data.success) {
//         toast.success("Face registered successfully!");
//         navigate("/profile"); // Redirect after successful registration
//       } else {
//         toast.error(response.data.message || "Error storing the image.");
//       }
//     } catch (error) {
//       console.error("Error saving image:", error);
//       toast.error("Failed to save the image. Try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <h2 className="mb-4 text-xl font-semibold">Register Your Face ID</h2>

//       {!capturedImage ? (
//         <>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             videoConstraints={{ facingMode: "user" }}
//             className="rounded-lg shadow-md"
//           />
//           <button
//             onClick={capturePhoto}
//             className="px-6 py-2 mt-6 font-semibold text-white bg-blue-500 rounded-lg"
//           >
//             Capture Photo
//           </button>
//         </>
//       ) : (
//         <>
//           <img
//             src={capturedImage}
//             alt="Captured"
//             className="rounded-lg shadow-md"
//           />
//           <div className="flex mt-6 space-x-4">
//             <button
//               onClick={savePhoto}
//               className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg"
//             >
//               Save Photo
//             </button>
//             <button
//               onClick={() => setCapturedImage(null)}
//               className="px-6 py-2 font-semibold text-white bg-gray-500 rounded-lg"
//             >
//               Retake Photo
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Faceid;

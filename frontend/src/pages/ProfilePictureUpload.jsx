import axios from "axios";
import Compressor from "compressorjs";
import React, { useContext, useState } from "react";
import { toast } from 'react-hot-toast';
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/userContext"; // Ensure UserContext is defined


const ProfilePictureUpload = () => {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const { user } = useContext(UserContext); // Get logged-in user's details

  const navigate = useNavigate();

  console.log("Logged-in user's ID:", user?._id);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Compress the image
      new Compressor(file, {
        quality: 0.1, // Adjust compression quality (0.0 to 1.0)
        success: (compressedFile) => {
          const reader = new FileReader();
          reader.onload = () => {
            setPreview(reader.result); // Set preview
            setImage(reader.result); // Store compressed Base64 string
          };
          reader.readAsDataURL(compressedFile); // Convert compressed file to Base64
        },
        error: (err) => {
          console.error("Compression error:", err);
          toast.error("Failed to compress the image.");
        },
      });
    }
  };

  console.log("Base64 image", image);

  const handleUpload = async () => {
    if (!image) {
      toast.error("Please select an image first.");
      return;
    }

    try {
      // Add user ID to the API request
      const response = await axios.put(`/api/user/profile-picture`, {
        userId: user._id, // Include the logged-in user's ID
        profilePicture: image,
      });
      toast.success('Profile picture updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload the image. Please try again.");
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <div>

        <div className="title flex items-center space-x-2 mb-8 dark:text-white">
        
            <GoChevronLeft className="cursor-pointer" 
            onClick={handleBackNavigation}/>
        
            <span className='font-semibold'>Update Profile Picture</span>
        </div>

        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-gray-600 mb-1 dark:text-slate-200"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-full mb-8"
            />
          )}
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-8"
          >
            Upload
          </button>
       </div>

    
    </div>
  );
};

export default ProfilePictureUpload;




// import React, { useState } from 'react';
// import axios from 'axios';

// const MyLogBook = () => {
//   const [image, setImage] = useState(null);
//   const [headers, setHeaders] = useState({
//     api: '',
//     user: '',
//     nic: '',
//     loc: '',
//   });

//   // Handle file input change
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   // Handle headers input change
//   const handleHeadersChange = (e) => {
//     setHeaders({
//       ...headers,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       alert('Please select an image to upload.');
//       return;
//     }

//     // Create a FormData object
//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//       // Send POST request
//       const response = await axios.post('https://ientrada.raccoon-ai.io/api/register_face', formData, {
//         headers: {
//           ...headers, // Spread the header values
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Response:', response.data);
//       alert('Image uploaded successfully!');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       alert('Failed to upload the image.');
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Image</h1>
//       <form onSubmit={handleSubmit}>
//         {/* Input for API header */}
//         <input
//           type="text"
//           name="api"
//           value={headers.api}
//           onChange={handleHeadersChange}
//           placeholder="API Key"
//           required
//         />
//         {/* Input for User header */}
//         <input
//           type="text"
//           name="user"
//           value={headers.user}
//           onChange={handleHeadersChange}
//           placeholder="User"
//           required
//         />
//         {/* Input for NIC header */}
//         <input
//           type="text"
//           name="nic"
//           value={headers.nic}
//           onChange={handleHeadersChange}
//           placeholder="NIC"
//           required
//         />
//         {/* Input for Location header */}
//         <input
//           type="text"
//           name="loc"
//           value={headers.loc}
//           onChange={handleHeadersChange}
//           placeholder="Location"
//           required
//         />
//         {/* File input for image */}
//         <input type="file" onChange={handleImageChange} accept="image/*" required />
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// };

// export default MyLogBook;





























import React from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link } from 'react-router-dom';
import NotUsed from '../assets/notused.png';
import Used from '../assets/used.png';
import LogCard from '../components/LogCard';
import LogSearch from '../components/LogSearch';

export default function MyLogbook() {

    // const navigate = useNavigate();

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">

    <div className="flex items-center mb-8 space-x-2 title">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>My LogBook</span>
    </div>
    
    {/* searchbar */}
    <div><LogSearch/></div>

    <div className="space-y-4">
      
    <LogCard
    room="Main Office"
    roomcode="M06"
    door="Main Door"
    branch="Colombo"
    entryTime="11:22 AM"
    exitTime="1:44 PM"
    date="21/08/2024"
    state={Used}
    />
    
    <LogCard
    room="Conference Room"
    roomcode="C06"
    door="Main Door"
    branch="Colombo"
    entryTime=""
    exitTime=""
    date="29/08/2024"
    state={NotUsed}
    />
    </div>

    </div>
    </div>
  )
}

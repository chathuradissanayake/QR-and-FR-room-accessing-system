import React, { useContext, useEffect, useState } from 'react';
import { FaChevronRight, FaExclamationCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import avatar from '../assets/avatar.png';


export default function MarkLeave() {
    const [userId, setUserId] = useState(''); // State to hold user ID

    // Handle user ID input change
    const handleInputChange = (e) => {
        setUserId(e.target.value);
    };

    // Handle confirmation
    const handleConfirm = async () => {
        if (userId.trim() === '') {
            alert('Please enter your User ID');
            return;
        }

        try {
            // Send user ID to the backend
            const response = await axios.post('/leave/mark', { userId });

            if (response.status === 200) {
                alert('Leave confirmed successfully');

                // Get the UTC time of the leave from the response
                const utcLeaveTime = response.data.leaveTime; // Ensure your backend sends this field

                // Navigate to SuccessLeave page with leaveTime
                navigate('/successleave', { state: { leaveTime: utcLeaveTime } });
            } else {
                alert('Error confirming leave');
            }
        } catch (error) {
            console.error('Error confirming leave:', error);
            alert('Error confirming leave');
        }
    };




    
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);



  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User data not available</div>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
                <div className="flex items-center mb-8 space-x-2 title">
                    <Link to="/">
                        <GoChevronLeft className="cursor-pointer" />
                    </Link>
                    <span className='font-semibold'>Leave</span>
                </div>

                <div>
                    <h3 className="mb-3 ml-4 text-sm text-blue-500">Do you want to leave?</h3>
                </div>

                <div className="ml-4 text-left">
                    <p className="text-sm text-black-500">
                        If you want to leave, <span className="font-semibold">Confirm</span>
                    </p>
                    <p className="mb-6 text-sm text-black-500">
                        Otherwise <span className="font-semibold">Cancel</span>
                    </p>
                </div>

                {/* User ID Input */}
                <div className="mb-4 ml-4">
                    <div>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={user.userId}
                            readOnly
                            className="w-full px-4 py-2 text-center text-blue-900 bg-blue-100 rounded-lg"
                        />
                    </div>
                </div>
                


                

                {/* Buttons */}
                <div className="ml-3">
                    <button
                        onClick={handleConfirm}
                        type="button"
                        className="w-full py-2 mb-2 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Confirm
                    </button>

                    <button
                        onClick={() => navigate('/')} // Navigate to home page on cancel
                        type="button"
                        className="w-full py-2 font-semibold text-white transition duration-300 bg-gray-600 rounded-lg hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
    
    </div>
  );
};










// // MarkLeave.jsx
// import React, { useState } from 'react';
// import { GoChevronLeft } from "react-icons/go";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function MarkLeave() {
//     const [userId, setUserId] = useState(''); // State to hold user ID
//     const navigate = useNavigate();

//     // Handle user ID input change
//     const handleInputChange = (e) => {
//         setUserId(e.target.value);
//     };

//     // Handle confirmation
//     const handleConfirm = async () => {
//         if (userId.trim() === '') {
//             alert('Please enter your User ID');
//             return;
//         }

//         try {
//             // Send user ID to the backend
//             const response = await axios.post('/leave/mark', { userId });

//             if (response.status === 200) {
//                 alert('Leave confirmed successfully');

//                 // Get the UTC time of the leave from the response
//                 const utcLeaveTime = response.data.leaveTime; // Ensure your backend sends this field

//                 // Navigate to SuccessLeave page with leaveTime
//                 navigate('/successleave', { state: { leaveTime: utcLeaveTime } });
//             } else {
//                 alert('Error confirming leave');
//             }
//         } catch (error) {
//             console.error('Error confirming leave:', error);
//             alert('Error confirming leave');
//         }
//     };

//     return (
//         <div className="flex justify-center min-h-screen bg-gray-50">
//             <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
//                 <div className="flex items-center mb-8 space-x-2 title">
//                     <Link to="/">
//                         <GoChevronLeft className="cursor-pointer" />
//                     </Link>
//                     <span className='font-semibold'>Leave</span>
//                 </div>

//                 <div>
//                     <h3 className="mb-3 ml-4 text-sm text-blue-500">Do you want to leave?</h3>
//                 </div>

//                 <div className="ml-4 text-left">
//                     <p className="text-sm text-black-500">
//                         If you want to leave, <span className="font-semibold">Confirm</span>
//                     </p>
//                     <p className="mb-6 text-sm text-black-500">
//                         Otherwise <span className="font-semibold">Cancel</span>
//                     </p>
//                 </div>

//                 {/* User ID Input */}
//                 <div className="mb-4 ml-4">
//                     <label htmlFor="userId" className="block text-sm text-gray-700">User ID</label>
//                     <input
//                         id="userId"
//                         type="text"
//                         value={userId}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                         placeholder="Enter your User ID"
//                     />
//                 </div>

//                 {/* Buttons */}
//                 <div className="ml-3">
//                     <button
//                         onClick={handleConfirm}
//                         type="button"
//                         className="w-full py-2 mb-2 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
//                     >
//                         Confirm
//                     </button>

//                     <button
//                         onClick={() => navigate('/')} // Navigate to home page on cancel
//                         type="button"
//                         className="w-full py-2 font-semibold text-white transition duration-300 bg-gray-600 rounded-lg hover:bg-gray-700"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
















// import React, { useContext, useEffect, useState } from 'react';
// import { FaChevronRight, FaExclamationCircle } from 'react-icons/fa';
// import { FiEdit } from 'react-icons/fi';
// import { GoChevronLeft } from "react-icons/go";
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../context/userContext';
// import avatar from '../assets/avatar.png';


// export default function MarkLeave() {
//     const [userId, setUserId] = useState(''); // State to hold user ID

//     // Handle user ID input change
//     const handleInputChange = (e) => {
//         setUserId(e.target.value);
//     };

//     // Handle confirmation
//     const handleConfirm = async () => {
//         if (userId.trim() === '') {
//             alert('Please enter your User ID');
//             return;
//         }

//         try {
//             // Send user ID to the backend
//             const response = await axios.post('/leave/mark', { userId });

//             if (response.status === 200) {
//                 alert('Leave confirmed successfully');

//                 // Get the UTC time of the leave from the response
//                 const utcLeaveTime = response.data.leaveTime; // Ensure your backend sends this field

//                 // Navigate to SuccessLeave page with leaveTime
//                 navigate('/successleave', { state: { leaveTime: utcLeaveTime } });
//             } else {
//                 alert('Error confirming leave');
//             }
//         } catch (error) {
//             console.error('Error confirming leave:', error);
//             alert('Error confirming leave');
//         }
//     };




    
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       setLoading(false);
//     }
//   }, [user]);



//   // Function to handle navigation
//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <div>User data not available</div>;
//   }

//   return (
//     <div className="flex justify-center min-h-screen bg-gray-50">
//     <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
//                 <div className="flex items-center mb-8 space-x-2 title">
//                     <Link to="/">
//                         <GoChevronLeft className="cursor-pointer" />
//                     </Link>
//                     <span className='font-semibold'>Leave</span>
//                 </div>

//                 <div>
//                     <h3 className="mb-3 ml-4 text-sm text-blue-500">Do you want to leave?</h3>
//                 </div>

//                 <div className="ml-4 text-left">
//                     <p className="text-sm text-black-500">
//                         If you want to leave, <span className="font-semibold">Confirm</span>
//                     </p>
//                     <p className="mb-6 text-sm text-black-500">
//                         Otherwise <span className="font-semibold">Cancel</span>
//                     </p>
//                 </div>

//                 {/* User ID Input */}
//                 <div className="mb-4 ml-4">
//                     <div>
//                         <input
//                             type="text"
//                             id="userId"
//                             name="userId"
//                             value={user.userId}
//                             readOnly
//                             className="w-full px-4 py-2 text-center text-blue-900 bg-blue-100 rounded-lg"
//                         />
//                     </div>
//                 </div>
                


                

//                 {/* Buttons */}
//                 <div className="ml-3">
//                     <button
//                         onClick={handleConfirm}
//                         type="button"
//                         className="w-full py-2 mb-2 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
//                     >
//                         Confirm
//                     </button>

//                     <button
//                         onClick={() => navigate('/')} // Navigate to home page on cancel
//                         type="button"
//                         className="w-full py-2 font-semibold text-white transition duration-300 bg-gray-600 rounded-lg hover:bg-gray-700"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </div>
    
//     </div>
//   );
// };

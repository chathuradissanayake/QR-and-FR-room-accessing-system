// MarkLeave.jsx
import React, { useState } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MarkLeave() {
    const [userId, setUserId] = useState(''); // State to hold user ID
    const navigate = useNavigate();

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

    return (
        <div className="flex justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
                <div className="title flex items-center space-x-2 mb-8">
                    <Link to="/">
                        <GoChevronLeft className="cursor-pointer" />
                    </Link>
                    <span className='font-semibold'>Leave</span>
                </div>

                <div>
                    <h3 className="text-sm text-blue-500 mb-3 ml-4">Do you want to leave?</h3>
                </div>

                <div className="text-left ml-4">
                    <p className="text-sm text-black-500">
                        If you want to leave, <span className="font-semibold">Confirm</span>
                    </p>
                    <p className="text-sm text-black-500 mb-6">
                        Otherwise <span className="font-semibold">Cancel</span>
                    </p>
                </div>

                {/* User ID Input */}
                <div className="mb-4 ml-4">
                    <label htmlFor="userId" className="block text-sm text-gray-700">User ID</label>
                    <input
                        id="userId"
                        type="text"
                        value={userId}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your User ID"
                    />
                </div>

                {/* Buttons */}
                <div className="ml-3">
                    <button
                        onClick={handleConfirm}
                        type="button"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 mb-2"
                    >
                        Confirm
                    </button>

                    <button
                        onClick={() => navigate('/')} // Navigate to home page on cancel
                        type="button"
                        className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

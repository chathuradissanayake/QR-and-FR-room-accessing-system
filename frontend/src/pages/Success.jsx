import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleEntryTime = async () => {
        const id = 'unique-id'; // Replace with your logic to generate/retrieve ID
        const entryTime = new Date();

        try {
            const response = await axios.post('/access/entry', { id, entryTime });
            console.log(response.data.message);

            // Navigate to the home page after successful API call
            navigate('/');
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
                <h1 className="mb-4 text-2xl font-semibold">Verified Successfully!</h1>
                <p className="mb-6">Your Entry Time has been successfully submitted.</p>
                <button
                    onClick={handleEntryTime}
                    className="px-4 py-2 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default Success;

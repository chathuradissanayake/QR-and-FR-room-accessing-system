import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleDoneClick = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold">Verification is Success!</h1>
        <p className="mb-6">Now you can enter.</p>
        <button
          onClick={handleDoneClick}
          className="px-4 py-2 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Success;
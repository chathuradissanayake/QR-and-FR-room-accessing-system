import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleDoneClick = () => {
    navigate('/');
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-lg w-full max-w-md text-center">
    <h1 className="text-2xl font-semibold mb-4">Verification is Success!</h1>
    <p className="mb-6">You can access the door now.</p>
    <button
      onClick={handleDoneClick}
      className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
    >
      Done
    </button>
  </div>
</div>


  );
};

export default Success;
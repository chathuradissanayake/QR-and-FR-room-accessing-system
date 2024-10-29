import React, { useState } from 'react';

const ChangeUsername = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle username change logic here
    console.log('New Username:', `${firstName} ${lastName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button onClick={() => window.history.back()} className="text-gray-500 mr-4">&lt; Back</button>
          <h1 className="text-2xl font-semibold">Change Username</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-600">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 mt-1 border rounded-lg"
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-600">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 mt-1 border rounded-lg"
              placeholder="Last Name"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg text-center font-semibold"
          >
            Change Username
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangeUsername;

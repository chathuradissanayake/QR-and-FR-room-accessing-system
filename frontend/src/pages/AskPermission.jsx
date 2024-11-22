import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';

const AskPermission = () => {
  const [data, setData] = useState({
    name: '',
    roomName: '',
    doorCode: '',
    date: '',
    entryTime: '',
    exitTime: '',
    message: '',
  });

  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate entryTime and exitTime
    if (new Date(`1970-01-01T${data.entryTime}:00`) >= new Date(`1970-01-01T${data.exitTime}:00`)) {
      return toast.error('In Time must be before Out Time');
    }

    setLoading(true);
    try {
      const { data: response } = await axios.post('/askpermission', data);
      setLoading(false);

      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          name: '',
          roomName: '',
          doorCode: '',
          date: '',
          entryTime: '',
          exitTime: '',
          message: '',
        });
        toast.success('Permission sent successfully');
        navigate('/success');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error('An error occurred while sending the permission request.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        <div className="title flex items-center space-x-2 mb-8">
          <Link to="/" className="flex items-center">
            <GoChevronLeft className="cursor-pointer" />
          </Link>
          <span className="font-semibold">Ask Permission</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Room Field */}
          <select
            name="roomName"
            value={data.roomName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>Select the Room</option>
            <option value="room1">Room 1</option>
            <option value="room2">Room 2</option>
            <option value="room3">Room 3</option>
          </select>

          {/* Door Field */}
          <select
            name="doorCode"
            value={data.doorCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>Select the Door</option>
            <option value="door1">Door A</option>
            <option value="door2">Door B</option>
            <option value="door3">Door C</option>
          </select>

          {/* Date Field */}
          <div>
            <label htmlFor="date" className="block text-sm text-gray-400 ml-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* In Time Field */}
          <div>
            <label htmlFor="entryTime" className="block text-sm text-gray-400 ml-1">In Time</label>
            <input
              type="time"
              id="entryTime"
              name="entryTime"
              value={data.entryTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Out Time Field */}
          <div>
            <label htmlFor="exitTime" className="block text-sm text-gray-400 ml-1">Out Time</label>
            <input
              type="time"
              id="exitTime"
              name="exitTime"
              value={data.exitTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Message Field */}
          <textarea
            name="message"
            placeholder="Message"
            value={data.message}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskPermission;

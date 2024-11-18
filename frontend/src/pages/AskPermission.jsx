import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { GoChevronLeft } from "react-icons/go";


const AskPermission = () => {
  const [data, setData] = useState({
    name: '',
    room: '',
    door: '',
    date: '',
    intime: '',
    outtime: '',
    message: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Name:', data.name);
    console.log('room:', data.room);
    console.log('door:', data.door);
    console.log('date:', data.date);
    console.log('date:', data.intime);
    console.log('date:', data.outtime);
    console.log('message:', data.message);

    // Destructuring data
    const { name, room, door, date, intime, outtime, message } = data;

    try {
      const { data: response } = await axios.post('/askpermission', {
        name,
        room,
        door,
        date,
        intime,
        outtime,
        message,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          name: '',
          room: '',
          door: '',
          date: '',
          intime: '',
          outtime: '',
          message: '',
        });
        toast.success('Permission sent successfully');
        navigate('/success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    
    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Ask Permission</span>
    </div>
    <div className='ml-4'>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>


          <div>
                <label htmlFor="room" className="sr-only">
                    Room
                </label>
                <select
                    type="text"
                    id="room"
                    name="room"
                    value={data.room}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${data.room === '' ? 'text-gray-400' : 'text-black'}`}                >
                    <option disabled value="">Select the room</option>
                    <option value="room1">Room 1</option>
                    <option value="room2">Room 2</option>
                    <option value="room3">Room 3</option>
                </select>
            </div>
      

          <div>
                <label htmlFor="door" className="sr-only">
                    Door
                </label>
                <select
                    type="text"
                    id="door"
                    name="door"
                    value={data.door}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${data.door === '' ? 'text-gray-400' : 'text-black'}`}                >
                    <option disabled value="">Select the Door</option>
                    <option value="door1">Door A</option>
                    <option value="door2">Door B</option>
                    <option value="door3">Door C</option>
                </select>
            </div>


          <div>
          <label htmlFor="date" className="block text-sm text-gray-400 ml-3">
            Date
            </label>
            <input
                type="date"
                id="date"
              name="date"
              value={data.date}
              onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${data.date === '' ? 'text-gray-400' : 'text-black'}`}                
                required
                // className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div>
        <label htmlFor="intime" className="block text-sm text-gray-400 ml-3">
            In Time
            </label>
            <input
                type="time"
                id="intime"
              name="intime"
              value={data.intime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"             
                required
                // className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div>
        <label htmlFor="intime" className="block text-sm text-gray-400 ml-3">
            Out Time
            </label>
            <input
                type="time"
                id="outtime"
              name="outtime"
              value={data.outtime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "               
                required
                // className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

          <div>
            <label htmlFor="message" className="sr-only">
              Name
            </label>
            <textarea
              type="text"
              id="message"
              name="message"
              placeholder="Message"
              value={data.message}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>


          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
        </div>
    </div>






</div>
  );
};

export default AskPermission;





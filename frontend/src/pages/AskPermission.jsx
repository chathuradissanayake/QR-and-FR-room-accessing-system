import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/userContext";

const AskPermission = () => {
  const {user} = useContext(UserContext);
  const [data, setData] = useState({
    name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    roomName: '',
    door: '',
    date: '',
    inTime: '',
    outTime: '',
    message: '',
  });
  const [doors, setDoors] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const response = await axios.get('/door/doors', {
          withCredentials: true,
        });
        setDoors(response.data);
      } catch (error) {
        console.error('Error fetching doors:', error);
        toast.error('Error fetching doors');
      }
    };

    fetchDoors();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDoorChange = (e) => {
    const selectedDoor = doors.find(door => door._id === e.target.value);
    setData({ ...data, door: e.target.value, roomName: selectedDoor ? selectedDoor.location : '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Name:', data.name);
    console.log('roomName:', data.roomName);
    console.log('door:', data.door);
    console.log('date:', data.date);
    console.log('inTime:', data.inTime);
    console.log('outTime:', data.outTime);
    console.log('message:', data.message);

    // Destructuring data
    const { name, roomName, door, date, inTime, outTime, message } = data;

    try {
      const { data: response } = await axios.post('/permission/ask-permission', {
        name,
        roomName,
        door,
        date,
        inTime,
        outTime,
        message,
      }, {
        withCredentials: true,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
          roomName: '',
          door: '',
          date: '',
          inTime: '',
          outTime: '',
          message: '',
        });
        toast.success('Permission request submitted successfully!');
        navigate('/mypermissions');
      }
    } catch (error) {
      console.error('Error creating permission request:', error);
      toast.error('Error creating permission request');
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600 ">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800">
        <div className="title flex items-center space-x-2 mb-8 dark:text-white">
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
                placeholder="User Name"
                value={data.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-400"
                required
                readOnly
              />
            </div>

            <div >
              <label htmlFor="door" className="sr-only">
                Door
              </label>
              <select
                id="door"
                name="door"
                value={data.door}
                onChange={handleDoorChange}
                className={`flex w-full px-4 py-2  border rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-400 ${data.door === '' ? 'text-gray-400' : 'text-black'}`}
                required
              >
                <option disabled value="">Select the Door</option>
                {doors
                .sort((a, b) => a.doorCode.localeCompare(b.doorCode))  // Sort alphabetically by doorCode
                .map((door) => (
                  <option key={door._id} value={door._id}>
                    {door.doorCode} &nbsp; {door.roomName} 
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="roomName" className="sr-only">
                Room
              </label>
              <input
                type="text"
                id="roomName"
                name="roomName"
                value={data.roomName}
                placeholder='Location'
                readOnly
                className="w-full px-4 py-2 rounded-lg text-blue-900 text-center dark:bg-slate-700 dark:text-white bg-blue-100"
              />
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-400 ${data.date === '' ? 'text-gray-400' : 'text-black'}`}
                required
              />
            </div>

            <div>
              <label htmlFor="inTime" className="block text-sm text-gray-400 ml-3">
                In Time
              </label>
              <input
                type="time"
                id="inTime"
                name="inTime"
                value={data.inTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label htmlFor="outTime" className="block text-sm text-gray-400 ml-3">
                Out Time
              </label>
              <input
                type="time"
                id="outTime"
                name="outTime"
                value={data.outTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                type="text"
                id="message"
                name="message"
                placeholder="Message"
                value={data.message}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-slate-100"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskPermission;
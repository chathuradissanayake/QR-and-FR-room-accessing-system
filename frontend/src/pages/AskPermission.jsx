import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/userContext";

const AskPermission = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState({
    name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    location: '',
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
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/door/doors', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setDoors(response.data);
        console.log('Doors:', response.data);
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
    setData({
      ...data,
      door: e.target.value,
      roomName: selectedDoor ? selectedDoor.roomName : '',
      location: selectedDoor ? selectedDoor.location : ''
    });
  };

  const handleInTimeChange = (e) => {
    const { value } = e.target;
    const isToday = data.date === formattedToday;

    if (isToday) {
      const currentTimeObj = new Date();
      const selectedInTimeObj = new Date(data.date + 'T' + value);

      //currenttime decrease by 1 minute in if condition for avoid the error when selecting current time
      const newCurrentTimeObj = currentTimeObj.setMinutes(currentTimeObj.getMinutes() - 1);

      // Ensure inTime isn't earlier than the current time
      if (selectedInTimeObj < newCurrentTimeObj) {
        toast.error('In Time cannot be earlier than the current time.');
      } else {
        setData({ ...data, inTime: value });
      }
    } else {
      setData({ ...data, inTime: value });
    }
  };

  const handleOutTimeChange = (e) => {
    const { value } = e.target;
    const selectedInTimeObj = new Date(data.date + 'T' + data.inTime);
    const selectedOutTimeObj = new Date(data.date + 'T' + value);

    // Ensure outTime is later than inTime
    if (selectedOutTimeObj <= selectedInTimeObj) {
      toast.error('Out Time must be later than In Time.');
    } else {
      setData({ ...data, outTime: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Name:', data.name);
    console.log('location:', data.location);
    console.log('roomName:', data.roomName);
    console.log('door:', data.door);
    console.log('date:', data.date);
    console.log('inTime:', data.inTime);
    console.log('outTime:', data.outTime);
    console.log('message:', data.message);

    const { name, roomName, door, location, date, inTime, outTime, message } = data;

    try {
      const token = localStorage.getItem('token');
      const { data: response } = await axios.post('/api/permission/ask-permission', {
        name,
        location,
        roomName,
        door,
        date,
        inTime,
        outTime,
        message,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
          location: '',
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

  // Get today's date in the local time zone (yyyy-mm-dd format)
  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-CA'); // This gives yyyy-mm-dd format in local time zone
  const currentTime = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;

  return (
    <div>
      <div className="title flex items-center space-x-2 mb-8 dark:text-white">
        <Link to="/">
          <GoChevronLeft className="cursor-pointer" />
        </Link>
        <span className="font-semibold">Ask Permission</span>
      </div>
      <div className="ml-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-500 dark:text-slate-200 mb-1">User Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="User Name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-500 dark:border-slate-400 rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-400"
              required
              readOnly
            />
          </div>

          <div>
            <label htmlFor="door" className="block text-gray-500 dark:text-slate-200 mb-1">Door</label>
            <select
              id="door"
              name="door"
              value={data.door}
              onChange={handleDoorChange}
              className="w-full px-4 py-2 border border-slate-500 dark:border-slate-400 rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-400"
              required
            >
              <option disabled value="">Select the Door</option>
              {doors
                .filter((door) => door.status === 'Active')
                .sort((a, b) => a.doorCode.localeCompare(b.doorCode))
                .map((door) => (
                  <option key={door._id} value={door._id}>
                    {door.doorCode} &nbsp; {door.roomName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <input
              type="text"
              id="roomName"
              name="roomName"
              value={data.roomName}
              placeholder="Room Name"
              readOnly
              className="w-full px-4 py-2 rounded-lg text-blue-900 text-center dark:bg-slate-700 dark:text-white bg-blue-100"
            />
          </div>

          <div>
            <input
              type="text"
              id="location"
              name="location"
              value={data.location}
              placeholder="Location"
              readOnly
              className="w-full px-4 py-2 rounded-lg text-blue-900 text-center dark:bg-slate-700 dark:text-white bg-blue-100"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-500 dark:text-slate-200 mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              min={formattedToday} // Disabling dates before today
              className="w-full px-4 py-2 border border-slate-500 dark:border-slate-400 rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="inTime" className="block text-gray-500 dark:text-slate-200 mb-1">In Time</label>
            <input
              type="time"
              id="inTime"
              name="inTime"
              value={data.inTime}
              onChange={handleInTimeChange}  // Updated logic here
              className="w-full px-4 py-2 border border-slate-500 dark:border-slate-400 rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="outTime" className="block text-gray-500 dark:text-slate-200 mb-1">Out Time</label>
            <input
              type="time"
              id="outTime"
              name="outTime"
              value={data.outTime}
              onChange={handleOutTimeChange}  // Updated logic here
              className="w-full px-4 py-2 border border-slate-500 dark:border-slate-400 rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-500 dark:text-slate-200 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message..."
              value={data.message}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-slate-500 dark:border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-slate-100"
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
  );
};

export default AskPermission;

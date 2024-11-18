import React, { useState } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';



const AskPermission = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [door, setDoor] = useState('');
    const [date, setDate] = useState('');
    const [intime, setinTime] = useState('');
    const [outtime, setoutTime] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle sign-in logic here
      console.log('Name:', name);
      console.log('Room:', room);
      console.log('Door:', door);
      console.log('Date:', date);
      console.log('InTime:', intime);
      console.log('OutTime:', outtime);
      console.log('Message:', message);
      
      // Clear input values
      setName('');
      setRoom('');
      setDoor('');
      setDate('');
      setinTime('');
      setoutTime('');
      setMessage('');

      navigate('/success');
    };

  return (

<>
    <div className="flex  justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    
    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Ask Permission</span>
    </div>
    <div className='ml-4'>
    <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>


          <div>
                <label htmlFor="room" className="sr-only">
                    Room
                </label>
                <select
                    id="room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${room === '' ? 'text-gray-400' : 'text-black'}`}                >
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
                    id="door"
                    value={door}
                    onChange={(e) => setDoor(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${door === '' ? 'text-gray-400' : 'text-black'}`}                >
                    <option disabled value="">Select the Door</option>
                    <option value="door1">Door A</option>
                    <option value="door2">Door B</option>
                    <option value="door3">Door C</option>
                </select>
            </div>

          <div>
            <label htmlFor="date" className="sr-only">
                Date
            </label>
            <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${date === '' ? 'text-gray-400' : 'text-black'}`}                
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
                value={intime}
                onChange={(e) => setinTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
        </div>

        <div>
            <label htmlFor="intime" className="block text-sm text-gray-400 ml-3">
            Out Time
            </label>
            <input
                type="time"
                id="outtime"
                value={outtime}
                onChange={(e) => setoutTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
            />
        </div>

        <div>
            <label htmlFor="message" className="sr-only">
              Name
            </label>
            <textarea
              type="text"
              id="message"
              placeholder="Message"
              value={message}
              rows="3"
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

        <button
              onClick={() => navigate()}
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300  mb-2"
          >
              Submit
          </button>
    </form>
    </div>

    </div>
    </div>
    </>
  )
  
}
export default AskPermission;
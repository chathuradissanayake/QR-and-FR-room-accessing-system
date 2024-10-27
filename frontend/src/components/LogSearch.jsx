import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const LogSearch = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState('');
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleRoomChange = (e) => {
      setSelectedRoom(e.target.value);
    };
  
    const handleSearch = () => {
      // Implement the search logic here
      console.log('Searching for:', {
        date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
        room: selectedRoom,
      });
    };
  
    return (
    <div className="">
      <div className="search-bar mb-5">
        <input 
            type="date" 
            id="date" 
            selected={selectedDate}
            onChange={handleDateChange}
            className='w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 '

        />
        
        
        <select value={selectedRoom} onChange={handleRoomChange} className='w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>
          <option desabled value="">Select Room</option>
          <option value="Room 101">Room 101</option>
          <option value="Room 102">Room 102</option>
          <option value="Room 103">Room 103</option>
          {/* Add more rooms as needed */}
        </select>
  
        <button 
        className="w-auto py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 mb-2 px-3"
        onClick={handleSearch}>Search</button>
      </div>
      </div>
    );
    
  };

export default LogSearch;

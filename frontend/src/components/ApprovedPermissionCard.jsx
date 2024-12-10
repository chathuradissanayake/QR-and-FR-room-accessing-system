import React from 'react';

const ApprovedPermissionCard = ({ permission }) => {
  const { roomName, door, inTime, outTime, date, message } = permission;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{door.roomName}</h2>
        <span className="text-gray-500 font-bold">{door ? door.doorCode : "N/A"}</span>
      </div>
      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Door</span>
          <span className="text-blue-500">{door ? door.roomName : "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span>Location</span>
          <span className="text-blue-500">{roomName}</span>
        </div>
        <div className="flex justify-between">
          <span>In Time</span>
          <span className="font-medium text-gray-800">{inTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Out Time</span>
          <span className="font-medium text-gray-800">{outTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Date</span>
          <span className="font-medium text-gray-800">{new Date(date).toLocaleDateString()}</span>
        </div>
        <div>
          <span className= "block text-sm font-medium text-gray-600 mb-2" >Message</span>
          <span className="block mt-2 font-medium text-gray-500  px-2 py-1 rounded border border-gray">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApprovedPermissionCard;
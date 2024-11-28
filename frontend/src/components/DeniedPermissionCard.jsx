import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const DeniedPermissionCard = ({ permission }) => {
  const { roomName, door, inTime, outTime, date, message, userName } = permission;

  return (
    <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{roomName}</h2>
        <span className="text-gray-500 font-bold">{door ? door.doorCode : "N/A"}</span>
      </div>
      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Door</span>
          <span className="text-blue-500">{door ? door.location : "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span>Room</span>
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
        <div className="flex justify-between">
          <span>Message</span>
          <span className="font-medium text-gray-800 bg-gradient-to-r from-red-100 to-transparent px-2 py-1 rounded">
            {message}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-3 mt-4">
        <FaUserCircle className="text-purple-600 text-2xl" />
        <div>
          <div className="text-sm font-medium text-gray-800">{userName}</div>
          <div className="text-sm text-gray-500">@{userName.toLowerCase()}</div>
        </div>
        <div className="ml-auto">
          <span className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
            Denied
          </span>
        </div>
      </div>
      <div className="p-3 bg-gray-100 rounded-lg text-sm text-gray-600 mt-4">
        Sorry, your request for access has been denied by the admin. This access is currently restricted for you. Try with a different time slot.
      </div>
    </div>
  );
};

export default DeniedPermissionCard;
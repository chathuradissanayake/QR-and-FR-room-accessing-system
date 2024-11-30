import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PendingPermissionCard = ({ permission, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/permission/delete-permission/${permission._id}`, {
        withCredentials: true,
      });
      onDelete(permission._id);
      toast.success('Permission request deleted successfully');
    } catch (error) {
      console.error('Error deleting permission request:', error);
      toast.error('Error deleting permission request');
    }
  };

  return (
    <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{permission.door.roomName}</h2>
        <span className="text-gray-500 font-bold">{permission.door ? permission.door.doorCode : "N/A"}</span>
      </div>
      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Door</span>
          <span className="text-blue-500">{permission.door ? permission.door.roomName : "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span>Room</span>
          <span className="text-blue-500">{permission.roomName}</span>
        </div>
        <div className="flex justify-between">
          <span>In Time</span>
          <span className="font-medium text-gray-800">{permission.inTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Out Time</span>
          <span className="font-medium text-gray-800">{permission.outTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Date</span>
          <span className="font-medium text-gray-800">{new Date(permission.date).toLocaleDateString()}</span>
        </div>
        <div>
          <span className="block text-sm font-medium text-gray-600 mb-2">Message</span>
          <span className="block mt-2 font-medium text-gray-500  px-2 py-1 rounded border border-gray">
            {permission.message}
          </span>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="w-full mt-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        Cancel Permission
      </button>
    </div>
  );
};

export default PendingPermissionCard;
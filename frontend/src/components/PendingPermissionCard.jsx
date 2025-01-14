import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';

const PendingPermissionCard = ({ permission, onDelete }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/permission/delete-permission/${permission._id}`, {
        headers: { Authorization: `Bearer ${token}` },
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
    <div className="max-w-sm p-4 bg-white border dark:bg-slate-700 border-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">{permission.door.roomName}</h2>
        <span className="font-bold dark:text-white">{permission.door ? permission.door.doorCode : "N/A"}</span>
      </div>
      <div className="space-y-2 text-gray-600 dark:text-slate-200">
        <div className="flex justify-between">
          <span>Room </span>
          <span className="text-blue-500">{permission.roomName}</span>
        </div>
        <div className="flex justify-between">
          <span>Location</span>
          <span className="text-blue-500">{permission.location}</span>
        </div>
        <div className="flex justify-between">
          <span>In Time</span>
          <span className="font-medium text-gray-800 dark:text-slate-200">{permission.inTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Out Time</span>
          <span className="font-medium text-gray-800 dark:text-slate-200">{permission.outTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Date</span>
          <span className="font-medium text-gray-800 dark:text-slate-200">{new Date(permission.date).toLocaleDateString()}</span>
        </div>
        <div>
          <span className="block text-sm font-medium text-gray-600 dark:text-slate-200 mb-2">Message</span>
          <span className="block mt-2 font-mono bg-gray-200 dark:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-200  px-2 py-1  ">
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
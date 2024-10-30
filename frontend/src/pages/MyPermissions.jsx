import React, { useState } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import PermissionsApproved from '../components/PermissionsApproved';
import PermissionsDenied from '../components/PermissionsDenied';
import PermissionsPending from '../components/PermissionsPending';

const MyPermissions = () => {
  const [activeTab, setActiveTab] = useState('Approved');
  const tabs = ['Approved', 'Pending', 'Denied'];
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        <div className="title flex items-center space-x-2 mb-8">
          <Link to="/">
            <GoChevronLeft className="cursor-pointer" />
          </Link>
          <span className='font-semibold'>My Permissions</span>
        </div>
        
        <div className="bg-white text-black  rounded-md">
          <div className="flex justify-around border-b border-black">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`text-lg font-semibold ${
                  activeTab === tab ? 'border-b-2 border-black' : 'text-gray-400'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4">
            {activeTab === 'Approved' && <PermissionsApproved
            room="Main Office"
            roomcode="M06"
            door="Main Door"
            branch="Colombo"
            intime="11:22 AM"
            outtime="1:44 PM"
            date="21/08/2024"
            />}
            {activeTab === 'Pending' && <PermissionsPending
           room="Conference Room"
           roomcode="C06"
           door="Main Door"
           branch="Colombo"
           intime="08:23 AM"
           outtime="09:12 AM"
           date="29/08/2024"
            />}
            {activeTab === 'Denied' && <PermissionsDenied
            room="Conference Room"
            roomcode="C06"
            door="Main Door"
            branch="Colombo"
            intime="08:23 AM"
            outtime="09:12 AM"
            date="29/08/2024"
            message="This is most commonly used to remove a border style that was applied at a smaller breakpoint."
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPermissions;

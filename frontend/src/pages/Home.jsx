import React from 'react';
import { useNavigate } from 'react-router-dom';
import tab1 from '../assets/tab1.png';
import DashboardTab from '../components/DashboardTab';

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(href); // Navigate to the path specified in the 'href' prop
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <p className="text-gray-500">Hello,</p>
        <h1 className="text-2xl font-semibold">Hi James</h1>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-600">Dashboard</span>
          <a href="/profile" className="text-blue-500">My Profile</a>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gray-800 text-white rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm">Sunday, 12 June</span>
          <i className="fas fa-calendar-alt"></i> {/* Add icon */}
        </div>
        <p className="mt-2">Location: Office Room</p>
        <p>Last In Time: 10:24 am</p>
        <p>Last Left Time: -</p>
      </div>

      {/* Reusable Dashboard Tabs */}
      <div className="space-y-4">
        <DashboardTab 
          title="Go In" 
          description="Scan the QR and Face" 
          href="/go-in" 
          image={tab1}
        />
        <DashboardTab 
          title="Leave" 
          description="Mark the Leave" 
          href="/markleave" 
          image={tab1}
        />
        <DashboardTab 
          title="Ask Permission" 
          description="Asking permission for Access room" 
          href="/ask-permission" 
          image={tab1}
        />
        <DashboardTab 
          title="Log Book" 
          description="My previous accessing" 
          href="/log-book" 
          image={tab1}
        />
        <DashboardTab 
          title="My Permissions" 
          description="Doors and Rooms that I have permission" 
          href="/permissions" 
          image={tab1}
        />
        <DashboardTab 
          title="Settings" 
          description="Account settings and App settings" 
          href="/settings" 
          image={tab1}
        />
        <DashboardTab 
          title="Contact Us" 
          description="Contact us for Emergency" 
          href="/contact" 
          image={tab1}
        />
      </div>
    </div>
  </div>
);
  
}

export default Home

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import tab1 from '../assets/tab1.png';
import DashboardTab from '../components/DashboardTab';

const Home = () => {
  const {user} = useContext(UserContext);
// getting the day 
  const getCurrentDateAndDay = () => {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };


  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user || !user.userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/history/get-history?userId=${user.userId}`);
        const logData = response.data;
        setLogs(logData);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user]);

  // Find the latest log based on entryTime
  const latestLog = logs.reduce((latest, log) => {
    if (!latest || new Date(log.entryTime) > new Date(latest.entryTime)) {
      return log;
    }
    return latest;
  }, null);



  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600 ">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800">
      {/* Header */}
      <div className="mb-6">
        <p className="text-gray-500 dark:text-slate-400">Hello,</p>
        {!!user && (<h1 className="text-2xl font-semibold dark:text-white">  {user.firstName} {user.lastName}</h1>)}
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-600 dark:text-slate-300">Dashboard</span>
          <a href="/profile" className="text-blue-500">My Profile</a>
        </div>
      </div>

      {
              loading ? (
                <p className="pl-4 text-m text-black-500"></p>
              ) : !latestLog ? (
                <p  className="pl-4 text-m text-black-500"></p>
              ) : (
                <div className="bg-gray-800 dark:bg-slate-900 text-white rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  {/* set the current date */}
                  <span className="text-sm">{getCurrentDateAndDay()}</span>
                  <i className="fas fa-calendar-alt"></i> {/* Add icon */}
                </div>
                <p className="mt-2">Location: {latestLog.location || "Unknown Location"}</p>
                <p>Last In Time: {
                    latestLog.entryTime
                      ? new Date(latestLog.entryTime).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""
                  }</p>
                <p>Last Left Time: {
                    latestLog.exitTime
                      ? new Date(latestLog.exitTime).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""
                      || "Currently In Room"}</p>
              </div>
              )}

      {/* Reusable Dashboard Tabs */}
      <div className="space-y-4">
        <DashboardTab 
          title="Go In" 
          description="Scan the QR and Face" 
          href="/entrancepage" 
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
          href="/askpermission" 
          image={tab1}
        />
        <DashboardTab 
          title="My Permissions" 
          description="Doors and Rooms that I have permission" 
          href="/mypermissions" 
          image={tab1}
        />
        <DashboardTab 
          title="Log Book" 
          description="My previous accessing" 
          href="/mylogbook" 
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
          href="/contactus" 
          image={tab1}
        />
      </div>
    </div>
  </div>
);
  
}

export default Home
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import askpermission from "../assets/askpermission.png";
import avatar from "../assets/avatar.png"; // Default avatar image
import contact from "../assets/contactus.png";
import goin from "../assets/go-in.png";
import leave from "../assets/leave.png";
import logbook from "../assets/logbook.png";
import permissions from "../assets/permissions.png";
import settings from "../assets/settings.png";

import DashboardTab from "../components/DashboardTab";

const Home = () => {
  const { user, setUser } = useContext(UserContext); // Assuming setUser is available
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get current date and day in a formatted string
  const getCurrentDateAndDay = () => {
    const date = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };
  
  useEffect(() => {
    console.log("User context value:", user); // Debug: log the user object to verify

    if (!user || !user.userId) {
      console.warn("User or userId is not available."); // Debug: warn if userId is missing
      setLoading(false);
      return;
    }

    const fetchLogs = async () => {
      try {
        console.log("Fetching logs for userId:", user.userId); // Debug: log userId being fetched
        const response = await axios.get(`/api/history/get-history?userId=${user.userId}`);
        const logData = response.data;
        setLogs(logData);
      } catch (error) {
        console.error("Error fetching logs:", error); // Debug: log error details
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
    <div >
      <div >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-500 dark:text-slate-400">Hello,</p>
            {!!user && (
              <h1 className="text-2xl font-semibold dark:text-white">
                {user.firstName} {user.lastName}
              </h1>
            )}
            
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => navigate("/notification")}
                className="text-yellow-400 text-3xl mt-1  "><FaBell />
              </button>
            </div>
            <img
              src={user?.profilePicture || avatar} // Fallback to default avatar
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
              onClick={() => navigate("/profile")}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = avatar; // Set fallback avatar
              }}
            />
          </div>
        </div>

        {/* Latest Log Section */}
        {loading ? (
          
          <p className="text-center text-gray-500"></p>
        ) : latestLog ? (
          <div>
          <p className="text-gray-600 dark:text-slate-300 mb-2">Dashboard</p>
          <div className="bg-slate-700 dark:bg-slate-900 text-white rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm">{getCurrentDateAndDay()}</span>
              <i className="fas fa-calendar-alt"></i>
            </div>
            <p className="mt-2">Room:&nbsp;&nbsp; {latestLog.roomName || "Unknown Room"}</p>
            <p>
              Last In Time:&nbsp;
              {latestLog.entryTime
                ? new Date(latestLog.entryTime).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </p>
            <p>
              Last Left Time:&nbsp;
              {latestLog.exitTime
                ? new Date(latestLog.exitTime).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Currently In Room"}
            </p>
          </div>
          </div>
        ) : (
          <p className="text-center text-gray-500"></p>
        )}

        {/* Reusable Dashboard Tabs */}
        <div className="space-y-4">
          <DashboardTab
            title="Go In"
            description="Scan the QR and Face"
            href="/entrancepage"
            image={goin}
          />
          <DashboardTab
            title="Leave"
            description="Mark the Leave"
            href="/markleave"
            image={leave}
          />
          <DashboardTab
            title="Ask Permission"
            description="Ask permission for Access room"
            href="/askpermission"
            image={askpermission}
          />
          <DashboardTab
            title="My Permissions"
            description="Doors that I have permission"
            href="/mypermissions"
            image={permissions}
          />
          <DashboardTab
            title="Log Book"
            description="My previous accessing"
            href="/mylogbook"
            image={logbook}
          />
          <DashboardTab
            title="Settings"
            description="Account and App settings"
            href="/settings"
            image={settings}
          />
          <DashboardTab
            title="Contact Us"
            description="Contact us for Emergency"
            href="/contactus"
            image={contact}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

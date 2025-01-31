import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import avatar from "../assets/avatar.png"; // Default avatar image
import askpermission from "../assets/DashbordIcons/askpermission.png";
import contact from "../assets/DashbordIcons/contactus.png";
import goin from "../assets/DashbordIcons/go-in.png";
import leave from "../assets/DashbordIcons/leave.png";
import logbook from "../assets/DashbordIcons/logbook.png";
import permissions from "../assets/DashbordIcons/permissions.png";
import settings from "../assets/DashbordIcons/settings.png";
import DashboardTab from "../components/DashboardTab";

const Home = () => {
  const { user, setUser } = useContext(UserContext); // Assuming setUser is available
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setnotificationCount] = useState([]);
  const [error, setError] = useState(null); // For error state
  const [hasFetched, setHasFetched] = useState(false); // Prevent refetch on re-render
  const [filteredLogsCount, setFilteredLogsCount] = useState(0); // Count for filtered logs

  useEffect(() => {
    if (user) {
      console.log("User context value:", user); // Log the user object from context
    }

    if (!user || !user._id) {
      setLoading(false);
      return;
    }

    const fetchnotificationCount = async () => {
      if (hasFetched) return; // Prevent duplicate fetches
      setLoading(true);

      try {
        console.log("Fetching notificationCount for userId:", user._id); // Log user._id when fetching logs
        const response = await axios.get(`/api/contactus/user/${user._id}`);
        const logData = response.data;

        // Log the user-related objId from ContactUs data for comparison
        logData.forEach((log) => {
          console.log(`ContactUs log objId (user reference): ${log.user.objId}, Reply: ${log.reply}`);
        });

        // Filter notificationCount to show only those where user._id matches the log user.objId and reply is not null and that userStatus == unread 
        const filterednotificationCount = logData.filter(
          (log) => log.user.objId.toString() === user._id && log.reply !== null && log.userstatus === "unread"
        );
        console.log("Filtered notificationCount based on matching objId and non-null reply:", filterednotificationCount);

        setnotificationCount(filterednotificationCount.reverse());
        setFilteredLogsCount(filterednotificationCount.length); // Set the count of filtered logs
        setError(null);
        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching notificationCount:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchnotificationCount();
  }, [user, hasFetched]);

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
    <div>
 
      <div>
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
                className="text-yellow-400 text-3xl mt-1"
              >
                <FaBell />
                {filteredLogsCount > 0 && (
                  <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                    {filteredLogsCount}
                  </span>
                )}
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

        {/* Show message if face registration is not complete (user.faceCount = 0) */}
        {user?.faceCount === 0 && (
          <div className="bg-red-200 text-red-700 p-4 mb-6 rounded-lg">
            Face Registration not complete. Please complete the registration process.{" "}
            <button
              onClick={() => navigate("/face-registration")}
              className="text-blue-500 hover:text-blue-700"
            >
              Click here
            </button>
          </div>
        )}

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
            description="Accessed doors logs"
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

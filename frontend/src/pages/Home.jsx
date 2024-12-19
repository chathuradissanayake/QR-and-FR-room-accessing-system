import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import tab1 from "../assets/tab1.png";
import DashboardTab from "../components/DashboardTab";
import avatar from "../assets/avatar.png"; // Default avatar image

const Home = () => {
  const { user, setUser } = useContext(UserContext); // Assuming setUser is available
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0); // For notification count

  // Get current date and day in a formatted string
  const getCurrentDateAndDay = () => {
    const date = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    // Retrieve user from localStorage if context is empty
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    // Fetch logs if user exists
    const fetchLogs = async () => {
      if (!user?.userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/history/get-history?userId=${user.userId}`);
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user, setUser]);

  useEffect(() => {
    // Save user to localStorage when the user context is updated
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Fetch notifications count based on "unread" userstatus
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.userId) return;

      try {
        const response = await axios.get(`/contactus/user/${user.userId}`);
        const notifications = response.data; // Assuming this returns an array of notifications

        // Filter notifications where userstatus is "unread"
        const unreadCount = notifications.filter(
          (notification) => notification.userstatus === "unread" 
        ).length;

        setNotificationCount(unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotificationCount(0); // Fallback to 0 if there's an error
      }
    };

    fetchNotifications();
  }, [user]); // Runs when `user` changes

  // Get the latest log based on `entryTime`
  const latestLog = logs.reduce((latest, log) => {
    return !latest || new Date(log.entryTime) > new Date(latest.entryTime) ? log : latest;
  }, null);

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500 dark:text-slate-400">Hello,</p>
            {!!user && (
              <h1 className="text-2xl font-semibold dark:text-white">
                {user.firstName} {user.lastName}
              </h1>
            )}
            <p className="text-gray-600 dark:text-slate-300">Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => navigate("/notification")}
                className="text-gray-600 dark:text-slate-300 text-2xl"
              >
                🔔
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>
            <img
              src={user?.profilePicture || avatar} // Fallback to default avatar
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
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
          <p className="text-center text-gray-500">Loading...</p>
        ) : latestLog ? (
          <div className="bg-gray-800 dark:bg-slate-900 text-white rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm">{getCurrentDateAndDay()}</span>
              <i className="fas fa-calendar-alt"></i>
            </div>
            <p className="mt-2">Location: {latestLog.location || "Unknown Location"}</p>
            <p>
              Last In Time:{" "}
              {latestLog.entryTime
                ? new Date(latestLog.entryTime).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </p>
            <p>
              Last Left Time:{" "}
              {latestLog.exitTime
                ? new Date(latestLog.exitTime).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Currently In Room"}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">No logs available.</p>
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
};

export default Home;

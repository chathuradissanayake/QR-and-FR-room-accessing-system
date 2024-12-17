import React, { useEffect, useState, useContext } from "react";
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";

export default function Notification() {
  const { user } = useContext(UserContext); // Get logged-in user info
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logs based on userId
  useEffect(() => {
    const fetchLogs = async () => {
      if (!user || !user.userId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch logs using userId as part of the URL
        const response = await axios.get(`/contactus/user/${user.userId}`);
        const logData = response.data;

        // Filter logs to show only those with non-null heading and reply
        const filteredLogs = logData.filter(
          (log) => log.reply // Check that heading and reply are not null or empty
        );

        setLogs(filteredLogs.reverse()); // Reverse the logs array
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user]);

  // Function to update userstatus to 'read'
  const markAsRead = async (logId) => {
    try {
      const response = await axios.put(`/contactus/userstatus/${logId}`);
      setLogs((prevLogs) =>
        prevLogs.map((log) =>
          log._id === logId ? { ...log, userstatus: 'read' } : log
        )
      );
    } catch (error) {
      console.error("Error updating userstatus:", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      {/* Main Content Section */}
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        {/* Title Section */}
        <div className="title flex items-center space-x-2 mb-8 ">
          <Link to="/">
            <GoChevronLeft className="cursor-pointer" />
          </Link>
          <span className="font-semibold">My Notifications</span>
        </div>

        {/* Logs Section */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-gray-500">No notifications available.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Loop through the logs */}
            {logs.map((log) => (
              <div
                key={log._id}
                className={`p-5 rounded-lg shadow-md space-y-3 ${
                  log.userstatus === "unread"
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : "bg-gray-100"
                } transition-all duration-300 transform hover:scale-105 hover:bg-gray-200 cursor-pointer`}
                onClick={() => markAsRead(log._id)} // Trigger markAsRead on click
              >
                {/* Display the heading as the main idea of the message */}
                <p className="font-semibold text-lg text-gray-800">{log.message}</p>

                {/* Display the reply as the summary text of the message */}
                <p className="text-gray-700 bg-blue-100 p-3 rounded-lg shadow-sm">
                  Admin: {log.reply}
                </p>

                {/* Format the updatedAt time (if exists) to IST (Indian Standard Time) */}
                <p className="text-sm text-gray-500 pl-1">
                  {new Date(log.updatedAt) // Use updatedAt if available, otherwise fall back to createdAt
                    .toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata", // IST Time Zone
                      hour12: true,
                      year: "numeric", // Include year
                      month: "long", // Include full month name
                      day: "numeric", // Include day
                      hour: "2-digit", // Include hour
                      minute: "2-digit", // Include minute
                    })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

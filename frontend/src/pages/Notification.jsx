import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Notification() {
  const { user } = useContext(UserContext); // Access user info from context
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error state
  const [hasFetched, setHasFetched] = useState(false); // Prevent refetch on re-render

  useEffect(() => {
    if (user) {
      console.log("User context value:", user); // Log the user object from context
    }

    if (!user || !user._id) {
      setLoading(false);
      return;
    }

    const fetchLogs = async () => {
      if (hasFetched) return; // Prevent duplicate fetches
      setLoading(true);

      try {
        console.log("Fetching logs for userId:", user._id); // Log user._id when fetching logs
        const response = await axios.get(`/contactus/user/${user._id}`);
        const logData = response.data;

        // Log the user-related objId from ContactUs data for comparison
        logData.forEach((log) => {
          console.log(`ContactUs log objId (user reference): ${log.user.objId}, Reply: ${log.reply}`);
        });

        // Filter logs to show only those where user._id matches the log user.objId and reply is not null
        const filteredLogs = logData.filter(
          (log) => log.user.objId.toString() === user._id && log.reply !== null
        );
        console.log("Filtered logs based on matching objId and non-null reply:", filteredLogs);

        setLogs(filteredLogs.reverse());
        setError(null);
        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setError("Failed to fetch logs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user, hasFetched]);

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800">
        <div className="title flex items-center space-x-2 mb-8 dark:text-white">
          <Link to="/">
            <GoChevronLeft className="cursor-pointer" />
          </Link>
          <span className="font-semibold">My Notifications</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-gray-500">No notifications available.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {logs.map((log) => (
              <div
                key={log._id}
                className={`p-5 rounded-lg shadow-md space-y-3 ${
                  log.userstatus === "unread"
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : "bg-gray-100"
                } transition-all duration-300 hover:bg-gray-200`}
              >
                <p className="font-semibold text-lg text-gray-800">{log.message}</p>
                <p className="text-gray-700 bg-blue-100 p-3 rounded-lg shadow-sm">
                  Admin: {log.reply}
                </p>
                <p className="text-sm text-gray-500 pl-1">
                  {new Date(log.updatedAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour12: true,
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
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

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import LogCard from "../components/LogCard";

export default function MarkLeave() {
  const { user } = useContext(UserContext); // Get logged-in user info
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestLog, setLatestLog] = useState(null);
  const [hasLeftRoom, setHasLeftRoom] = useState(false); // Track if user has left
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user || !user.userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/history/get-history?userId=${user.userId}`
        );
        const logData = response.data;
        setLogs(logData);

        // Determine the latest log
        const latest = logData.reduce((latest, log) => {
          if (!latest || new Date(log.entryTime) > new Date(latest.entryTime)) {
            return log;
          }
          return latest;
        }, null);

        setLatestLog(latest);

        // Check if the user has already left the room
        if (latest && latest.exitTime) {
          setHasLeftRoom(true);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user]);

  const handleLeaveNow = async () => {
    if (!user || !user.userId) {
      console.error("User not logged in or missing userId");
      return;
    }

    const currentTime = new Date().toISOString(); // Current timestamp

    try {
      const response = await axios.post("/api/history/update-exit-time", {
        userId: user.userId,
        exitTime: currentTime,
      });

      if (response.data.success) {
        toast.success("Exit time updated successfully!");
        setHasLeftRoom(true); // Mark as left
        navigate("/"); // Redirect user
        // Optionally update the logs
        setLogs((prevLogs) =>
          prevLogs.map((log) =>
            log._id === response.data.updatedHistory._id
              ? { ...log, exitTime: response.data.updatedHistory.exitTime }
              : log
          )
        );
        setLatestLog((prevLog) => ({
          ...prevLog,
          exitTime: response.data.updatedHistory.exitTime,
        }));
      } else {
        toast.error("Failed to update exit time.");
      }
    } catch (error) {
      console.error("Error updating exit time:", error);
    }
  };

  const calculateDuration = (entryTime) => {
    const entryDate = new Date(entryTime);
    const currentDate = new Date();
    const durationMs = currentDate - entryDate;
    const durationMinutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div>
      {/* Title Section */}
      <div className="title flex items-center space-x-2 mb-8 dark:text-white">
        <Link to="/">
          <GoChevronLeft className="cursor-pointer" />
        </Link>
        <span className="font-semibold">Leave</span>
      </div>

      {/* Logs Section */}
      {loading ? (
        <p className="pl-4 text-m text-black-500 dark:text-white"></p>
      ) : !latestLog ? (
        <div className="flex justify-center items-center py-8">
          <p className="pl-4 text-gray-500">You are not in a Room.</p>
        </div>
      ) : (
        <LogCard
          room="Room"
          roomcode={latestLog.doorCode || "Unknown Code"}
          door={latestLog.roomName || "Unknown Room"}
          branch={latestLog.location || "Unknown Location"}
          entryTime={
            latestLog.entryTime
              ? new Date(latestLog.entryTime).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""
          }
          exitTime={
            latestLog.exitTime
              ? new Date(latestLog.exitTime).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Currently In Room"
          }
          duration={
            latestLog.entryTime ? calculateDuration(latestLog.entryTime) : ""
          }
          date={
            latestLog.entryTime
              ? new Date(latestLog.entryTime).toLocaleDateString("en-IN")
              : ""
          }
        />
      )}

      {/* Button Section */}
      <div className="py-3">
        {hasLeftRoom || (latestLog && latestLog.exitTime) ? (
          <p className="text-center text-gray-500">
            You have already left the room.
          </p>
        ) : (
          latestLog &&
          !latestLog.exitTime && ( // Ensure button only appears when exitTime is null or not present
            <button
              onClick={handleLeaveNow}
              type="button"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 mb-2"
            >
              Leave Now
            </button>
          )
        )}
      </div>
    </div>
  );
}
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
  const [hasLeftRoom, setHasLeftRoom] = useState(false); // New state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user || !user.userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/history/get-history?userId=${user.userId}`
        );
        const logData = response.data;
        setLogs(logData);

        // Check if the latest log already has an exitTime
        const latestLog = logData.reduce((latest, log) => {
          if (!latest || new Date(log.entryTime) > new Date(latest.entryTime)) {
            return log;
          }
          return latest;
        }, null);

        if (latestLog && latestLog.exitTime) {
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

  // Find the latest log based on entryTime
  const latestLog = logs.reduce((latest, log) => {
    if (!latest || new Date(log.entryTime) > new Date(latest.entryTime)) {
      return log;
    }
    return latest;
  }, null);

  // Handle Leave Now button click
  const handleLeaveNow = async () => {
    if (!user || !user.userId) {
      console.error("User not logged in or missing userId");
      return;
    }

    const currentTime = new Date().toISOString(); // Get the current timestamp

    try {
      const response = await axios.post("/history/update-exit-time", {
        userId: user.userId,
        exitTime: currentTime,
      });

      if (response.data.success) {
        toast.success("Exit time updated successfully!");
        setHasLeftRoom(true); // Set user as having left the room
        navigate("/");
        // Optionally refresh logs to reflect changes
        setLogs((prevLogs) =>
          prevLogs.map((log) =>
            log._id === response.data.updatedHistory._id
              ? { ...log, exitTime: response.data.updatedHistory.exitTime }
              : log
          )
        );
      } else {
        toast.error("Failed to update exit time.");
      }
    } catch (error) {
      console.error("Error updating exit time:", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600 ">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800">
        {/* Title Section */}
        <div className="title flex items-center space-x-2 mb-8 dark:text-white">
          <Link to="/">
            <GoChevronLeft className="cursor-pointer" />
          </Link>
          <span className="font-semibold">Leave</span>
        </div>
        <div className="text-left ml-4">
          <p className="text-m text-black-500 pb-3 dark:text-white">
            If you want to leave, <span className="font-semibold">Confirm</span>
          </p>
        </div>

        {/* Logs Section */}
        {loading ? (
          <p className="pl-4 text-m text-black-500 dark:text-white">Loading Room Details ...</p>
        ) : !latestLog ? (
          <p className="pl-4 text-m text-black-500"></p>
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
            date={
              latestLog.entryTime
                ? new Date(latestLog.entryTime).toLocaleDateString("en-IN")
                : ""
            }
          />
        )}

        {/* Button Section */}
        <div className="py-3">
          {hasLeftRoom ? (
            <p className="text-center text-gray-500">
              You have already left the room.
            </p>
          ) : (
            <button
              onClick={handleLeaveNow}
              type="button"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 mb-2"
            >
              Leave Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}




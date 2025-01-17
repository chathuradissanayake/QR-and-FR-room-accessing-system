import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import NotUsed from "../assets/notused.png";
import Used from "../assets/used.png";
import LogCard from "../components/LogCard";

export default function MyLogbook() {
  const { user } = useContext(UserContext); // Get logged-in user info
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user || !user.userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/history/get-history?userId=${user.userId}`);
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

  return (
    <div>

        {/* Title Section */}
        <div className="title flex items-center space-x-2 mb-8 dark:text-white">
          <Link to="/">
            <GoChevronLeft className="cursor-pointer" />
          </Link>
          <span className="font-semibold">My LogBook</span>
        </div>

        {/* Logs Section */}
        {loading ? (
          <p className="dark:text-slate-300"></p>
        ) : logs.length === 0 ? (
          <div className="flex justify-center items-center py-8">
          <p className="pl-4 text-gray-500">No log details.</p>
          </div>
        ) : (
          <div className="space-y-4 ">
            {logs.map((log, index) => (
              <LogCard
                key={index}
                room="Room"
                roomcode={log.doorCode || "Unknown Code"}
                door={log.roomName || "Unknown Room"}
                branch={log.location || "Unknown Code"}
                entryTime={
                  log.entryTime
                    ? new Date(log.entryTime).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""
                }
                exitTime={
                  log.exitTime
                    ? new Date(log.exitTime).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""
                    || "Currently In Room"}
                date={
                  log.entryTime
                    ? new Date(log.entryTime).toLocaleDateString("en-IN")
                    : ""
                }
                state={log.entryTime ? Used : NotUsed}
              />
            ))}
          </div>
        )}
      
    </div>
  );
}

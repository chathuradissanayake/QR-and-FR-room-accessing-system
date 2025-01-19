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
  const [searchTerm, setSearchTerm] = useState(""); // State for text search
  const [selectedDate, setSelectedDate] = useState(""); // State for date filter

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

  // Filter logs based on the search term and selected date
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.doorCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.roomName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      selectedDate === "" || // No date filter applied
      (log.entryTime &&
        new Date(log.entryTime).toLocaleDateString("en-CA") === selectedDate); // Match entry date to selected date

    return matchesSearch && matchesDate;
  });

  return (
    <div>
      {/* Title Section */}
      <div className="title flex items-center space-x-2 mb-8 dark:text-white">
        <Link to="/">
          <GoChevronLeft className="cursor-pointer" />
        </Link>
        <span className="font-semibold">My LogBook</span>
      </div>

      {/* Search Section */}
      <div className="mb-4">
        {/* Text Search */}
        <input
          type="text"
          className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:border-gray-600"
          placeholder="Door Code or Room Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Date Picker */}
        
        <input
          type={selectedDate ? "date" : "text"} // Dynamically switch between "text" and "date"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-600"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")} // Switch to "date" on focus
          onBlur={(e) => (e.target.type = selectedDate ? "date" : "text")} // Switch back if no date
          placeholder="Select a date"
        />


      </div>

      {/* Logs Section */}
      {loading ? (
        <p className="dark:text-slate-300">Loading...</p>
      ) : filteredLogs.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <p className="pl-4 text-gray-500">No log details found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLogs.map((log, index) => (
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
                  : "Currently In Room"
              }
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

// MarkLeave.jsx
import React, { useEffect, useState, useContext } from "react";
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NotUsed from "../assets/notused.png";
import Used from "../assets/used.png";
import LogCard from "../components/LogCard";
import { UserContext } from "../../context/userContext";
import { toast } from 'react-hot-toast';


export default function MarkLeave() {
        const { user } = useContext(UserContext); // Get logged-in user info
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
      
        // Handle Leave Now button click
        const handleLeaveNow = async () => {
          if (!user || !user.userId) {
            console.error("User not logged in or missing userId");
            return;
          }
      
          const currentTime = new Date().toISOString(); // Get the current timestamp
      
          try {
            const response = await axios.post('/history/update-exit-time', {
              userId: user.userId,
              exitTime: currentTime,
            });
      
            if (response.data.success) {
            toast.success("Exit time updated successfully!");
            navigate('/');
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
          <div className="flex justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
              {/* Title Section */}
              <div className="title flex items-center space-x-2 mb-8">
                <Link to="/">
                  <GoChevronLeft className="cursor-pointer" />
                </Link>
                <span className="font-semibold">My LogBook</span>
              </div>
              <div className="text-left ml-4">
                <p className="text-m text-black-500">
                  If you want to leave, <span className="font-semibold">Confirm</span>
                </p>
              </div>

              {/* Logs Section */}
              {
              loading ? (
                <p className="pl-4 text-m text-black-500">Loading Room Details ...</p>
              ) : !latestLog ? (
                <p  className="pl-4 text-m text-black-500">You are out of the room.</p>
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
                      : ""
                  || "Currently In Room"}
                  date={
                    latestLog.entryTime
                      ? new Date(latestLog.entryTime).toLocaleDateString("en-IN")
                      : ""
                  }
                />
              )}
              <div className="py-3">
                <button
                  onClick={handleLeaveNow}
                  type="button"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 mb-2"
                >
                  Leave Now
                </button>
              </div>
            </div>
          </div>
        );
      }
      










// // MarkLeave.jsx
// import React, { useState } from 'react';
// import { GoChevronLeft } from "react-icons/go";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function MarkLeave() {
//     const [userId, setUserId] = useState(''); // State to hold user ID
//     const navigate = useNavigate();

//     // Handle user ID input change
//     const handleInputChange = (e) => {
//         setUserId(e.target.value);
//     };

//     // Handle confirmation
//     const handleConfirm = async () => {
//         if (userId.trim() === '') {
//             alert('Please enter your User ID');
//             return;
//         }

//         try {
//             // Send user ID to the backend
//             const response = await axios.post('/leave/mark', { userId });

//             if (response.status === 200) {
//                 alert('Leave confirmed successfully');

//                 // Get the UTC time of the leave from the response
//                 const utcLeaveTime = response.data.leaveTime; // Ensure your backend sends this field

//                 // Navigate to SuccessLeave page with leaveTime
//                 navigate('/successleave', { state: { leaveTime: utcLeaveTime } });
//             } else {
//                 alert('Error confirming leave');
//             }
//         } catch (error) {
//             console.error('Error confirming leave:', error);
//             alert('Error confirming leave');
//         }
//     };

//     return (
//         <div className="flex justify-center min-h-screen bg-gray-50">
//             <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
//                 <div className="title flex items-center space-x-2 mb-8">
//                     <Link to="/">
//                         <GoChevronLeft className="cursor-pointer" />
//                     </Link>
//                     <span className='font-semibold'>Leave</span>
//                 </div>

//                 <div>
//                     <h3 className="text-sm text-blue-500 mb-3 ml-4">Do you want to leave?</h3>
//                 </div>

//                 <div className="text-left ml-4">
//                     <p className="text-sm text-black-500">
//                         If you want to leave, <span className="font-semibold">Confirm</span>
//                     </p>
//                     <p className="text-sm text-black-500 mb-6">
//                         Otherwise <span className="font-semibold">Cancel</span>
//                     </p>
//                 </div>

//                 {/* User ID Input */}
//                 <div className="mb-4 ml-4">
//                     <label htmlFor="userId" className="block text-sm text-gray-700">User ID</label>
//                     <input
//                         id="userId"
//                         type="text"
//                         value={userId}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                         placeholder="Enter your User ID"
//                     />
//                 </div>

//                 {/* Buttons */}
//                 <div className="ml-3">
//                     <button
//                         onClick={handleConfirm}
//                         type="button"
//                         className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 mb-2"
//                     >
//                         Confirm
//                     </button>

//                     <button
//                         onClick={() => navigate('/')} // Navigate to home page on cancel
//                         type="button"
//                         className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-300"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Toaster } from 'react-hot-toast';
import { GoChevronLeft } from "react-icons/go";
import { Link } from 'react-router-dom';
import ApprovedPermissionCard from "../components/ApprovedPermissionCard";
import DeniedPermissionCard from "../components/DeniedPermissionCard";
import PendingPermissionCard from "../components/PendingPermissionCard";
import { UserContext } from "../../context/userContext";

const MyPermissions = () => {
  const { user } = useContext(UserContext);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Pending");

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("/permission/my-requests", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (response.status === 200) {
          setPermissions(response.data);
        } else {
          setError("Failed to fetch permissions. Please try again later.");
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("An error occurred while fetching permissions.");
        console.error("Error fetching permissions:", err);
      }
    };

    fetchPermissions();
  }, []);

  const handleDelete = (id) => {
    setPermissions(permissions.filter((permission) => permission._id !== id));
  };

  // Filter permissions based on active tab
  const filteredPermissions = permissions.filter((permission) => {
    if (activeTab === "Approved") return permission.status === "Approved"; // Filter by "Approved" status for Denied tab
    if (activeTab === "Pending") return permission.status === "Pending"; // Filter by "Pending" status for Denied tab
    if (activeTab === "Denied") return permission.status === "Rejected"; // Filter by "Rejected" status for Denied tab
    return false;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-slate-800">
        <p className="text-gray-500 dark:text-slate-200 text-lg">Loading your permissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600 ">
    
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800">
        <div className="title flex items-center space-x-2 mb-8 dark:text-white">
          <Link to="/">
            <GoChevronLeft className="cursor-pointer" />
          </Link>
          <span className='font-semibold'>My Permissions</span>
        </div>

      {/* Tabs */}
      <div className="flex justify-center  mb-6">
        {["Approved", "Pending", "Denied"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-6 text-sm font-medium ${
              activeTab === tab
                ? "text-blue-500 border-b-2 border-blue-500 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-500"
            } focus:outline-none`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Permissions Container */}
      <div className="w-full max-w-md mx-auto  space-y-6">
        {filteredPermissions.length === 0 ? (
          <div className="text-center text-gray-500">
            No {activeTab.toLowerCase()} permissions.
          </div>
        ) : (
          filteredPermissions.map((permission) => {
            if (activeTab === "Approved") {
              return (
                <ApprovedPermissionCard
                  key={permission._id}
                  permission={permission}
                />
              );
            } else if (activeTab === "Pending") {
              return (
                <PendingPermissionCard
                  key={permission._id}
                  permission={permission}
                  onDelete={handleDelete}
                />
              );
            } else if (activeTab === "Denied") {
              return (
                <DeniedPermissionCard
                  key={permission._id}
                  permission={permission}
                />
              );
            }
            return null;
          })
        )}
      </div>
    </div>
    </div>
  );
};

export default MyPermissions;
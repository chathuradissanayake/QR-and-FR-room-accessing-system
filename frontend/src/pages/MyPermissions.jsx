import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router-dom";

const MyPermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/permissions", {
          withCredentials: true,
        });
        if (response.status === 200) {
          if (response.data.length === 0) {
            setPermissions([]);
          } else {
            setPermissions(response.data);
          }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading your permissions...</p>
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

  if (permissions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">You have no permissions yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 py-10 px-6 md:px-16">
      {/* Title Section */}
      <div className="flex items-center space-x-2 mb-8 w-full max-w-md mx-auto">
        <Link to="/" className="flex items-center">
          <GoChevronLeft className="text-gray-600 cursor-pointer" />
        </Link>
        <h1 className="font-semibold text-m text-gray-900">My Permissions</h1>
      </div>

      {/* Permissions Container */}
      <div className="w-full max-w-md mx-auto space-y-6">
        {permissions.map((permission) => (
          <div
          key={permission._id}
          className="bg-yellow-50 shadow rounded-lg pt-3 pb-3 pl-5 pr-5  " // Change bg-white to bg-yellow-200
        >
            {/* Room Details */}
            <div>
              <h3 className="text-m font-bold text-gray-800">
                {permission.room}
              </h3>
              <p className="text-sm text-gray-500">{permission.roomcode}</p>
            </div>

            {/* Permission Details */}
            <div className="mt-4">
              {[
                { label: "Door", value: permission.door || "N/A" },
                { label: "Branch", value: permission.branch || "Colombo" },
                { label: "In Time", value: permission.intime || "N/A" },
                { label: "Out Time", value: permission.outtime || "N/A" },
                {
                  label: "Date",
                  value: permission.date
                    ? new Date(permission.date).toLocaleDateString()
                    : "N/A",
                },
              ].map((detail, index) => (
                <div
                  key={index}
                  className="flex justify-between w-full text-sm text-gray-700 mt-2"
                >
                  <span className="font-semibold text-gray-600">
                    {detail.label}
                  </span>
                  <span>{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPermissions;

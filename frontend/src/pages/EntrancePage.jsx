import React, { useState, useEffect, useContext } from "react";
import { FaQrcode, FaLock } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { Link } from 'react-router-dom';
import axios from 'axios';
import QRScanner from "../components/QRScanner";
import FaceScanner from "../components/FaceScanner"; // Assuming you have a FaceScanner component
import { UserContextProvider, UserContext } from '../../context/userContext';

const EntrancePage = () => {
  const { user } = useContext(UserContext); // Get the logged-in user's information
  const [doorCode, setDoorCode] = useState('');  // State to hold the scanned QR code data
  const [doorName, setDoorName] = useState('');  // State to hold the fetched door name
  const [scanning, setScanning] = useState(false); // State to control scanning
  const [hasAccess, setHasAccess] = useState(false); // State to check user access

  useEffect(() => {
    return () => {
      // Cleanup function to reset state when component is unmounted
      setDoorCode('');
      setDoorName('');
      setScanning(false);
      setHasAccess(false);
    };
  }, []);

  const handleScanSuccess = async (code) => {
    console.log('QR code scanned:', code);
    setDoorCode(code);
    setScanning(false); // Stop scanning

    try {
      console.log('Fetching door details for code:', code);
      const response = await axios.get(`/door/${code}`, {
        withCredentials: true,
      });
      const door = response.data;
      console.log('Door details fetched:', door);
      setDoorName(door.roomName); // Update state with fetched door name

      // Check if the user has access to the door
      console.log('Checking access for user ID:', user._id);
      const userHasAccess = door.approvedUsers.some(approvedUser => approvedUser._id === user._id);
      setHasAccess(userHasAccess);

      if (userHasAccess) {
        console.log('User has access to the door');
      } else {
        console.log('User does not have access to the door');
      }
    } catch (error) {
      console.error('Error fetching door details:', error);
    }
  };

  const startScanning = () => {
    setDoorCode('');
    setDoorName('');
    setHasAccess(false);
    setScanning(true); // Start scanning
  };

  return (
    <UserContextProvider>
      <div className="flex justify-center min-h-screen h-max bg-gray-50">
        <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
          <div className="title flex items-center space-x-2 mb-8">
            <Link to="/">
              <GoChevronLeft className="cursor-pointer" />
            </Link>
            <span className='font-semibold'>Scan QR</span>
          </div>

          {/* QR Code Scanner */}
          <QRScanner scanning={scanning} onScanSuccess={handleScanSuccess} />

          <div className="mt-4 text-center mb-4">
            {doorCode ? (
              <p className="text-green-600 font-medium">QR code Scanned Successfully</p>
            ) : (
              <p className="text-gray-500">Point the camera at a QR code</p>
            )}
            {doorName && (
              <p className="text-blue-600 font-medium">Room Name: {doorName}</p>
            )}
            {doorName && (
              <p className={`font-medium ${hasAccess ? 'text-green-600' : 'text-red-600'}`}>
                {hasAccess ? 'Access Granted' : 'Access Denied'}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <button 
              onClick={startScanning}
              disabled={scanning} // Disable the button while scanning
              className={`${
                scanning ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              } text-white font-sans py-1 rounded-full mb-2 w-40 flex justify-between pl-10 pr-5`}
            >
              <span>Scan QR</span>
              <FaQrcode className="mt-1" />
            </button>
          </div>
          <div className="flex justify-center">
            <button
              disabled={!hasAccess} // Disable the button if access is not granted
              className={`${
                hasAccess ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
              } text-white font-sans py-1 rounded-full mb-2 w-40 flex justify-between pl-10 pr-5`}
            >
              <span>Face Scan</span>
              <FaLock className="mt-1" />
            </button>
          </div>
        </div>
      </div>
    </UserContextProvider>
  );
};

export default EntrancePage;
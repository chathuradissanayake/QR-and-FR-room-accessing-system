import React, { useState, useEffect, useContext } from "react";
import { FaQrcode, FaLock } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRScanner from "../components/QRScanner";
import { UserContextProvider, UserContext } from '../../context/userContext';
import FaceScanner from "../components/FaceScanner";

const EntrancePage = () => {
  const { user } = useContext(UserContext);
  const [doorCode, setDoorCode] = useState('');
  const [doorName, setDoorName] = useState('');
  const [scanning, setScanning] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [showFaceScan, setShowFaceScan] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false); // State to track face verification

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setDoorCode('');
      setDoorName('');
      setScanning(false);
      setHasAccess(false);
      setShowFaceScan(false);
      setFaceVerified(false);
    };
  }, []);

  const handleScanSuccess = async (code) => {
    setDoorCode(code);
    setScanning(false);

    try {
      const response = await axios.get(`/door/${code}`, { withCredentials: true });
      const door = response.data;
      setDoorName(door.roomName);
      const userHasAccess = door.approvedUsers.some((approvedUser) => approvedUser._id === user._id);
      setHasAccess(userHasAccess);

      if (!userHasAccess) {
        alert('Access Denied');
      }
    } catch (error) {
      console.error('Error fetching door details:', error);
    }
  };

  const handleFaceVerificationSuccess = () => {
    setShowFaceScan(false); // Hide FaceScanner
    setFaceVerified(true); // Enable Unlock Door button
  };

  const startScanning = () => {
    setDoorCode('');
    setDoorName('');
    setHasAccess(false);
    setScanning(true);
  };

  return (
    <UserContextProvider>
      <div className="flex justify-center min-h-screen h-max bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
          <div className="flex items-center mb-8 space-x-2 title">
            <Link to="/">
              <GoChevronLeft className="cursor-pointer" />
            </Link>
            <span className='font-semibold'>Scan QR</span>
          </div>

          {!showFaceScan ? (
            <>
              <QRScanner scanning={scanning} onScanSuccess={handleScanSuccess} />

              <div className="mt-4 mb-4 text-center">
                {doorCode && <p className="font-medium text-green-600">QR Code Scanned Successfully</p>}
                {doorName && <p className="font-medium text-blue-600">Room Name: {doorName}</p>}
                {doorName && (
                  <p className={`font-medium ${hasAccess ? 'text-green-600' : 'text-red-600'}`}>
                    {hasAccess ? 'Access Granted' : 'Access Denied'}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={startScanning}
                  disabled={scanning}
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
                  onClick={() => setShowFaceScan(true)}
                  disabled={!hasAccess}
                  className={`${
                    hasAccess ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
                  } text-white font-sans py-1 rounded-full mb-2 w-40 flex justify-between pl-10 pr-5`}
                >
                  <span>Face Scan</span>
                  <FaLock className="mt-1" />
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/')}
                  disabled={!faceVerified}
                  className={`${
                    faceVerified ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
                  } text-white font-sans py-1 rounded-full mb-2 w-40`}
                >
                  Unlock Door
                </button>
              </div>
            </>
          ) : (
            <FaceScanner onSuccess={handleFaceVerificationSuccess} />
          )}
        </div>
      </div>
    </UserContextProvider>
  );
};

export default EntrancePage;

import axios from "axios";
import mqtt from "mqtt";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaLock, FaQrcode } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import FaceScanner from "../components/FaceScanner";
import QRScanner from "../components/QRScanner";

const EntrancePage = () => {
  const { user } = useContext(UserContext); // Access user from context
  const [doorCode, setDoorCode] = useState("");
  const [location, setlocation] = useState("");
  const [roomName, setroomName] = useState("");
  const [doorName, setDoorName] = useState("");
  const [scanning, setScanning] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [showFaceScan, setShowFaceScan] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [scanEnabled, setScanEnabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Reset state on unmount
    return () => {
      setDoorCode("");
      setDoorName("");
      setlocation("");
      setroomName("");
      setScanning(false);
      setHasAccess(false);
      setShowFaceScan(false);
      setFaceVerified(false);
    };
  }, []);

  useEffect(() => {
    // Set up MQTT connection
    const mqttClient = mqtt.connect(import.meta.env.VITE_MQTT_URL, {
      clientId: `mqttjs_${Math.random().toString(16).slice(2, 10)}`,
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      setIsConnected(true);
    });

    mqttClient.on("error", (err) => {
      console.error("Connection error: ", err);
    });

    setClient(mqttClient);

    // Cleanup on component unmount
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  useEffect(() => {
    // Check inTime validity
    if (user && user.doorAccess) {
      const now = new Date();

      const isValidAccess = user.doorAccess.some((access) => {
        if (!access.inTime || !access.date) return false;

        const accessDate = new Date(access.date);
        const inTime = new Date(`${accessDate.toDateString()} ${access.inTime}`);

        const diffMinutes = Math.abs((inTime - now) / (1000 * 60)); // Difference in minutes
        return diffMinutes <= 30 && now.toDateString() === accessDate.toDateString(); // Within 30 minutes and same day
      });

      setScanEnabled(isValidAccess);
    }
  }, [user]);

  const handleScanSuccess = async (code) => {
    setDoorCode(code);
    setScanning(false);

    try {
      const response = await axios.get(`/api/door/${code}`, { withCredentials: true });
      const door = response.data;
      setDoorName(door.doorCode);
      setlocation(door.location);
      setroomName(door.roomName);
      const userHasAccess = door.approvedUsers.some(
        (approvedUser) => approvedUser._id === user._id
      );
      setHasAccess(userHasAccess);

      if (!userHasAccess) {
        toast.error("Access Denied");
      }
    } catch (error) {
      console.error("Error fetching door details:", error);
    }
  };

  const handleFaceVerificationSuccess = () => {
    setShowFaceScan(false);
    setFaceVerified(true);
  };

  const handleUnlockDoor = async () => {
    if (!doorCode) {
      toast.error("No door code available. Please scan a QR code first.");
      return;
    }

    if (isConnected) {
      const topic = "door/access";
      const message = JSON.stringify({ action: "unlock" });
      client.publish(topic, message, { qos: 0 }, (error) => {
        if (error) {
          console.error("Publish error: ", error);
        } else {
          console.log("Message published:", message);
          navigate("/");
        }
      });
    } else {
      console.log("MQTT client is not connected");
    }

    const createdAt = new Date().toISOString();

    try {
      const response = await axios.post("/api/history/add-history", {
        doorCode,
        createdAt,
        location,
        roomName,
        userId: user.userId,
      });

      if (response.status === 201) {
        toast.success("You can enter now!");
        navigate("/");
      } else {
        toast.error("Failed to unlock door or save history.");
      }
    } catch (error) {
      console.error("Error saving to history:", error);
      toast.error("An error occurred while unlocking the door.");
    }
  };

  const startScanning = () => {
    setDoorCode("");
    setDoorName("");
    setlocation("");
    setroomName("");
    setHasAccess(false);
    setScanning(true);
  };

  return (
    <div>
        <div className="title flex items-center space-x-2 mb-8 dark:text-white">
          <Link to="/">
            <GoChevronLeft className="cursor-pointer" />
          </Link>
          <span className="font-semibold">Go In</span>
        </div>

        {!showFaceScan ? (
          <>
            <QRScanner scanning={scanning} onScanSuccess={handleScanSuccess} className="w-full max-w-md p-8" />

            <div className="mt-4 mb-4 text-center">
              {doorCode && <p className="font-medium text-green-600">QR Code Scanned Successfully</p>}
              {doorName && <p className="font-medium text-blue-600">Room Name: {doorName}</p>}
              {doorName && (
                <p className={`font-medium ${hasAccess ? "text-green-600" : "text-red-600"}`}>
                  {hasAccess ? "Access Granted" : "Access Denied"}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={startScanning}
                disabled={!scanEnabled || scanning}
                className={`${
                  scanning || !scanEnabled ? "bg-gray-300 dark:bg-slate-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
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
                  hasAccess ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300 dark:bg-slate-600 cursor-not-allowed"
                } text-white font-sans py-1 rounded-full mb-2 w-40 flex justify-between pl-10 pr-5`}
              >
                <span>Scan Face</span>
                <FaLock className="mt-1" />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleUnlockDoor}
                disabled={!faceVerified || !isConnected}
                className={`${
                  faceVerified ? "bg-green-500 hover:bg-green-700" : "bg-gray-300 dark:bg-slate-600 cursor-not-allowed"
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
  );
};

export default EntrancePage;

import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/userContext";

const FaceRegistration = () => {
    const { user, setUser } = useContext(UserContext);
    const [nic, setNic] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(null);
    const [registrationCount, setRegistrationCount] = useState(0);
    const [isIOS, setIsIOS] = useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const loc = import.meta.env.VITE_LOC || "guest";

    useEffect(() => {
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
        
        if (user) {
            setNic(user.userId);
            console.log("User ID set:", user.userId);
            fetchFaceCount(user.userId);
        }
    }, [user]);

    const fetchFaceCount = async (userId) => {
        try {
            const encodedUserId = encodeURIComponent(userId);
            const response = await axios.get(`/api/user/face-count/${encodedUserId}`);
            setRegistrationCount(response.data.faceCount);
            if (response.data.faceCount >= 5) {
                setMessage('Your registration is complete.');
                setResult({ msg: 'Registration completed' });
            } else {
                setMessage('Register your face with different looks.');
                setResult({ msg: 'Camera started' });
            }
        } catch (error) {
            console.error('Error fetching face count:', error);
        }
    };

    const startCamera = async () => {
        try {
            const constraints = {
                video: {
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.setAttribute('playsinline', 'true');
                await videoRef.current.play();
                console.log("Camera started successfully");
            }
            setMessage('Register your face with different looks.');
            setResult({ msg: 'Camera started' });
        } catch (error) {
            console.error("Error accessing camera:", error);
            setMessage("Unable to access the camera.");
        }
    };

    const captureImage = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;
            
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
            
            canvas.toBlob((blob) => {
                setImage(blob);
                const imageUrl = URL.createObjectURL(blob);
                setImagePreview(imageUrl);
                
                if (videoRef.current && videoRef.current.srcObject) {
                    const tracks = videoRef.current.srcObject.getTracks();
                    tracks.forEach(track => track.stop());
                }
            }, 'image/jpeg', 0.8);
        }
    };

    const recaptureImage = () => {
        setImage(null);
        setImagePreview(null);
        startCamera();
        console.log("Image recapture initiated");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nic || !image) {
            setMessage('Please provide User ID and capture an image.');
            console.warn("Missing User ID or image");
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        const headers = {
            'api': import.meta.env.VITE_API,
            'user': import.meta.env.VITE_USER,
            'nic': user.userId,
            'loc': loc,
        };

        console.log("Submitting form data with headers:", headers);

        try {
            const response = await fetch('https://ientrada.raccoon-ai.io/api/register_face', {
                method: 'POST',
                headers: headers,
                body: formData,
            });

            if (response.ok) {
                const resultData = await response.json();
                setResult(resultData);
                console.log("Response received:", resultData);

                if (resultData.msg === "Registration Success") {
                    const newCount = Math.min(registrationCount + 1, 5);
                    setRegistrationCount(newCount);
                    await axios.post('/api/user/update-face-count', {
                        userId: user.userId,
                        faceCount: newCount
                    });
                    setUser((prevUser) => ({ ...prevUser, faceCount: newCount }));
                    
                    if (newCount >= 5) {
                        setMessage('Your registration is complete.');
                        setResult({ msg: 'Registration completed' });
                    } else {
                        setMessage('Register your face with different looks.');
                    }
                }

                if (resultData.msg === "Maximum times registered") {
                    setRegistrationCount(5);
                    await axios.post('/api/user/update-face-count', {
                        userId: user.userId,
                        faceCount: 5
                    });
                    setUser((prevUser) => ({ ...prevUser, faceCount: 5 }));
                    setMessage('Your registration is complete.');
                }

                setMessage(resultData.msg);
            } else {
                setMessage('Failed to upload image');
                console.error('Error uploading image:', response.statusText);
            }
        } catch (error) {
            setMessage('Error uploading image');
            console.error('Error:', error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div >
            <div className="title flex items-center space-x-2 mb-8 dark:text-white">
                <Link to="/profile">
                    <GoChevronLeft className="cursor-pointer" />
                </Link>
                <span className="font-semibold">Face Registration</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="nic" className="block text-gray-600 mb-1 dark:text-slate-200">
                        User ID
                    </label>
                    <input
                        type="text"
                        id="nic"
                        value={user.userId}
                        readOnly
                        className="border rounded px-2 py-1 w-full bg-gray-100 dark:bg-slate-700 dark:text-slate-100"
                    />
                </div>

                <div className="space-y-4">
                    <div className="relative w-full aspect-[1/1] bg-gray-200 dark:bg-slate-600 rounded-lg">
                        {imagePreview ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={imagePreview}
                                    alt="Captured"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>
                        ) : (
                            <video
                                ref={videoRef}
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                autoPlay
                                playsInline
                                muted
                            />
                        )}
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                    
                    <div className={`grid ${!imagePreview ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
                        {!imagePreview ? (
                            <>
                                <button
                                    type="button"
                                    onClick={startCamera}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Start Camera
                                </button>
                                <button
                                    type="button"
                                    onClick={captureImage}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Capture Image
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={recaptureImage}
                                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Recapture
                            </button>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={registrationCount >= 5}
                >
                    Submit
                </button>
            </form>

            {result && (
                <div className="mt-6 p-4 shadow-md rounded-lg bg-white dark:bg-slate-800 border">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            {registrationCount > 0 && (result.msg === "Camera started" || result.msg === "Registration Success" || result.msg === "Registration completed") && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-green-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 000-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h3
                                className={`text-lg font-semibold ${
                                    (result.msg === "Camera started" || result.msg === "Registration Success" || result.msg === "Registration completed") &&
                                    (registrationCount > 0 ? "text-green-600" : "text-green-600")
                                }`}
                            >
                                {result.msg === "Camera started" || result.msg === "Registration Success" || result.msg === "Registration completed"
                                    ? (registrationCount > 0 ? "Registration Success" : "Ready to Register")
                                    : "Cannot Register"}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {result.msg}
                            </p>
                            {(result.msg === "Registration Success" ||
                            result.msg === "Maximum times registered" ||
                            result.msg === "Camera started" ||
                            result.msg === "Registration completed") && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Registration Count: {registrationCount}/5
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FaceRegistration;
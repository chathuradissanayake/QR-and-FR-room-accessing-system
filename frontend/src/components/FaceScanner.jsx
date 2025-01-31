import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { UserContext } from "../../context/userContext";

const FaceScanner = ({ onSuccess }) => {
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [isIOS, setIsIOS] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        // Detect iOS device
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

        if (user) {
            console.log("User Context Values:", user);
        }

        startCamera();

        // Cleanup function
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [user]);

    useEffect(() => {
        const verificationLoop = setInterval(() => {
            captureAndVerifyImage();
        }, 2000);

        return () => {
            clearInterval(verificationLoop);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

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
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.setAttribute('playsinline', 'true'); // Important for iOS
                await videoRef.current.play();
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            setMessage("Unable to access the camera.");
            // toast.error("Unable to access the camera.");
        }
    };

    const captureAndVerifyImage = async () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;

            // Set canvas dimensions to match video dimensions
            canvas.width = videoWidth;
            canvas.height = videoHeight;

            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('image', blob);

                const headers = {
                    'api': import.meta.env.VITE_API,
                    'user': import.meta.env.VITE_USER,
                    'other': import.meta.env.VITE_OTHER,
                };

                try {
                    const response = await fetch('https://ientrada.raccoon-ai.io/api/verify_face', {
                        method: 'POST',
                        headers: headers,
                        body: formData,
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log(result);

                        if (result.user === user.userId) {
                            console.log('User Verified');
                            toast.success('Face verified successfully!');

                            if (onSuccess) {
                                onSuccess();
                            }
                        } else {
                            console.error('Access Denied: User ID does not match');
                            toast.error('Access Denied: User ID does not match');
                        }
                    } else {
                        console.error('Verification failed:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    toast.error('Error during verification');
                }
            }, 'image/jpeg', 0.8);
        }
    };

    return (
        <div className="flex justify-center min-h-screen">
            <div className="w-full max-w-md p-8">
                <h3 className="text-2xl font-bold text-red-600 bg-yellow-100 p-4 border-l-4 border-red-600 rounded shadow-md mb-4">
                    Please Wait! Verifying your identity...
                </h3>

                <div className="relative w-full aspect-[1/1] bg-gray-200 rounded-lg overflow-hidden">
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        playsInline
                        muted
                    />
                </div>

                <canvas ref={canvasRef} className="hidden" />

            </div>
        </div>
    );
};

export default FaceScanner;
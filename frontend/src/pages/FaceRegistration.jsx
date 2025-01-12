import React, { useContext, useEffect, useRef, useState } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/userContext";

const FaceRegistration = () => {
    const { user } = useContext(UserContext);
    const [nic, setNic] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(null);
    const [registrationCount, setRegistrationCount] = useState(0); // For tracking successful registrations

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const loc = import.meta.env.VITE_LOC || "guest";

    useEffect(() => {
        if (user) {
            setNic(user.userId);
            console.log("User ID set:", user.userId);
        }
    }, [user]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                console.log("Camera started successfully");
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            setMessage("Unable to access the camera.");
        }
    };

    const captureImage = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                setImage(blob);
                const imageUrl = URL.createObjectURL(blob);
                setImagePreview(imageUrl);
                console.log("Image captured and set for preview");
            }, 'image/jpeg');
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

                // Update count only if "Registration Success"
                if (resultData.msg === "Registration Success") {
                    setRegistrationCount((prevCount) => Math.min(prevCount + 1, 5));
                    console.log("Registration count updated:", registrationCount + 1);
                }

                // Handle "Maximum times registered"
                if (resultData.msg === "Maximum times registered") {
                    setRegistrationCount(5); // Set count to 5/5
                    console.log("Maximum registrations reached, count set to 5/5");
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

    return (
        <div>

                <div className="title flex items-center space-x-2 mb-8 dark:text-white">
                    <Link to="/profile">
                        <GoChevronLeft className="cursor-pointer" />
                    </Link>
                    <span className="font-semibold">Face Registration</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nic" className="block text-gray-600 mb-1 dark:text-slate-200">User ID</label>
                        <input
                            type="text"
                            id="nic"
                            value={user.userId}
                            readOnly
                            className="border rounded px-2 py-1 w-full bg-gray-100 dark:bg-slate-700 dark:text-slate-100"
                        />
                    </div>

                    <div className="my-4">
                        <div className="relative w-full h-80 bg-gray-200 dark:bg-slate-600 rounded">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Captured"
                                    className="w-full h-full object-cover rounded"
                                />
                            ) : (
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover rounded"
                                    autoPlay
                                    muted
                                />
                            )}
                        </div>
                        <canvas ref={canvasRef} className="hidden" width={640} height={480}></canvas>
                        {!imagePreview ? (
                            <div className='flex justify-between'>
                                <button
                                    type="button"
                                    onClick={startCamera}
                                    className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Start Camera
                                </button>
                                <button
                                    type="button"
                                    onClick={captureImage}
                                    className="w-full mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Capture Image
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={recaptureImage}
                                className="w-full mt-2 px-4 py-2 bg-orange-500 text-white rounded"
                            >
                                Recapture
                            </button>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {result && (
                <div className='mt-4 text-center text-green-500'>
                    {/* <h3>API Response:</h3> */}
                    <pre>{JSON.stringify(result.msg, null, 2)}</pre>
                </div>
            )}
            
        </div>
    );
};

export default FaceRegistration;

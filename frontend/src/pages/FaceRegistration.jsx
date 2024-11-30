import React, { useRef, useState } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link } from 'react-router-dom';

const FaceRegistration = () => {
    const [nic, setNic] = useState('');
    const [loc, setLoc] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [result, setResult] = useState(null); 

    const handleNicChange = (e) => {
        setNic(e.target.value);
    };

    const handleLocChange = (e) => {
        setLoc(e.target.value);
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
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
                setImage(blob); // Set captured image as a Blob
                const imageUrl = URL.createObjectURL(blob);
                setImagePreview(imageUrl); // Create a preview URL for the image
            }, 'image/jpeg');
        }
    };

    const recaptureImage = () => {
        setImage(null);
        setImagePreview(null);
        startCamera(); // Restart the camera
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if both NIC, loc, and image are provided
        if (!nic || !loc || !image) {
            setMessage('Please provide User ID, Role, and capture an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        const headers = {
            'api': import.meta.env.VITE_API,
            'user': import.meta.env.VITE_USER,
            'nic': nic,
            'loc': loc,
        };

        try {
            const response = await fetch('https://ientrada.raccoon-ai.io/api/register_face', {
                method: 'POST',
                headers: headers,
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Image uploaded successfully');
                setResult(result);
                console.log(result);
            } else {
                setMessage('Failed to upload image');
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            setMessage('Error uploading image');
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

                <div className="title flex items-center space-x-2 mb-8">
                    <Link to="/profile">
                        <GoChevronLeft className="cursor-pointer" />
                    </Link>
                    <span className="font-semibold">Face Registration</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nic">User ID</label>
                        <input
                            type="text"
                            id="nic"
                            value={nic}
                            onChange={handleNicChange}
                            required
                            className="border rounded px-2 py-1 w-full"
                            placeholder='InSP/YYYY/XX/ZZZ'
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="loc">Role</label>
                        <select
                            id="loc"
                            value={loc}
                            onChange={handleLocChange}
                            required
                            className="border rounded mb-6 px-2 py-1 w-full"
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            <option value="guest">Guest</option>
                            <option value="intern">Intern</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    <div className="my-4">
                        <div className="relative w-full h-80 bg-gray-200 rounded">
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
                {message && <p className="mt-4 text-center text-blue-500">{message}</p>}
                {result && (
                <div className='mt-4 text-center text-green-500'>
                    {/* <h3>API Response:</h3> */}
                    <pre>{JSON.stringify(result.msg, null, 2)}</pre>
                </div>
            )}
            </div>
        </div>
    );
};

export default FaceRegistration;

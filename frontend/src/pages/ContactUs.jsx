import axios from 'axios';
import React, { useContext, useState } from "react";
import { toast } from 'react-hot-toast';
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/userContext";

const ContactUs = () => {
  const { user } = useContext(UserContext); // Access the logged-in user from UserContext
  const navigate = useNavigate();

  // Initialize state with the logged-in user's userId
  const [data, setData] = useState({
    message: '',
    userId: user?.userId || '', // Use the userId from context
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('message:', data.message);

    // Destructuring data
    const { message, userId } = data;

    try {
      const { data: response } = await axios.post('/contactus/messages', {
        userId,
        message,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          message: '',
          userId: user?.userId || '', // Reset userId after submission
        });
        toast.success('Message sent successfully');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600 ">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800">
        <div className="title flex items-center space-x-2 mb-8 dark:text-white">
          <GoChevronLeft className="cursor-pointer" onClick={handleBackNavigation} />
          <span className="font-semibold">Contact us</span>
        </div>

        <div className="ml-4">
          <p className="text-gray-600 mb-4 text-sm dark:text-slate-200">
            We are here to help! If you have any questions, concerns, or feedback, please reach out to our customer care team. Your satisfaction is our priority.
          </p>

          <h2 className="text-lg font-semibold text-gray-800 mb-3 dark:text-slate-100">Contact Information</h2>
          <ul className="list-disc list-inside text-gray-600 mb-6 dark:text-slate-200 text-sm">
            <li><strong>Email:</strong> <a href="support@sltmobitel.com" className="text-blue-500 underline">support@sltmobitel.com</a></li>
            <li><strong>Phone:</strong> +94 11 32321313</li>
            <li><strong>Address:</strong> SLT Mobitel, Lotus Road, Colombo 1</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mb-6 dark:text-slate-100">Support Hours</h2>
          <p className="text-gray-600 mb-6 text-sm dark:text-slate-200">
            <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (PST)
            <br />
            <strong>Saturday:</strong> 10:00 AM - 12:00 PM (PST)
            <br />
          </p>

          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-3">Feedback</h2>
          <p className="text-gray-600 mb-4 text-sm dark:text-slate-200">We value your feedback! Please let us know how we can improve your experience.</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="userId" className="sr-only">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                placeholder="InSP/2020/XXX/ZZZ"
                value={data.userId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-600 dark:text-slate-100"
                required
                readOnly // Prevent editing since it's automatically filled
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                value={data.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-600 dark:text-slate-100"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

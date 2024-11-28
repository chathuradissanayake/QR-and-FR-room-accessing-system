import axios from 'axios';
import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';



const ContactUs = () => {

  const [data, setData] = useState({
    message: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('message:', data.message);

    // Destructuring data
    const { message } = data;

    try {
      const { data: response } = await axios.post('/contactus', {
        message,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          message: '',
        });
        toast.success('Message sent successfully');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

return (
  <div className="flex justify-center min-h-screen bg-gray-50">
  <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

  
  <div className="title flex items-center space-x-2 mb-8">
  
  <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
  
      <span className='font-semibold'>Contact Us</span>
  </div>

      <div className="ml-4">
      <p className="text-gray-600 mb-4 text-sm">
        We are here to help! If you have any questions, concerns, or feedback, please reach out to our customer care team. Your satisfaction is our priority.
      </p>

      <h2 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h2>
      <ul className="list-disc list-inside text-gray-600 mb-6 text-sm">
        <li><strong>Email:</strong> <a href="mailto:support@sltmobitel.com" className="text-blue-500 underline">support@sltmobitel.com</a></li>
        <li><strong>Phone:</strong> +94 11 32321313</li>
        <li><strong>Address:</strong> SLT mobitel, Lotus Road, Colombo 1</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 mb-6">Support Hours</h2>
      <p className="text-gray-600 mb-6 text-sm">
        <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (PST)
        <br />
        <strong>Saturday:</strong> 10:00 AM - 12:00 PM (PST)
        <br />
        
      </p>

      <h2 className="text-lg font-semibold text-gray-800 mb-3">Feedback</h2>
      <p className="text-gray-600 mb-4 text-sm">We value your feedback! Please let us know how we can improve your experience.</p>

     {/* Form */}
     <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="sr-only">
            Name
          </label>
          <textarea
            type="text"
            id="message"
            name="message"
            placeholder="Message"
            value={data.message}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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








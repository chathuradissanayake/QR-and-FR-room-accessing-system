import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const navigate = useNavigate();
  const handleBackNavigation = () => {
  navigate(-1); // Go back to the previous page
};
  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    
    <div className="title flex items-center space-x-2 mb-8">
    
        <GoChevronLeft className="cursor-pointer" 
        onClick={handleBackNavigation}/>
    
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

        {submitted ? (
          <div className="text-green-600 font-semibold text-center text-sm">
            Thank you for your feedback!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-6">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg mb-4"
              rows="5"
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </form>
        )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

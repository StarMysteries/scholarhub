import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { HiArrowLeft } from 'react-icons/hi'; // Import left arrow icon from react-icons

const DeclinedStatus = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle the back button click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-start items-center py-20">
      {/* Main container */}
      <div className="container mx-auto p-6">
        {/* Title and Back Button Section */}
        <div className="flex justify-between items-center mb-12">
          {/* Back Button */}
          <button
            onClick={handleBackClick} // Trigger handleBackClick function when clicked
            className="flex items-center space-x-2 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          >
            <HiArrowLeft className="w-5 h-5" /> {/* Left arrow icon */}
            <span className="text-sm">Back</span>
          </button>

          {/* Title */}
          <a href="/applicant_status">
            <div>
              <h1 className="text-3xl font-semibold text-red-800 mb-4">Declined Applicants</h1>
            </div>
          </a>
        </div>

        {/* Applicant Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Applicant 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-6 mb-4">
              <img
                src="/PICTURES/images.jpg"
                alt="Profile Picture"
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
              />
              <div>
                <h5 className="text-xl font-semibold text-gray-800">John Doe</h5>
                <p className="text-sm text-gray-500">BS-VAL</p>
              </div>
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et sapien diam. Nam sit amet libero gravida, auctor ligula at, interdum nisl.
            </p>
          </div>

          {/* Applicant 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-6 mb-4">
              <img
                src="/PICTURES/images.jpg"
                alt="Profile Picture"
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
              />
              <div>
                <h5 className="text-xl font-semibold text-gray-800">Jane Doe</h5>
                <p className="text-sm text-gray-500">BS-IT</p>
              </div>
            </div>
            <p className="text-gray-600">
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>

          {/* Add more applicants as needed */}
        </div>
      </div>
    </div>
  );
};

export default DeclinedStatus;

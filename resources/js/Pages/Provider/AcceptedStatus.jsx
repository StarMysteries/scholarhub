import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from React Router
import { HiArrowLeft } from 'react-icons/hi'; // Importing the left arrow icon from react-icons
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom'; // Don't forget to import Link

// ApplicantCard component to handle individual applicant display
const ApplicantCard = ({ name, course, imageSrc, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
      <div className="flex items-center space-x-6 mb-4">
        <img
          src={imageSrc}
          alt="Profile Picture"
          className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
        />
        <div>
          <h5 className="text-xl font-semibold text-gray-800">{name}</h5>
          <p className="text-sm text-gray-500">{course}</p>
        </div>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const AcceptedStatus = () => {
  useAuth('Provider');
  const navigate = useNavigate(); // Initialize the useNavigate hook

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
            onClick={handleBackClick} // Trigger the handleBackClick function when clicked
            className="flex items-center space-x-2 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          >
            <HiArrowLeft className="w-5 h-5" /> {/* Left arrow icon */}
            <span className="text-sm">Back</span>
          </button>

          {/* Title */}
          <div>
            <Link to="/applicant_status">
              <h1 className="text-3xl font-semibold text-green-800 mb-4">Accepted Applicants</h1>
            </Link>
          </div>
        </div>

        {/* Applicant Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Applicant Cards */}
          <ApplicantCard
            name="John Doe"
            course="BS-VAL"
            imageSrc=""
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et sapien diam. Nam sit amet libero gravida, auctor ligula at, interdum nisl."
          />
          <ApplicantCard
            name="Jane Doe"
            course="BS-IT"
            imageSrc=""
            description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
          />
          {/* Add more applicants as needed */}
        </div>
      </div>
    </div>
  );
};

export default AcceptedStatus;
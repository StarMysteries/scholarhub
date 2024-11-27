import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi"; // Assuming you're using react-icons
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom

const scholarships = [
  {
    id: 1,
    name: "Scholarship Name",
    company: "Scholarship Company",
    status: "Pending",
  },
  {
    id: 2,
    name: "Scholarship Name",
    company: "Scholarship Company",
    status: "Accepted",
  },
  {
    id: 3,
    name: "Scholarship Name",
    company: "Scholarship Company",
    status: "Declined",
  },
];

const AppliedScholarshipPage = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate(); // Initialize the navigate function

  // Define the handleBackClick function
  const handleBackClick = () => {
    navigate("/"); // Navigate to the root ("/") when back is clicked
  };

  // Filter scholarships based on the selected filter
  const filteredScholarships =
    filter === "All"
      ? scholarships
      : scholarships.filter((scholarship) => scholarship.status === filter);

  return (
    <div className="min-h-screen p-6"> {/* Removed bg-gray-100 */}
      {/* Back Button */}
      <button
        onClick={handleBackClick} // Trigger handleBackClick function when clicked
        className="flex items-center space-x-2 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
      >
        <HiArrowLeft className="w-5 h-5" /> {/* Left arrow icon */}
        <span className="text-sm">Back</span>
      </button>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setFilter("Accepted")}
          className={`px-4 py-2 rounded-md font-bold ${
            filter === "Accepted"
              ? "bg-green-700 text-white"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          ACCEPTED
        </button>
        <button
          onClick={() => setFilter("Declined")}
          className={`px-4 py-2 rounded-md font-bold ${
            filter === "Declined"
              ? "bg-red-700 text-white"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          DECLINED
        </button>
        <button
          onClick={() => setFilter("Pending")}
          className={`px-4 py-2 rounded-md font-bold ${
            filter === "Pending"
              ? "bg-yellow-700 text-white"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          PENDING
        </button>
      </div>

      {/* Scholarship Cards */}
      <div className="space-y-4">
        {filteredScholarships.map((scholarship) => (
          <div
            key={scholarship.id}
            className="flex justify-between items-center bg-green-200 p-4 rounded-lg shadow-md border"
          >
            <div className="flex items-center">
              {/* Placeholder Icon */}
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                <span>👤</span>
              </div>
              {/* Scholarship Details */}
              <div>
                <h3 className="text-lg font-bold">{scholarship.name}</h3>
                <p className="text-sm text-gray-600">{scholarship.company}</p>
                {/* Use Link to navigate to /more_info */}
                <Link to="/more_info" className="text-blue-500 hover:underline text-sm">
                  View more
                </Link>
              </div>
            </div>
            {/* Status Badge */}
            <div>
              {scholarship.status === "Pending" && (
                <span className="bg-yellow-500 text-white px-4 py-1 rounded-md font-bold">
                  PENDING
                </span>
              )}
              {scholarship.status === "Accepted" && (
                <span className="bg-green-500 text-white px-4 py-1 rounded-md font-bold">
                  ACCEPTED
                </span>
              )}
              {scholarship.status === "Declined" && (
                <span className="bg-red-500 text-white px-4 py-1 rounded-md font-bold">
                  DECLINED
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedScholarshipPage;

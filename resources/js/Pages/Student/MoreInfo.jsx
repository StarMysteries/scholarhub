import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MoreInfo = () => {
  return (
    <div className="p-8">
      {/* Scholarship Details Section */}
      <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow-lg p-8 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <img
              src=""
              alt="Scholarship"
              className="rounded-full w-32 h-32 object-cover shadow-md"
            />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">SCHOLARSHIP NAME</h4>
              <div className="text-gray-700 mt-2">
                <span className="font-semibold">Courses Offered: </span>BS-VAL, BS-CS, BS-IT
              </div>
            </div>
          </div>
          <Link
            to="/scholarship_form" // Use Link's 'to' prop to specify the route
            className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Apply for Scholarship
          </Link>
        </div>

        {/* Scholarship Information Section */}
        <div className="space-y-6">
          <div>
            <h5 className="text-xl text-blue-700 font-semibold">Scholarship Information</h5>
            <div className="text-gray-700">
              <div>
                <span className="font-semibold">Application Deadline: </span>
                October 30, 2024.
              </div>
              <div>
                <span className="font-semibold">Contact Email: </span>
                <span className="text-gray-700">johndoe@example.com</span>
              </div>
            </div>
          </div>

          {/* Requirements Section */}
          <div>
            <h5 className="text-xl text-blue-700 font-semibold">Eligibility Requirements</h5>
            <p className="text-gray-700 leading-relaxed">
              To qualify for this scholarship, applicants must meet the following criteria:
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Be a full-time student enrolled in one of the following programs: BS-VAL, BS-CS, or BS-IT.</li>
              <li>Maintain a minimum GPA of 3.0 or higher.</li>
              <li>Submit a completed application form along with all required documents by the application deadline.</li>
            </ul>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Please ensure that all necessary documents are submitted to complete your application. Incomplete submissions will not be considered.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-10">
          <Link
            to="/" // Use Link's 'to' prop to specify the route
            className="py-3 px-8 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-200 transition-all duration-300"
          >
            Back to Scholarships Offered
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const MoreInfo = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const scholarshipId = params.get('id');

  const [scholarship, setScholarship] = useState(null);
  const [error, setError] = useState(null);

  // Fetch scholarship data from the server
  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await fetch(`/scholarship?id=${scholarshipId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch scholarship details');
        }
        const data = await response.json();
        setScholarship(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (scholarshipId) {
      fetchScholarship();
    }
  }, [scholarshipId]);

  // Display error message if fetch fails
  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  // Display loading message while data is being fetched
  if (!scholarship) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      {/* Scholarship Details Container */}
      <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow-lg p-8 space-y-8">

        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            {/* Provider Image */}
            <div className="bg-gray rounded-full w-32 h-32 flex items-center justify-center shadow-xl">
              <span className="text-5xl font-semibold text-gray-800">
                {scholarship.scholarship_name.charAt(0)}
              </span>
            </div>
            <div>
              {/* Scholarship Name and Provider Information */}
              <h4 className="text-2xl font-semibold text-gray-800">
                {scholarship.scholarship_name}
              </h4>
              <div className="text-gray-700 mt-2">
                <span className="font-semibold">Provider: </span>
                {scholarship.provider?.provider_name || "N/A"}
              </div>
              <div className="text-gray-700 mt-2">
                <span className="font-semibold">Contact: </span>
                {scholarship.provider?.provider_contact || "N/A"}
              </div>
            </div>
          </div>
          {/* Apply Button */}
          <Link
            to={`/scholarship_form?id=${scholarship.scholarship_id}`}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Apply for Scholarship
          </Link>
        </div>

        {/* Scholarship Information Section */}
        <div className="space-y-6">
          {/* Supported Courses Section */}
          <div>
            <h5 className="text-xl text-blue-700 font-semibold">Supported Courses</h5>
            <ul className="list-disc ml-6 text-gray-700">
              {scholarship.courses.map((course) => (
                <li key={course.course_id}>
                  {course.course_name} ({course.course_id})
                </li>
              ))}
            </ul>
          </div>

          {/* Scholarship Information Section */}
          <div>
            <h5 className="text-xl text-blue-700 font-semibold">Scholarship Information</h5>
            <div>
              <span className="font-semibold">Application Deadline: </span>
              {new Date(scholarship.scholarship_deadline).toLocaleString()}
            </div>
          </div>

          {/* Requirements Section */}
          <div className="mt-6">
            <h5 className="text-xl text-blue-700 font-semibold">Requirements</h5>
            {/* Check if scholarship description exists */}
            {scholarship.scholarship_desc && scholarship.scholarship_desc.trim() !== "" ? (
              <ReactQuill
                value={scholarship.scholarship_desc}
                readOnly={true}
                theme="snow"
                modules={{ toolbar: false }}  // Disable toolbar
                className="mt-4 border rounded-lg"
              />
            ) : (
              <div className="text-gray-500">No requirements</div>  // Show 'No requirements' if description is empty
            )}        
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-10">
          <Link
            to="/"
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

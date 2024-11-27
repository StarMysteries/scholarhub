import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Back Button Component
const BackButton = () => (
  <Link
    to="/more_info"
    className="flex items-center text-lg text-blue-600 font-semibold hover:text-blue-800 focus:text-blue-800 transition duration-300"
  >
    {/* Left Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 12H5m7-7l-7 7 7 7"
      />
    </svg>
    Back
  </Link>
);

const ScholarshipForm = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Scholarship Form Section */}
      <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow-lg p-8 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Name of Scholarship</h1>
            <span className="text-sm text-gray-500">Scholarship Provider Name</span>
          </div>
        </div>

        {/* Scholarship Description Section */}
        <div className="space-y-6">
          <div className="bg-blue-500 text-white rounded-lg p-6 mb-6">
            <div className="mb-4 text-base text-gray-200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent venenatis eros purus, vitae ornare massa
              pellentesque id. Nullam elementum tellus turpis, cursus molestie eros pellentesque eu.
            </div>
            <div className="font-semibold mb-2 text-base text-gray-100">Requirements:</div>
            <ul className="list-disc list-inside text-gray-100">
              <li>Be a full-time student</li>
              <li>Maintain a GPA of 3.0 or higher</li>
              <li>Submit all required documents by the deadline</li>
            </ul>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm flex flex-col items-center mb-6">
          <label htmlFor="file-upload" className="text-gray-700 font-medium mb-2 text-sm text-center">
            Attach Files Here
          </label>
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileChange}
            className="file:bg-blue-400 file:border-0 file:text-white file:font-semibold file:px-4 file:py-2 file:rounded-lg cursor-pointer w-full max-w-lg text-sm"
          />
          {files.length > 0 ? (
            <div className="mt-4 text-gray-700 text-center">
              <div className="text-sm font-medium">Selected Files:</div>
              <ul className="list-disc pl-6 text-gray-700 text-sm">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-4 text-gray-500 text-center">
       
            </div>
          )}
        </div>

        {/* Submit and Back Button Section */}
        <div className="flex justify-between items-center mt-6">
          <BackButton />
          <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipForm;
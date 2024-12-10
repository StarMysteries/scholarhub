import React, { useState, useEffect, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate for navigation
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import Quill styles
import axios from "axios";
import LoadingSpinner from "../General/LoadingSpinner";

const ScholarshipForm = () => {
  const userId = localStorage.getItem('user_id');

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const scholarshipId = params.get("id");

  const navigate = useNavigate();

  const [scholarship, setScholarship] = useState(null);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await fetch(`/scholarship?id=${scholarshipId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch scholarship details");
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

  // Handle file uploading
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  // Handle navigate back
  const handleBackClick = () => {
    navigate(-1); // -1 takes the user back to the previous page in the history
  };

  // Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the user is authenticated
    if (!userId) {
        alert("You must be signed in to submit an application.");
        navigate("/login");
        return;
    }

    // Validate file upload
    if (files.length === 0) {
        alert("You must upload at least one file.");
        return;
    }

    // Validate scholarship ID
    if (!scholarshipId) {
        alert("Missing scholarship information.");
        return;
    }

    const formData = new FormData();
    formData.append("scholarship_id", scholarshipId);

    try {
        const response = await axios.post("/submit-application", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data.message) {
            alert(response.data.message); // Show success message
            navigate("/"); // Redirect on success
        } else {
            alert(response.data.error || "Failed to submit application."); // Show error message
        }
    } catch (error) {
        const errorMsg =
            error.response?.data?.error || "An error occurred. Please try again later.";
        console.error("Submission error:", errorMsg);
        alert(errorMsg); // Show error message
    }
  };

  // Display Error
  if (error) {
    return <>
      {/* Error Message */}
      {error &&
          <div className="mt-6 bg-red-500 text-white p-4 rounded-lg text-center mb-4">
              {error}
          </div>
      }
    </>;
  }

  if (!scholarship) {
    return <Suspense fallback={<LoadingSpinner />}></Suspense>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">

        {/* Scholarship Info */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{scholarship.scholarship_name}</h1>
            <span className="text-sm text-gray-500">{scholarship.provider?.provider_name}</span>
          </div>
        </div>

        {/* Supported Courses */}
        <div className="space-y-6">
          <h5 className="text-xl text-blue-700 font-semibold">Supported Courses</h5>
          {Array.isArray(scholarship.courses) && scholarship.courses.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {scholarship.courses.map((course) => (
                <li key={course.course_id} className="text-gray-600">
                  {course.course_name} ({course.course_id})
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No courses available for this scholarship.</div>
          )}
        </div>



        {/* Scholarship Description */}
        <div>
          <div className="text-xl text-black rounded-lg p-3">
            <h5 className="text-xl text-blue-700 font-semibold">Requirements</h5>
            {/* Check if scholarship description exists */}
            {scholarship.scholarship_desc && scholarship.scholarship_desc.trim() !== "" ? (
              <ReactQuill
                value={scholarship.scholarship_desc}
                readOnly={true}
                theme="snow"
                modules={{ toolbar: false }}  // Disable toolbar
              />
            ) : (
              <div className="text-gray-500">No requirements</div>  // Show 'No requirements' if description is empty
            )}
          </div>
        </div>




        {/* File Upload Section */}
        <div className="border rounded-lg p-6 bg-gray-50 shadow-sm flex flex-col items-center mb-6">
          <label htmlFor="file-upload" className="text-gray-700 font-medium mb-2 text-sm text-center">
            Attach Files Here
          </label>
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileChange}
            className="w-full max-w-md text-sm file:bg-green-800 file:border-0 file:text-white file:font-semibold file:px-4 file:py-2 file:rounded-lg cursor-pointer"
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
            <div className="mt-4 text-gray-500 text-center">No files selected.</div>
          )}
        </div>

        {/* Submit and Back Button Section */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleBackClick}
            className="bg-gray-300 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300"
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ViewMore = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const applicantId = queryParams.get("applicant_id");

  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]); 



  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [declineRemarks, setDeclineRemarks] = useState("");

  // Fetch applicant details from the server
  useEffect(() => {
    const fetchApplicantDetails = async () => {
      try {
        const response = await axios.get(`/applicant/${applicantId}`);
        setApplicant(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch applicant details.');
        setLoading(false);
      }
    };

    if (applicantId) {
      fetchApplicantDetails();
    }
  }, [applicantId]);

  // If the data is loading
  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  // If there's an error fetching the data
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const handleDecline = async () => {
  console.log("Declining applicant with ID:", applicant.applicant_id); // Log the ID
  if (!applicant.applicant_id) {
    console.error("Application ID is undefined");
    return; // Exit if the ID is undefined
  }

  try {
    const response = await axios.put(`/applications/${applicant.applicant_id}`, {
      status: 'Declined',
      rejection_details: declineRemarks,
    });
    setApplicant(response.data);
    setShowModal(false); // Close modal after decline
  } catch (error) {
    console.error("Error declining applicant:", error);
  }
};

const handleAccept = async () => {
  console.log("Accepting applicant with ID:", applicant.applicant_id); // Log the ID
  if (!applicant.applicant_id) {
    console.error("Application ID is undefined");
    return; // Exit if the ID is undefined
  }

  try {
    const response = await axios.put(`/applications/${applicant.applicant_id}`, {
      status: 'Accepted',
    });
    setApplicant(response.data);
    setShowAcceptModal(false); // Close modal after acceptance
  } catch (error) {
    console.error("Error accepting applicant:", error);
  }
};


  return (
    <div className="bg-gray-100 min-h-screen p-4">

      {/* Back Button - Positioned at the top left */}
      <div className="mb-6">
        <Link to="/" className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Back to Applicants
        </Link>
      </div>

      {/* Applicant Details Card */}
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">

        {/* Header Section with Applicant Number and Buttons */}
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold text-gray-700">Applicant Number: {applicant.applicant_id}</h4>

          {/* Accept and Decline Buttons */}
          <div className="space-x-4">
            <button
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
              onClick={() => handleAccept()} // Corrected this line
            >
              Accept
            </button>

            <button
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300"
              onClick={() => setShowModal(true)}
            >
              Decline
            </button>
          </div>
        </div>

        {/* Student Information Section */}
        <div className="space-y-4">
          <h5 className="text-lg text-blue-700 font-semibold">Student Information</h5>
          <p><strong>Name:</strong> {applicant.student_name}</p>
          <p><strong>Course:</strong> {applicant.course}</p>
          <p><strong>Contact:</strong> {applicant.phone} / {applicant.user_email}</p>
          <p><strong>Address:</strong> {applicant.address}</p>
          <p><strong>Status:</strong> {applicant.application_status}</p>
        </div>

        {/* Scholarship Information Section */}
        <div className="space-y-4">
          <h5 className="text-lg text-blue-700 font-semibold">Scholarship Information</h5>
          <p><strong>Scholarship Name:</strong> {applicant.scholarship_name}</p>

          {/* Requirements Section */}
          <h5 className="text-lg text-blue-700 font-semibold">Requirements</h5>
          {applicant.scholarship_desc && applicant.scholarship_desc.trim() !== "" ? (
            <ReactQuill
              value={applicant.scholarship_desc}
              readOnly={true}
              theme="snow"
              modules={{ toolbar: false }}
            />
          ) : (
            <div className="text-gray-500">No requirements available.</div>
          )}

          {/* Deadline */}
          <p><strong>Deadline:</strong> {new Date(applicant.scholarship_deadline).toLocaleString()}</p>
        </div>

      </div>

      {/* Modal for Declining Applicants */}
      {showModal && applicant && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center p-4 border-b">
              <h5 className="font-bold">Decline Applicant</h5>
              <button type="button" className="text-gray-500" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="p-4">
              <p>Please provide a reason for declining {applicant.student_name}:</p>
              <textarea
                className="border p-2 rounded w-full mt-2"
                value={declineRemarks}
                onChange={(e) => setDeclineRemarks(e.target.value)}
                rows="3"
              />
            </div>
            <div className="flex justify-end p-4 border-t">
              <button type="button" className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="bg-red-600 text-white py-2 px-4 rounded-lg" onClick={handleDecline}>Decline</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Accepting Applicants */}
      {showAcceptModal && applicant && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center p-4 border-b">
              <h5 className="font-bold">Accept Applicant</h5>
              <button type="button" className="text-gray-500" onClick={() => setShowAcceptModal(false)}>
                &times;
              </button>
            </div>
            <div className="p-4">
              <p>You have successfully accepted {applicant.student_name} for the {applicant.course} course.</p>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button type="button" className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg" onClick={() => setShowAcceptModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ViewMore;

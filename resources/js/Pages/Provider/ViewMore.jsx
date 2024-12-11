import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingSpinner from "../General/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

const ViewMore = () => {
  useAuth("Provider");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const applicantId = queryParams.get("applicant_id");

  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const [showModal, setShowModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [declineRemarks, setDeclineRemarks] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(0); // Trigger to refetch data

  // Fetch applicant details from the server
  useEffect(() => {
    const fetchApplicantDetails = async () => {
      try {
        const response = await axios.get(`/applicant/${applicantId}`);
        setApplicant(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch applicant details.");
        setLoading(false);
      }
    };

    if (applicantId) {
      fetchApplicantDetails();
    }
  }, [applicantId, updateTrigger]);

  // Handle decline
  const handleDecline = async () => {
    if (!applicant.applicant_id) {
      console.error("Application ID is undefined");
      return; // Exit if the ID is undefined
    }

    try {
      await axios.put(`/applications/${applicant.applicant_id}`, {
        status: "Declined",
        rejection_details: declineRemarks,
      });
      setShowModal(false); // Close modal after decline
      setUpdateTrigger((prev) => prev + 1); // Trigger refetch
      setSuccessMessage("Applicant has been declined successfully."); // Set success message
    } catch (error) {
      console.error("Error declining applicant:", error);
    }
  };

  // Handle accept
  const handleAccept = async () => {
    if (!applicant.applicant_id) {
      console.error("Application ID is undefined");
      return; // Exit if the ID is undefined
    }

    try {
      await axios.put(`/applications/${applicant.applicant_id}`, {
        status: "Accepted",
      });
      setShowAcceptModal(false); // Close modal after acceptance
      setUpdateTrigger((prev) => prev + 1); // Trigger refetch
      setSuccessMessage("Applicant has been accepted successfully."); // Set success message
    } catch (error) {
      console.error("Error accepting applicant:", error);
    }
  };

  // If the data is loading
  if (loading) {
    return <Suspense fallback={<LoadingSpinner />}></Suspense>;
  }

  // If there's an error fetching the data
  if (error) {
    return (
      <div className="mt-6 bg-red-500 text-white p-4 rounded-lg text-center mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-full p-4 pt-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-lg mb-4 text-center">
          {successMessage}
        </div>
      )}
  
      {/* Applicant Details Card */}
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold text-gray-700">
            Applicant Number: {applicant.applicant_id}
          </h4>
          <div className="space-x-4">
            <button
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
              onClick={handleAccept}
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
  
        {/* Student Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Name:</strong> {applicant.student_name}
            </p>
            <p>
              <strong>Course:</strong> {applicant.course}
            </p>
            <p>
              <strong>Contact:</strong> {applicant.phone} / {applicant.user_email}
            </p>
          </div>
          <div>
            <p>
              <strong>Address:</strong> {applicant.address}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold px-2 py-1 rounded ${applicant.application_status === "Accepted"
                  ? "bg-green-100 text-green-800"
                  : applicant.application_status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
                  }`}
              >
                {applicant.application_status}
              </span>
            </p>
          </div>
        </div>
  
        {/* Scholarship Information */}
        <div className="space-y-4">
          <h5 className="text-lg text-blue-700 font-semibold">Scholarship Information</h5>
          <p>
            <strong>Name:</strong> {applicant.scholarship_name}
          </p>
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
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(applicant.scholarship_deadline).toLocaleString()}
          </p>
        </div>
      </div>
  
      {/* Modal for Declining Applicants */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center p-4 border-b">
              <h5 className="font-bold">Decline Applicant</h5>
              <button
                type="button"
                className="text-gray-500"
                onClick={() => setShowModal(false)}
              >
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
              <button
                type="button"
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={handleDecline}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Back Button outside of Modal */}
      {!showModal && (
        <div className="text-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="py-3 px-8 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-200 transition-all duration-300"
          >
            Back to Applicants
          </button>
        </div>
      )}
    </div>
  );
  
};

export default ViewMore;

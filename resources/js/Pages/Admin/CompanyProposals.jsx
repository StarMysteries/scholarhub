import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";

const proposals = [
  {
    id: 1,
    company: "Company Name",
    description: "This is a detailed description of the proposal for Company Name 1.",
  },
  {
    id: 2,
    company: "Company Name",
    description: "This is a detailed description of the proposal for Company Name 2.",
  },
  {
    id: 3,
    company: "Company Name",
    description: "This is a detailed description of the proposal for Company Name 3.",
  },
];

const CompanyProposals = () => {
  const [viewMore, setViewMore] = useState(null); // Tracks the "View More" modal
  const [declineModal, setDeclineModal] = useState(null); // Tracks the "Decline" modal
  const [declineReason, setDeclineReason] = useState(""); // Tracks the decline reason

  const handleBackClick = () => {
    console.log("Back button clicked");
    // Add navigation logic here (e.g., React Router navigate function)
  };

  const handleAccept = (id) => {
    console.log(`Proposal ${id} accepted`);
    // Add accept logic here
  };

  const handleDeclineSubmit = () => {
    console.log(`Proposal declined for reason: ${declineReason}`);
    setDeclineModal(null); // Close the modal after submission
    setDeclineReason(""); // Reset the reason
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="flex items-center space-x-2 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 mb-6"
      >
        <HiArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </button>

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Company Proposals</h1>

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="flex justify-between items-center bg-green-200 p-4 rounded-lg shadow-md border"
          >
            <div className="flex items-center">
              {/* Placeholder Icon */}
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                <span>👤</span>
              </div>
              {/* Proposal Details */}
              <div>
                <h3 className="text-lg font-bold">{proposal.company}</h3>
                <button
                  onClick={() => setViewMore(proposal)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View more
                </button>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleAccept(proposal.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                ACCEPT
              </button>
              <button
                onClick={() => setDeclineModal(proposal)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                DECLINE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More Modal */}
      {viewMore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{viewMore.company}</h2>
            <p className="mb-4">{viewMore.description}</p>
            <button
              onClick={() => setViewMore(null)}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {declineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Decline Proposal: {declineModal.company}
            </h2>
            <textarea
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter the reason for declining..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeclineModal(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeclineSubmit}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProposals;

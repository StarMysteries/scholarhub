import React, { useState } from 'react';
import { useAuth } from '../../hooks/UseAuth';

const ApplicantStatus = () => {
  useAuth('Provider');
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'John Doe', course: 'BS-VAL', status: 'PENDING', remarks: '' },
    { id: 2, name: 'Jane Doe', course: 'BS-IT', status: 'PENDING', remarks: '' },
  ]);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [declineRemarks, setDeclineRemarks] = useState('');

  // Accept Applicant
  const acceptApplicant = (id) => {
    setApplicants(applicants.map(applicant =>
      applicant.id === id ? { ...applicant, status: 'ACCEPTED' } : applicant
    ));
    setShowAcceptModal(true); // Show accept confirmation modal
  };

  // Decline Applicant
  const openDeclineModal = (applicant) => {
    setCurrentApplicant(applicant);
    setShowDeclineModal(true);
  };

  // Handle Decline
  const handleDecline = () => {
    if (currentApplicant) {
      setApplicants(applicants.map(applicant =>
        applicant.id === currentApplicant.id
          ? { ...applicant, status: 'DECLINED', remarks: declineRemarks || 'No remarks provided' }
          : applicant
      ));
      setShowDeclineModal(false);
      setDeclineRemarks('');
    }
  };

  return (
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="container mx-auto mt-4 text-center">
          <div className="flex justify-between">
            <a href="/AcceptedStatus" className="w-full mx-2">
              <button className="bg-green-600 text-white py-2 rounded-lg w-full">ACCEPTED</button>
            </a>
            <a href="/DeclinedStatus" className="w-full mx-2">
              <button className="bg-red-600 text-white py-2 rounded-lg w-full">DECLINED</button>
            </a>
        
          </div>
        </div>

        {/* Applicant Cards */}
        <div className="container mx-auto mt-5">
          {applicants.map(applicant => (
            <div className="bg-white rounded-lg shadow-md mb-4 p-4" key={applicant.id}>
              <div className="flex items-center">
                <img
                  src="/PICTURES/images.jpg"
                  alt="Profile Picture"
                  className="rounded-full w-20 h-20 mr-4"
                />
                <div>
                  <h5 className="font-bold text-lg text-gray-800 mb-2">{`APPLICANT NUMBER ${applicant.id}`}</h5>
                  <p><strong>NAME:</strong> {applicant.name}</p>
                  <p><strong>COURSE:</strong> {applicant.course}</p>

                  {applicant.remarks && <p><strong>REMARKS:</strong> {applicant.remarks}</p>}
                  <a href="/ViewMore" className="text-blue-600">View more</a>
                  <div className="mt-2">
                    <button className="bg-green-600 text-white py-1 px-3 rounded-lg mr-2" onClick={() => acceptApplicant(applicant.id)}>
                      ACCEPT
                    </button>
                    <button className="bg-red-600 text-white py-1 px-3 rounded-lg" onClick={() => openDeclineModal(applicant)}>
                      DECLINE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Declining Applicants */}
        {showDeclineModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3">
              <div className="flex justify-between items-center p-4 border-b">
                <h5 className="font-bold">Decline Applicant</h5>
                <button type="button" className="text-gray-500" onClick={() => setShowDeclineModal(false)}>
                  &times;
                </button>
              </div>
              <div className="p-4">
                <p>Please provide a reason for declining {currentApplicant?.name}:</p>
                <textarea
                  className="form-control mt-2 p-2 border rounded w-full"
                  value={declineRemarks}
                  onChange={(e) => setDeclineRemarks(e.target.value)}
                  rows="3"
                />
              </div>
              <div className="flex justify-end p-4 border-t">
                <button type="button" className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2" onClick={() => setShowDeclineModal(false)}>Cancel</button>
                <button type="button" className="bg-red-600 text-white py-2 px-4 rounded-lg" onClick={handleDecline}>Decline</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Accepting Applicants */}
        {showAcceptModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3">
              <div className="flex justify-between items-center p-4 border-b">
                <h5 className="font-bold">Accept Applicant</h5>
                <button type="button" className="text-gray-500" onClick={() => setShowAcceptModal(false)}>
                  &times;
                </button>
              </div>
              <div className="p-4">
                <p>You have successfully accepted {currentApplicant?.name} for the {currentApplicant?.course} course.</p>
              </div>
              <div className="flex justify-end p-4 border-t">
                <button type="button" className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg" onClick={() => setShowAcceptModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default ApplicantStatus;

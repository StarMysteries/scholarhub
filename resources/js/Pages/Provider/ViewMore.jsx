import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ViewMore = () => {
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'John Doe', course: 'BS-VAL', status: 'PENDING', remarks: '' },
  ]);
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(true);
  };

  // Handle Decline
  const handleDecline = () => {
    if (currentApplicant) {
      setApplicants(applicants.map(applicant =>
        applicant.id === currentApplicant.id
          ? { ...applicant, status: 'DECLINED', remarks: declineRemarks || 'No remarks provided' }
          : applicant
      ));
      setShowModal(false);
      setDeclineRemarks('');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto mt-4 text-center">
        <div className="flex justify-between mb-12">
          {/* Replace <a> with <Link> */}
          <Link to="/accepted_status" className="w-full mx-2">
            <button className="bg-green-600 text-white py-2 rounded-lg w-full">ACCEPTED</button>
          </Link>
          <Link to="/declined_status" className="w-full mx-2">
            <button className="bg-red-600 text-white py-2 rounded-lg w-full">DECLINED</button>
          </Link>
        </div>
      </div>

      {/* Detailed Applicant Card */}
      <div className="container mt-5 mx-auto">
        {applicants.map(applicant => (
          <div className="bg-white rounded-lg shadow mb-4 p-6 relative" key={applicant.id}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <img src="" alt="Profile" className="rounded-full mr-4 w-24 h-24" />
                <div>
                  <h4 className="text-xl font-semibold">APPLICANT NUMBER {applicant.id}</h4>
                  <p className="text-gray-700"><strong>NAME:</strong> {applicant.name}</p>
                  <p className="text-gray-700"><strong>COURSE:</strong> {applicant.course}</p>
                </div>
              </div>
              <div>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg mr-2 hover:bg-green-700" onClick={() => acceptApplicant(applicant.id)}>
                  ACCEPT
                </button>
                <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={() => openDeclineModal(applicant)}>
                  DECLINE
                </button>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="mt-4">
              <h5 className="text-lg text-blue-700 font-semibold">Personal Information</h5>
              <p><strong>Date of Birth:</strong> January 1, 1990</p>
              <p><strong>Email:</strong> johndoe@example.com</p>
              <p><strong>Phone:</strong> +123 456 7890</p>
              <p><strong>Address:</strong> 123 Main Street, City, Country</p>
            </div>

            {/* Education Section */}
            <div className="mt-4">
              <h5 className="text-lg text-blue-700 font-semibold">Educational Background</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida, orci et faucibus tristique, erat nisi auctor nisi, a convallis elit magna nec velit.</p>
            </div>

            {/* Scholarship Information Section */}
            <div className="mt-4">
              <h5 className="text-lg text-blue-700 font-semibold">Scholarship Information</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lobortis urna ac ligula fermentum tempus. Vivamus facilisis lorem at felis gravida, sed efficitur enim faucibus.</p>
            </div>
          </div>
        ))}
      </div>

      {/* Back to Requests Button - Positioned below all applicant cards */}
      <div className="container mx-auto text-center mt-8">
        <Link
          to="/applicant_status"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Back to Requests
        </Link>
      </div>

      {/* Modal for Declining Applicants */}
      {showModal && currentApplicant && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center p-4 border-b">
              <h5 className="font-bold">Decline Applicant</h5>
              <button type="button" className="text-gray-500" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="p-4">
              <p>Please provide a reason for declining {currentApplicant?.name}:</p>
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

export default ViewMore;
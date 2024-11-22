import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

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
        <div className="bg-gray-100 min-h-screen py-8">
            {/* Buttons for Accepted and Declined */}
            <div className="container mx-auto mb-6 text-center">
                <div className="flex justify-center space-x-4">
                    <Link to="/accepted_status" className="w-full mx-2">
                        <button className="bg-green-600 text-white py-2 rounded-lg w-full">ACCEPTED</button>
                    </Link>
                    <Link to="/declined_status" className="w-full mx-2">
                        <button className="bg-red-600 text-white py-2 rounded-lg w-full">DECLINED</button>
                    </Link>
                </div>
            </div>

            {/* Applicant Cards */}
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applicants.map(applicant => (
                    <Link to="/view_more" key={applicant.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition duration-300">
                        <div className="flex items-center space-x-4">
                            <img
                                alt="Profile Picture"
                                className="rounded-full w-24 h-24"
                            />
                            <div>
                                <h5 className="font-semibold text-lg text-gray-800">{`Applicant #${applicant.id}`}</h5>
                                <p className="text-gray-600"><strong>Name:</strong> {applicant.name}</p>
                                <p className="text-gray-600"><strong>Course:</strong> {applicant.course}</p>
                                {applicant.remarks && <p className="text-gray-500"><strong>Remarks:</strong> {applicant.remarks}</p>}
                                <p className="text-blue-600 hover:underline mt-2">View More</p>
                            </div>
                        </div>

                        <div className="mt-4 flex space-x-4">
                            <button className="bg-green-600 text-white py-2 px-4 rounded-lg w-full hover:bg-green-700 transition duration-300" onClick={() => acceptApplicant(applicant.id)}>
                                ACCEPT
                            </button>
                            <button className="bg-red-600 text-white py-2 px-4 rounded-lg w-full hover:bg-red-700 transition duration-300" onClick={() => openDeclineModal(applicant)}>
                                DECLINE
                            </button>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Modal for Declining Applicants */}
            {showDeclineModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h5 className="font-bold text-lg">Decline Applicant</h5>
                            <button type="button" className="text-gray-500" onClick={() => setShowDeclineModal(false)}>&times;</button>
                        </div>
                        <div className="p-4">
                            <p>Please provide a reason for declining {currentApplicant?.name}:</p>
                            <textarea
                                className="form-control mt-2 p-2 border rounded w-full"
                                value={declineRemarks}
                                onChange={(e) => setDeclineRemarks(e.target.value)}
                                rows="3"
                                placeholder="Optional remarks..."
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
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h5 className="font-bold text-lg">Accept Applicant</h5>
                            <button type="button" className="text-gray-500" onClick={() => setShowAcceptModal(false)}>&times;</button>
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
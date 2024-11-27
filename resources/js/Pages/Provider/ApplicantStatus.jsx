import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ApplicantStatus = () => {
    const { scholarshipId } = useParams(); // Get scholarship_id from URL
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await fetch(`/applicant_status/${scholarshipId}`);
                if (!response.ok) throw new Error("Failed to fetch applicants.");
                const data = await response.json();
                setApplicants(data.applicants);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchApplicants();
    }, [scholarshipId]);

    if (error) {
        return (
            <div className="text-center text-red-500">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <>
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

                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold mb-6">
                        Applicants for Scholarship #{scholarshipId}
                    </h1>

                    {applicants.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {applicants.map((applicant) => (
                                <div
                                    key={applicant.application_id}
                                    className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
                                >
                                    <h3 className="font-semibold text-lg">{applicant.student_fname} {applicant.student_lname}</h3>
                                    <p><strong>Course:</strong> {applicant.course_id}</p>
                                    <p><strong>Status:</strong> {applicant.application_status}</p>
                                    <div className="mt-4 flex space-x-4">
                                        <button
                                            className="bg-green-600 text-white py-2 px-4 rounded-lg"
                                        >
                                            ACCEPT
                                        </button>
                                        <button
                                            className="bg-red-600 text-white py-2 px-4 rounded-lg"
                                        >
                                            DECLINE
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">No applicants for this scholarship.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ApplicantStatus;
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ApplicantStatus = () => {
    const { scholarshipId } = useParams();
    const [scholarshipName, setScholarshipName] = useState('');
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScholarshipData = async () => {
            try {
                const response = await fetch(`/applicant_status/${scholarshipId}`);
                if (!response.ok) throw new Error("Failed to fetch applicants.");
                const data = await response.json();
                setScholarshipName(data.scholarshipName);
                setApplicants(data.applicants);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchScholarshipData();
    }, [scholarshipId]);

    return (
        <div className="bg-gray-100 min-h-full py-8">
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
                {error &&(
                    <div className="col-span-full bg-red-100 text-red-600 p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-lg font-semibold">Error</h2>
                        <p>{error}</p>
                    </div>
                )}

                <h1 className="text-2xl font-bold mb-6">
                    Applicants for {scholarshipName || `Scholarship #${scholarshipId}`}
                </h1>

                {applicants.length > 0 ? (
                    <Link to="/view_more">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {applicants.map((applicant) => (
                                <div
                                    key={applicant.application_id}
                                    className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    <h3 className="font-semibold text-lg">{applicant.student_fname} {applicant.student_lname}</h3>
                                    <p><strong>Course:</strong> {applicant.course_id}</p>
                                    {applicant.application_status === "Pending" ? (
                                        <p>
                                            <strong>Status:</strong> <span className="text-yellow-500"><strong>{applicant.application_status}</strong></span>
                                        </p>
                                    ) : applicant.application_status === "Accepted" ? (
                                        <p>
                                            <strong>Status:</strong> <span className="text-green-500"><strong>{applicant.application_status}</strong></span>
                                        </p>
                                    ) : applicant.application_status === "Declined" && (
                                        <p>
                                            <strong>Status:</strong> <span className="text-red-500"><strong>{applicant.application_status}</strong></span>
                                        </p>
                                    )}
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
                    </Link>
                ) : (
                    <p className="text-gray-600 text-center">No applicants for this scholarship.</p>
                )}
            </div>
        </div>
    );
};

export default ApplicantStatus;
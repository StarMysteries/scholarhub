import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ApplicantStatus = () => {
    const { scholarshipId } = useParams();
    const navigate = useNavigate();
    const [scholarshipName, setScholarshipName] = useState('');
    const [applicants, setApplicants] = useState([]);
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const applicantsPerPage = 6; // Number of applicants per page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    // Fetch scholarship and applicants data
    useEffect(() => {
        const fetchScholarshipData = async () => {
            try {
                const response = await fetch(`/applicant_status/${scholarshipId}`);
                if (!response.ok) throw new Error("Failed to fetch applicants.");
                const data = await response.json();
                setScholarshipName(data.scholarshipName);
                setApplicants(data.applicants);
                setFilteredApplicants(data.applicants);
                setTotalPages(Math.ceil(data.applicants.length / applicantsPerPage)); // Update total pages
            } catch (err) {
                setError(err.message);
            }
        };

        fetchScholarshipData();
    }, [scholarshipId]);

    // Filter applicants based on status filter
    useEffect(() => {
        if (statusFilter === 'All') {
            setFilteredApplicants(applicants);
        } else {
            setFilteredApplicants(applicants.filter(applicant => applicant.application_status === statusFilter));
        }
        setTotalPages(Math.ceil(filteredApplicants.length / applicantsPerPage)); // Recalculate total pages after filtering
    }, [statusFilter, applicants]);

    // Get current applicants for the current page
    const indexOfLastApplicant = currentPage * applicantsPerPage;
    const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
    const currentApplicants = filteredApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="bg-gray-100 min-h-full py-8 px-4 flex flex-col">
            {/* Scholarship Name and Filter Dropdown */}
            <div className="container mx-auto mb-8">
                <div className="flex justify-between items-center">
                    {/* Scholarship Name */}
                    <h1 className="text-3xl font-bold mb-4">
                        Applicants for {scholarshipName || `Scholarship #${scholarshipId}`}
                    </h1>

                    {/* Status Filter Dropdown */}
                    <div className="w-1/4">
                        <select
                            className="bg-white text-gray-700 py-2 px-4 rounded-lg shadow-md w-full"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Declined">Declined</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>

                {/* Back Button */}
                <div className="flex justify-left mt-6">
                    <button
                        onClick={() => navigate(-1)} // Navigate back one step
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-700"
                    >
                        Back
                    </button>
                </div>


            </div>

            {/* Display Applicants */}
            <div className="container mx-auto mb-12">
                {error ? (
                    <p className="text-red-600 text-center">{error}</p>
                ) : currentApplicants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentApplicants.map((applicant) => (
                            <div
                                key={applicant.application_id}
                                className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <h3 className="font-semibold text-lg">{applicant.student_fname} {applicant.student_lname}</h3>
                                <p><strong>Course:</strong> {applicant.course_id}</p>

                                {/* Applicant Status */}
                                <p>
                                    <strong>Status: </strong>
                                    <span
                                        className={`font-bold ${applicant.application_status === 'Pending'
                                            ? 'text-yellow-500'
                                            : applicant.application_status === 'Accepted'
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            }`}
                                    >
                                        {applicant.application_status}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">No applicants for this scholarship.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center py-4 space-x-4">
                    {/* Previous button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700"
                    >
                        Prev
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} border border-blue-600 rounded-lg hover:bg-blue-100`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700"
                    >
                        Next
                    </button>
                </div>
            )}


        </div>
    );
};

export default ApplicantStatus;

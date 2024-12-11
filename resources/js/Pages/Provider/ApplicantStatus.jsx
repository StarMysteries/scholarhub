import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditScholarshipModal from "./EditScholarshipModal"; // Adjust the path if needed
import { useAuth } from "../../hooks/useAuth";

const ApplicantStatus = () => {
    useAuth("Provider");

    const { scholarshipId } = useParams();
    const navigate = useNavigate();
    const [scholarshipName, setScholarshipName] = useState("");
    const [applicants, setApplicants] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const applicantsPerPage = 6;

    // Fetch scholarship and applicants data
    useEffect(() => {
        const fetchScholarshipData = async () => {
            try {
                const response = await fetch(`/applicant_status/${scholarshipId}`);
                if (!response.ok) throw new Error("Failed to fetch applicants.");
                const data = await response.json();
                setScholarshipName(data.scholarshipName || `Scholarship #${scholarshipId}`);
                setApplicants(data.applicants);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchScholarshipData();
    }, [scholarshipId]);

    // Filter applicants based on status filter
    useEffect(() => {
        setFilteredApplicants(
            statusFilter === "All"
                ? applicants
                : applicants.filter(applicant => applicant.application_status === statusFilter)
        );
    }, [statusFilter, applicants]);

    // Handle pagination
    const totalPages = Math.ceil(filteredApplicants.length / applicantsPerPage);
    const currentApplicants = filteredApplicants.slice(
        (currentPage - 1) * applicantsPerPage,
        currentPage * applicantsPerPage
    );

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const openEditModal = () => {
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
    };

    // Handle scholarship submission
    const handleSubmit = () => {
        setSuccessMessage("Scholarship updated successfully! Refreshing Page...");
        closeEditModal();
        setTimeout(() => {
            window.location.reload();
        }, 2000); // Refresh after 2 seconds
    };

    return (
        <div className="bg-gray-100 min-h-full py-8 px-4 flex flex-col">
            {/* Scholarship Name and Filter Dropdown */}
            <div className="container mx-auto mb-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold mb-4">
                        Applicants for {scholarshipName}
                    </h1>
                    <select
                        className="bg-white text-gray-700 py-2 px-4 rounded-lg shadow-md w-1/4"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Declined">Declined</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-500 text-white p-4 rounded-lg text-center mb-4">
                        {successMessage}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500 text-white p-4 rounded-lg text-center mb-4">
                        {error}
                    </div>
                )}

                {/* Back and Edit Scholarship Buttons */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Back
                    </button>
                    <button
                        onClick={openEditModal}
                        className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                        Edit Scholarship
                    </button>
                </div>
            </div>

            {/* Applicants */}
            <div className="container mx-auto mb-12">
                {currentApplicants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentApplicants.map(applicant => (
                            <div
                                key={applicant.application_id}
                                className="bg-white rounded-lg shadow-lg p-6 transition transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                                onClick={() => navigate(`/view_more?applicant_id=${applicant.application_id}`)} // Pass applicant_id as query param
                            >
                                <h3 className="font-semibold text-lg">
                                    {applicant.student_fname} {applicant.student_lname}
                                </h3>
                                <p>
                                    <strong>Course:</strong> {applicant.course_id}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`font-bold ${applicant.application_status === "Pending"
                                            ? "text-yellow-500"
                                            : applicant.application_status === "Accepted"
                                                ? "text-green-500"
                                                : "text-red-500"
                                            }`}
                                    >
                                        {applicant.application_status}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>

                ) : (
                    <p className="text-gray-600 text-center">
                        No applicants for this scholarship.
                    </p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center py-4 space-x-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 ${currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600"
                                } border border-blue-600 rounded-lg hover:bg-blue-100`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Edit Scholarship Modal */}
            {isModalOpen && (
                <EditScholarshipModal
                    isOpen={isModalOpen}
                    onClose={closeEditModal}
                    scholarshipId={scholarshipId}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default ApplicantStatus;

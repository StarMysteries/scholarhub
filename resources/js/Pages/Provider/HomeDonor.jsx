import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Hooks Import
import useDonorScholarships from '../../hooks/useDonorScholarships';
import AddScholarshipModal from './AddScholarshipModal';
import useScholarshipStatus from '../../hooks/useScholarshipStatus';
import { useAuth } from '../../hooks/useAuth';
import ConfirmationModal from './ConfirmationModal'; // Import ConfirmationModal here

const HomeDonor = () => {
    useAuth("Provider");
    const { scholarships, setScholarships, error } = useDonorScholarships();
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [confirmationModal, setConfirmationModal] = useState({
        isOpen: false,
        scholarshipId: null,
        currentStatus: null,
    });

    // Default state for AddScholarshipModal
    const [newScholarship, setNewScholarship] = useState({
        name: '',
        description: '',
        status: 'Active',
        deadline: '',
        requirements: '',
        courses: '',
    });

    // State for active/inactive filter
    const [activeFilter, setActiveFilter] = useState('All');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const scholarshipsPerPage = 9; // Number of scholarships per page
    const [currentGroup, setCurrentGroup] = useState(1); // Current page group
    const pagesPerGroup = 5; // Number of pages per group

    // Handle input change in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewScholarship((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission for AddScholarshipModal
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
        setNewScholarship({
            name: '',
            description: '',
            status: 'Active',
            deadline: '',
            requirements: '',
            courses: '',
        });
    };

    // Filter scholarships based on search query and active status
    const filteredScholarships = scholarships
        .filter((scholarship) => {
            const query = searchQuery.toLowerCase();
            return (
                scholarship.scholarship_name.toLowerCase().includes(query) ||
                scholarship.courses.some((course) =>
                    course.course_id.toLowerCase().includes(query)
                )
            );
        })
        .filter((scholarship) => {
            if (activeFilter === 'All') return true;
            return scholarship.scholarship_status === activeFilter;
        });

    // Pagination Logic
    const totalScholarships = filteredScholarships.length;
    const totalPages = Math.ceil(totalScholarships / scholarshipsPerPage);

    // Calculate the page numbers to display (e.g., 1-5, 6-10, etc.)
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    // Get the scholarships for the current page
    const indexOfLastScholarship = currentPage * scholarshipsPerPage;
    const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
    const currentScholarships = filteredScholarships.slice(indexOfFirstScholarship, indexOfLastScholarship);

    // Handle page navigation
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle previous/next group
    const handlePreviousGroup = () => {
        if (currentGroup > 1) setCurrentGroup(currentGroup - 1);
    };

    const handleNextGroup = () => {
        if (currentGroup * pagesPerGroup < totalPages) setCurrentGroup(currentGroup + 1);
    };

    // Changing ScholarshipStatus and its modal
    const { toggleScholarshipStatus } = useScholarshipStatus();

    const handleStatusToggleClick = (id, currentStatus) => {
        setConfirmationModal({
            isOpen: true,
            scholarshipId: id,
            currentStatus,
        });
    };

    const confirmStatusToggle = async () => {
        try {
            const { scholarshipId } = confirmationModal;
            const updatedScholarship = await toggleScholarshipStatus(scholarshipId);

            setScholarships((prevScholarships) =>
                prevScholarships.map((scholarship) =>
                    scholarship.scholarship_id === scholarshipId
                        ? { ...scholarship, scholarship_status: updatedScholarship.scholarship.scholarship_status }
                        : scholarship
                )
            );

            setConfirmationModal({ isOpen: false, scholarshipId: null, currentStatus: null });
        } catch (error) {
            console.error('Failed to update status:', error);
            setConfirmationModal({ isOpen: false, scholarshipId: null, currentStatus: null });
        }
    };

    const closeModal = () => {
        setConfirmationModal({ isOpen: false, scholarshipId: null, currentStatus: null });
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pt-6">
            <div className="container mx-auto mt-8 px-4 pb-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Scholarships Offered</h1>
                    <div className="flex space-x-4">
                        {/* Add Scholarship Button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        >
                            Add Scholarship
                        </button>

                        {/* Filter Dropdown */}
                        <select
                            value={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.value)}
                            className="bg-gray-100 text-gray-800 py-2 px-4 rounded-md border border-gray-300"
                        >
                            <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search Scholarships..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                    />
                </div>

                {/* Scholarships List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {error ? (
                        <div className="col-span-full bg-red-100 text-red-600 p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-lg font-semibold">Error</h2>
                            <p>{error}</p>
                        </div>
                    ) : currentScholarships.length > 0 ? (
                        currentScholarships.map((scholarship) => (
                            <div
                                key={scholarship.scholarship_id}
                                className="bg-white p-6 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                {/* Status Header */}
                                <div
                                    className={`flex items-center space-x-3 p-2 rounded-t ${scholarship.scholarship_status === 'Active'
                                        ? 'bg-green-700 text-white'
                                        : 'bg-red-700 text-white'
                                        }`}
                                >
                                    {/* Change Status button */}
                                    <div
                                        className="w-4 h-4 bg-yellow-400 rounded-sm cursor-pointer"
                                        onClick={() => handleStatusToggleClick(scholarship.scholarship_id, scholarship.scholarship_status)}
                                    ></div>
                                    <span className="text-l font-bold">{scholarship.scholarship_status}</span>
                                </div>

                                {/* Scholarship Title and Description */}
                                <div className="mt-4">
                                    <a
                                        href={`/application_status/${scholarship.scholarship_id}`}
                                        className="block no-underline text-black hover:text-blue-600"
                                    >
                                        <div className="text-xl font-semibold mb-2">{scholarship.scholarship_name}</div>
                                        <p className="text-gray-700">{scholarship.description}</p>
                                    </a>
                                </div>

                                {/* Courses Tags */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {scholarship.courses.map((course) => (
                                        <span
                                            key={course.course_id}
                                            className="text-sm bg-blue-600 text-white py-1 px-3 rounded-md shadow-md hover:bg-blue-700"
                                        >
                                            {course.course_id}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-gray-600 text-center">
                            No scholarships available.
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center py-4 space-x-4 mb-8">
                    {/* Prev button */}
                    <button
                        onClick={handlePreviousGroup}
                        disabled={currentGroup === 1}
                        aria-label="Previous group"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-all duration-200 focus:outline-none"
                    >
                        Prev
                    </button>

                    {/* Page numbers */}
                    {pageNumbers.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            aria-label={`Go to page ${pageNumber}`}
                            className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} border border-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200 focus:outline-none`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {/* Next button */}
                    <button
                        onClick={handleNextGroup}
                        disabled={currentGroup * pagesPerGroup >= totalPages}
                        aria-label="Next group"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-all duration-200 focus:outline-none"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Add Scholarship Modal */}
            <AddScholarshipModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
                scholarshipData={newScholarship}
                onChange={handleInputChange}
            />

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmationModal.isOpen}
                onClose={closeModal}
                onConfirm={confirmStatusToggle}
                message={`Are you sure you want to ${
                    confirmationModal.currentStatus === 'Active' ? 'deactivate' : 'activate'
                } this scholarship?`}
            />
        </div>
    );
};

export default HomeDonor;

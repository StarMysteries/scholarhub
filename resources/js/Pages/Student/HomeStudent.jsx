import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useScholarshipManagement } from '../../hooks/useHomeStudent';
import { useCheckLogin } from '../../hooks/useCheckLogin';

function HomeStudent() {
    useCheckLogin();
    const navigate = useNavigate();
    const { scholarships, handleFilter } = useScholarshipManagement();

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroup, setCurrentGroup] = useState(1);
    const scholarshipsPerPage = 6; // Number of scholarships to display per page
    const pagesPerGroup = 5;

    // Use useCallback to avoid unnecessary re-renders
    const handleCardClick = useCallback((scholarshipId) => {
        navigate(`/more_info`);
    }, [navigate]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter scholarships based on the search query
    const filteredScholarships = scholarships
        .filter((scholarship) => {
            const query = searchQuery.toLowerCase();
            return (
                scholarship.scholarship_name.toLowerCase().includes(query) ||
                scholarship.courses.some((course) =>
                    course.course_id.toLowerCase().includes(query)
                )
            );
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

    return (
        <>
            <div className='flex flex-col min-h-full'>
                <div className='flex-grow flex flex-col md:flex-row'>

                    {/* Sidebar filter functionality */}
                    <Sidebar filterScholarships={handleFilter} />

                    {/* Main content section */}
                    <div className="flex-grow mt-5 px-4">
                        {/* Search bar */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                                />

                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                                        aria-label="Clear search"
                                    >
                                        <span className="text-xl">&#x2715;</span> {/* Clear icon */}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Scholarship Cards */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {currentScholarships.map(scholarship => (
                                <div
                                    key={scholarship.scholarship_id}
                                    className="bg-white shadow-lg hover:shadow-2xl rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:translate-y-2"
                                    onClick={() => handleCardClick(scholarship.scholarship_id)}
                                >
                                    <div className="relative">
                                        {/* Top section (gradient background) */}
                                        <div className="h-32 w-full bg-gradient-to-r from-red-500 to-purple-600 relative">
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                                                    <span className="text-2xl font-semibold text-gray-800">
                                                        {scholarship.scholarship_name.charAt(0)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom section (details, button) */}
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold text-gray-800">{scholarship.scholarship_name}</h3>
                                            <div className="text-gray-600">
                                                <span className="font-semibold">Courses offered:</span>
                                                <div className="inline-flex flex-wrap gap-2 mt-2 ml-2">
                                                    {scholarship.courses.map(course => (
                                                        <span
                                                            key={course.course_id}
                                                            className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm font-semibold hover:bg-blue-200 cursor-pointer"
                                                        >
                                                            {course.course_id}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-4 text-right">
                                                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200">
                                                    Apply Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Pagination controls */}
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

                    {/* Page numbers - Dynamically generated */}
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
        </>
    );
}

export default HomeStudent;

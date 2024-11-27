import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';

import useFetchScholarships from '../../hooks/useFetchScholarships';
import { filterScholarships as applyFilter } from '../../hooks/usefilterScholarships';

function HomeStudent() {
    // Fetch scholarships
    const { scholarships } = useFetchScholarships();

    // State for filtered scholarships and pagination
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const scholarshipsPerPage = 6; // Number of scholarships to display per page

    // Default: Show all scholarships
    useEffect(() => {
        setFilteredScholarships(scholarships);
    }, [scholarships]);

    // Filter scholarships
    const handleFilter = (selectedCourses) => {
        const filtered = applyFilter(scholarships, selectedCourses);
        setFilteredScholarships(filtered);
        setCurrentPage(1);
    };

    // Pagination logic
    const totalScholarships = filteredScholarships.length;
    const totalPages = Math.ceil(totalScholarships / scholarshipsPerPage);

    // Get the scholarships for the current page
    const indexOfLastScholarship = currentPage * scholarshipsPerPage;
    const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
    const currentScholarships = filteredScholarships.slice(indexOfFirstScholarship, indexOfLastScholarship);

    // Initialize useNavigate hook
    const navigate = useNavigate();

    // Navigate to MoreInfo when a scholarship card is clicked
    const handleCardClick = (scholarshipId) => {
        navigate(`/more_info`);
    };

    // Handle page navigation
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle previous/next page
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <>
            {/* Sidebar filter functionality */}
            <Sidebar filterScholarships={handleFilter} />
            <div className='flex flex-col min-h-full'>
                <div className='flex-grow'>
                    <div className="mt-5 px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {currentScholarships.map(scholarship => (
                            <div
                                key={scholarship.scholarship_id}
                                className="bg-white shadow-xl hover:shadow-2xl rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:translate-y-1"
                                onClick={() => handleCardClick(scholarship.scholarship_id)} // Add onClick handler
                            >
                                <div className="relative">
                                    {/* Top section (image, icon) */}
                                    <div className="bg-red-500 h-32 w-full relative">
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
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

                {/* Pagination controls - More space below */}
                    <div className="bottom-20 w-full flex justify-center py-4 space-x-4 mb-8">
                        {/* Prev button */}
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-all duration-200 focus:outline-none"
                        >
                            Prev
                        </button>

                        {/* Page numbers - Dynamically generated */}
                        {[...Array(totalPages).keys()].map((pageNumber) => (
                            <button
                                key={pageNumber + 1}
                                onClick={() => handlePageChange(pageNumber + 1)}
                                aria-label={`Go to page ${pageNumber + 1}`}
                                className={`px-4 py-2 ${currentPage === pageNumber + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} border border-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200 focus:outline-none`}
                            >
                                {pageNumber + 1}
                            </button>
                        ))}

                        {/* Next button */}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
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
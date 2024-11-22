import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

// Hooks import
import useFetchCourses from '../../hooks/useFetchCourses';
import useSearchFilter from '../../hooks/useSearchFilter';
import { handleCheckboxChange, handleFilterSubmit } from '../../hooks/useSidebarHandler';

function Sidebar({ filterScholarships }) {
    // Fetch courses
    const { courses } = useFetchCourses();

    // Search filter
    const { searchQuery, setSearchQuery, filteredItems: filteredCourses } = useSearchFilter(courses, 'course_name');

    // State for selected courses
    const [selectedCourses, setSelectedCourses] = useState([]);

    return (
        <div className="w-72 h-[calc(100vh-4rem)] bg-green-600 dark:bg-green-800 text-white fixed top-16 left-0 overflow-y-auto">
            <div className="p-4">
                <h1 className="text-xl font-bold px-2 mt-2">Filter Courses</h1>
                
                {/* Search Input */}
                <div className="px-4 py-1">
                    <div className="flex items-center bg-white rounded-lg shadow-md w-full max-w-md px-4 py-2 mt-2 sm:text-sm">
                        <FaSearch className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="bg-transparent focus:outline-none text-gray-500 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Filter submit button */}
                <div className="px-4 mt-4">
                    <button
                        className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105 transition-transform"
                        onClick={() => handleFilterSubmit(selectedCourses, filterScholarships)}
                    >
                        Apply Filter
                    </button>
                </div>

                {/* Courses List */}
                <ul className="mt-4">
                    {filteredCourses.map((course) => (
                        <li key={course.course_id} className="block px-4 py-1 hover:bg-green-700">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2 appearance-none border-2 border-white rounded-sm w-5 h-5 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 ease-in-out"
                                    onChange={() => handleCheckboxChange(course.course_id, selectedCourses, setSelectedCourses)}
                                />
                                {course.course_name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
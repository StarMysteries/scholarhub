import React from 'react';
import { FaSearch } from 'react-icons/fa';

// Hooks import
import useFetchCourses from '../hooks/useFetchCourses';
import useSearchFilter from '../hooks/useSearchFilter';

function Sidebar() {
    // Fetch courses
    const { courses } = useFetchCourses();

    // Search filter
    const { searchQuery, setSearchQuery, filteredItems: filteredCourses } = useSearchFilter(courses, 'course_name');

    return (
        <div className="w-72 h-[calc(100vh-4rem)] bg-green-600 dark:bg-green-800 text-white fixed top-16 left-0 overflow-y-auto">
            <div className="p-4">
                {/* Filter */}
                <div>
                    <div className="divide-y divide-solid">
                        <h1 className="text-xl font-bold px-2 mt-2">Filter Courses</h1>

                        {/* Searchbar */}
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
                    </div>

                    {/* Display list of courses */}
                    <ul className="mt-4">
                        {filteredCourses.map(course => (
                            <li key={course.id} className="block px-4 py-1 hover:bg-green-700">
                                {course.course_name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
import React, { useState, useEffect } from 'react';

import useFetchScholarships from '../../hooks/useFetchScholarships';
import Sidebar from './Sidebar';
import { filterScholarships as applyFilter } from '../../hooks/filterScholarships';

function HomeStudent() {
    // Fetch scholarships
    const { scholarships } = useFetchScholarships();

    // State for filtered scholarships
    const [filteredScholarships, setFilteredScholarships] = useState([]);

    // Default: Show all scholarships
    useEffect(() => {
        setFilteredScholarships(scholarships);
    }, [scholarships]);

    // Filter scholarships
    const handleFilter = (selectedCourses) => {
        const filtered = applyFilter(scholarships, selectedCourses);
        setFilteredScholarships(filtered);
    };

    return (
        <>
            {/* Sidebar filter functionality */}
            <Sidebar filterScholarships={handleFilter} />

            <div className="mt-5 pl-4 pr-4 grid gap-4 mt-3">
                {filteredScholarships.map(scholarship => (
                    <div key={scholarship.scholarship_id} className="bg-gray-300 p-4 rounded-lg flex items-center">
                        <div className="bg-red-400 w-12 h-12 rounded-full flex-shrink-0"></div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold">{scholarship.scholarship_name}</h3>
                            <p className="text-gray-700">
                                <span className="font-semibold">Courses offered:</span>
                                <span className="inline-flex flex-wrap gap-2 mt-1 ml-2">
                                    {scholarship.courses.map(course => (
                                        <a key={course.course_id} className="text-blue-600">
                                            {course.course_id}
                                        </a>
                                    ))}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default HomeStudent;
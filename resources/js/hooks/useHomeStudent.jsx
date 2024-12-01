import { useState, useEffect } from 'react';
import useFetchScholarships from './useFetchScholarships';
import { useFilterScholarships } from './useFilterScholarships';

export const useScholarshipManagement = () => {
    const { scholarships } = useFetchScholarships();
    const [filteredScholarships, setFilteredScholarships] = useState([]);

    // Default: Show all scholarships
    useEffect(() => {
        setFilteredScholarships(scholarships);
    }, [scholarships]);

    // Filter scholarships based on selected courses
    const handleFilter = (selectedCourses) => {
        const filtered = useFilterScholarships(scholarships, selectedCourses);
        setFilteredScholarships(filtered);
    };

    return {
        scholarships: filteredScholarships,
        handleFilter,
    };
};

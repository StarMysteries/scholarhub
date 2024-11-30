import { useState, useEffect } from 'react';
import useFetchScholarships from './useFetchScholarships';
import { useFilterScholarships } from './useFilterScholarships';

export const useScholarshipManagement = () => {
    const { scholarships } = useFetchScholarships();
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroup, setCurrentGroup] = useState(1);
    const scholarshipsPerPage = 6; // Number of scholarships to display per page

    // Default: Show all scholarships
    useEffect(() => {
        setFilteredScholarships(scholarships);
    }, [scholarships]);

    // Filter scholarships
    const handleFilter = (selectedCourses) => {
        const filtered = useFilterScholarships(scholarships, selectedCourses);
        setFilteredScholarships(filtered);
        setCurrentPage(1);
        setCurrentGroup(1); // Reset to the first group when applying a filter
    };

    // Pagination logic
    const totalScholarships = filteredScholarships.length;
    const totalPages = Math.ceil(totalScholarships / scholarshipsPerPage);

    const pagesPerGroup = 5;
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

    // Pagination handlers
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousGroup = () => {
        if (currentGroup > 1) setCurrentGroup(currentGroup - 1);
    };

    const handleNextGroup = () => {
        if (currentGroup * pagesPerGroup < totalPages) setCurrentGroup(currentGroup + 1);
    };

    return {
        scholarships: currentScholarships,
        pageNumbers,
        currentPage,
        handleFilter,
        handlePageChange,
        handlePreviousGroup,
        handleNextGroup,
        currentGroup,
        totalPages,
    };
};

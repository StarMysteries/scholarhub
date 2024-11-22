export const handleCheckboxChange = (courseId, selectedCourses, setSelectedCourses) => {
    setSelectedCourses((prevSelected) =>
        prevSelected.includes(courseId)
            ? prevSelected.filter((id) => id !== courseId) // Remove from array if unselected
            : [...prevSelected, courseId] // Add to array if not selected
    );
};

export const handleFilterSubmit = (selectedCourses, filterScholarships) => {
    // Debug
    // console.log('Selected Courses:', selectedCourses);

    // Filter scholarships
    filterScholarships(selectedCourses);
};
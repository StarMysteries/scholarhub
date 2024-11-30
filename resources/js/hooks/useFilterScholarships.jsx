export const useFilterScholarships = (scholarships, selectedCourses) => {
    if (selectedCourses.length === 0) {
        return scholarships; // Return all scholarships if no course is selected
    }
    return scholarships.filter(scholarship =>
        scholarship.courses.some(course => selectedCourses.includes(course.course_id))
    );
};
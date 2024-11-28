import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Hooks Import
import useDonorScholarships from '../../hooks/useDonorScholarships';
import AddScholarshipModal from './AddScholarshipModal';

const HomeDonor = () => {
    const { scholarships, error } = useDonorScholarships();
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Default state for AddScholarshipModal
    const [newScholarship, setNewScholarship] = useState({
        name: '',
        description: '',
        status: 'Active',
        deadline: '',
        requirements: '',
        courses: '',
    });

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

    // Filter scholarships based on search query
    const filteredScholarships = scholarships.filter((scholarship) => {
        const query = searchQuery.toLowerCase();
        return (
            scholarship.scholarship_name.toLowerCase().includes(query) ||
            scholarship.courses.some((course) =>
                course.course_id.toLowerCase().includes(query)
            )
        );
    });

    return (
        <div className="bg-white min-h-full pt-1">
            <div className="container mx-auto mt-8 px-4 pb-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Scholarships Offered</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Add Scholarship
                    </button>
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
                    ) : filteredScholarships.length > 0 ? (
                        filteredScholarships.map((scholarship) => (
                            <Link
                                key={scholarship.scholarship_id}
                                to={`/application_status/${scholarship.scholarship_id}`}
                                className="block bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <div
                                    className={`${scholarship.scholarship_status === 'Active' ? 'bg-green-600' : 'bg-red-600'
                                        } text-white py-2 px-4 rounded-md flex items-center justify-between`}
                                >
                                    <span>{scholarship.scholarship_status}</span>
                                    <span className="text-sm text-white-100">
                                        {scholarship.applications_count} Applicants
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <div className="text-lg font-semibold">{scholarship.scholarship_name}</div>
                                    <p className="text-gray-600">{scholarship.description}</p>
                                </div>
                                <div className="mt-2 flex space-x-2">
                                    {scholarship.courses.map((course) => (
                                        <span
                                            key={course.course_id}
                                            className="text-sm bg-gray-200 text-gray-700 py-1 px-2 rounded-md"
                                        >
                                            {course.course_id}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-gray-600 text-center">
                            No scholarships available.
                        </div>
                    )}
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
        </div>
    );
};

export default HomeDonor;
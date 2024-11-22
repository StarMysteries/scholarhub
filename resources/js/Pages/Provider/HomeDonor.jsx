import React from 'react';
import { Link } from 'react-router-dom';

// Hooks
import useDonorScholarships from '../../hooks/useDonorScholarships';

const HomeDonor = () => {
    const { scholarships, error } = useDonorScholarships();

    return (
        <div className="bg-white min-h-screen pt-1">
            <div className="container mx-auto mt-8 px-4 pb-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Scholarships Offered</h1>
                    <button
                        className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Add Scholarship
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {error ? (
                        <div className="col-span-full bg-red-100 text-red-600 p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-lg font-semibold">Error</h2>
                            <p>{error}</p>
                        </div>
                    ) : (
                        scholarships.map((scholarship) => (
                            <Link
                                key={scholarship.scholarship_id}
                                to="/applicant_status"
                                className="block bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <div
                                    className={`${scholarship.scholarship_status === 'Active' ? 'bg-green-600' : 'bg-red-600'
                                        } text-white py-2 px-4 rounded-md flex items-center justify-between`}
                                >
                                    <span>{scholarship.scholarship_status}</span>
                                    <span className="text-sm text-white-100">
                                        {scholarship.applicantCount || 0} Applicants
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeDonor;
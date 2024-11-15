import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/UseAuth';

const HomeDonor = () => {
    useAuth('Provider');
    // State to control visibility of profile card
    const [showProfileCard, setShowProfileCard] = useState(false);

    // Static scholarships data with course tags
    const scholarshipsData = [
        {
            id: 1,
            title: 'Computer Science Scholarship',
            description: 'A scholarship for students pursuing a degree in Computer Science.',
            status: 'Active',
            courses: ['Computer Science', 'Data Science'],
        },
        {
            id: 2,
            title: 'Engineering Excellence Scholarship',
            description: 'Awarded to exceptional engineering students.',
            status: 'Deactivated',
            courses: ['Engineering', 'Mechanical Engineering'],
        },
        {
            id: 3,
            title: 'Data Science Scholarship',
            description: 'A scholarship for students interested in Data Science.',
            status: 'Active',
            courses: ['Data Science'],
        },
    ];

    // Static donor data for profile card
    const donor = {
        picture: 'https://via.placeholder.com/150', // Placeholder image
        name: 'John Doe',
        contact: '(123) 456-7890',
        email: 'johndoe@example.com',
    };

    // Ref to detect click outside of profile card
    const profileCardRef = useRef(null);

    // Toggle profile card visibility
    const toggleProfileCard = () => {
        setShowProfileCard(!showProfileCard); // Toggle between true and false
    };

    // Close profile card when clicking outside
    useEffect(() => {
        // Function to detect clicks outside of profile card
        const handleClickOutside = (event) => {
            if (profileCardRef.current && !profileCardRef.current.contains(event.target)) {
                setShowProfileCard(false); // Close the profile card
            }
        };

        // Add event listener on component mount
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Page Content with White Background */}
            <div className="bg-white min-h-screen pt-1">
                <div className="container mx-auto mt-8 px-4 pb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Scholarships Offered</h1>
                        <div className="flex space-x-4">
                            {/* Button to show/hide profile card */}
                            <button
                                className="bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600"
                                onClick={toggleProfileCard} // Toggle profile card visibility on click
                            >
                                Temp Account
                            </button>
                            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Add Scholarship</button>
                            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Delete Scholarship</button>
                            {/* Static Dropdown, no state management */}
                            <div className="relative inline-block text-left">
                                <select
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                    disabled
                                >
                                    <option value="All Courses">All Courses</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Static Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search Scholarships..."
                            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled
                        />
                    </div>

                    {/* Scholarship Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {scholarshipsData.map((scholarship) => (
                            <div key={scholarship.id} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                <div
                                    className={`${scholarship.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                                        } text-white py-2 px-4 rounded-md flex items-center justify-between`}
                                >
                                    <span>{scholarship.status}</span>
                                </div>
                                <a href="/applicant_status" className="block mt-4 no-underline text-black hover:text-indigo-500">
                                    <div className="text-lg font-semibold">{scholarship.title}</div>
                                    <p className="text-gray-600">{scholarship.description}</p>
                                </a>
                                <div className="mt-2 flex space-x-2">
                                    {/* Display course tags */}
                                    {scholarship.courses.map((course, index) => (
                                        <span key={index} className="text-sm bg-gray-200 text-gray-700 py-1 px-2 rounded-md">
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Profile Card - Only visible when `showProfileCard` is true */}
            {showProfileCard && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    {/* Profile Card */}
                    <div
                        ref={profileCardRef} // Attach ref to the profile card container
                        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg"
                    >
                        <div className="flex items-center space-x-6">
                            <img
                                src={donor.picture}
                                alt="Donor Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{donor.name}</h2>
                                <p className="text-gray-600 mt-2"><strong>Contact:</strong> {donor.contact}</p>
                                <p className="text-gray-600"><strong>Email:</strong> {donor.email}</p>
                                <p className="text-gray-700"><strong>Password:</strong> ****</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomeDonor;
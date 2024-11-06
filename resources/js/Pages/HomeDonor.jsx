import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';

function HomeDonor() {
    useAuth('Provider');
    return (
        <>
            {/* Page Content with White Background */}
            <div className="bg-white min-h-screen pt-1">
                <div className="container mx-auto mt-8 px-4 pb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Scholarships offered</h1>
                        <div className="flex space-x-4">
                            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Add Scholarship</button>
                            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Delete Scholarship</button>

                            <div className="relative inline-block text-left">
                                <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    All Statuses
                                </button>
                                <div className="dropdown-menu absolute hidden bg-white shadow-lg rounded-md mt-1 w-40">
                                    <ul className="py-2">
                                        <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">All</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Active</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Deactivated</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Scholarship items (same as before) */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center justify-between">
                                <span>Active</span>
                            </div>
                            <a href="/ApplicantStatus" className="block mt-4 no-underline text-black">
                                <div className="text-lg font-semibold">Computer Science Scholarship</div>
                                <p className="text-gray-600">A scholarship for students pursuing a degree in Computer Science.</p>
                            </a>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center justify-between">
                                <span>Active</span>
                            </div>
                            <a href="/ApplicantStatus" className="block mt-4 no-underline text-black">
                                <div className="text-lg font-semibold">Computer Science Scholarship</div>
                                <p className="text-gray-600">A scholarship for students pursuing a degree in Computer Science.</p>
                            </a>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center justify-between">
                                <span>Inactive</span>
                            </div>
                            <a href="/ApplicantStatus" className="block mt-4 no-underline text-black">
                                <div className="text-lg font-semibold">Computer Science Scholarship</div>
                                <p className="text-gray-600">A scholarship for students pursuing a degree in Computer Science.</p>
                            </a>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center justify-between">
                                <span>Inactive</span>
                            </div>
                            <a href="/ApplicantStatus" className="block mt-4 no-underline text-black">
                                <div className="text-lg font-semibold">Computer Science Scholarship</div>
                                <p className="text-gray-600">A scholarship for students pursuing a degree in Computer Science.</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeDonor;

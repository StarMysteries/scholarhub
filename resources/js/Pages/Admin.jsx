import React from "react";
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';

function Admin(){
    return (
        <div className="bg-gray-700 min-h-screen py-8"> {/* Light grey background */}
            <div className="container mx-auto mb-6 text-center">
                {/* Top Buttons */}
                <div className="flex justify-center space-x-4">
                    <button className="bg-green-600 text-white py-2 rounded-lg w-1/4">ACCEPTED</button>
                    <button className="bg-red-600 text-white py-2 rounded-lg w-1/4">DECLINED</button>
                </div>
            </div>

            {/* Applicant Cards in a single row */}
            <div className="container mx-auto flex flex-col space-y-6">
                {/* Example Applicant Card */}
                {[1, 2, 3].map((applicant, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition duration-300"
                    >
                        {/* Applicant Information */}
                        <div className="flex items-center space-x-4">
                            <div className="rounded-full w-24 h-24 bg-blue-200"></div>
                            <div>
                                <h5 className="font-semibold text-lg text-gray-800">Applicant #{applicant}</h5>
                                <p className="text-gray-600">
                                    <strong>School:</strong> {`School Name ${applicant}`}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Course:</strong> BS-VAL
                                </p>
                                <p className="text-blue-600 hover:underline mt-2 cursor-pointer">View More</p>
                            </div>
                        </div>

                        {/* Accept & Decline Buttons */}
                        <div className="flex space-x-4">
                            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                                ACCEPT
                            </button>
                            <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
                                DECLINE
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;
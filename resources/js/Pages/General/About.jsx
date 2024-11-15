import React from "react";
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';

function About(){
    return (
        <>
            <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
                {/* Overlay Card */}
                <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 sm:p-12 md:p-16 rounded-lg shadow-2xl max-w-3xl text-center border-t-4 border-green-600">
                    <div className="flex items-center justify-center mb-6 text-green-600">
                        <FaGraduationCap size={48} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">About Us</h2>
                    <h3 className="text-xl md:text-2xl font-semibold text-green-700 mb-6">Welcome to ScholarHub!</h3>
                    <p className="mb-5 text-gray-800 leading-relaxed text-lg">
                        We created this website to make it easier for students to find scholarships that match their goals. We know that searching for scholarships can be overwhelming, so our mission is to provide a straightforward and accessible platform for students to discover scholarships based on their field of study, educational level, and career aspirations.
                    </p>
                    <p className="mb-5 text-gray-800 leading-relaxed text-lg">
                        Our site is designed to help you save time by connecting you directly to scholarship opportunities that fit your needs. We're passionate about supporting students on their educational journeys and believe that everyone should have the chance to reach their potential, regardless of financial background.
                    </p>
                    <p className="text-gray-800 leading-relaxed text-lg">
                        Find the scholarship that's right for you, and take a step closer to achieving your dreams with ScholarHub.
                    </p>
                    
                    {/* Contact Us Button */}
                    {/* <button className="mt-8 px-6 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors">
                        Contact Us
                    </button> */}
                </div>
            </div>
        </>
    );
}

export default About;
import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="min-h-screen flex items-center justify-center py-8">
            <div className="bg-white p-10 rounded-3xl shadow-lg max-w-md w-full mx-auto ring-1 ring-gray-200">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Sign Up
                </h2>

                {/* Stack buttons vertically with subtle spacing */}
                <div className="flex flex-col mb-8 space-y-4">
                    {/* Student SignUp Button with centered text and larger font size */}
                    <Link
                        to="/signup_student"
                        className="px-6 py-4 text-xl font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out transform hover:scale-105 rounded-lg shadow-md text-center"
                    >
                        I am a Student
                    </Link>

                    {/* Provider SignUp Button with centered text */}
                    <Link
                        to="/signup_provider"
                        className="px-6 py-4 text-xl font-bold text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200 ease-in-out transform hover:scale-105 rounded-lg shadow-md text-center"
                    >
                        I am a Provider
                    </Link>
                </div>

                {/* Login Link */}
                <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                        Already have an account? 
                        <Link 
                            to="/login" 
                            className="ml-1 text-teal-600 hover:underline font-semibold"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
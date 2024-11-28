import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from "react-icons/fa";

function Unauthorized() {
    const navigate = useNavigate();

    // Navigate to the previous page
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="bg-white dark:bg-gray-700 p-12 rounded-lg shadow-lg text-center">
                {/* Icon */}
                <div className="flex items-center justify-center mb-6 text-red-600">
                    <FaLock size={48} />
                </div>

                {/* Title and Message */}
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Access Denied</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You do not have permission to view this page.
                </p>

                {/* Navigate to Previous Page Button */}
                <button
                    onClick={handleGoBack}
                    className="mt-4 bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-6 rounded-md shadow-md transform transition duration-300 ease-in-out hover:scale-105"
                >
                    Go Back to Previous Page
                </button>
            </div>
        </div>
    );
}

export default Unauthorized;
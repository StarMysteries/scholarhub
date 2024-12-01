import React from 'react';
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
    const navigate = useNavigate();

    // Navigate to where they belong
    const handleGoBack = () => {
        const userRole = localStorage.getItem("user_role");
        if(userRole === "Admin"){
            navigate('/admin');
        }else if(userRole === "Student"){
            navigate('/');
        }else if(userRole === "Provider"){
            navigate('/donor');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white/5 p-12 rounded-lg shadow-2xl text-center">
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
                    Return
                </button>
            </div>
        </div>
    );
}

export default Unauthorized;
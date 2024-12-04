import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300 scale-95 sm:scale-100">
                {/* Modal Title */}
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Confirm Action</h2>
                
                {/* Modal Message */}
                <p className="text-gray-700 text-base text-center mb-4">{message}</p>

                {/* Button Container */}
                <div className="flex justify-between space-x-2">
                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-1/2 py-2 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full sm:w-1/2 py-2 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;

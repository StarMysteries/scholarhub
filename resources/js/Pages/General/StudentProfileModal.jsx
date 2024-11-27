import React, { useState, useRef, useEffect } from "react";

function StudentProfileModal({
    student,
    setStudent,
    isEditing,
    setIsEditing,
    handleSaveProfile,
    handlePictureChange,
    onClose,
}) {
    const modalRef = useRef(null);

    // Close the modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
            <div ref={modalRef} className="max-w-2xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">My Account</h2>
                    <button onClick={onClose} aria-label="Close Profile Modal" className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        {/* Profile Picture */}
                        <div className="relative flex-shrink-0">
                            <img
                                src={student.picture}
                                alt="Student Profile"
                                className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                            />
                            <div className="absolute bottom-2 right-2">
                                <button
                                    onClick={() =>
                                        handlePictureChange("https://via.placeholder.com/150?text=New+Pic")
                                    }
                                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-blue-600 focus:outline-none"
                                    aria-label="Change Profile Picture"
                                >
                                    Change
                                </button>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-gray-600 font-medium">Name</label>
                                    {!isEditing ? (
                                        <p className="text-gray-800 font-semibold">{student.name}</p>
                                    ) : (
                                        <input
                                            type="text"
                                            value={student.name}
                                            onChange={(e) =>
                                                setStudent((prev) => ({
                                                    ...prev,
                                                    name: e.target.value,
                                                }))
                                            }
                                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            aria-label="Student Name"
                                        />
                                    )}
                                </div>

                                {/* Contact Field */}
                                <div>
                                    <label className="block text-gray-600 font-medium">Contact</label>
                                    {!isEditing ? (
                                        <p className="text-gray-800 font-semibold">{student.contact}</p>
                                    ) : (
                                        <input
                                            type="text"
                                            value={student.contact}
                                            onChange={(e) =>
                                                setStudent((prev) => ({
                                                    ...prev,
                                                    contact: e.target.value,
                                                }))
                                            }
                                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            aria-label="Student Contact"
                                        />
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-gray-600 font-medium">Email</label>
                                    {!isEditing ? (
                                        <p className="text-gray-800 font-semibold">{student.email}</p>
                                    ) : (
                                        <input
                                            type="email"
                                            value={student.email}
                                            onChange={(e) =>
                                                setStudent((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }))
                                            }
                                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            aria-label="Student Email"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end px-6 py-4 bg-gray-100 border-t space-x-4">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-md shadow hover:bg-gray-500 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveProfile}
                                className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none"
                            >
                                Save
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentProfileModal;

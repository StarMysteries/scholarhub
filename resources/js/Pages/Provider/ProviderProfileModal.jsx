import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function ProviderProfileModal({ isEditing, setIsEditing, onClose }) {
    const [providerData, setProviderData] = useState({});
    const [editedData, setEditedData] = useState(null); // Temporary state for edits
    const [errors, setErrors] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const userId = localStorage.getItem("user_id");

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

    // Fetch provider data on load
    const fetchProviderData = () => {
        if (userId) {
            axios
                .get(`/provider/${userId}`)
                .then((response) => {
                    setProviderData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching provider data", error);
                });
        }
    };

    useEffect(() => {
        fetchProviderData();
    }, [userId]);

    // Sync editedData with providerData when editing is enabled
    useEffect(() => {
        if (isEditing) {
            setEditedData({ ...providerData });
        }
    }, [isEditing, providerData]);

    // Profile Edit Submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Send update request to backend
        axios
            .put(`/provider/update/${userId}`, editedData)
            .then((response) => {
                setProviderData(response.data);
                setIsEditing(false);
                setSuccessMessage("Profile updated successfully! Refreshing page...");
                setErrors(null);

                // Refresh the page after a delay
                setTimeout(() => {
                    window.location.reload();
                }, 2000); // Refresh after 2 seconds
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    console.error("Error updating profile", error);
                }
            });
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="max-w-2xl w-full bg-white rounded-lg shadow-2xl overflow-hidden"
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Provider Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
                    {successMessage && (
                        <div className="bg-green-100 text-green-800 p-4 rounded-md">
                            {successMessage}
                        </div>
                    )}
                    {errors && (
                        <div className="bg-red-100 text-red-800 p-4 rounded-md">
                            {Object.values(errors).map((err, idx) => (
                                <div key={idx}>{err}</div>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        {/* Profile Picture */}
                        <div className="relative flex-shrink-0">
                            <img
                                src={providerData.provider_picPath || "https://via.placeholder.com/150"}
                                alt="Provider Profile"
                                className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                            />
                            <div className="absolute bottom-2 right-2">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-blue-600 focus:outline-none"
                                >
                                    Change
                                </button>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-600 font-medium">Name</label>
                                    {!isEditing ? (
                                        <p className="text-green-600 font-semibold">
                                            {editedData?.provider_name || providerData.provider_name}
                                        </p>
                                    ) : (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedData?.provider_name || ""}
                                            onChange={(e) =>
                                                setEditedData((prev) => ({
                                                    ...prev,
                                                    provider_name: e.target.value,
                                                }))
                                            }
                                            className="w-full p-2 text-black border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-600 font-medium">Contact</label>
                                    {!isEditing ? (
                                        <p className="text-green-600 font-semibold">
                                            {editedData?.provider_contact || providerData.provider_contact}
                                        </p>
                                    ) : (
                                        <input
                                            type="text"
                                            name="contact"
                                            maxLength="11"
                                            value={editedData?.provider_contact || ""}
                                            onChange={(e) =>
                                                setEditedData((prev) => ({
                                                    ...prev,
                                                    provider_contact: e.target.value,
                                                }))
                                            }
                                            className="w-full p-2 text-black border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-600 font-medium">Email</label>
                                    {!isEditing ? (
                                        <p className="text-green-600 font-semibold">
                                            {editedData?.user_email || providerData.user_email}
                                        </p>
                                    ) : (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedData?.user_email || ""}
                                            onChange={(e) =>
                                                setEditedData((prev) => ({
                                                    ...prev,
                                                    user_email: e.target.value,
                                                }))
                                            }
                                            className="w-full p-2 text-black border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end px-6 py-4 border-t space-x-4">
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
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsEditing(false);
                                    }}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-md shadow hover:bg-gray-500 focus:outline-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none"
                                >
                                    Save
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProviderProfileModal;
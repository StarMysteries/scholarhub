import React, { useEffect, useState } from "react";
import axios from "axios";
import useFetchCourses from "../../hooks/useFetchCourses";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditScholarshipModal = ({ isOpen, onClose, scholarshipId, onSubmit }) => {
    const [scholarshipData, setScholarshipData] = useState({
        name: "",
        description: "",
        status: "Active",
        deadline: "",
        courses: [], // This will store the IDs of selected courses
    });
    const [selectedCourses, setSelectedCourses] = useState([]);
    const { courses } = useFetchCourses();

    // Fetch scholarship data when modal opens
    useEffect(() => {
        if (isOpen && scholarshipId) {
            axios
                .get(`/scholarship/${scholarshipId}`)
                .then((response) => {
                    const scholarship = response.data;

                    // Update state with fetched data
                    setScholarshipData({
                        name: scholarship.scholarship_name || "",
                        description: scholarship.scholarship_desc || "",
                        status: scholarship.scholarship_status || "Active",
                        deadline: scholarship.scholarship_deadline || "",
                        courses: scholarship.courses.map((course) => course.course_id),
                    });

                    // Format courses for React-Select
                    setSelectedCourses(
                        scholarship.courses.map((course) => ({
                            value: course.course_id,
                            label: course.course_name,
                        }))
                    );
                })
                .catch((error) => {
                    console.error("Error fetching scholarship data:", error);
                });
        }
    }, [isOpen, scholarshipId]);

    // Convert courses into the format expected by React-Select
    const courseOptions = courses.map((course) => ({
        value: course.course_id,
        label: course.course_name,
    }));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setScholarshipData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDescriptionChange = (value) => {
        setScholarshipData((prevData) => ({
            ...prevData,
            description: value,
        }));
    };

    const handleCourseChange = (selectedOptions) => {
        setSelectedCourses(selectedOptions || []);
        setScholarshipData((prevData) => ({
            ...prevData,
            courses: (selectedOptions || []).map((option) => option.value),
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Prepare the scholarship data for submission
        const scholarshipPayload = {
            name: scholarshipData.name,
            description: scholarshipData.description,
            status: scholarshipData.status,
            deadline: scholarshipData.deadline,
            courses: scholarshipData.courses, // List of course IDs
        };

        // Submit the scholarship update
        axios
            .put(`/scholarship/update/${scholarshipId}`, scholarshipPayload)
            .then((response) => {
                onSubmit(response.data); // Handle the response if needed
                onClose(); // Close the modal
            })
            .catch((error) => {
                console.error("Error submitting scholarship data:", error);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Edit Scholarship</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Scholarship Name</label>
                        <input
                            type="text"
                            name="name"
                            value={scholarshipData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <ReactQuill
                            value={scholarshipData.description}
                            onChange={handleDescriptionChange}
                            placeholder="Enter a description..."
                            className="w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Select Courses</label>
                        <Select
                            isMulti
                            options={courseOptions}
                            value={selectedCourses}
                            onChange={handleCourseChange}
                            placeholder="Select courses..."
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Status</label>
                        <select
                            name="status"
                            value={scholarshipData.status}
                            onChange={handleInputChange}
                            className="w-full py-2 px-3 border border-gray-300 rounded-md"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Deadline/Open Until</label>
                        <input
                            type="datetime-local"
                            name="deadline"
                            value={scholarshipData.deadline}
                            onChange={handleInputChange}
                            required
                            className="w-full py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditScholarshipModal;
import React, { useState } from 'react';
import useFetchCourses from '../../hooks/useFetchCourses';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditScholarshipModal = ({
    isOpen,
    onClose,
    scholarshipData,
    onChange,
    onSubmit,
    message,
}) => {
    const [isEditing, setIsEditing] = useState(false); // Toggle between confirmation and form
    const { courses } = useFetchCourses(); // Fetch courses data
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [description, setDescription] = useState(scholarshipData.description || '');

    if (!isOpen) return null;

    // Convert courses into the format expected by React Select
    const courseOptions = courses.map((course) => ({
        value: course.course_id,
        label: course.course_name,
    }));

    const handleCourseChange = (selectedOptions) => {
        setSelectedCourses(selectedOptions || []);
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
        onChange({ target: { name: 'description', value } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Gather form data
        const scholarshipPayload = {
            name: scholarshipData.name,
            description,
            status: scholarshipData.status,
            deadline: scholarshipData.deadline,
            courses: selectedCourses.map((course) => course.value),
        };

        onSubmit(scholarshipPayload);
        onClose(); // Close the modal after submission
    };

    // If not editing, show the confirmation modal
    if (!isEditing) {
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
                            onClick={() => setIsEditing(true)} // Switch to edit mode
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
    }

    // If editing, show the AddScholarshipModal content
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Edit Scholarship</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Scholarship Name</label>
                        <input
                            type="text"
                            name="name"
                            value={scholarshipData.name}
                            onChange={onChange}
                            required
                            className="w-full py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <ReactQuill
                            value={description}
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
                            onChange={onChange}
                            className="w-full py-2 px-3 border border-gray-300 rounded-md"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Deadline/Open Until</label>
                        <input
                            type="date"
                            name="deadline"
                            value={scholarshipData.deadline}
                            onChange={onChange}
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

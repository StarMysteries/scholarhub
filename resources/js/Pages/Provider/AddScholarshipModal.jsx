import React, { useState, useEffect } from 'react';
import useFetchCourses from '../../hooks/useFetchCourses';

import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill CSS for styling

const AddScholarshipModal = ({ isOpen, onClose, onSubmit, scholarshipData, onChange }) => {
    const { courses } = useFetchCourses(); // Fetch the courses from the backend
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [description, setDescription] = useState(scholarshipData.description || '');

    if (!isOpen) return null;

    // Convert courses into the format expected by React Select
    const courseOptions = courses.map(course => ({
        value: course.course_id,
        label: course.course_name
    }));

    const handleCourseChange = (selectedOptions) => {
        setSelectedCourses(selectedOptions || []);
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
        onChange({ target: { name: 'description', value } }); // Update form state
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Gather the form data
        const scholarshipPayload = {
            name: scholarshipData.name, // Name from scholarshipData prop
            description: description,  // Description from ReactQuill state
            status: scholarshipData.status, // Status from scholarshipData prop
            deadline: scholarshipData.deadline, // Deadline from scholarshipData prop
            courses: selectedCourses.map(course => course.value), // Include selected course ids
        };
    
        onSubmit(scholarshipPayload); // This triggers the parent's handleSubmit
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Add Scholarship</h2>
                <form onSubmit={handleSubmit}> {/* Use handleSubmit here instead of onSubmit */}
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
                            options={courseOptions} // Provide options for React Select
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

export default AddScholarshipModal;

import React from 'react';

const AddScholarshipModal = ({ isOpen, onClose, onSubmit, scholarshipData, onChange }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Add Scholarship</h2>
                <form onSubmit={onSubmit}>
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
                        <textarea
                            name="description"
                            value={scholarshipData.description}
                            onChange={onChange}
                            required
                            className="w-full py-2 px-3 border border-gray-300 rounded-md"
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
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Requirements</label>
                        <textarea
                            name="requirements"
                            value={scholarshipData.requirements}
                            onChange={onChange}
                            required
                            className="w-full py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Courses</label>
                        <input
                            type="text"
                            name="courses"
                            value={scholarshipData.courses}
                            onChange={onChange}
                            placeholder="Separate by commas (e.g., Computer Science, Data Science)"
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
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScholarshipModal;

import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Import ReactQuill component
import 'react-quill/dist/quill.snow.css'; // Import default Quill styles

const ScholarshipForm = () => {
  const [description, setDescription] = useState('');

  // Handle the change in Quill editor content
  const handleChange = (value) => {
    setDescription(value);  // Update state with the editor's content
  };

  return (
    <form>
      <div className="bg-white p-4">
        <label htmlFor="description" className="block text-lg font-medium mb-2">Scholarship Criteria</label>

        {/* React Quill Editor */}
        <ReactQuill
          value={description}          // Set the content
          onChange={handleChange}      // Handle changes in content
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline'],
              [{ 'align': [] }],
              ['link', 'image'],
              [{ 'color': [] }, { 'background': [] }],
              ['blockquote', 'code-block'],
              ['clean']  // Adds a "clean" button to clear formatting
            ],
          }}
          placeholder="Enter the scholarship criteria here..."
        />
      </div>

      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default ScholarshipForm;

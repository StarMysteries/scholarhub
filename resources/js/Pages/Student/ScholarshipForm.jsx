import React from "react";

const ScholarshipForm = () => {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button className="text-red-500 text-xl font-bold mr-3">&lt;</button>
          <div>
            <h1 className="text-2xl font-bold">Name of Scholarship</h1>
            <p className="text-gray-600">Name of Scholarship Provider</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-blue-500 text-white rounded-lg p-6 mb-6">
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            venenatis eros purus, vitae ornare massa pellentesque id. Nullam
            elementum tellus turpis, cursus molestie eros pellentesque eu. Orci
            varius natoque penatibus et magnis dis parturient montes.
          </p>
          <p className="font-bold mb-2">Requirements:</p>
          <ul className="list-disc list-inside">
            <li>reqs 1</li>
            <li>reqs 2</li>
            <li>reqs 3</li>
            <li>reqs 4</li>
          </ul>
        </div>

          {/* File Upload Section */}
        <div className="bg-gray-200 rounded-lg p-6 flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-300 rounded-full mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <p className="text-gray-700 font-semibold">Attach Files Here</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-green-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipForm;

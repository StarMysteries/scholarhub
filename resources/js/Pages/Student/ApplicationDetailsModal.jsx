import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const ApplicationDetailsModal = ({ modalData, closeModal }) => {
  if (!modalData) return null; // Return nothing if no data is passed

  // Close the modal if clicked outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        closeModal();
      }
    };

    // Add event listener
    document.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 modal-overlay ">
      <div className="bg-white rounded-lg p-8 w-full sm:w-96 md:w-1/2 lg:w-2/5 shadow-xl transform transition-all duration-300 relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Applicant Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Applicant Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Name:</strong> {modalData.firstName} {modalData.lastName}
            </p>
            <p>
              <strong>Address:</strong> {modalData.address}
            </p>
            <p>
              <strong>Contact:</strong> {modalData.contact}
            </p>
            <p>
              <strong>Course:</strong> {modalData.course}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4">
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold px-2 py-1 rounded ${modalData.status === "Accepted"
                  ? "bg-green-100 text-green-800"
                  : modalData.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
            >
              {modalData.status}
            </span>
          </p>
        </div>

        {/* Rejection Details */}
        {modalData.rejection_details && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
            <p className="text-red-600 font-medium">
              <strong>Reason for Rejection:</strong> {modalData.rejection_details}
            </p>
          </div>
        )}



        {/* Requirements */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-700">Requirements</h3>
          {modalData.Requirements ? (
            <ReactQuill
              value={modalData.Requirements}
              readOnly={true}
              theme="snow"
              modules={{ toolbar: false }} // Disable toolbar
              className="mt-4 border rounded-lg"
            />
          ) : (
            <p className="text-gray-500">No requirements provided.</p>
          )}
        </div>

        {/* Placeholder for Requirements File */}
        <div className="w-full h-48 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-600 mt-6 rounded-lg">
          <span>Placeholder for Requirements File</span>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8">
          <button
            onClick={closeModal}
            className="py-2 px-6 bg-blue-500 text-white rounded-full transition-all hover:bg-blue-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;

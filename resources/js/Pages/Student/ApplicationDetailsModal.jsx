import React, { useEffect } from "react";

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
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 modal-overlay">
      <div className="bg-white rounded-lg p-8 w-full sm:w-96 md:w-1/2 shadow-lg transform transition-all duration-300">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {modalData.scholarshipName}
        </h2>
        <div className="space-y-4">
          <p><strong>First Name:</strong> {modalData.firstName}</p>
          <p><strong>Last Name:</strong> {modalData.lastName}</p>
          <p><strong>Address:</strong> {modalData.address}</p>
          <p><strong>Contact:</strong> {modalData.contact}</p>
          <p><strong>Email:</strong> {modalData.email}</p>
          <p><strong>Course:</strong> {modalData.course}</p>
          <p><strong>Grade File:</strong> {modalData.gradeFile}</p>
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
            <span>Placeholder for Grade File</span>
          </div>
        </div>
        <div className="flex justify-end mt-6">
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

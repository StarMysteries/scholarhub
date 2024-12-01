import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ApplicationDetailsModal from "./ApplicationDetailsModal"; // Import the modal component

const scholarships = [
  {
    id: 1,
    name: "Scholarship Name",
    company: "Scholarship Company",
    status: "Pending",
    courses: [
      { course_id: "CS101" },
      { course_id: "CS102" },
    ],
  },
  {
    id: 2,
    name: "Scholarship Name",
    company: "Scholarship Company",
    status: "Accepted",
    courses: [
      { course_id: "CS103" },
      { course_id: "CS104" },
    ],
  },
  {
    id: 3,
    name: "Scholarship Name",
    company: "Scholarship Company",
    status: "Declined",
    courses: [
      { course_id: "CS105" },
      { course_id: "CS106" },
    ],
  },
];

const AppliedScholarshipPage = () => {
  useAuth("Student");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const filteredScholarships =
    filter === "All"
      ? scholarships
      : scholarships.filter((scholarship) => scholarship.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500"; // Softer green
      case "Declined":
        return "bg-red-500"; // Softer red
      case "Pending":
        return "bg-yellow-500"; // Softer yellow
      default:
        return "bg-gray-400"; // Softer gray
    }
  };

  const openModal = (scholarship) => {
    setModalData({
      scholarshipName: scholarship.name,
      firstName: "John", 
      lastName: "Doe",   
      address: "123 Main St, City, Country", 
      contact: "+123456789",  
      email: "john.doe@example.com", 
      course: "Computer Science", 
      gradeFile: "placeholder-file.pdf", 
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="p-8">
      <div className="container mx-auto mt-8 p-8 space-y-8">

        {/* Filter Dropdown */}
        <div className="flex justify-end mb-6 mt-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-3 px-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-48 sm:w-56 md:w-64 lg:w-72"
          >
            <option value="All">All</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Scholarship Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredScholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="relative bg-white shadow-lg hover:shadow-2xl rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:translate-y-2"
              onClick={() => openModal(scholarship)} // Open modal on card click
            >
              {/* Top section (gradient background based on status) */}
              <div className={`h-32 w-full ${getStatusColor(scholarship.status)} relative`}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                    <span className="text-2xl font-medium text-gray-800">
                      {scholarship.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom section (details) */}
              <div className="p-4 pb-12">
                <h3 className="text-xl font-medium text-gray-800">
                  {scholarship.name}
                </h3>
                <div className="text-gray-600">
                  <span className="font-medium">Courses offered:</span>
                  <div className="inline-flex flex-wrap gap-2 mt-2 ml-2">
                    {scholarship.courses.map((course) => (
                      <span
                        key={course.course_id}
                        className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm font-medium hover:bg-blue-200 cursor-pointer"
                      >
                        {course.course_id}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <ApplicationDetailsModal modalData={modalData} closeModal={closeModal} />
        )}

      </div>
    </div>
  );
};

export default AppliedScholarshipPage;

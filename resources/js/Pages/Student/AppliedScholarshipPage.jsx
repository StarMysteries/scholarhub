import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useFetchApplications from "../../hooks/useFetchApplications";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

const AppliedScholarshipPage = () => {
  useAuth("Student");
  const { applications, loading, error } = useFetchApplications();
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter((app) => app.application_status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-700";
      case "Declined":
        return "bg-red-700";
      case "Pending":
        return "bg-yellow-600";
      default:
        return "bg-gray-400";
    }
  };

  const openModal = (application) => {
    setModalData({
      scholarshipName: application.scholarship_name,
      firstName: application.student_fname,
      lastName: application.student_lname,
      course: application.course_id,
      address: application.student_address,
      contact: application.student_contact,
      email: application.email,
      status: application.application_status,
      deadline: application.scholarship_deadline,
      Requirements: application.scholarship_desc,
      rejection_details: application.rejection_details,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="container mx-auto mt-8 p-8 space-y-8">
        <div className="flex justify-between items-center mb-6 mt-4">
          <div
            className={`px-6 py-2 rounded-md text-white font-semibold text-lg ${getStatusColor(
              filter
            )}`}
          >
            {filter === "All" ? "All Applications" : `${filter} Applications`}
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-3 px-8 rounded-full border border-gray-300 text-gray-700"
          >
            <option value="All">All</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplications.map((application) => (
            <div
              key={application.application_id}
              className="relative bg-white shadow-lg hover:shadow-2xl rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105"
              onClick={() => openModal(application)}
            >
              <div
                className={`h-32 w-full ${getStatusColor(
                  application.application_status
                )} relative`}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                    <span className="text-2xl font-medium text-gray-800">
                      {application.scholarship_name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 pb-12">
                <h3 className="text-xl font-medium text-gray-800">
                  {application.scholarship_name}
                </h3>
                <div className="text-gray-600">
                  <span className="font-medium">Course:</span> {application.course_id}
                </div>
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <ApplicationDetailsModal modalData={modalData} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default AppliedScholarshipPage;

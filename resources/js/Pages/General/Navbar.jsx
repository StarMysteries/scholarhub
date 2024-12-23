import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Import the hamburger icon
import useNavbarFunctions from "../../hooks/useNavbarFunctions";
import Logo from '../../../img/logo.png';
import StudentProfileModal from '../Student/StudentProfileModal'; // Import the modal component

function Navbar({ onToggleSidebar }) {
    const { userRole, userName, studentData, handleLogout } = useNavbarFunctions();

    // State for the StudentProfileModal and student profile data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [studentProfileData, setStudentProfileData] = useState({
        picture: "https://via.placeholder.com/150",
        fname: "Loading...",
        lname: "Loading...",
        contact: "Loading...",
        email: "Loading...",
    });

    // Reset modal state on page load
    useEffect(() => {
        if (studentData) {
            setStudentProfileData({
                picture: studentData.student_picPath || "https://via.placeholder.com/150",
                fname: studentData.student_fname || "Loading...",
                lname: studentData.student_lname || "Loading...",
                contact: studentData.student_contact || "Loading...",
                email: studentData.user_email || "Loading...",
            });
        }
        setIsModalOpen(false);
    }, [studentData]);

    const handleSaveProfile = () => {
        setIsEditing(false);
    };

    // Handle picture change
    const handlePictureChange = (newPictureUrl) => {
        setStudentProfileData((prev) => ({
            ...prev,
            picture: newPictureUrl,
        }));
    };

    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isMoreInfo = location.pathname === "/more_info";
    const isSSForm = location.pathname === "/scholarship_form";

    return (
        <nav className="bg-green-900 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Hamburger Icon Section */}
                <div className="flex items-center space-x-6 sm:space-x-4">
                    {isHomePage &&(
                        <div className="cursor-pointer" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                            <FaBars className="text-white text-2xl" />
                        </div>
                    )}

                    {isMoreInfo &&(
                        <div className="cursor-pointer" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                            <FaBars className="text-white text-2xl" />
                        </div>
                    )}

                    {isSSForm &&(
                        <div className="cursor-pointer" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                            <FaBars className="text-white text-2xl" />
                        </div>
                    )}

                    {/* Logo Section */}
                    <div className="text-2xl font-bold transform hover:scale-105 transition-transform duration-300 ease-in-out">
                        {userRole === "Admin" ? (
                            <Link to="/admin">
                                <img src={Logo} alt="ScholarHub Logo" width={150} height={150} />
                            </Link>
                        ) : userRole !== "Admin" && (
                            <Link to="/">
                                <img src={Logo} alt="ScholarHub Logo" width={150} height={150} />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Navigation Links and User Info */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    {userRole !== "Admin" && (
                        <>
                            <Link to="/" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">Home</Link>
                            <Link to="/about" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">About</Link>

                            {userRole === "Student" && (
                                <Link to="/applied_scholarships" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">Applied Scholarships</Link>
                            )}
                        </>
                    )}

                    {/* Vertical Divider */}
                    <div className="border-l border-green-700 h-6 mx-4"></div>

                    {/* User Info */}
                    {userName && (
                        <span
                            className="text-lg font-semibold text-white cursor-pointer hover:underline"
                            onClick={toggleModal} // Open the modal when clicking username
                        >
                            Welcome, <span className="font-bold">{userName}</span>
                        </span>
                    )}

                    {/* Login/Logout Buttons */}
                    {!userRole ? (
                        <Link to="/login" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">Login</Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 px-3 py-2 rounded transform hover:scale-105 transition-transform duration-300 ease-in-out">
                            Logout
                        </button>
                    )}
                </div>
            </div>

            {/* Student Profile Modal */}
            {isModalOpen && studentData && (
                <StudentProfileModal
                    student={studentProfileData}
                    setStudent={setStudentProfileData}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleSaveProfile={handleSaveProfile}
                    handlePictureChange={handlePictureChange}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </nav>
    );
}

export default Navbar;

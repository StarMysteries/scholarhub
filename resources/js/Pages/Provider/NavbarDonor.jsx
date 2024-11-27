import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import Hooks
import useNavbarFunctions from "../../hooks/useNavbarFunctions";

// Import Modal
import ProviderProfileModal from "./ProviderProfileModal";

// Import Icons
import Logo from "../../../img/logo.png";

function NavbarDonor() {
    const { userName, handleLogout } = useNavbarFunctions();

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [donor, setDonor] = useState({
        picture: "https://via.placeholder.com/150",
        name: "John Doe",
        contact: "(123) 456-7890",
        email: "johndoe@example.com",
    });

    const handleSaveProfile = () => {
        setIsEditing(false);
    };

    const handlePictureChange = (newPicture) => {
        setDonor((prev) => ({ ...prev, picture: newPicture }));
    };

    return (
        <>
            {/* Navbar */}
            <nav className="bg-green-900 text-white p-4 fixed top-0 left-0 w-full z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold transform hover:scale-105 transition-transform duration-300 ease-in-out">
                        <Link to="/donor">
                            <img src={Logo} alt="ScholarHub Logo" width={150} height={150} />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/donor"
                            className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out"
                        >
                            Scholarships
                        </Link>

                        <div className="border-l border-green-700 h-6 mx-2"></div>
                        {userName && (
                            <span
                                onClick={() => setShowProfileModal(true)}
                                className="text-lg font-semibold text-white cursor-pointer hover:underline"
                            >
                                Welcome, <span className="font-bold">{userName}</span>
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 px-3 py-2 rounded transform hover:scale-105 transition-transform duration-300 ease-in-out"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Profile Modal */}
            {showProfileModal && (
                <ProviderProfileModal
                    donor={donor}
                    setDonor={setDonor}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleSaveProfile={handleSaveProfile}
                    handlePictureChange={handlePictureChange}
                    onClose={() => setShowProfileModal(false)}
                />
            )}
        </>
    );
}

export default NavbarDonor;

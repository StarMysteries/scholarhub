import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useNavbarFunctions from "../../hooks/useNavbarFunctions";
import ProviderProfileModal from "./ProviderProfileModal";
import Logo from "../../../img/logo.png";

function NavbarDonor() {
    const { userName, providerData, handleLogout } = useNavbarFunctions();

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [donor, setDonor] = useState({
        picture: "https://via.placeholder.com/150",
        name: "Loading...",
        contact: "Loading...",
        email: "Loading...",
    });

    // Update donor state when providerData changes
    useEffect(() => {
        if (providerData) {
            setDonor({
                picture: providerData.provider_picPath || "https://via.placeholder.com/150",
                name: providerData.provider_name || "Loading...",
                contact: providerData.provider_contact || "Loading...",
                email: providerData.user_email || "Loading...",
            });
        }
    }, [providerData]);

    const handleSaveProfile = () => {
        setIsEditing(false);
    };

    const handlePictureChange = (newPicture) => {
        setDonor((prev) => ({ ...prev, picture: newPicture }));
    };

    return (
        <>
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

            {showProfileModal && providerData && (
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
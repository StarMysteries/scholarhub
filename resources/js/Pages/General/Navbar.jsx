import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Import the hamburger icon

// Import Hooks
import useNavbarFunctions from "../../hooks/useNavbarFunctions";

// Import Icons
import Logo from '../../../img/logo.png';

function Navbar({ onToggleSidebar }) {
    const { userRole, userName, handleLogout } = useNavbarFunctions();

    // Hide sidebar button
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isAboutPage = location.pathname === "/about";
    const isAdminPage = location.pathname === "/admin";

    return (
        <nav className="bg-green-900 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                
                {/* Hamburger Icon Section */}
                <div className="flex items-center space-x-6 sm:space-x-4">
                    {!isLoginPage && !isAboutPage && !isAdminPage &&(
                        <div className="cursor-pointer" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                            <FaBars className="text-white text-2xl" />
                        </div>
                    )}

                    {/* Logo Section */}
                    <div className="text-2xl font-bold transform hover:scale-105 transition-transform duration-300 ease-in-out">
                        {userRole == 'Admin' ? (
                            <Link to="/admin">
                                <img src={Logo} alt="ScholarHub Logo" width={150} height={150} />
                            </Link>
                        ):(
                            <Link to="/">
                                <img src={Logo} alt="ScholarHub Logo" width={150} height={150} />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Navigation Links and User Info */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    {userRole != "Admin" &&(
                        <>
                            <Link to="/" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">Home</Link>
                            <Link to="/about" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">About</Link>
                        </>
                    )}
                    
                    {/* Vertical Divider */}
                    <div className="border-l border-green-700 h-6 mx-4"></div>

                    {/* User Info */}
                    {userName && (
                        <span className="text-lg font-semibold text-white">
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
        </nav>
    );
}

export default Navbar;

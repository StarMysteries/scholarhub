import React from "react";
import { Link } from 'react-router-dom';

// Import Hooks
import useNavbarFunctions from "../hooks/useNavbarFunctions";

// Import Icons
import Logo from '../../img/logo.png';

function Navbar() {
    const { userRole, userName, handleLogout } = useNavbarFunctions();

    return (
        <nav className="bg-green-900 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <Link to="/">
                        <img src={Logo} alt="ScholarHub Logo" width={150} height={150} />
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">Home</Link>
                    <Link to="/about" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">About</Link>
                    <div className="border-l border-green-700 h-6 mx-2"></div>
                    {userName && (
                        <span className="text-lg font-semibold text-white">
                            Welcome, <span className="font-bold">{userName}</span>
                        </span>
                    )}
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
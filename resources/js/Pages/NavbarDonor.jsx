import React from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import darkModeBtn from '../../img/darkmodebtn.png';
import Logo from '../../img/logo.png';

function NavbarDonor(){
    const navigate = useNavigate();

    const providerName = localStorage.getItem('provider_name');

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            // Clear any stored data, e.g., token, user details
            localStorage.removeItem('user_role');
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return(
        <>
            <nav className="bg-green-900 text-white p-4 fixed top-0 left-0 w-full z-10">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left Side */}
                    <div className="text-2xl font-bold transform hover:scale-105 transition-transform duration-300 ease-in-out">
                        <Link to="/">
                            <img src={Logo} alt="ScholarHub Logo" width={150} height={150}/>
                        </Link>
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex space-x-4">
                        {/* Dark Mode Toggle */}
                        {/* <button className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg" onClick={() => document.documentElement.classList.toggle('dark')}>
                            <img src={darkModeBtn} alt="DarkModeBtn" width={25} height={25} />
                        </button> */}

                        {/* Display provider's name */}
                        {providerName && (
                            <span className="text-lg font-semibold text-white px-4 py-1">
                                Welcome, <span className="font-bold text-white">{providerName}</span>
                            </span>
                        )}

                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 px-3 py-2 rounded transform hover:scale-105 transition-transform duration-300 ease-in-out">Logout</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavbarDonor;
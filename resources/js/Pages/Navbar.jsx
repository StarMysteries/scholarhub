import React from "react";
import { Link } from 'react-router-dom';

import darkModeBtn from '../../img/darkmodebtn.png';
import Logo from '../../img/logo.png';

function Navbar(){
    // const navigate = useNavigate();

    // const providerName = localStorage.getItem('provider_name');

    // const handleLogout = async () => {
    //     try {
    //         await axios.post('/logout');
    //         // Clear any stored data, e.g., token, user details
    //         localStorage.removeItem('user_role');
    //         navigate('/login'); // Redirect to the login page
    //     } catch (error) {
    //         console.error("Logout failed:", error);
    //     }
    // };

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
                        <Link to="/" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">Home</Link>
                        <Link to="/about" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">About</Link>

                        {/* Dark Mode Toggle */}
                        {/* <button className="px-3 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg" onClick={() => document.documentElement.classList.toggle('dark')}>
                            <img src={darkModeBtn} alt="DarkModeBtn" width={25} height={25} />
                        </button> */}

                        {/* Conditionally render login/logout buttons */}
                        {/* {!userRole ? (
                            <Link to="/login" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">Login</Link>
                        ) : (
                            <button 
                                onClick={handleLogout} 
                                className="bg-red-500 hover:bg-red-700 px-3 py-2 rounded transform hover:scale-105 transition-transform duration-300 ease-in-out">
                                Logout
                            </button>
                        )} */}
                        <Link to="/login" className="hover:bg-green-700 px-3 py-2 rounded font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out">Login</Link>

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
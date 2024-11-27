import React, { useState } from 'react';
import Sidebar from '../Pages/Student/Sidebar';
import Navbar from '../Pages/General/Navbar';
import { Outlet } from 'react-router-dom';

function HomeStudentLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar onToggleSidebar={toggleSidebar} />
            <div className="flex flex-1 mt-16">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <main className={`flex-1 ${isSidebarOpen ? 'ml-72' : 'ml-0'} transition-all duration-300`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default HomeStudentLayout;
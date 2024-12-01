import React from 'react';
import Sidebar from '../Pages/Student/Sidebar';
import Navbar from '../Pages/General/Navbar';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '../hooks/useSidebarContext';

function LayoutWrapper() {
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    return (
        <div className="flex flex-col h-screen">
            <Navbar onToggleSidebar={toggleSidebar} />
            <div className="flex flex-1 mt-16">
                <Sidebar />
                <main 
                    className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default function HomeStudentLayout() {
    return (
        <SidebarProvider> {/* Wrap layout with provider */}
            <LayoutWrapper />
        </SidebarProvider>
    );
}

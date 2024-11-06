import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Pages/Sidebar';
import Navbar from '../Pages/Navbar';

function HomeStudentLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <Sidebar />
        <main className="flex-1 ml-72">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default HomeStudentLayout;
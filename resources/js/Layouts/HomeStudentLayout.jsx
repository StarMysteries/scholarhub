import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Pages/Student/Sidebar';
import Navbar from '../Pages/General/Navbar';

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
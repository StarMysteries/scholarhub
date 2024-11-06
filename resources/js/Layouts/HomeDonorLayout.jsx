import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarDonor from '../Pages/NavbarDonor';

function HomeStudentLayout() {
  return (
    <div className="flex flex-col h-screen">
      <NavbarDonor />
      <div className="flex flex-1 mt-16">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default HomeStudentLayout;
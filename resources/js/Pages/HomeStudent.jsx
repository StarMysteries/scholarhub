import React, { useEffect, useState } from 'react';
import '../../css/app.css';
import { useAuth } from '../hooks/UseAuth';

function HomeStudent() {
    return (
        <>
            {/* Scholarship Card */}
            <div className="pl-4 pr-4 grid gap-4 mt-3">
                <div className="bg-gray-300 p-4 rounded-lg flex items-center">
                    {/* Icon */}
                    <div className="bg-red-400 w-12 h-12 rounded-full flex-shrink-0"></div>

                    <div className="ml-4">
                        {/* Scholarship Name */}
                        <h3 className="text-xl font-semibold">Scholarship Name</h3>

                        {/* Scholarship courses */}
                        <p className="text-gray-700">
                            Courses offered:
                            <a href="#" className="text-blue-600 ml-3">BSIS</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeStudent;
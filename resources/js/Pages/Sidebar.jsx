import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function Sidebar() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
      axios.get('/courses')
          .then(response => {
              setCourses(response.data);
          })
          .catch(error => {
              console.error('There was an error fetching the courses!', error);
          });
  }, []);

  return (
    <div className="w-72 h-[calc(100vh-4rem)] bg-green-600 dark:bg-green-800 text-white fixed top-16 left-0 overflow-y-auto">
      <div className="p-4">
        
        {/* Filter */}
        <div>
          <div className="divide-y divide-solid">
            <h1 className="text-xl font-bold px-2 mt-2">Filter Courses</h1>

            {/* Searchbar */}
            <div className="px-4 py-1">
              <div className="flex items-center bg-white rounded-lg shadow-md w-full max-w-md px-4 py-2 mt-2 sm:text-sm">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="bg-transparent focus:outline-none text-gray-500 w-full"
                />
              </div>
            </div>
          </div>

          {/* Display list of courses */}
          <ul className="mt-4">
            {courses.map(course => (
              <li key={course.id} className="block px-4 py-1 hover:bg-green-700">
                {course.course_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
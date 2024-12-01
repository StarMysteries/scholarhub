import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // For API requests
import useSignUpStudent from '../../hooks/useSignUpStudent';

const SignUpStudent = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        address: '',
        contact: '',
        email: '',
        password: '',
        course_id: '',
    });

    const [courses, setCourses] = useState([]); // Store fetched courses
    const { signUp, isLoading, error } = useSignUpStudent();
    const [showPassword, setShowPassword] = useState(false);

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/courses'); // Update with your API endpoint
                setCourses(response.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
            }
        };

        fetchCourses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            user_email: formData.email,
            user_password: formData.password,
            student_fname: formData.fname,
            student_lname: formData.lname,
            student_address: formData.address,
            student_contact: formData.contact,
            course_id: formData.course_id,
        };

        const response = await signUp(formattedData);
        if (response) {
            console.log('Sign up successful', response);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mt-12">
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up - Student</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Contact (11 digits)"
                            onChange={handleChange}
                            maxLength="11"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <select
                            name="course_id"
                            value={formData.course_id}


                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        >
                            <option value="" disabled>Select your course</option>
                            {courses.map((course) => (
                                <option key={course.course_id} value={course.course_id}>
                                    {course.course_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                required
                            />
                            <span
                                onClick={handlePasswordToggle}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <Link to="/login" className="ml-1 text-blue-600 hover:underline">Login</Link>
                    </p>
                </div>

                 {/* Back Button */}
                 <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Pressed the wrong button?
                            <Link to="/signup" className="ml-1 text-blue-600 hover:underline">Go back</Link>
                        </p>
                    </div>

                    
            </div>
        </div>
    );
};

export default SignUpStudent;

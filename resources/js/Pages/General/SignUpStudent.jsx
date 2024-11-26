import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import icons for eye visibility

const SignUpStudent = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        address: '',
        contact: '',
        picture: null,
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, picture: e.target.files[0] });
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Handle form submission logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up - Student</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* First Name */}
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

                    {/* Last Name */}
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

                    {/* Address */}
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

                    {/* Contact Number */}
                    <div>
                        <input
                            type="text"
                            placeholder="Contact (11 digits)"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            maxLength="11"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
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

                    {/* Upload Picture */}
                    <div>
                        <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="picture">Upload Profile Picture (Optional)</label>
                        <input
                            type="file"
                            name="picture"
                            onChange={handleFileChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <Link to="/login" className="ml-1 text-blue-600 hover:underline">Login</Link>
                    </p>

                    {/* Back Button */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Pressed the wrong button?
                            <Link to="/signup" className="ml-1 text-blue-600 hover:underline">Go back</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpStudent;

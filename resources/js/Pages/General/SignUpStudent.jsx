import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useSignUpStudent from '../../hooks/useSignUpStudent'; // Import the hook

const SignUpStudent = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        address: '',
        contact: '',
        email: '',
        picture: null,
        password: '',
        course_id: '', // Added course_id field
    });

    const { signUp, isLoading, error } = useSignUpStudent();

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, picture: e.target.files[0] });
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            user_email: formData.email, // Map to Laravel's expected field name
            user_password: formData.password, // Map to Laravel's expected field name

            student_fname: formData.fname,
            student_lname: formData.lname,
            student_address: formData.address,
            student_contact: formData.contact,
            course_id: formData.course_id, // Map course_id
            student_picPath: formData.picture, // Map picture to student_picPath
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

                    {/* Email */}
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

                    {/* Course ID */}
                    <div>
                        <select
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        >
                            <option value="" disabled>Select your course</option>
                            <option value="BSIS">Course 1</option>
                            <option value="BSIT">Course 2</option>
                            <option value="BSCS">Course 3</option>
                        </select>
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

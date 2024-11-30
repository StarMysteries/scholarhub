import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useSignUpProvider from '../../hooks/useSignUpProvider';

const SignUpProvider = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [certification, setCertification] = useState(null);  // To hold the certification file
    const { signUp, isLoading, error } = useSignUpProvider();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleCertificationChange = (e) => {
        const file = e.target.files[0]; // Get the first file selected
        if (file) {
            setCertification(file); // Store the file
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            user_email: formData.email,
            user_password: formData.password,
            provider_name: formData.name,
            provider_contact: formData.contact,
        };

        console.log('Submitting data:', formattedData);
        console.log('Certification file:', certification);  // Just showing it in frontend for now

        const response = await signUp(formattedData);
        if (response) {
            console.log('Sign up successful', response);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up - Provider</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Business Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Contact Number (11 digits)"
                            name="contact"
                            value={formData.contact}
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

                    {/* Certification File Input (Frontend only) */}
                    <div>
                        <label className="block text-gray-700">Certification of Legitimacy</label>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleCertificationChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        />
                        {certification && (
                            <div className="text-gray-600 mt-2">Selected file: {certification.name}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                {error && <div className="text-red-500 mt-2">{error}</div>}

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <Link to="/login" className="ml-1 text-blue-600 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpProvider;

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message before submission

        try {
            const response = await axios.post('/login', {
                user_email: email,
                user_password: password,
            });

            if (response.status === 200) {
                const {user_role, provider_name} = response.data;

                // Store user data in local storage
                localStorage.setItem('user_role', user_role);
                if (user_role === 'Provider' && provider_name) {
                    localStorage.setItem('provider_name', provider_name);
                }

                if(user_role === 'Admin'){
                    navigate('/');
                }else if(user_role === 'Provider'){
                    navigate('/donor');
                }else if(user_role === 'Student'){
                    navigate('/');
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="text-right">
                        <a href="#" className="text-green-900 hover:underline text-sm">Forgot password?</a>
                    </div>

                    <div>
                        <button type="submit" className="w-full bg-green-900 text-white py-2 rounded-lg hover:bg-teal-700">
                            Login
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?
                        <Link to="/signup" className="ml-1 text-green-900 hover:underline">Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

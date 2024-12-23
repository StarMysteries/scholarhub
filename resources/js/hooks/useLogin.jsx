import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/login', {
                user_email: email,
                user_password: password,
            });

            if (response.status === 200) {
                const { user_id, user_role, student_fname, student_lname, admin_name } = response.data;

                // Store user data in local storage
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('user_role', user_role);

                if (user_role === 'Student' && student_fname && student_lname) {
                    localStorage.setItem('student_fname', student_fname);
                    localStorage.setItem('student_lname', student_lname);
                } else if (user_role === 'Admin' && admin_name) {
                    localStorage.setItem('admin_name', admin_name);
                }

                // Navigate user to page depending on role
                if (user_role === 'Admin') {
                    navigate('/admin');
                } else if (user_role === 'Provider') {
                    navigate('/donor');
                } else if (user_role === 'Student') {
                    navigate('/');
                }
            }
        } catch (error) {
            // Handle errors: Check for specific error message from the server
            if (error.response) {
                if (error.response.status === 401) {
                    setError('Invalid email or password');
                } else if (error.response.status === 403) {
                    setError(error.response.data.message || 'Your account is pending or denied. Please contact support.');
                } else {
                    setError('An error occurred. Please try again.');
                }
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return { email, setEmail, password, setPassword, error, handleSubmit };
}

export default useLogin;
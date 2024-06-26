import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    const handleLogin = async (formData) => {
        try {
            const response = await axios.post('http://localhost:8000/login', formData, { withCredentials: true });
            if (response.data.message === "logged in successfully") {
                sessionStorage.setItem('loginStatus', 1);
                window.location.href = "/main";
            } else if (response.data.message === "logged in as admin") {
                sessionStorage.setItem('loginStatus', 0);
                window.location.href = "/admin";
            }
        } catch (error) {
            console.error('error during login', error.response.data);
        }
    };

    const googleSignIn = () => {
        window.location.href = 'http://localhost:8000/auth/google';
    };

    return (
        <div>
            <Navbar />
            <LoginForm title="Login" onSubmit={handleLogin} googleSignIn={googleSignIn} />
        </div>
    );
};

export default LoginPage;
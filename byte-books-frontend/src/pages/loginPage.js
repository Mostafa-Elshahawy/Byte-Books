import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';


const LoginPage = () => {

    const handleLogin = async (formData)=>{
        try {
            const response = await axios.post('http://localhost:8000/login',formData);
            if (response.data.messege === "logged in successfully"){
              window.location.href = "/main";
            }
        }catch (error) {
            console.error('error during login',error.response.data);
        }
    };
    return (
        <div>
        <Navbar />
        <LoginForm title="Login" onSubmit={handleLogin} />
      </div>
    );
};

export default LoginPage;
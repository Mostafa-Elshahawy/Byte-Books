import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';


const LoginPage = () => {

    const handleLogin = async (formData)=>{
        try {
            const response = await axios.post('http://localhost:8000/login',formData,{withCredentials:true});
            if (response.data.message === "logged in successfully"){
                sessionStorage.setItem('loginStatus',1);
                window.location.href = "/main";
            }else if (response.data.message === "logged in as admin"){
                sessionStorage.setItem('loginStatus',0);
                window.location.href = "/admin";
            }
        }catch (error) {
            console.error('error during login',error.response.data);
        }
    };

    const googleSignIn = async () => {
      window.location.href = 'http://localhost:8000/auth/google';
    };

    const handleUserAuthentication = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if(code){
            const response = await fetch(`http://localhost:8000/auth/google/callback?code=${code}`);
            if (response.data.message === "user logged in using google account"){
                sessionStorage.setItem('loginStatus',1);
                window.location.href = 'http://localhost:3000/main'
            } else {
                // Handle authentication failure or error
                console.error('User authentication failed');
            }}else{
                console.error('code not found in query paremeters');
            }
        }catch (error) {
            console.error('Error during user authentication:', error);
        }

    };

    // Check if the current URL contains the callback path from Google OAuth
    React.useEffect(() => {
        const url = new URL(window.location.href);
        if (url.pathname === '/auth/google/callback' && url.search === '') {
            handleUserAuthentication();
        }
    }, []); // Empty dependency array to run this effect only once
    return (
        <div>
        <Navbar />
        <LoginForm title="Login" onSubmit={handleLogin} googleSignIn={googleSignIn}/>
      </div>
    );
};

export default LoginPage;
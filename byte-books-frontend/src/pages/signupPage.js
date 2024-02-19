import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SignUpForm from '../components/SignupForm';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');

  const handleSignUp = async ()=>{
    try{
      const response = await axios.post('http://localhost:8000/signup', {
        username,
        password,
        email,
        phone,
        address,
      });
      if (response.data.message === "signed up successfully"){
        window.location.href = "/main";
      }
    }
    catch(error){
      console.error('error during signup',error.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      <SignUpForm title='signUp' onSubmit={handleSignUp}>
        <label>username:<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
        <label>email:<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>password:<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <label>phone:<input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
        <label>address:<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></label>
      </SignUpForm>
    </div>
  )

};

export default SignupPage;
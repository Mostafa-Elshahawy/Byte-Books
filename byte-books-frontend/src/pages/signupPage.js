import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SignUpForm from '../components/SignupForm';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');

  const handleSignUp = async ()=>{
    try{
      const response = axios.get('http://localhost:5000/signup', {
        username,
        password,
        email,
        fname,
        lname,
      });
      console.log('signupSuccessful', response.data);
    }
    catch(error){
      console.error('error during signup',error.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      <SignUpForm title='signUp' onSubmit={handleSignUp}>
        <label>fname:<input type="text" value={fname} onChange={(e) => setFname(e.target.value)} /></label>
        <label>lname:<input type="text" value={lname} onChange={(e) => setLname(e.target.value)} /></label>
        <label>username:<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
        <label>email:<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>password:<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      </SignUpForm>
    </div>
  )

};

export default SignupPage;
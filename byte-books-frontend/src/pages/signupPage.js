import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SignUpForm from '../components/SignupForm';

const SignupPage = () => {

  const handleSignUp = async (formData)=>{
    try{
      const response = await axios.post('http://localhost:8000/signup', formData);
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
      <SignUpForm title='signUp' onSubmit={handleSignUp}/>
        
    </div>
  )

};

export default SignupPage;
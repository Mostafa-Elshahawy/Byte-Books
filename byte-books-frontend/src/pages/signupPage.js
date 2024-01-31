import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Form from '../components/Form';
import Footer from '../components/Footer';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSignup = async ()=>{
        try {
            const response = await axios.post('http://localhost:5000/signup', {
              username,
              password,
            });
      
            // Handle successful signup response
            console.log('Signup successful:', response.data);
          } catch (error) {
            // Handle signup error
            console.error('Signup error:', error.response.data);
          }
    };
    return (
        <div>
        <Navbar />
        <Form
          title="Signup"
          onSubmit={handleSignup}
        >
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </Form>
        <Footer />
      </div>
    );
};

export default SignupPage;
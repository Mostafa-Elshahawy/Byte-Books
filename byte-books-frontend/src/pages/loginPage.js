import React,{useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Form from '../components/Form';
import Footer from '../components/Footer';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async ()=>{
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            });
            console.log('loginSuccessful', response.data);
        }catch (error) {
            console.error('error during login',error.response.data);
        }
    };
    return (
        <div>
        <Navbar />
        <Form
          title="Login"
          onSubmit={handleLogin}
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

export default LoginPage;
import React,{useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';


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
        <LoginForm
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
        </LoginForm>
      </div>
    );
};

export default LoginPage;
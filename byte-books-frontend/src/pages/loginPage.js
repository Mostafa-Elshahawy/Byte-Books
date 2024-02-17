import React,{useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async ()=>{
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password,
            });
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
        <LoginForm
          title="Login"
          onSubmit={handleLogin}
        >
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
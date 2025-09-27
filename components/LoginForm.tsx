import { useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../api/axios';
import LogoutButton from "./LogoutButton.tsx";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login form submitted");

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password,
            });

            const jwtToken = response.data;
            console.log('Login response:', response.data);

            setToken(jwtToken);
            localStorage.setItem('token', jwtToken);
            setAuthToken(jwtToken);

            navigate('/dashboard');
            console.log("Navigation triggered");
        } catch (err: any) {
            console.error("Login failed", err?.response?.data || err.message);
            setError('Invalid credentials');
        }
    };



    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {token && <p style={{ wordBreak: 'break-all' }}>JWT: {token}</p>}
            {token && <LogoutButton />}
        </form>
    );
};

export default LoginForm;
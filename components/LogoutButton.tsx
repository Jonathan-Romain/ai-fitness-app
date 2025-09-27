import React from 'react';
import { setAuthToken } from '../api/axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuthToken('');
        localStorage.removeItem('token');
        navigate('/api/auth/login')
    };

    return (
        <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
            Logout
        </button>
    );
};

export default LogoutButton;
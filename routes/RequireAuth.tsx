import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import type {JSX} from "react";

interface RequireAuthProps {
    children: JSX.Element;
}

interface JwtPayload {
    exp: number;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decode = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;
        if (decode.exp < currentTime) {
            localStorage.removeItem('token');
            return <Navigate to="/login" replace />;
        }
    } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />
    }

    return children;
}

export default RequireAuth;
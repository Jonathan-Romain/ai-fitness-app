import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

const token = localStorage.getItem('token');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const setAuthToken = (token: string | null) => {
    if (token){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};

export default api;
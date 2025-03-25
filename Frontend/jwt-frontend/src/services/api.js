import axios from 'axios';

const API_URL = 'http://localhost:5000';
const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/user/signin', credentials);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/user/signup', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const checkProtectedRoute = async () => {
    try {
        const response = await api.get('/user/1');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Authentication failed');
    }
};

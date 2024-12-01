// Centralized Axios setup

import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 5000
})

// Add a request interceptor to attach the token (if available) to each request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retreive token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request error
    }
);

// Add a response interceptor to handle expired tokens or errors globally
api.interceptors.response.use(
    (response) => response, // Simply return the response if successful
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token has expired or user is unauthorized
            console.error('Unauthorized access - possibly invalid/expired token');
            // Optional: Redirect to login or clear the token
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

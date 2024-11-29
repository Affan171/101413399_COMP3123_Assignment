// Centralized Axios setup

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://101413399-comp-3123-assignment-gixz.vercel.app/api/v1',
    timeout: 5000
})

export default api;

// Need to configure token
// Add a request interceptor to attach the token (if available) to each request
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

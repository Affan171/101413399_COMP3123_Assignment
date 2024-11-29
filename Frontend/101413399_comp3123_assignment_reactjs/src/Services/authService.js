// Authentication-related API calls
import api from './api'

// Login API
export const login = (credentials) => {
    // POST request to login endpoint
    return api.post('user/login', credentials); 
}

// Signup API
export const signup = (userData) => {
    // POST request to signup endpoint
    return api.post('/user/signup', userData)
}

// Logout needs to be implemented
// // Logout function (optional, for clearing token on the client side)
// export const logout = () => {
//     localStorage.removeItem('token'); // Clear token from localStorage
// };
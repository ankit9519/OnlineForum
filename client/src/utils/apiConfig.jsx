// Import the axios library for making HTTP requests
import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:5000/api';

// Create an instance of axios with a base URL and default headers
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add an interceptor to modify the request configuration before sending
api.interceptors.request.use(function (config) {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Set the Authorization header with the token (if available)
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    // Return the modified configuration
    return config;
});

// Export the configured axios instance as the default export of this module
export default api;

// This code contains functions for registering a new user, logging in an existing user, 
// and logging out a user by removing the authentication token from localStorage. 
// It also includes logging and error handling for better development and debugging.

import api from '../utils/apiConfig'; // Import the custom API configuration
import { getErrorMessage, showError } from '../utils/errorHandling'; // Import utility functions for error handling

const API_BASE_URL = '/users'; // Define the base URL for the users API

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        console.log('Registering user:', userData); // Log the user data before making the API call
        const response = await api.post(`${API_BASE_URL}/register`, userData); // Make a POST request to register a new user
        console.log('Register response:', response.data); // Log the response data after a successful registration
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error registering user:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to log in an existing user
export const loginUser = async (userData) => {
    try {
        const response = await api.post(`${API_BASE_URL}/login`, userData); // Make a POST request to log in a user
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error logging in user:', error); // Log the entire error object
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to log out a user by removing the token from localStorage
export const logoutUser = () => {
    localStorage.removeItem('token'); // Remove the 'token' key from localStorage
};

// Export the functions as an object
export default {
    registerUser,
    loginUser,
    logoutUser
};

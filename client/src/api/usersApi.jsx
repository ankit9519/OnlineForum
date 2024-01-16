import api from '../utils/apiConfig'; // Import the custom API configuration

// Base URL for user profiles
const API_BASE_URL = '/profiles';

// Function to get user profile
export const getProfile = async () => {
    try {
        const response = await api.get(`${API_BASE_URL}/profile`); // Make a GET request to retrieve user profile
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error getting profile:', error); // Log and handle the error
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to update user profile
export const updateProfile = async (profileData) => {
    try {
        const response = await api.put(`${API_BASE_URL}/profile`, profileData); // Make a PUT request to update user profile
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error updating profile:', error); // Log and handle the error
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to delete user profile
export const deleteProfile = async () => {
    try {
        const response = await api.delete(`${API_BASE_URL}/profile`); // Make a DELETE request to delete user profile
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error deleting profile:', error); // Log and handle the error
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to get user's questions
export const getUserQuestions = async () => {
    try {
        const response = await api.get(`${API_BASE_URL}/questions`); // Make a GET request to retrieve user's questions
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error getting user questions:', error); // Log and handle the error
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to get user's answers
export const getUserAnswers = async () => {
    try {
        const response = await api.get(`${API_BASE_URL}/answers`); // Make a GET request to retrieve user's answers
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error getting user answers:', error); // Log and handle the error
        throw error; // Throw the error to be handled by the caller
    }
};

// Exporting functions as an object for easy import
export default {
    getProfile,
    updateProfile,
    deleteProfile,
    getUserQuestions,
    getUserAnswers
};

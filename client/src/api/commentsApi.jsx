// This code contains functions for getting comments by answer ID, posting a new comment, updating an existing comment, and deleting an existing comment. It also includes logging and error handling for better development and debugging.

import api from '../utils/apiConfig'; // Import the custom API configuration
import { getErrorMessage, showError } from '../utils/errorHandling'; // Import utility functions for error handling

const API_BASE_URL = '/comments'; // Define the base URL for the comments API

// Function to get comments by answer ID
export const getCommentsByAnswer = async (answerId) => {
    try {
        // Corrected URL to match the backend route
        const response = await api.get(`${API_BASE_URL}/answer/${answerId}`); // Make a GET request to retrieve comments by answer ID
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error getting comments:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to post a new comment
export const postComment = async (answerId, commentData) => {
    try {
        const response = await api.post(`${API_BASE_URL}`, { ...commentData, answerId }); // Make a POST request to post a comment
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error posting comment:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to update an existing comment
export const updateComment = async (commentId, commentData) => {
    try {
        const response = await api.put(`${API_BASE_URL}/${commentId}`, commentData); // Make a PUT request to update a comment
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error updating comment:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to delete an existing comment
export const deleteComment = async (commentId) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/${commentId}`); // Make a DELETE request to delete a comment
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error deleting comment:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

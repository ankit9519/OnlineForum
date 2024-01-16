// This code contains functions for interacting with questions, including posting, retrieving, updating, and deleting questions. It also handles upvoting and downvoting questions, along with logging and error handling for development and debugging.

import api from '../utils/apiConfig'; // Import the custom API configuration
import { getErrorMessage, showError } from '../utils/errorHandling'; // Import utility functions for error handling

// Function to post a new question
export const postQuestion = async (questionData) => {
    try {
        const response = await api.post('/questions/', questionData); // Make a POST request to post a question
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error posting question:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to get all questions
export const getAllQuestions = async () => {
    try {
        const response = await api.get('/questions'); // Make a GET request to retrieve all questions
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error getting all questions:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to get a specific question by ID
export const getQuestion = async (questionId) => {
    try {
        const response = await api.get(`/questions/${questionId}`); // Make a GET request to retrieve a specific question by ID
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error getting question:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to update an existing question by ID
export const updateQuestion = async (questionId, questionData) => {
    try {
        const response = await api.put(`/questions/${questionId}`, questionData); // Make a PUT request to update a question by ID
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error updating question:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to delete an existing question by ID
export const deleteQuestion = async (questionId) => {
    try {
        const response = await api.delete(`/questions/${questionId}`); // Make a DELETE request to delete a question by ID
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error deleting question:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to upvote a question by ID
export const upvoteQuestion = async (questionId) => {
    try {
        const response = await api.post(`/questions/${questionId}/upvote`); // Make a POST request to upvote a question by ID
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error upvoting question:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to downvote a question by ID
export const downvoteQuestion = async (questionId) => {
    try {
        const response = await api.post(`/questions/${questionId}/downvote`); // Make a POST request to downvote a question by ID
        return response.data; // Return the response data if successful
    } catch (error) {
        console.error('Error downvoting question:', getErrorMessage(error)); // Log and handle the error using utility functions
        showError(getErrorMessage(error)); // Display an error message to the user
        throw error; // Throw the error to be handled by the caller
    }
};

// This code contains a set of functions for interacting with the API to perform various actions related to answers, 
// such as posting, fetching, updating, and deleting answers, as well as upvoting and downvoting.

import api from '../utils/apiConfig'; // Import the custom API configuration

const API_BASE_URL = '/answers'; // Define the base URL for the answers API

// Function to post an answer to a specific question
export const postAnswer = async (questionId, answerData) => {
    try {
        const response = await api.post(`${API_BASE_URL}/question/${questionId}`, answerData);
        return response.data; // Return the response data if successful
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error posting answer"); // Throw an error with the message from the response or a default message
    }
};

// Function to get answers for a specific question
export const getAnswersByQuestion = async (questionId) => {
    try {
        const response = await api.get(`/answers/question/${questionId}`);
        return response.data; // Return the response data if successful
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error fetching answers"); // Throw an error with the message from the response or a default message
    }
};

// Function to get a specific answer by ID
export const getAnswer = async (answerId) => {
    try {
        const response = await api.get(`${API_BASE_URL}/${answerId}`);
        return response.data; // Return the response data if successful
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error fetching answer"); // Throw an error with the message from the response or a default message
    }
};

// Function to update an existing answer
export const updateAnswer = async (answerId, answerData) => {
    try {
        const response = await api.put(`${API_BASE_URL}/${answerId}`, answerData);
        return response.data; // Return the response data if successful
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error updating answer"); // Throw an error with the message from the response or a default message
    }
};

// Function to delete an existing answer
export const deleteAnswer = async (answerId) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/${answerId}`);
        return response.data; // Return the response data if successful
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error deleting answer"); // Throw an error with the message from the response or a default message
    }
};

// Function to upvote an answer
export const upvoteAnswer = async (answerId) => {
    try {
        const response = await api.post(`${API_BASE_URL}/${answerId}/upvote`);
        return response.data; // Return the response data if successful
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error upvoting answer"); // Throw an error with the message from the response or a default message
    }
};

// Function to downvote an answer
export const downvoteAnswer = async (answerId) => {
    try {
        const response = await api.post(`${API_BASE_URL}/${answerId}/downvote`);
        return response.data; // Return the response data if successful
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error downvoting answer"); // Throw an error with the message from the response or a default message
    }
};

// Export the functions as an object
export default {
    postAnswer,
    getAnswersByQuestion,
    getAnswer,
    updateAnswer,
    deleteAnswer,
    upvoteAnswer,
    downvoteAnswer
};

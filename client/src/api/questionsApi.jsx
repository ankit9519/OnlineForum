import api from '../utils/apiConfig';
import { getErrorMessage, showError } from '../utils/errorHandling';


export const postQuestion = async (questionData) => {
    try {
        const response = await api.post('/questions/', questionData);
        return response.data;
    } catch (error) {
        console.error('Error posting question:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

export const getAllQuestions = async () => {
    try {
        const response = await api.get('/questions');
        return response.data;
    } catch (error) {
        console.error('Error getting all questions:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

export const getQuestion = async (questionId) => {
    try {
        const response = await api.get(`/questions/${questionId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting question:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

export const updateQuestion = async (questionId, questionData) => {
    try {
        const response = await api.put(`/questions/${questionId}`, questionData);
        return response.data;  // Returns the updated question
    } catch (error) {
        console.error('Error updating question:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

export const deleteQuestion = async (questionId) => {
    try {
        const response = await api.delete(`/questions/${questionId}`);
        return response.data;  // Returns confirmation of deletion
    } catch (error) {
        console.error('Error deleting question:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

export const upvoteQuestion = async (questionId) => {
    try {
        const response = await api.post(`/questions/${questionId}/upvote`);
        return response.data;  // Returns the question with updated upvotes
    } catch (error) {
        console.error('Error upvoting question:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

export const downvoteQuestion = async (questionId) => {
    try {
        const response = await api.post(`/questions/${questionId}/downvote`);
        return response.data;  // Returns the question with updated downvotes
    } catch (error) {
        console.error('Error downvoting question:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

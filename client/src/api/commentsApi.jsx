import api from '../utils/apiConfig';
import { getErrorMessage, showError } from '../utils/errorHandling';

const API_BASE_URL = '/comments';

export const getCommentsByAnswer = async (answerId) => {
    try {
        // Corrected URL to match the backend route
        const response = await api.get(`${API_BASE_URL}/answer/${answerId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting comments:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

export const postComment = async (answerId, commentData) => {
    try {
        const response = await api.post(`${API_BASE_URL}`, { ...commentData, answerId });
        return response.data;
    } catch (error) {
        console.error('Error posting comment:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

export const updateComment = async (commentId, commentData) => {
    try {
        const response = await api.put(`${API_BASE_URL}/${commentId}`, commentData);
        return response.data;
    } catch (error) {
        console.error('Error updating comment:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/${commentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

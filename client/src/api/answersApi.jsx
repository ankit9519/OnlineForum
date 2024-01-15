import api from '../utils/apiConfig';

const API_BASE_URL = '/answers';

export const postAnswer = async (questionId, answerData) => {
    try {
        const response = await api.post(`${API_BASE_URL}/question/${questionId}`, answerData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error posting answer");
    }
};

export const getAnswersByQuestion = async (questionId) => {
    try {
        const response = await api.get(`/answers/question/${questionId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error fetching answers");
    }
};

export const getAnswer = async (answerId) => {
    try {
        const response = await api.get(`${API_BASE_URL}/${answerId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error fetching answer");
    }
};

export const updateAnswer = async (answerId, answerData) => {
    try {
        const response = await api.put(`${API_BASE_URL}/${answerId}`, answerData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error updating answer");
    }
};

export const deleteAnswer = async (answerId) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/${answerId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error deleting answer");
    }
};

export const upvoteAnswer = async (answerId) => {
    try {
        const response = await api.post(`${API_BASE_URL}/${answerId}/upvote`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error upvoting answer");
    }
};

export const downvoteAnswer = async (answerId) => {
    try {
        const response = await api.post(`${API_BASE_URL}/${answerId}/downvote`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error downvoting answer");
    }
};

export default {
    postAnswer,
    getAnswersByQuestion,
    getAnswer,
    updateAnswer,
    deleteAnswer,
    upvoteAnswer,
    downvoteAnswer
};

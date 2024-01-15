import api from '../utils/apiConfig';

const API_BASE_URL = '/profiles';

export const getProfile = async () => {
    try {
        const response = await api.get(`${API_BASE_URL}/profile`);
        return response.data;
    } catch (error) {
        console.error('Error getting profile:', error);
        throw error;
    }
};

export const updateProfile = async (profileData) => {
    try {
        const response = await api.put(`${API_BASE_URL}/profile`, profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

export const deleteProfile = async () => {
    try {
        const response = await api.delete(`${API_BASE_URL}/profile`);
        return response.data;
    } catch (error) {
        console.error('Error deleting profile:', error);
        throw error;
    }
};

export const getUserQuestions = async () => {
    try {
        const response = await api.get(`${API_BASE_URL}/questions`);
        return response.data;
    } catch (error) {
        console.error('Error getting user questions:', error);
        throw error;
    }
};

export const getUserAnswers = async () => {
    try {
        const response = await api.get(`${API_BASE_URL}/answers`);
        return response.data;
    } catch (error) {
        console.error('Error getting user answers:', error);
        throw error;
    }
};

export default {
    getProfile,
    updateProfile,
    deleteProfile,
    getUserQuestions,
    getUserAnswers
};

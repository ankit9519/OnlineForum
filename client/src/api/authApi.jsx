import api from '../utils/apiConfig';
import { getErrorMessage, showError } from '../utils/errorHandling';

const API_BASE_URL = '/users';

export const registerUser = async (userData) => {
    try {
        console.log('Registering user:', userData);
        const response = await api.post(`${API_BASE_URL}/register`, userData);
        console.log('Register response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', getErrorMessage(error));
        showError(getErrorMessage(error));
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post(`${API_BASE_URL}/login`, userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error); // Logging the entire error object
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};

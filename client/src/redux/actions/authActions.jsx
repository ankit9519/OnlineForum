import * as api from '../../api/authApi';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';
export const CHECK_AUTH_STATUS = 'CHECK_AUTH_STATUS';

export const registerUser = (userData) => async (dispatch) => {
    try {
        const data = await api.registerUser(userData);
        localStorage.setItem('token', data.token);  // Store token
        dispatch({ type: LOGIN_USER, payload: { token: data.token } });  // Set isAuthenticated
    } catch (error) {
        console.error('Register Error:', error.response?.data || error);
        dispatch({ type: AUTH_ERROR, payload: error.response?.data || error });
    }
};

export const loginUser = (userData) => async (dispatch) => {
    try {
        const { token } = await api.loginUser(userData);
        localStorage.setItem('token', token);
        dispatch({ type: LOGIN_USER, payload: { token } });
    } catch (error) {
        console.error('Login Error:', error.response?.data || error.message || error);
        dispatch({ type: AUTH_ERROR, payload: error.response?.data || error.message || error });
    }
};

export const logoutUser = () => (dispatch) => {
    api.logoutUser();
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_USER });
};

export const checkAuthStatus = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch({ type: CHECK_AUTH_STATUS, payload: { token } });
    } else {
        // Instead of throwing an error, dispatch an action to update the state
        dispatch({ type: AUTH_ERROR, payload: 'No token found' });
    }
};

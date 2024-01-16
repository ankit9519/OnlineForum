// Import API functions from authApi.js
import * as api from '../../api/authApi';

// Action types for Redux
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';
export const CHECK_AUTH_STATUS = 'CHECK_AUTH_STATUS';

// Action creator to register a new user
export const registerUser = (userData) => async (dispatch) => {
    try {
        // Call the API to register the user with the provided data
        const data = await api.registerUser(userData);

        // Store the token in local storage
        localStorage.setItem('token', data.token);

        // Dispatch the LOGIN_USER action with the token to set isAuthenticated to true
        dispatch({ type: LOGIN_USER, payload: { token: data.token } });
    } catch (error) {
        // Log and dispatch an AUTH_ERROR action with the error data
        console.error('Register Error:', error.response?.data || error);
        dispatch({ type: AUTH_ERROR, payload: error.response?.data || error });
    }
};

// Action creator to log in a user
export const loginUser = (userData) => async (dispatch) => {
    try {
        // Call the API to log in the user with the provided data
        const { token } = await api.loginUser(userData);

        // Store the token in local storage
        localStorage.setItem('token', token);

        // Dispatch the LOGIN_USER action with the token
        dispatch({ type: LOGIN_USER, payload: { token } });
    } catch (error) {
        // Log and dispatch an AUTH_ERROR action with the error data
        console.error('Login Error:', error.response?.data || error.message || error);
        dispatch({ type: AUTH_ERROR, payload: error.response?.data || error.message || error });
    }
};

// Action creator to log out a user
export const logoutUser = () => (dispatch) => {
    // Call the API to log out the user
    api.logoutUser();

    // Remove the token from local storage
    localStorage.removeItem('token');

    // Dispatch the LOGOUT_USER action
    dispatch({ type: LOGOUT_USER });
};

// Action creator to check the authentication status
export const checkAuthStatus = () => (dispatch) => {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Check if a token is found
    if (token) {
        // Dispatch the CHECK_AUTH_STATUS action with the token
        dispatch({ type: CHECK_AUTH_STATUS, payload: { token } });
    } else {
        // Instead of throwing an error, dispatch an action to update the state with an authentication error
        dispatch({ type: AUTH_ERROR, payload: 'No token found' });
    }
};

// Import action types from authActions.js
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_ERROR, CHECK_AUTH_STATUS } from '../actions/authActions';

// Initial state for the authReducer
const initialState = {
    token: localStorage.getItem('token'),  // Retrieve token from localStorage
    isAuthenticated: false,                 // Flag to indicate user authentication status
    error: null                             // Variable to store any errors
};

// Reducer function for handling authentication-related actions
const authReducer = (state = initialState, action) => {
    // Switch statement to handle different action types
    switch (action.type) {
        case REGISTER_USER:
        case LOGIN_USER:
            // Update token, set isAuthenticated to true, and clear error on successful registration/login
            localStorage.setItem('token', action.payload.token);
            return { ...state, token: action.payload.token, isAuthenticated: true, error: null };

        case LOGOUT_USER:
            // Remove token from localStorage and reset state to initial values on logout
            localStorage.removeItem('token');
            return { ...initialState, token: null, isAuthenticated: false };

        case AUTH_ERROR:
            // Remove token from localStorage, reset state to initial values, and update error on authentication error
            localStorage.removeItem('token');
            return { ...initialState, token: null, isAuthenticated: false, error: action.payload };

        case CHECK_AUTH_STATUS:
            // Update isAuthenticated based on the presence of a token, set token, and clear error on checking authentication status
            return {
                ...state,
                isAuthenticated: !!action.payload.token,
                token: action.payload.token,
                error: null
            };

        default:
            // Return the current state for any other actions
            return state;
    }
};

// Export the authReducer as the default export of this module
export default authReducer;

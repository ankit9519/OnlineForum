// Import action types from userActions.js
import {
    GET_PROFILE,
    UPDATE_PROFILE,
    DELETE_PROFILE,
    GET_USER_QUESTIONS,
    GET_USER_ANSWERS,
    USER_ERROR
} from '../actions/userActions';

// Initial state for the userReducer
const initialState = {
    userProfile: null,    // Object to store user profile information
    userQuestions: [],    // Array to store user's posted questions
    userAnswers: [],      // Array to store user's posted answers
    error: null           // Variable to store any errors
};

// Reducer function for handling user-related actions
const userReducer = (state = initialState, action) => {
    // Switch statement to handle different action types
    switch (action.type) {
        case GET_PROFILE:
            // Update userProfile with the payload and clear error
            return { ...state, userProfile: action.payload, error: null };

        case UPDATE_PROFILE:
            // Update userProfile with the payload and clear error
            return { ...state, userProfile: action.payload, error: null };

        case DELETE_PROFILE:
            // Clear userProfile, userQuestions, userAnswers, and error
            return { ...state, userProfile: null, userQuestions: [], userAnswers: [], error: null };

        case GET_USER_QUESTIONS:
            // Update userQuestions array with the payload and clear error
            return { ...state, userQuestions: action.payload, error: null };

        case GET_USER_ANSWERS:
            // Update userAnswers array with the payload and clear error
            return { ...state, userAnswers: action.payload, error: null };

        case USER_ERROR:
            // Update error variable on user-related errors
            return { ...state, error: action.payload };

        default:
            // Return the current state for any other actions
            return state;
    }
};

// Export the userReducer as the default export of this module
export default userReducer;

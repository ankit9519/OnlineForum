// Import action types from questionActions.js
import {
    POST_QUESTION,
    GET_ALL_QUESTIONS,
    GET_QUESTION,
    UPDATE_QUESTION,
    DELETE_QUESTION,
    UPVOTE_QUESTION,
    DOWNVOTE_QUESTION,
    QUESTION_ERROR
} from '../actions/questionActions';

// Initial state for the questionReducer
const initialState = {
    questions: [],             // Array to store questions
    currentQuestion: null,     // Object to store the currently selected question
    error: null                // Variable to store any errors
};

// Reducer function for handling question-related actions
const questionReducer = (state = initialState, action) => {
    // Switch statement to handle different action types
    switch (action.type) {
        case POST_QUESTION:
            // Add the new question at the start of the list and clear error
            return {
                ...state,
                questions: [action.payload, ...state.questions],
                error: null
            };

        case GET_ALL_QUESTIONS:
            // Update questions array with the payload and clear error
            return {
                ...state,
                questions: action.payload,
                error: null
            };

        case GET_QUESTION:
            // Update currentQuestion with the payload and clear error
            return {
                ...state,
                currentQuestion: action.payload,
                error: null
            };

        case UPDATE_QUESTION:
            // Update a specific question by its ID and clear error
            return {
                ...state,
                questions: state.questions.map(question =>
                    question._id === action.payload._id ? action.payload : question),
                currentQuestion: state.currentQuestion && state.currentQuestion._id === action.payload._id
                    ? action.payload
                    : state.currentQuestion,
                error: null
            };

        case DELETE_QUESTION:
            // Remove a question by its ID and clear error
            return {
                ...state,
                questions: state.questions.filter(question => question._id !== action.payload),
                currentQuestion: state.currentQuestion && state.currentQuestion._id === action.payload
                    ? null
                    : state.currentQuestion,
                error: null
            };

        case UPVOTE_QUESTION:
        case DOWNVOTE_QUESTION: {
            // Block scope for UPVOTE_QUESTION and DOWNVOTE_QUESTION
            const updatedQuestions = state.questions.map(question =>
                question._id === action.payload._id ? action.payload : question
            );

            // Update questions array and currentQuestion, and clear error
            return {
                ...state,
                questions: updatedQuestions,
                currentQuestion: state.currentQuestion && state.currentQuestion._id === action.payload._id
                    ? action.payload
                    : state.currentQuestion,
                error: null
            };
        }

        case QUESTION_ERROR:
            // Update error variable on question-related errors
            return {
                ...state,
                error: action.payload.message || 'An error occurred'
            };

        default:
            // Return the current state for any other actions
            return state;
    }
};

// Export the questionReducer as the default export of this module
export default questionReducer;

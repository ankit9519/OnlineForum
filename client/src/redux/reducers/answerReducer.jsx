// Import action types from answerActions.js
import {
    GET_ANSWERS,           // Action type for fetching answers
    POST_ANSWER,           // Action type for posting a new answer
    UPDATE_ANSWER,         // Action type for updating an existing answer
    DELETE_ANSWER,         // Action type for deleting an answer
    UPVOTE_ANSWER,         // Action type for upvoting an answer
    DOWNVOTE_ANSWER,       // Action type for downvoting an answer
    ANSWER_ERROR           // Action type for handling errors related to answers
} from '../actions/answerActions';

// Initial state for the answerReducer
const initialState = {
    answers: [],           // Array to store answers
    error: null            // Variable to store any errors
};

// Reducer function for handling answer-related actions
const answerReducer = (state = initialState, action) => {
    // Switch statement to handle different action types
    switch (action.type) {
        case GET_ANSWERS:
            // Update answers with the array of answers from the action payload
            return { ...state, answers: action.payload, error: null };

        case POST_ANSWER:
            // Add the new answer at the start of the answers list
            return { ...state, answers: [action.payload, ...state.answers], error: null };

        case UPDATE_ANSWER:
            // Update a specific answer by its ID in the answers list
            return {
                ...state,
                answers: state.answers.map(answer =>
                    answer._id === action.payload._id ? action.payload : answer
                ),
                error: null
            };

        case DELETE_ANSWER:
            // Remove an answer by its ID from the answers list
            return {
                ...state,
                answers: state.answers.filter(answer => answer._id !== action.payload),
                error: null
            };

        case UPVOTE_ANSWER:
        case DOWNVOTE_ANSWER:
            // Update upvote or downvote count for a specific answer
            return {
                ...state,
                answers: state.answers.map(answer =>
                    answer._id === action.payload._id ? { ...answer, ...action.payload } : answer
                ),
                error: null
            };

        case ANSWER_ERROR:
            // Handle any errors related to answer actions by updating the error variable
            return { ...state, error: action.payload };

        default:
            // Return the current state for any other actions
            return state;
    }
};

// Export the answerReducer as the default export of this module
export default answerReducer;

// Import action types from commentActions.js
import {
    GET_COMMENTS_BY_ANSWER,
    POST_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    COMMENT_ERROR
} from '../actions/commentActions';

// Initial state for the commentReducer
const initialState = {
    commentsByAnswer: {},  // Object to store comments grouped by answerId
    error: null            // Variable to store any errors
};

// Reducer function for handling comment-related actions
const commentReducer = (state = initialState, action) => {
    // Switch statement to handle different action types
    switch (action.type) {
        case GET_COMMENTS_BY_ANSWER:
            // Update commentsByAnswer with comments for a specific answerId and clear error
            return {
                ...state,
                commentsByAnswer: {
                    ...state.commentsByAnswer,
                    [action.payload.answerId]: action.payload.comments
                },
                error: null
            };

        case POST_COMMENT: {
            // Block scope for POST_COMMENT
            const { comment, answerId } = action.payload;
            const answerComments = state.commentsByAnswer[answerId] || [];
            // Add the new comment to the commentsByAnswer for a specific answerId and clear error
            return {
                ...state,
                commentsByAnswer: {
                    ...state.commentsByAnswer,
                    [answerId]: [...answerComments, comment]
                },
                error: null
            };
        }

        case UPDATE_COMMENT: {
            // Block scope for UPDATE_COMMENT
            const answerComments = state.commentsByAnswer[action.payload.answer].map(comment =>
                comment._id === action.payload._id ? action.payload : comment
            );
            // Update a specific comment within the commentsByAnswer and clear error
            return {
                ...state,
                commentsByAnswer: {
                    ...state.commentsByAnswer,
                    [action.payload.answer]: answerComments
                },
                error: null
            };
        }

        case DELETE_COMMENT: {
            // Block scope for DELETE_COMMENT
            const answerComments = state.commentsByAnswer[action.payload.answer].filter(comment =>
                comment._id !== action.payload._id
            );
            // Remove a specific comment from the commentsByAnswer and clear error
            return {
                ...state,
                commentsByAnswer: {
                    ...state.commentsByAnswer,
                    [action.payload.answer]: answerComments
                },
                error: null
            };
        }

        case COMMENT_ERROR:
            // Update error variable on comment-related errors
            return {
                ...state,
                error: action.payload
            };

        default:
            // Return the current state for any other actions
            return state;
    }
};

// Export the commentReducer as the default export of this module
export default commentReducer;

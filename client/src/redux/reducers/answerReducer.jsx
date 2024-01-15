import {
    GET_ANSWERS,
    POST_ANSWER,
    UPDATE_ANSWER,
    DELETE_ANSWER,
    UPVOTE_ANSWER,
    DOWNVOTE_ANSWER,
    ANSWER_ERROR
} from '../actions/answerActions';

const initialState = {
    answers: [],
    error: null
};

const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ANSWERS:
            // Assuming action.payload contains an array of answers
            return { ...state, answers: action.payload, error: null };

        case POST_ANSWER:
            // Add the new answer at the start of the list
            return { ...state, answers: [action.payload, ...state.answers], error: null };

        case UPDATE_ANSWER:
            // Update a specific answer by its ID
            return {
                ...state,
                answers: state.answers.map(answer =>
                    answer._id === action.payload._id ? action.payload : answer
                ),
                error: null
            };

        case DELETE_ANSWER:
            // Remove an answer by its ID
            return {
                ...state,
                answers: state.answers.filter(answer => answer._id !== action.payload),
                error: null
            };

        case UPVOTE_ANSWER:
        case DOWNVOTE_ANSWER:
            // Update upvote or downvote count for an answer
            return {
                ...state,
                answers: state.answers.map(answer =>
                    answer._id === action.payload._id ? { ...answer, ...action.payload } : answer
                ),
                error: null
            };

        case ANSWER_ERROR:
            // Handle any errors related to answer actions
            return { ...state, error: action.payload };

        default:
            // Return the current state for any other actions
            return state;
    }
};

export default answerReducer;

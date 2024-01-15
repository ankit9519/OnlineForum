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

const initialState = {
    questions: [],
    currentQuestion: null,
    error: null
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_QUESTION:
            return {
                ...state,
                questions: [action.payload, ...state.questions],
                error: null
            };
        case GET_ALL_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
                error: null
            };
        case GET_QUESTION:
            return {
                ...state,
                currentQuestion: action.payload,
                error: null
            };
        case UPDATE_QUESTION:
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
            // Adding curly braces for block scope
            const updatedQuestions = state.questions.map(question =>
                question._id === action.payload._id ? action.payload : question
            );

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
            return {
                ...state,
                error: action.payload.message || 'An error occurred'
            };
        default:
            return state;
    }
};

export default questionReducer;

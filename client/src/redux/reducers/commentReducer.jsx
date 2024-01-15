import {
    GET_COMMENTS_BY_ANSWER,
    POST_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    COMMENT_ERROR
} from '../actions/commentActions';

const initialState = {
    commentsByAnswer: {},
    error: null
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS_BY_ANSWER:
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
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};

export default commentReducer;

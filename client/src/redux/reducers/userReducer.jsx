import {
    GET_PROFILE,
    UPDATE_PROFILE,
    DELETE_PROFILE,
    GET_USER_QUESTIONS,
    GET_USER_ANSWERS,
    USER_ERROR
} from '../actions/userActions';

const initialState = {
    userProfile: null,
    userQuestions: [],
    userAnswers: [],
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return { ...state, userProfile: action.payload, error: null };
        case UPDATE_PROFILE:
            return { ...state, userProfile: action.payload, error: null };
        case DELETE_PROFILE:
            return { ...state, userProfile: null, userQuestions: [], userAnswers: [], error: null };
        case GET_USER_QUESTIONS:
            return { ...state, userQuestions: action.payload, error: null };
        case GET_USER_ANSWERS:
            return { ...state, userAnswers: action.payload, error: null };
        case USER_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default userReducer;

import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_ERROR, CHECK_AUTH_STATUS } from '../actions/authActions';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
        case LOGIN_USER:
            localStorage.setItem('token', action.payload.token);
            return { ...state, token: action.payload.token, isAuthenticated: true, error: null };
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return { ...initialState, token: null, isAuthenticated: false };
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return { ...initialState, token: null, isAuthenticated: false, error: action.payload };
        case CHECK_AUTH_STATUS:
            return {
                ...state,
                isAuthenticated: !!action.payload.token,
                token: action.payload.token,
                error: null
            };
        default:
            return state;
    }
};

export default authReducer;

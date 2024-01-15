import * as api from '../../api/usersApi';

export const GET_PROFILE = 'GET_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const GET_USER_QUESTIONS = 'GET_USER_QUESTIONS';
export const GET_USER_ANSWERS = 'GET_USER_ANSWERS';
export const USER_ERROR = 'USER_ERROR';

export const getProfile = () => async (dispatch) => {
    try {
        const data = await api.getProfile();
        dispatch({ type: GET_PROFILE, payload: data });
    } catch (error) {
        console.error('getProfile Error:', error);
        dispatch({ type: USER_ERROR, payload: error });
    }
};

export const updateProfile = (profileData) => async (dispatch) => {
    try {
        const data = await api.updateProfile(profileData);
        dispatch({ type: UPDATE_PROFILE, payload: data });
    } catch (error) {
        console.error('updateProfile Error:', error);
        dispatch({ type: USER_ERROR, payload: error });
    }
};

export const deleteProfile = () => async (dispatch) => {
    try {
        await api.deleteProfile();
        dispatch({ type: DELETE_PROFILE });
    } catch (error) {
        console.error('deleteProfile Error:', error);
        dispatch({ type: USER_ERROR, payload: error });
    }
};

export const getUserQuestions = () => async (dispatch) => {
    try {
        const questions = await api.getUserQuestions();
        dispatch({ type: GET_USER_QUESTIONS, payload: questions });
    } catch (error) {
        console.error('getUserQuestions Error:', error);
        dispatch({ type: USER_ERROR, payload: error });
    }
};

export const getUserAnswers = () => async (dispatch) => {
    try {
        const answers = await api.getUserAnswers();
        dispatch({ type: GET_USER_ANSWERS, payload: answers });
    } catch (error) {
        console.error('getUserAnswers Error:', error);
        dispatch({ type: USER_ERROR, payload: error });
    }
};

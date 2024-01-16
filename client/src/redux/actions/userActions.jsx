// Import API functions from usersApi.js
import * as api from '../../api/usersApi';

// Action types for Redux
export const GET_PROFILE = 'GET_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const GET_USER_QUESTIONS = 'GET_USER_QUESTIONS';
export const GET_USER_ANSWERS = 'GET_USER_ANSWERS';
export const USER_ERROR = 'USER_ERROR';

// Action creator to get user profile
export const getProfile = () => async (dispatch) => {
    try {
        // Call the API to get user profile
        const data = await api.getProfile();

        // Dispatch the GET_PROFILE action with the data in the payload
        dispatch({ type: GET_PROFILE, payload: data });
    } catch (error) {
        // Log and dispatch a USER_ERROR action with the error data
        console.error('getProfile Error:', error);
        dispatch({ type: USER_ERROR, payload: error });
    }
};

// Action creator to update user profile
export const updateProfile = (profileData) => async (dispatch) => {
    try {
        // Call the API to update user profile
        const data = await api.updateProfile(profileData);

        // Dispatch the UPDATE_PROFILE action with the updated data
        dispatch({ type: UPDATE_PROFILE, payload: data });
    } catch (error) {
        // Log and dispatch a USER_ERROR action with the error data
        console.error('updateProfile Error:', error);
        dispatch({ type: USER_ERROR, payload: error });
    }
};

// Action creator to delete user profile
export const deleteProfile = () => async (dispatch) => {
    try {
        // Call the API to delete user profile
        await api.deleteProfile();

        // Dispatch the DELETE_PROFILE action
        dispatch({ type: DELETE_PROFILE });
    } catch (error) {
        // Log and dispatch a USER_ERROR action with the error data
        console.error('deleteProfile Error:', error);
        dispatch({ type: USER_ERROR, payload: error });
    }
};

// Action creator to get user's questions
export const getUserQuestions = () => async (dispatch) => {
    try {
        // Call the API to get user's questions
        const questions = await api.getUserQuestions();

        // Dispatch the GET_USER_QUESTIONS action with the questions in the payload
        dispatch({ type: GET_USER_QUESTIONS, payload: questions });
    } catch (error) {
        // Log and dispatch a USER_ERROR action with the error data
        console.error('getUserQuestions Error:', error);
        dispatch({ type: USER_ERROR, payload: error });
    }
};

// Action creator to get user's answers
export const getUserAnswers = () => async (dispatch) => {
    try {
        // Call the API to get user's answers
        const answers = await api.getUserAnswers();

        // Dispatch the GET_USER_ANSWERS action with the answers in the payload
        dispatch({ type: GET_USER_ANSWERS, payload: answers });
    } catch (error) {
        // Log and dispatch a USER_ERROR action with the error data
        console.error('getUserAnswers Error:', error);
        dispatch({ type: USER_ERROR, payload: error });
    }
};

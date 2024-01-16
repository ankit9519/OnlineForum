// Import API functions from questionsApi.js
import * as api from '../../api/questionsApi';

// Action types for Redux
export const POST_QUESTION = 'POST_QUESTION';
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS';
export const GET_QUESTION = 'GET_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const UPVOTE_QUESTION = 'UPVOTE_QUESTION';
export const DOWNVOTE_QUESTION = 'DOWNVOTE_QUESTION';
export const QUESTION_ERROR = 'QUESTION_ERROR';

// Action creator to post a new question
export const postQuestion = (questionData) => async (dispatch) => {
    try {
        // Call the API to post a new question
        const response = await api.postQuestion(questionData);

        // Dispatch the POST_QUESTION action with the response in the payload
        dispatch({
            type: POST_QUESTION,
            payload: response
        });

        // Return the response
        return response;
    } catch (error) {
        // Log and dispatch a QUESTION_ERROR action with the error data
        console.error('postQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error.response ? error.response.data : 'Error posting question' });

        // Return null in case of an error
        return null;
    }
};

// Action creator to get all questions
export const getAllQuestions = () => async (dispatch) => {
    try {
        // Call the API to get all questions
        const data = await api.getAllQuestions();

        // Dispatch the GET_ALL_QUESTIONS action with the data in the payload
        dispatch({ type: GET_ALL_QUESTIONS, payload: data });
    } catch (error) {
        // Log and dispatch a QUESTION_ERROR action with the error data
        console.error('getAllQuestions Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

// Action creator to get a specific question by ID
export const getQuestion = (questionId) => async (dispatch) => {
    try {
        // Call the API to get a specific question
        const data = await api.getQuestion(questionId);

        // Dispatch the GET_QUESTION action with the data in the payload
        dispatch({ type: GET_QUESTION, payload: data });
    } catch (error) {
        // Log and dispatch a QUESTION_ERROR action with the error data
        console.error('getQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

// Action creator to update the current question
export const updateCurrentQuestion = (questionId, questionData) => async (dispatch) => {
    try {
        // Call the API to update the current question
        const data = await api.updateQuestion(questionId, questionData);

        // Dispatch the UPDATE_QUESTION action with the updated data
        dispatch({ type: UPDATE_QUESTION, payload: data });
    } catch (error) {
        // Log and dispatch a QUESTION_ERROR action with the error data
        console.error('updateCurrentQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

// Action creator to delete a question
export const deleteQuestion = (questionId) => async (dispatch) => {
    try {
        // Call the API to delete a question
        await api.deleteQuestion(questionId);

        // Dispatch the DELETE_QUESTION action with the questionId in the payload
        dispatch({ type: DELETE_QUESTION, payload: questionId });
    } catch (error) {
        // Log and dispatch a QUESTION_ERROR action with the error data
        console.error('deleteQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

// Action creator to upvote a question
export const upvoteQuestion = (questionId) => async (dispatch) => {
    try {
        // Call the API to upvote a question
        const data = await api.upvoteQuestion(questionId);

        // Dispatch the UPVOTE_QUESTION action with the updated data
        dispatch({ type: UPVOTE_QUESTION, payload: data });
    } catch (error) {
        // Log and dispatch a QUESTION_ERROR action with the error data
        console.error('upvoteQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

// Action creator to downvote a question
export const downvoteQuestion = (questionId) => async (dispatch) => {
    try {
        // Call the API to downvote a question
        const data = await api.downvoteQuestion(questionId);

        // Dispatch the DOWNVOTE_QUESTION action with the updated data
        dispatch({ type: DOWNVOTE_QUESTION, payload: data });
    } catch (error) {
        // Log and dispatch a QUESTION_ERROR action with the error data
        console.error('downvoteQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

// Import API functions from answersApi.js
import * as api from '../../api/answersApi';

// Action types for Redux
export const GET_ANSWERS = 'GET_ANSWERS';
export const POST_ANSWER = 'POST_ANSWER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const DELETE_ANSWER = 'DELETE_ANSWER';
export const UPVOTE_ANSWER = 'UPVOTE_ANSWER';
export const DOWNVOTE_ANSWER = 'DOWNVOTE_ANSWER';
export const ANSWER_ERROR = 'ANSWER_ERROR';

// Action creator to get answers by question ID
export const getAnswersByQuestion = (questionId) => async (dispatch) => {
    try {
        // Fetch answers from the API using the provided question ID
        const answers = await api.getAnswersByQuestion(questionId);

        // Dispatch the GET_ANSWERS action with the fetched answers
        dispatch({ type: GET_ANSWERS, payload: answers });
    } catch (error) {
        // Dispatch the ANSWER_ERROR action with the error message if an error occurs
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

// Action creator to post a new answer
export const postAnswer = (questionId, content) => async (dispatch) => {
    try {
        // Create answer data with the provided content
        const answerData = { content };

        // Post the new answer to the API with the provided question ID and answer data
        const response = await api.postAnswer(questionId, answerData);

        // Dispatch the POST_ANSWER action with the response data
        dispatch({ type: POST_ANSWER, payload: response });
    } catch (error) {
        // Dispatch the ANSWER_ERROR action with the error message if an error occurs
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

// Action creator to update an existing answer
export const updateAnswer = (answerId, answerData) => async (dispatch) => {
    try {
        // Update the answer on the API with the provided answer ID and data
        const data = await api.updateAnswer(answerId, answerData);

        // Dispatch the UPDATE_ANSWER action with the updated data
        dispatch({ type: UPDATE_ANSWER, payload: data });
    } catch (error) {
        // Dispatch the ANSWER_ERROR action with the error message if an error occurs
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

// Action creator to delete an answer
export const deleteAnswer = (answerId) => async (dispatch) => {
    try {
        // Delete the answer on the API with the provided answer ID
        await api.deleteAnswer(answerId);

        // Dispatch the DELETE_ANSWER action with the deleted answer ID
        dispatch({ type: DELETE_ANSWER, payload: answerId });
    } catch (error) {
        // Dispatch the ANSWER_ERROR action with the error message if an error occurs
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

// Action creator to upvote an answer
export const upvoteAnswer = (answerId) => async (dispatch) => {
    try {
        // Upvote the answer on the API with the provided answer ID
        const data = await api.upvoteAnswer(answerId);

        // Dispatch the UPVOTE_ANSWER action with the updated data
        dispatch({ type: UPVOTE_ANSWER, payload: data });
    } catch (error) {
        // Dispatch the ANSWER_ERROR action with the error message if an error occurs
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

// Action creator to downvote an answer
export const downvoteAnswer = (answerId) => async (dispatch) => {
    try {
        // Downvote the answer on the API with the provided answer ID
        const data = await api.downvoteAnswer(answerId);

        // Dispatch the DOWNVOTE_ANSWER action with the updated data
        dispatch({ type: DOWNVOTE_ANSWER, payload: data });
    } catch (error) {
        // Dispatch the ANSWER_ERROR action with the error message if an error occurs
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

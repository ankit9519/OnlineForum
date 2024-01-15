import * as api from '../../api/questionsApi';

export const POST_QUESTION = 'POST_QUESTION';
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS';
export const GET_QUESTION = 'GET_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const UPVOTE_QUESTION = 'UPVOTE_QUESTION';
export const DOWNVOTE_QUESTION = 'DOWNVOTE_QUESTION';
export const QUESTION_ERROR = 'QUESTION_ERROR';

export const postQuestion = (questionData) => async (dispatch) => {
    try {
        const response = await api.postQuestion(questionData);
        dispatch({
            type: POST_QUESTION,
            payload: response
        });
        return response;
    } catch (error) {
        console.error('postQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error.response ? error.response.data : 'Error posting question' });
        return null;
    }
};

export const getAllQuestions = () => async (dispatch) => {
    try {
        const data = await api.getAllQuestions();
        dispatch({ type: GET_ALL_QUESTIONS, payload: data });
    } catch (error) {
        console.error('getAllQuestions Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

export const getQuestion = (questionId) => async (dispatch) => {
    try {
        const data = await api.getQuestion(questionId);
        dispatch({ type: GET_QUESTION, payload: data });
    } catch (error) {
        console.error('getQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

export const updateCurrentQuestion = (questionId, questionData) => async (dispatch) => {
    try {
        const data = await api.updateQuestion(questionId, questionData); // Corrected function name
        dispatch({ type: UPDATE_QUESTION, payload: data });
    } catch (error) {
        console.error('updateCurrentQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

export const deleteQuestion = (questionId) => async (dispatch) => {
    try {
        await api.deleteQuestion(questionId);
        dispatch({ type: DELETE_QUESTION, payload: questionId });
    } catch (error) {
        console.error('deleteQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

export const upvoteQuestion = (questionId) => async (dispatch) => {
    try {
        const data = await api.upvoteQuestion(questionId);
        dispatch({ type: UPVOTE_QUESTION, payload: data });
    } catch (error) {
        console.error('upvoteQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

export const downvoteQuestion = (questionId) => async (dispatch) => {
    try {
        const data = await api.downvoteQuestion(questionId);
        dispatch({ type: DOWNVOTE_QUESTION, payload: data });
    } catch (error) {
        console.error('downvoteQuestion Error:', error);
        dispatch({ type: QUESTION_ERROR, payload: error });
    }
};

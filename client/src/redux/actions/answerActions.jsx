import * as api from '../../api/answersApi';

export const GET_ANSWERS = 'GET_ANSWERS';
export const POST_ANSWER = 'POST_ANSWER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const DELETE_ANSWER = 'DELETE_ANSWER';
export const UPVOTE_ANSWER = 'UPVOTE_ANSWER';
export const DOWNVOTE_ANSWER = 'DOWNVOTE_ANSWER';
export const ANSWER_ERROR = 'ANSWER_ERROR';

export const getAnswersByQuestion = (questionId) => async (dispatch) => {
    try {
        const answers = await api.getAnswersByQuestion(questionId);
        dispatch({ type: GET_ANSWERS, payload: answers });
    } catch (error) {
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

export const postAnswer = (questionId, content) => async (dispatch) => {
    try {
        const answerData = { content };
        const response = await api.postAnswer(questionId, answerData);
        dispatch({ type: POST_ANSWER, payload: response });
    } catch (error) {
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

export const updateAnswer = (answerId, answerData) => async (dispatch) => {
    try {
        const data = await api.updateAnswer(answerId, answerData);
        dispatch({ type: UPDATE_ANSWER, payload: data });
    } catch (error) {
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

export const deleteAnswer = (answerId) => async (dispatch) => {
    try {
        await api.deleteAnswer(answerId);
        dispatch({ type: DELETE_ANSWER, payload: answerId });
    } catch (error) {
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

export const upvoteAnswer = (answerId) => async (dispatch) => {
    try {
        const data = await api.upvoteAnswer(answerId);
        dispatch({ type: UPVOTE_ANSWER, payload: data });
    } catch (error) {
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

export const downvoteAnswer = (answerId) => async (dispatch) => {
    try {
        const data = await api.downvoteAnswer(answerId);
        dispatch({ type: DOWNVOTE_ANSWER, payload: data });
    } catch (error) {
        dispatch({ type: ANSWER_ERROR, payload: error.message });
    }
};

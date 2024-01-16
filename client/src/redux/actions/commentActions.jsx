// Import API functions from commentsApi.js
import * as api from '../../api/commentsApi';

// Action types for Redux
export const GET_COMMENTS_BY_ANSWER = 'GET_COMMENTS_BY_ANSWER';
export const POST_COMMENT = 'POST_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const COMMENT_ERROR = 'COMMENT_ERROR';

// Action creator to get comments by answer
export const getCommentsByAnswer = (answerId) => async (dispatch) => {
    try {
        // Call the API to get comments by answer
        const data = await api.getCommentsByAnswer(answerId);

        // Dispatch the GET_COMMENTS_BY_ANSWER action with the answerId and comments in the payload
        dispatch({
            type: GET_COMMENTS_BY_ANSWER,
            payload: { answerId, comments: data } // Modified payload structure
        });
    } catch (error) {
        // Log and dispatch a COMMENT_ERROR action with the error data
        console.error('getCommentsByAnswer Error:', error);
        dispatch({ type: COMMENT_ERROR, payload: error });
    }
};

// Action creator to post a new comment
export const postComment = (answerId, commentData) => async (dispatch) => {
    try {
        // Call the API to post a new comment
        const data = await api.postComment(answerId, commentData);

        // Dispatch the POST_COMMENT action with the comment and answerId in the payload
        dispatch({
            type: POST_COMMENT,
            payload: { comment: data, answerId } // Include answerId in the payload
        });
    } catch (error) {
        // Log and dispatch a COMMENT_ERROR action with the error data
        console.error('postComment Error:', error);
        dispatch({ type: COMMENT_ERROR, payload: error });
    }
};

// Action creator to update an existing comment
export const updateComment = (commentId, commentData) => async (dispatch) => {
    try {
        // Call the API to update an existing comment
        const data = await api.updateComment(commentId, commentData);

        // Dispatch the UPDATE_COMMENT action with the updated comment data
        dispatch({ type: UPDATE_COMMENT, payload: data });
    } catch (error) {
        // Log and dispatch a COMMENT_ERROR action with the error data
        console.error('updateComment Error:', error);
        dispatch({ type: COMMENT_ERROR, payload: error });
    }
};

// Action creator to delete a comment
export const deleteComment = (commentId) => async (dispatch) => {
    try {
        // Call the API to delete a comment
        await api.deleteComment(commentId);

        // Dispatch the DELETE_COMMENT action with the commentId in the payload
        dispatch({ type: DELETE_COMMENT, payload: commentId });
    } catch (error) {
        // Log and dispatch a COMMENT_ERROR action with the error data
        console.error('deleteComment Error:', error);
        dispatch({ type: COMMENT_ERROR, payload: error });
    }
};

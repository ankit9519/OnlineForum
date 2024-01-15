import * as api from '../../api/commentsApi';

export const GET_COMMENTS_BY_ANSWER = 'GET_COMMENTS_BY_ANSWER';
export const POST_COMMENT = 'POST_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const COMMENT_ERROR = 'COMMENT_ERROR';

export const getCommentsByAnswer = (answerId) => async (dispatch) => {
    try {
        const data = await api.getCommentsByAnswer(answerId);
        dispatch({
            type: GET_COMMENTS_BY_ANSWER,
            payload: { answerId, comments: data } // Modified payload structure
        });
    } catch (error) {
        console.error('getCommentsByAnswer Error:', error);
        dispatch({ type: COMMENT_ERROR, payload: error });
    }
};

export const postComment = (answerId, commentData) => async (dispatch) => {
    try {
        const data = await api.postComment(answerId, commentData);
        dispatch({
            type: POST_COMMENT,
            payload: { comment: data, answerId } // Include answerId in the payload
        });
    } catch (error) {
        console.error('postComment Error:', error);
        dispatch({ type: COMMENT_ERROR, payload: error });
    }
};

export const updateComment = (commentId, commentData) => async (dispatch) => {
    try {
        const data = await api.updateComment(commentId, commentData);
        dispatch({ type: UPDATE_COMMENT, payload: data });
    } catch (error) {
        console.error('updateComment Error:', error);
        dispatch({ type: COMMENT_ERROR, payload: error });
    }
};

export const deleteComment = (commentId) => async (dispatch) => {
    try {
        await api.deleteComment(commentId);
        dispatch({ type: DELETE_COMMENT, payload: commentId });
    } catch (error) {
        console.error('deleteComment Error:', error);
        dispatch({ type: COMMENT_ERROR, payload: error });
    }
};

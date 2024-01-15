import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/userReducer';
import questionReducer from './reducers/questionReducer';
import answerReducer from './reducers/answerReducer';
import commentReducer from './reducers/commentReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        question: questionReducer,
        answer: answerReducer,
        comment: commentReducer,
        auth: authReducer
    }
});

export default store;

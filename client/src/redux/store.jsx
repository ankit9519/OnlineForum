// Import the configureStore function from the '@reduxjs/toolkit' package
import { configureStore } from '@reduxjs/toolkit';

// Import individual reducers for user, question, answer, comment, and auth
import userReducer from './reducers/userReducer';
import questionReducer from './reducers/questionReducer';
import answerReducer from './reducers/answerReducer';
import commentReducer from './reducers/commentReducer';
import authReducer from './reducers/authReducer';

// Use configureStore to create the Redux store
const store = configureStore({
    reducer: {
        user: userReducer,           // Assign the userReducer to the 'user' slice of the store
        question: questionReducer,   // Assign the questionReducer to the 'question' slice of the store
        answer: answerReducer,       // Assign the answerReducer to the 'answer' slice of the store
        comment: commentReducer,     // Assign the commentReducer to the 'comment' slice of the store
        auth: authReducer            // Assign the authReducer to the 'auth' slice of the store
    }
});

// Export the configured store as the default export of this module
export default store;

// Import the necessary dependencies from React and React Router
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Import the action to check the authentication status
import { checkAuthStatus } from './redux/actions/authActions';

// Import the components used in the application
import Navbar from './components/layout/Navbar';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import Footer from './components/layout/Footer';
import CreateQuestionPage from './components/pages/CreateQuestion';
import QuestionDetailPage from './components/pages/QuestionDetailPage';
import NotFoundPage from './components/pages/NotFoundPage';
import UserProfile from './components/pages/UserProfilePage';

// Define the main App component
const App = () => {
    // Initialize the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Use the useEffect hook to dispatch an action to check the authentication status when the component mounts
    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    // Return the JSX structure representing the application layout and routes
    return (
        <Router>
            {/* Render the Navbar component */}
            <Navbar />

            {/* Define the routes using the Routes component from React Router */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-question" element={<CreateQuestionPage />} />
                <Route path="/questions/:id" element={<QuestionDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>

            {/* Render the Footer component */}
            <Footer />
        </Router>
    );
};

// Export the App component as the default export
export default App;

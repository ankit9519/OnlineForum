import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './redux/actions//authActions';
import Navbar from './components/layout/Navbar';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import Footer from './components/layout/Footer';
import CreateQuestionPage from './components/pages/CreateQuestion';
import QuestionDetailPage from './components/pages/QuestionDetailPage';
import NotFoundPage from './components/pages/NotFoundPage';
import UserProfile from './components/pages/UserProfilePage';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-question" element={<CreateQuestionPage />} />
                <Route path="/questions/:id" element={<QuestionDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>

            <Footer />
        </Router>
    );
};

export default App;

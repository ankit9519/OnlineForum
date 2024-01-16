import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSignInAlt, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import { loginUser } from '../../redux/actions/authActions';

// Spinner component to display loading animation
const Spinner = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <FaSpinner className="animate-spin text-6xl text-white" />
    </div>
);

// ErrorModal component to display error messages
const ErrorModal = ({ errorMessage, onClose }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Error</h2>
            <p>{errorMessage}</p>
            <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Close
            </button>
        </div>
    </div>
);

ErrorModal.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

// LoginPage component for user authentication
const LoginPage = () => {
    // State variables
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Redux state and dispatch function
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    // React Router hook for navigation
    const navigate = useNavigate();

    // useEffect to redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Event handler for input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Event handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Placeholder for server-side password check
        // This should be replaced with an actual server-side check
        const isPasswordCorrect = true; // Replace this with the actual server-side check

        if (isPasswordCorrect) {
            console.log('Entered password matches the password in the database');
        } else {
            console.log('Entered password does not match the password in the database');
        }

        // Dispatch loginUser action to handle authentication
        dispatch(loginUser(formData))
            .then(() => {
                setIsLoading(false);
            })
            .catch(err => {
                console.log('Login error:', err);
                setError(err.response?.data?.message || 'Invalid credentials or user does not exist.');
                setIsLoading(false);
            });
    };

    // Event handler to close the error modal
    const handleCloseErrorModal = () => {
        setError('');
    };

    return (
        <div className="container mx-auto px-4 h-screen flex items-start justify-center mt-20">
            <div className="max-w-md w-full bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="text-center mb-6">
                    <FaSignInAlt className="mx-auto text-6xl text-blue-400" />
                    <h1 className="text-3xl font-semibold text-white">Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Email input */}
                    <div className="mb-4 flex items-center border-b border-gray-500 py-2">
                        <FaEnvelope className="text-gray-300 mr-3" />
                        <input
                            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Password input */}
                    <div className="mb-6 flex items-center border-b border-gray-500 py-2">
                        <FaLock className="text-gray-300 mr-3" />
                        <input
                            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Submit button */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={isLoading}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                {/* Display Spinner while loading */}
                {isLoading && <Spinner />}
                {/* Display ErrorModal if there is an error */}
                {error && <ErrorModal errorMessage={error} onClose={handleCloseErrorModal} />}
            </div>
        </div>
    );
};

export default LoginPage;

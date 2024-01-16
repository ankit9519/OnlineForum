// React and Redux imports
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// React-icons for displaying icons
import {
    FaUserPlus,
    FaEnvelope,
    FaLock,
    FaUser,
    FaGraduationCap,
    FaBriefcase,
    FaList,
    FaSpinner,
} from 'react-icons/fa';

// Auth action imports
import { registerUser, loginUser } from '../../redux/actions/authActions';

// Spinner component for loading state
const Spinner = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <FaSpinner className="animate-spin text-6xl text-blue-500" />
    </div>
);

// RegisterPage component
const RegisterPage = () => {
    // Local state for form data and loading state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        education: '',
        employment: '',
        interests: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    // Redux setup
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error } = useSelector((state) => state.auth);

    // Redirect to home page if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Dispatch registration action and log in if successful
            const registrationResponse = await dispatch(registerUser(formData));
            if (registrationResponse) {
                await dispatch(loginUser({ email: formData.email, password: formData.password }));
            }
        } catch (registrationError) {
            console.error('Registration Error:', registrationError);
            // Handle any registration errors here
        } finally {
            setIsLoading(false);
        }
    };

    // JSX structure for rendering the component
    return (
        <div className="container mx-auto px-4 h-screen flex items-center justify-center">
            {isLoading && <Spinner />}
            {/* Registration form */}
            <div
                className={`max-w-md w-full bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 ${isLoading ? 'opacity-50' : ''
                    }`}
            >
                <div className="text-center mb-6">
                    <FaUserPlus className="mx-auto text-6xl text-blue-400" />
                    <h1 className="text-3xl font-semibold text-white">Register</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4 flex items-center border-b border-gray-500 py-2">
                        <FaUser className="text-gray-300 mr-3" />
                        <input
                            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4 flex items-center border-b border-gray-500 py-2">
                        <FaEnvelope className="text-gray-300 mr-3" />
                        <input
                            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6 flex items-center border-b border-gray-500 py-2">
                        <FaLock className="text-gray-300 mr-3" />
                        <input
                            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Education */}
                    <div className="mb-6 flex items-center border-b border-gray-500 py-2">
                        <FaGraduationCap className="text-gray-300 mr-3" />
                        <input
                            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            id="education"
                            name="education"
                            placeholder="Education"
                            value={formData.education}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Employment */}
                    <div className="mb-6 flex items-center border-b border-gray-500 py-2">
                        <FaBriefcase className="text-gray-300 mr-3" />
                        <input
                            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            id="employment"
                            name="employment"
                            placeholder="Employment"
                            value={formData.employment}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Interests */}
                    <div className="mb-6 flex items-center border-b border-gray-500 py-2">
                        <FaList className="text-gray-300 mr-3" />
                        <input
                            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            id="interests"
                            name="interests"
                            placeholder="Interests (comma separated)"
                            value={formData.interests}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Register Button */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </form>
                {/* Display registration error, if any */}
                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </div>
        </div>
    );
};

export default RegisterPage;

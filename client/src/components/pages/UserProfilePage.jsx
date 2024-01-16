// React and Redux imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for React Router v6

// Redux action imports
import { getProfile, getUserQuestions, updateProfile } from '../../redux/actions/userActions';

// Icons for UI elements
import {
    FaEdit,
    FaSave,
    FaTimes,
    FaUserGraduate,
    FaBriefcase,
    FaStar,
    FaQuestionCircle,
    FaUser,
    FaEnvelope,
} from 'react-icons/fa';

// UserProfile component
const UserProfile = () => {
    // Redux setup
    const dispatch = useDispatch();
    const navigate = useNavigate(); // For React Router v6
    const { userProfile, userQuestions } = useSelector((state) => state.user);

    // Local state for edit mode and profile data
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState({
        education: '',
        employment: '',
        interests: '',
    });

    // Fetch user profile and questions on component mount
    useEffect(() => {
        dispatch(getProfile());
        dispatch(getUserQuestions());
    }, [dispatch]);

    // Update local state when user profile changes
    useEffect(() => {
        if (userProfile) {
            setProfileData({
                education: userProfile.education || '',
                employment: userProfile.employment || '',
                interests: userProfile.interests?.join(', ') || '',
            });
        }
    }, [userProfile]);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    // Handle profile form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProfile = {
            ...profileData,
            interests: profileData.interests.split(',').map((interest) => interest.trim()),
        };
        await dispatch(updateProfile(updatedProfile));
        setEditMode(false);
    };

    // Navigate to a specific question details page
    const navigateToQuestion = (questionId) => {
        navigate(`/questions/${questionId}`); // Navigate to question detail page
    };

    // JSX structure for rendering the component
    if (!userProfile) return <div>Loading...</div>;

    return (
        <div className="bg-gray-800 text-white min-h-screen p-5">
            <div className="container mx-auto mt-5" style={{ maxWidth: '450px' }}>
                <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>
                <div className="bg-gray-700 p-5 rounded-md">
                    {editMode ? (
                        // Edit Mode Form
                        <form onSubmit={handleSubmit}>
                            {/* Education Input */}
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-1 flex items-center">
                                    <FaUserGraduate className="mr-2" /> Education:
                                </label>
                                <input
                                    type="text"
                                    name="education"
                                    value={profileData.education}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-gray-600 rounded-md"
                                />
                            </div>
                            {/* Employment Input */}
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-1 flex items-center">
                                    <FaBriefcase className="mr-2" /> Employment:
                                </label>
                                <input
                                    type="text"
                                    name="employment"
                                    value={profileData.employment}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-gray-600 rounded-md"
                                />
                            </div>
                            {/* Interests Input */}
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-1 flex items-center">
                                    <FaStar className="mr-2" /> Interests:
                                </label>
                                <input
                                    type="text"
                                    name="interests"
                                    value={profileData.interests}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-gray-600 rounded-md"
                                />
                            </div>
                            {/* Save and Cancel Buttons */}
                            <div className="flex justify-end space-x-2">
                                <button type="submit" className="flex items-center px-4 py-2 bg-blue-600 rounded-md">
                                    <FaSave className="mr-2" /> Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditMode(false)}
                                    className="flex items-center px-4 py-2 bg-red-600 rounded-md"
                                >
                                    <FaTimes className="mr-2" /> Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        // Display User Profile Details
                        <div>
                            {/* Username */}
                            <div className="mb-2 flex items-center">
                                <FaUser className="mr-2" /> <span>Username: {userProfile.username}</span>
                            </div>
                            {/* Email */}
                            <div className="mb-2 flex items-center">
                                <FaEnvelope className="mr-2" /> <span>Email: {userProfile.email}</span>
                            </div>
                            {/* Education */}
                            <div className="mb-2 flex items-center">
                                <FaUserGraduate className="mr-2" />{' '}
                                <span>Education: {userProfile.education || 'Not provided'}</span>
                            </div>
                            {/* Employment */}
                            <div className="mb-2 flex items-center">
                                <FaBriefcase className="mr-2" />{' '}
                                <span>Employment: {userProfile.employment || 'Not provided'}</span>
                            </div>
                            {/* Interests */}
                            <div className="mb-2 flex items-center">
                                <FaStar className="mr-2" />{' '}
                                <span>Interests: {userProfile.interests?.join(', ') || 'Not provided'}</span>
                            </div>
                            {/* Edit Profile Button */}
                            <button onClick={() => setEditMode(true)} className="flex items-center mt-4 px-4 py-2 bg-green-600 rounded-md">
                                <FaEdit className="mr-2" /> Edit Profile
                            </button>
                        </div>
                    )}
                    {/* User's Questions Section */}
                    <div className="mt-6">
                        {/* Section Title */}
                        <h2 className="text-2xl font-bold flex items-center">
                            <FaQuestionCircle className="mr-2" /> My Questions
                        </h2>
                        {/* User's Questions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                            {userQuestions.length > 0 ? (
                                // Render each question as a clickable card
                                userQuestions.map((question) => (
                                    <div
                                        key={question._id}
                                        className="bg-gray-600 p-4 rounded-md cursor-pointer hover:bg-gray-500 transition-colors"
                                        onClick={() => navigateToQuestion(question._id)}
                                    >
                                        <h3 className="text-lg font-semibold">{question.title}</h3>
                                        {/* Add more question details here if needed */}
                                    </div>
                                ))
                            ) : (
                                // Display message if no questions posted yet
                                <p>No questions posted yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

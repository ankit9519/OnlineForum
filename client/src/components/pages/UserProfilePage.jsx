import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for React Router v6
import { getProfile, getUserQuestions, updateProfile } from '../../redux/actions/userActions';
import { FaEdit, FaSave, FaTimes, FaUserGraduate, FaBriefcase, FaStar, FaQuestionCircle, FaUser, FaEnvelope } from 'react-icons/fa';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // For React Router v6
    const { userProfile, userQuestions } = useSelector(state => state.user);
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState({
        education: '',
        employment: '',
        interests: ''
    });

    useEffect(() => {
        dispatch(getProfile());
        dispatch(getUserQuestions());
    }, [dispatch]);

    useEffect(() => {
        if (userProfile) {
            setProfileData({
                education: userProfile.education || '',
                employment: userProfile.employment || '',
                interests: userProfile.interests?.join(', ') || ''
            });
        }
    }, [userProfile]);

    const handleInputChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProfile = {
            ...profileData,
            interests: profileData.interests.split(',').map(interest => interest.trim())
        };
        await dispatch(updateProfile(updatedProfile));
        setEditMode(false);
    };

    const navigateToQuestion = (questionId) => {
        navigate(`/questions/${questionId}`); // Navigate to question detail page
    };

    if (!userProfile) return <div>Loading...</div>;

    return (
        <div className="bg-gray-800 text-white min-h-screen p-5">
            <div className="container mx-auto mt-5" style={{ maxWidth: '450px' }}>
                <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>
                <div className="bg-gray-700 p-5 rounded-md">
                    {editMode ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-1 flex items-center">
                                    <FaUserGraduate className="mr-2" /> Education:
                                </label>
                                <input type="text" name="education" value={profileData.education} onChange={handleInputChange} className="w-full p-2 bg-gray-600 rounded-md" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-1 flex items-center">
                                    <FaBriefcase className="mr-2" /> Employment:
                                </label>
                                <input type="text" name="employment" value={profileData.employment} onChange={handleInputChange} className="w-full p-2 bg-gray-600 rounded-md" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-1 flex items-center">
                                    <FaStar className="mr-2" /> Interests:
                                </label>
                                <input type="text" name="interests" value={profileData.interests} onChange={handleInputChange} className="w-full p-2 bg-gray-600 rounded-md" />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button type="submit" className="flex items-center px-4 py-2 bg-blue-600 rounded-md">
                                    <FaSave className="mr-2" /> Save
                                </button>
                                <button type="button" onClick={() => setEditMode(false)} className="flex items-center px-4 py-2 bg-red-600 rounded-md">
                                    <FaTimes className="mr-2" /> Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className="mb-2 flex items-center">
                                <FaUser className="mr-2" /> <span>Username: {userProfile.username}</span>
                            </div>
                            <div className="mb-2 flex items-center">
                                <FaEnvelope className="mr-2" /> <span>Email: {userProfile.email}</span>
                            </div>
                            <div className="mb-2 flex items-center">
                                <FaUserGraduate className="mr-2" /> <span>Education: {userProfile.education || 'Not provided'}</span>
                            </div>
                            <div className="mb-2 flex items-center">
                                <FaBriefcase className="mr-2" /> <span>Employment: {userProfile.employment || 'Not provided'}</span>
                            </div>
                            <div className="mb-2 flex items-center">
                                <FaStar className="mr-2" /> <span>Interests: {userProfile.interests?.join(', ') || 'Not provided'}</span>
                            </div>
                            <button onClick={() => setEditMode(true)} className="flex items-center mt-4 px-4 py-2 bg-green-600 rounded-md">
                                <FaEdit className="mr-2" /> Edit Profile
                            </button>
                        </div>
                    )}
                    {/* User's Questions Section */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold flex items-center">
                            <FaQuestionCircle className="mr-2" /> My Questions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                            {userQuestions.length > 0 ? (
                                userQuestions.map((question) => (
                                    <div key={question._id}
                                        className="bg-gray-600 p-4 rounded-md cursor-pointer hover:bg-gray-500 transition-colors"
                                        onClick={() => navigateToQuestion(question._id)}>
                                        <h3 className="text-lg font-semibold">{question.title}</h3>
                                        {/* Add more question details here if needed */}
                                    </div>
                                ))
                            ) : (
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

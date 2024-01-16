import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postQuestion } from '../../redux/actions/questionActions';
import { FaQuestion } from 'react-icons/fa';

// CreateQuestionPage component for creating a new question
const CreateQuestionPage = () => {
    // State to manage form data
    const [questionData, setQuestionData] = useState({
        title: '',
        content: '',
    });

    // Redux dispatch function
    const dispatch = useDispatch();

    // React Router hook for navigation
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dispatch postQuestion action with questionData
            const response = await dispatch(postQuestion(questionData));

            // Check if the response contains a valid question ID
            if (response && response._id) {
                // Navigate to the newly created question page
                navigate(`/questions/${response._id}`);
            } else {
                console.error('Failed to create question. Response:', response);
            }
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        // Update questionData state with the changed input values
        setQuestionData({ ...questionData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-gray-800 text-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 mt-10">
                <div>
                    <FaQuestion className="mx-auto h-12 w-auto text-gray-500" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold">Create New Question</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            {/* Input for question title */}
                            <label htmlFor="title" className="sr-only">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                autoComplete="off"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Question Title"
                                value={questionData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            {/* Textarea for question content */}
                            <label htmlFor="content" className="sr-only">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                rows="4"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Detailed Description"
                                value={questionData.content}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        {/* Submit button */}
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateQuestionPage;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../../redux/actions/questionActions';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import moment from 'moment';
import logo from '../../assets/logo.png';

const HomePage = () => {
    const dispatch = useDispatch();
    const { questions } = useSelector((state) => state.question);

    useEffect(() => {
        dispatch(getAllQuestions());
    }, [dispatch]);

    const formatCreatedAt = (createdAt) => {
        const date = moment(createdAt);
        return date.isValid() ? date.format('LLL') : 'Invalid date';
    };

    return (
        <div className="bg-gray-800 text-white min-h-screen p-1">
            <div style={{ margin: '0 5% 0 5%' }}>
                <div className="text-center py-10 bg-gray-700 rounded-md mt-4">
                    <img src={logo} alt="IntelliForum Logo" className="h-20 mx-auto mb-4 rounded-full " />
                    <h1 className="text-4xl font-bold">Welcome to IntelliForum</h1>
                </div>

                <div className="flex gap-4 mt-4">
                    {/* Main content */}
                    <div className="w-3/4">
                        <div className="text-center py-5 bg-gray-700 rounded-md">
                            <h2 className="text-2xl font-bold">All Questions</h2>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-4">
                            {questions.map(question => (
                                <Link to={`/questions/${question._id}`} key={question._id} className="hover:bg-gray-600 transition-colors duration-200 rounded-lg bg-gray-700 p-5 mb-4">
                                    <h2 className="text-xl font-bold">{question.title}</h2>
                                    <p className="text-sm text-gray-400">
                                        by {question.author.username} - {formatCreatedAt(question.created_at)}
                                    </p>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center">
                                            <FaThumbsUp className="text-green-500 mr-2" /> {question.upvotes.length}
                                            <FaThumbsDown className="text-red-500 ml-4" /> {question.downvotes.length}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="w-1/4">
                        <div className="bg-gray-700 p-4 rounded-md sticky top-4">
                            <h3 className="font-bold text-xl mb-3">Latest Questions</h3>
                            <ul className="space-y-3">
                                {questions.slice(0, 3).map(question => (
                                    <li key={question._id} className="bg-gray-600 p-3 rounded">
                                        <Link to={`/questions/${question._id}`}>
                                            {question.title} by {question.author.username} - {formatCreatedAt(question.created_at)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

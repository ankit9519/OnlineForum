import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestion, upvoteQuestion, downvoteQuestion } from '../../redux/actions/questionActions';
import { getAnswersByQuestion, postAnswer, upvoteAnswer, downvoteAnswer } from '../../redux/actions/answerActions';
import { getCommentsByAnswer, postComment } from '../../redux/actions/commentActions';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import moment from 'moment';

const QuestionDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentQuestion = useSelector(state => state.question.currentQuestion);
    const answers = useSelector(state => state.answer.answers);
    const commentsByAnswer = useSelector(state => state.comment.commentsByAnswer);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [newAnswer, setNewAnswer] = useState('');
    const [commentContent, setCommentContent] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        dispatch(getQuestion(id));
        dispatch(getAnswersByQuestion(id));
    }, [dispatch, id]);

    useEffect(() => {
        answers.forEach(answer => {
            dispatch(getCommentsByAnswer(answer._id));
        });
    }, [dispatch, answers]);

    const handleVote = async (answerId, type) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        if (type === 'upvote') {
            await dispatch(upvoteAnswer(answerId));
        } else {
            await dispatch(downvoteAnswer(answerId));
        }
        // Refresh answers after voting
        dispatch(getAnswersByQuestion(id));
    };

    const handleQuestionVote = async (type) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        if (type === 'upvote') {
            await dispatch(upvoteQuestion(id));
        } else {
            await dispatch(downvoteQuestion(id));
        }
        // Refresh the question to update votes
        dispatch(getQuestion(id));
    };

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        await dispatch(postAnswer(id, newAnswer));
        setNewAnswer('');
        // Refresh answers after posting a new one
        dispatch(getAnswersByQuestion(id));
    };

    const handleCommentSubmit = async (answerId, e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        if (commentContent[answerId]) {
            await dispatch(postComment(answerId, { content: commentContent[answerId] }));
            setCommentContent({ ...commentContent, [answerId]: '' });
            dispatch(getCommentsByAnswer(answerId));
        }
    };

    return (
        <div className="bg-gray-800 text-white min-h-screen p-5">
            <div className="container mx-auto" style={{ paddingLeft: "4%", paddingRight: "4%" }}>
                {currentQuestion && (
                    <div className="bg-gray-700 p-5 rounded-md mb-4 mx-auto" style={{ maxWidth: '768px' }}>
                        <h1 className="text-3xl font-bold">{currentQuestion.title}</h1>
                        <p className="text-sm text-gray-400">
                            by {currentQuestion.author?.username || 'Unknown'} on {moment(currentQuestion.created_at).format('LLL')}
                        </p>
                        <p className="mt-3">{currentQuestion.content}</p>
                        <div className="flex items-center justify-start my-2">
                            <button onClick={() => handleQuestionVote('upvote')} className="mr-2">
                                <FaThumbsUp className="text-green-500" />
                            </button>
                            <span>{currentQuestion.upvotes?.length ?? 0}</span>
                            <button onClick={() => handleQuestionVote('downvote')} className="ml-2">
                                <FaThumbsDown className="text-red-500" />
                            </button>
                            <span>{currentQuestion.downvotes?.length ?? 0}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmitAnswer} className="bg-gray-700 p-5 rounded-md mb-4 mx-auto" style={{ maxWidth: '768px' }}>
                    <textarea
                        className="w-full p-2 bg-gray-600 rounded-md"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        placeholder="Write your answer here..."
                    ></textarea>
                    <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md mt-2">
                        Submit Answer
                    </button>
                </form>

                {answers.map((answer) => (
                    <div key={answer._id} className="bg-gray-700 p-5 rounded-md mb-4 mx-auto" style={{ maxWidth: '768px' }}>
                        <p className="font-semibold">
                            {answer.author?.username || 'Unknown'} - {moment(answer.created_at).format('LLL')}
                        </p>
                        <p>{answer.content}</p>
                        <div className="flex items-center justify-between">
                            <div>
                                <button onClick={() => handleVote(answer._id, 'upvote')} className="mr-2">
                                    <FaThumbsUp className="text-green-500" />
                                </button>
                                <span>{answer.upvotes?.length ?? 0}</span>
                                <button onClick={() => handleVote(answer._id, 'downvote')} className="ml-2">
                                    <FaThumbsDown className="text-red-500" />
                                </button>
                                <span>{answer.downvotes?.length ?? 0}</span>
                            </div>
                        </div>

                        {commentsByAnswer[answer._id]?.map((comment, index) => (
                            <div key={comment._id + "_" + index} className="comment-style" style={{ marginTop: '10px' }}>
                                <p className="font-semibold">
                                    {comment.author?.username || 'Unknown'} - {moment(comment.created_at).format('LLL')}
                                </p>
                                <p>{comment.content}</p>
                            </div>
                        ))}

                        <form onSubmit={(e) => handleCommentSubmit(answer._id, e)} className="mt-4">
                            <input
                                type="text"
                                className="w-full p-2 bg-gray-600 rounded-md"
                                placeholder="Add a comment..."
                                value={commentContent[answer._id] || ''}
                                onChange={(e) => setCommentContent({ ...commentContent, [answer._id]: e.target.value })}
                            />
                            <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md mt-2">
                                Post Comment
                            </button>
                        </form>
                    </div>
                ))}

                {showLoginModal && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">You need to log in!</h3>
                            <p className="py-4">Please log in to submit an answer or a comment.</p>
                            <div className="modal-action">
                                <button onClick={() => setShowLoginModal(false)} className="btn">
                                    Close
                                </button>
                                <button onClick={() => navigate('/login')} className="btn btn-primary">
                                    Log in
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionDetailsPage;

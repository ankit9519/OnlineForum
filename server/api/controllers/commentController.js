const Comment = require('../models/commentModel');
const Answer = require('../models/answerModel');

// Post a Comment
exports.postComment = async (req, res) => {
    const { content, answerId } = req.body;
    try {
        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).send('Answer not found');
        }
        const comment = new Comment({ content, answer: answerId, author: req.user._id });
        await comment.save();
        res.status(201).send('Comment posted successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Get a specific Comment
exports.getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('author');
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Update a Comment
exports.updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Delete a Comment
exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).send('Comment deleted successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.getCommentsByAnswer = async (req, res) => {
    try {
        const comments = await Comment.find({ answer: req.params.answerId }).populate('author');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

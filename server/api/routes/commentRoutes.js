const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Post a Comment
router.post('/', authMiddleware, commentController.postComment);

// Get all Comments for a specific Answer
router.get('/answer/:answerId', commentController.getCommentsByAnswer);

// Get a specific Comment
router.get('/:id', commentController.getComment);

// Update a Comment
router.put('/:id', authMiddleware, commentController.updateComment);

// Delete a Comment
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;

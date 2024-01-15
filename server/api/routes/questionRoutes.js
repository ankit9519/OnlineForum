const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, questionController.postQuestion);
router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestion);
router.put('/:id', authMiddleware, questionController.updateQuestion);
router.delete('/:id', authMiddleware, questionController.deleteQuestion);
router.post('/:id/upvote', authMiddleware, questionController.upvoteQuestion);
router.post('/:id/downvote', authMiddleware, questionController.downvoteQuestion);


module.exports = router;

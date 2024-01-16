const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route to post a new answer for a specific question
router.post(
  "/question/:questionId",
  authMiddleware,
  answerController.postAnswer
);

// Route to get all answers for a specific question
router.get("/question/:questionId", answerController.getAnswersByQuestion);

// Route to get a specific answer by its ID
router.get("/:id", answerController.getAnswer);

// Route to update an existing answer by its ID
router.put("/:id", authMiddleware, answerController.updateAnswer);

// Route to delete an existing answer by its ID
router.delete("/:id", authMiddleware, answerController.deleteAnswer);

// Route to upvote an answer by its ID
router.post("/:id/upvote", authMiddleware, answerController.upvoteAnswer);

// Route to downvote an answer by its ID
router.post("/:id/downvote", authMiddleware, answerController.downvoteAnswer);

module.exports = router; // Export the answer routes

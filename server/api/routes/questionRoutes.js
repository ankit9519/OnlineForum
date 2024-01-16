const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route to post a new question
router.post("/", authMiddleware, questionController.postQuestion);

// Route to get all questions
router.get("/", questionController.getAllQuestions);

// Route to get a specific question by its ID
router.get("/:id", questionController.getQuestion);

// Route to update an existing question by its ID
router.put("/:id", authMiddleware, questionController.updateQuestion);

// Route to delete an existing question by its ID
router.delete("/:id", authMiddleware, questionController.deleteQuestion);

// Route to upvote a question by its ID
router.post("/:id/upvote", authMiddleware, questionController.upvoteQuestion);

// Route to downvote a question by its ID
router.post(
  "/:id/downvote",
  authMiddleware,
  questionController.downvoteQuestion
);

module.exports = router; // Export the question routes

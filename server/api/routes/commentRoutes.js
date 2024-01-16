const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route to post a new comment
router.post("/", authMiddleware, commentController.postComment);

// Route to get all comments for a specific answer
router.get("/answer/:answerId", commentController.getCommentsByAnswer);

// Route to get a specific comment by its ID
router.get("/:id", commentController.getComment);

// Route to update an existing comment by its ID
router.put("/:id", authMiddleware, commentController.updateComment);

// Route to delete an existing comment by its ID
router.delete("/:id", authMiddleware, commentController.deleteComment);

module.exports = router; // Export the comment routes

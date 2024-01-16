const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route to get user profile
router.get("/profile", authMiddleware, userController.getProfile);

// Route to update user profile
router.put("/profile", authMiddleware, userController.updateProfile);

// Route to delete user profile
router.delete("/profile", authMiddleware, userController.deleteProfile);

// Route to get questions posted by the user
router.get("/questions", authMiddleware, userController.getUserQuestions);

// Route to get answers posted by the user
router.get("/answers", authMiddleware, userController.getUserAnswers);

module.exports = router; // Export the user routes

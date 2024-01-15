const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, userController.getProfile);

router.put("/profile", authMiddleware, userController.updateProfile);

router.delete("/profile", authMiddleware, userController.deleteProfile);

router.get("/questions", authMiddleware, userController.getUserQuestions);

router.get("/answers", authMiddleware, userController.getUserAnswers);

module.exports = router;

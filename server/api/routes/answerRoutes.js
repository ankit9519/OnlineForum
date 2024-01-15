const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/question/:questionId",
  authMiddleware,
  answerController.postAnswer
);
router.get("/question/:questionId", answerController.getAnswersByQuestion);
router.get("/:id", answerController.getAnswer);
router.put("/:id", authMiddleware, answerController.updateAnswer);
router.delete("/:id", authMiddleware, answerController.deleteAnswer);
router.post("/:id/upvote", authMiddleware, answerController.upvoteAnswer);
router.post("/:id/downvote", authMiddleware, answerController.downvoteAnswer);

module.exports = router;

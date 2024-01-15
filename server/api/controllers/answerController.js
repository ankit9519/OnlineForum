const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");

// Post a new answer
exports.postAnswer = async (req, res) => {
  const { content } = req.body;
  const { questionId } = req.params;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const answer = new Answer({
      content,
      author: req.user._id,
      question: questionId,
    });

    await answer.save();
    await answer.populate("author", "username"); // Populate author details

    res.status(201).json(answer);
  } catch (error) {
    console.error("Error in postAnswer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAnswersByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await Answer.find({ question: questionId }).populate(
      "author"
    );
    res.status(200).json(answers);
  } catch (error) {
    console.error("Error in getAnswersByQuestion:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific answer
exports.getAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id).populate("author");
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.status(200).json(answer);
  } catch (error) {
    console.error("Error in getAnswer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing answer
exports.updateAnswer = async (req, res) => {
  const { content } = req.body;
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    if (answer.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    answer.content = content;
    await answer.save();
    res.status(200).json(answer);
  } catch (error) {
    console.error("Error in updateAnswer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an answer
exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    if (answer.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await answer.remove();
    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAnswer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Upvote an answer
exports.upvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    // Assuming the vote method is implemented in the Answer model
    await answer.vote(req.user, "up");
    res.status(200).json(answer);
  } catch (error) {
    console.error("Error in upvoteAnswer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Downvote an answer
exports.downvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    await answer.vote(req.user, "down");
    res.status(200).json(answer);
  } catch (error) {
    console.error("Error in downvoteAnswer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

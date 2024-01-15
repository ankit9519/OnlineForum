const Question = require("../models/questionModel");

exports.postQuestion = async (req, res) => {
  const { title, content } = req.body;
  try {
    const question = new Question({
      title,
      content,
      author: req.user._id,
    });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("author");
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("author");
    if (!question) {
      return res.status(404).send("Question not found");
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).send("Question deleted successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.upvoteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).send("Question not found");
    }

    if (question.upvotes.includes(req.user._id)) {
      return res.status(400).send("Already upvoted");
    }

    question.downvotes.pull(req.user._id);
    question.upvotes.push(req.user._id);

    await question.save();

    // Populate author information if needed, or send the question as is
    const updatedQuestion = await Question.findById(req.params.id).populate(
      "author"
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.downvoteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).send("Question not found");
    }

    if (question.downvotes.includes(req.user._id)) {
      return res.status(400).send("Already downvoted");
    }

    question.upvotes.pull(req.user._id);
    question.downvotes.push(req.user._id);

    await question.save();

    // Populate author information if needed, or send the question as is
    const updatedQuestion = await Question.findById(req.params.id).populate(
      "author"
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

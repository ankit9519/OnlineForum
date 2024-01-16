const Question = require("../models/questionModel");

// Post a Question
exports.postQuestion = async (req, res) => {
  const { title, content } = req.body; // Extract title and content from the request body
  try {
    const question = new Question({
      title,
      content,
      author: req.user._id, // Set author as the logged-in user's ID
    });
    await question.save(); // Save the question to the database
    res.status(201).json(question); // Respond with the created question
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Get all Questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("author"); // Retrieve all questions, including author details
    res.status(200).json(questions); // Send the retrieved questions as a response
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Get a specific Question
exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("author"); // Retrieve a specific question by its ID, including author details
    if (!question) {
      return res.status(404).send("Question not found"); // Return error if the question is not found
    }
    res.status(200).json(question); // Send the retrieved question as a response
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Update a Question
exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); // Find and update a question by its ID
    res.status(200).json(updatedQuestion); // Respond with the updated question
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Delete a Question
exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id); // Find and delete a question by its ID
    res.status(200).send("Question deleted successfully"); // Respond with success message
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Upvote a Question
exports.upvoteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id); // Find the question by ID
    if (!question) {
      return res.status(404).send("Question not found"); // Return error if the question is not found
    }

    if (question.upvotes.includes(req.user._id)) {
      return res.status(400).send("Already upvoted"); // Return error if user has already upvoted
    }

    question.downvotes.pull(req.user._id); // Remove user from downvotes
    question.upvotes.push(req.user._id); // Add user to upvotes

    await question.save(); // Save the updated question

    // Populate author information if needed, or send the question as is
    const updatedQuestion = await Question.findById(req.params.id).populate(
      "author"
    );
    res.status(200).json(updatedQuestion); // Respond with the updated question
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Downvote a Question
exports.downvoteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id); // Find the question by ID
    if (!question) {
      return res.status(404).send("Question not found"); // Return error if the question is not found
    }

    if (question.downvotes.includes(req.user._id)) {
      return res.status(400).send("Already downvoted"); // Return error if user has already downvoted
    }

    question.upvotes.pull(req.user._id); // Remove user from upvotes
    question.downvotes.push(req.user._id); // Add user to downvotes

    await question.save(); // Save the updated question

    // Populate author information if needed, or send the question as is
    const updatedQuestion = await Question.findById(req.params.id).populate(
      "author"
    );
    res.status(200).json(updatedQuestion); // Respond with the updated question
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

const Comment = require("../models/commentModel");
const Answer = require("../models/answerModel");

// Post a Comment
exports.postComment = async (req, res) => {
  const { content, answerId } = req.body; // Extract content and answer ID from the request body
  try {
    const answer = await Answer.findById(answerId); // Find the associated answer by ID
    if (!answer) {
      return res.status(404).send("Answer not found"); // Return error if answer not found
    }
    const comment = new Comment({
      content,
      answer: answerId,
      author: req.user._id,
    }); // Create a new comment with content, answer ID, and author ID
    await comment.save(); // Save the comment to the database
    res.status(201).send("Comment posted successfully"); // Respond with success message
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Get a specific Comment
exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("author"); // Retrieve a specific comment by its ID, including author details
    if (!comment) {
      return res.status(404).send("Comment not found"); // Return error if comment not found
    }
    res.status(200).json(comment); // Send the retrieved comment as a response
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Update a Comment
exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); // Find and update a comment by its ID
    res.status(200).json(updatedComment); // Respond with the updated comment
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Delete a Comment
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id); // Find and delete a comment by its ID
    res.status(200).send("Comment deleted successfully"); // Respond with success message
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Get comments by Answer
exports.getCommentsByAnswer = async (req, res) => {
  try {
    const comments = await Comment.find({
      answer: req.params.answerId,
    }).populate("author"); // Find comments associated with a specific answer, including author details
    res.status(200).json(comments); // Send the retrieved comments as a response
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

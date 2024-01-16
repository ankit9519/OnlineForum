const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");

// Post a new answer
exports.postAnswer = async (req, res) => {
  const { content } = req.body; // Extract content from the request body
  const { questionId } = req.params; // Extract question ID from request parameters

  try {
    const question = await Question.findById(questionId); // Find the question by ID
    if (!question) {
      return res.status(404).json({ message: "Question not found" }); // If question not found, return 404
    }

    // Create a new answer with the extracted content, author, and question ID
    const answer = new Answer({
      content,
      author: req.user._id, // Set author as the logged-in user's ID
      question: questionId, // Set the question ID
    });

    await answer.save(); // Save the answer to the database

    await answer.populate("author", "username"); // Populate author details

    res.status(201).json(answer); // Respond with the created answer
  } catch (error) {
    console.error("Error in postAnswer:", error);
    res.status(500).json({ message: "Server error" }); // Handle server errors
  }
};

// Get answers for a specific question
exports.getAnswersByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params; // Extract question ID from request parameters
    const answers = await Answer.find({ question: questionId }).populate(
      "author"
    );
    res.status(200).json(answers);
  } catch (error) {
    console.error("Error in getAnswersByQuestion:", error);
    res.status(500).json({ message: "Server error" }); // Handle server errors
  }
};

// Get a specific answer
exports.getAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id).populate("author"); // Retrieve a specific answer by its ID, including author details
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" }); // Return an error if the answer is not found
    }
    res.status(200).json(answer); // Send the retrieved answer as a response
  } catch (error) {
    console.error("Error in getAnswer:", error);
    res.status(500).json({ message: "Server error" }); // Handles server errors
  }
};

// Update an existing answer
exports.updateAnswer = async (req, res) => {
  const { content } = req.body; // Extract content from the request body
  try {
    const answer = await Answer.findById(req.params.id); // Find the answer by ID
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" }); // If answer not found, return 404
    }
    if (answer.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" }); // If the user is not the author, return unauthorized error
    }
    answer.content = content; // Update the content of the answer
    await answer.save(); // Save the updated answer
    res.status(200).json(answer); // Respond with the updated answer
  } catch (error) {
    console.error("Error in updateAnswer:", error);
    res.status(500).json({ message: "Server error" }); // Handle server errors
  }
};

// Delete an answer
exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id); // Find the answer by ID
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" }); // If answer not found, return 404
    }
    if (answer.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" }); // If the user is not the author, return unauthorized error
    }
    await answer.remove(); // Remove the answer
    res.status(200).json({ message: "Answer deleted successfully" }); // Respond with success message
  } catch (error) {
    console.error("Error in deleteAnswer:", error);
    res.status(500).json({ message: "Server error" }); // Handle server errors
  }
};

// Upvote an answer
exports.upvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id); // Find the answer by ID
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" }); // If answer not found, return 404
    }
    // Assuming the vote method is implemented in the Answer model
    await answer.vote(req.user, "up"); // Upvote the answer
    res.status(200).json(answer); // Respond with the updated answer
  } catch (error) {
    console.error("Error in upvoteAnswer:", error);
    res.status(500).json({ message: "Server error" }); // Handle server errors
  }
};

// Downvote an answer
exports.downvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id); // Find the answer by ID
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" }); // If answer not found, return 404
    }
    // Assuming the vote method is implemented in the Answer model
    await answer.vote(req.user, "down"); // Downvote the answer
    res.status(200).json(answer); // Respond with the updated answer
  } catch (error) {
    console.error("Error in downvoteAnswer:", error);
    res.status(500).json({ message: "Server error" }); // Handle server errors
  }
};

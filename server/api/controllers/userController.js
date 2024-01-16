const User = require("../models/userModel");
const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from the request
    const user = await User.findById(userId, "-password"); // Find user by ID and exclude the password field
    if (!user) {
      return res.status(404).send("User not found"); // Return error if user not found
    }
    res.status(200).json(user); // Send the user profile as a response
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { education, employment, interests } = req.body; // Extract education, employment, and interests from the request body
  try {
    const user = await User.findById(req.user._id); // Find user by ID
    if (!user) {
      return res.status(404).send("User not found"); // Return error if user not found
    }
    // Update user profile with provided or existing values
    user.education = education || user.education;
    user.employment = employment || user.employment;

    // Check if interests is a string and split it, otherwise use it as it is if it's an array
    user.interests =
      typeof interests === "string"
        ? interests.split(",").map((item) => item.trim())
        : Array.isArray(interests)
        ? interests
        : user.interests;

    await user.save(); // Save the updated user profile
    res.status(200).json(user); // Respond with the updated user profile
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: error.message, stack: error.stack }); // Handle server errors
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from the request
    await User.findByIdAndDelete(userId); // Find and delete the user by ID
    res.status(200).send("User profile deleted successfully"); // Respond with success message
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Get questions posted by the user
exports.getUserQuestions = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from the request
    const userQuestions = await Question.find({ author: userId }); // Find questions posted by the user
    res.json(userQuestions); // Send the retrieved user questions as a response
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

// Get answers posted by the user
exports.getUserAnswers = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from the request
    const userAnswers = await Answer.find({ author: userId }); // Find answers posted by the user
    res.json(userAnswers); // Send the retrieved user answers as a response
  } catch (error) {
    res.status(500).send("Server error"); // Handle server errors
  }
};

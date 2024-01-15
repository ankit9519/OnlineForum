const User = require("../models/userModel");
const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.updateProfile = async (req, res) => {
  const { education, employment, interests } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.education = education || user.education;
    user.employment = employment || user.employment;

    // Check if interests is a string and split it, otherwise use it as it is if it's an array
    user.interests =
      typeof interests === "string"
        ? interests.split(",").map((item) => item.trim())
        : Array.isArray(interests)
        ? interests
        : user.interests;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    res.status(200).send("User profile deleted successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getUserQuestions = async (req, res) => {
  try {
    const userId = req.user._id;
    const userQuestions = await Question.find({ author: userId });
    res.json(userQuestions);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getUserAnswers = async (req, res) => {
  try {
    const userId = req.user._id;
    const userAnswers = await Answer.find({ author: userId });
    res.json(userAnswers);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

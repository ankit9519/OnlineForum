const mongoose = require("mongoose");

// Define the schema for an answer means this is how we will create the answer
const answerSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Content of the answer
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the author (User model)
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  }, // Reference to the associated question (Question model)
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of users who upvoted the answer
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of users who downvoted the answer
  created_at: { type: Date, default: Date.now }, // Timestamp for when the answer was created
  updated_at: { type: Date }, // Timestamp for when the answer was last updated
});

// Method to handle voting on an answer
answerSchema.methods.vote = function (user, vote) {
  // 'vote' should be either 'up' or 'down'
  const opposite = vote === "up" ? "downvotes" : "upvotes";

  if (this[opposite].includes(user._id)) {
    this[opposite].remove(user._id);
  }
  if (this[vote + "votes"].includes(user._id)) {
    this[vote + "votes"].remove(user._id);
  } else {
    this[vote + "votes"].push(user);
  }

  return this.save(); // Save the updated answer with the new votes
};

module.exports = mongoose.model("Answer", answerSchema); // Export the Answer model

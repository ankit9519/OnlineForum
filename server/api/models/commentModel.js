const mongoose = require("mongoose");

// Define the schema for a comment means this is how we will create the comment
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Content of the comment
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the author (User model)
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: true,
  }, // Reference to the associated answer (Answer model)
  created_at: { type: Date, default: Date.now }, // Timestamp for when the comment was created
});

module.exports = mongoose.model("Comment", commentSchema); // Export the Comment model

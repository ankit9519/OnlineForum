const mongoose = require("mongoose");

// Define the schema for a question means how the question will be created
const questionSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the question
  content: { type: String, required: true }, // Content of the question
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the author (User model)
  topics: [String], // Array of topics associated with the question
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of users who upvoted the question
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of users who downvoted the question
  created_at: { type: Date, default: Date.now }, // Timestamp for when the question was created
  updated_at: { type: Date }, // Timestamp for when the question was last updated
});

module.exports = mongoose.model("Question", questionSchema); // Export the Question model

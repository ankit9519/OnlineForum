const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for a user means all the information about the user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // User's username
  email: { type: String, required: true, unique: true }, // User's email (unique)
  password: { type: String, required: true }, // User's hashed password
  education: String, // User's education information
  employment: String, // User's employment information
  interests: [String], // Array of user's interests
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // Array of references to questions authored by the user
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }], // Array of references to answers authored by the user
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8); // Hash the password with bcrypt
  }
  next();
});

module.exports = mongoose.model("User", userSchema); // Export the User model

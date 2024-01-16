const jwt = require("jsonwebtoken");
require("dotenv").config();

// Function to generate a JWT token for a user
exports.generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  }); // Sign a token with the user's ID, using the JWT_SECRET from the environment, and set an expiration of 1 hour
};

// Function to verify a JWT token
exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the JWT_SECRET from the environment
};

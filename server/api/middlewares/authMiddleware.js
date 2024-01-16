const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // Extract the token from the Authorization header
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
    const user = await User.findOne({ _id: decoded.userId }); // Find the user associated with the decoded user ID

    if (!user) {
      throw new Error(); // Throw an error if the user is not found
    }

    req.user = user; // Attach the user object to the request
    req.token = token; // Attach the token to the request
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." }); // Send unauthorized status if authentication fails
  }
};

module.exports = authMiddleware; // Export the authentication middleware

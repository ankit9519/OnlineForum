const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// User registration
exports.register = async (req, res) => {
  const { username, email, password, education, employment, interests } =
    req.body; // These are the mandatory parameters that will be passed to create User

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists"); // Return error if user already exists
    }

    // Create a new user with hashed password using Mongoose middleware
    const user = new User({
      username,
      email,
      password,
      education,
      employment,
      interests: interests
        ? interests.split(",").map((interest) => interest.trim())
        : [],
    });

    await user.save(); // Save the user to the database

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token }); // Send the token in the response
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Server error during registration"); // Handle server errors during registration
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found"); // Return error if user not found
    }

    // Debugging: Log the hashed password stored in the database
    console.log("Stored hashed password:", user.password);

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Debugging: Log the result of the password comparison
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).send("Invalid credentials"); // Return error if passwords do not match
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token }); // Send the token in the response
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error during login"); // Handle server errors during login
  }
};

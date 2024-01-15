const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, email, password, education, employment, interests } =
    req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const user = new User({
      username,
      email,
      password, // Let Mongoose middleware handle the hashing
      education,
      employment,
      interests: interests
        ? interests.split(",").map((interest) => interest.trim())
        : [],
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token }); // Send the token in the response
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Server error during registration");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Debugging: Log the hashed password stored in the database
    console.log("Stored hashed password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    // Debugging: Log the result of the password comparison
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error during login");
  }
};

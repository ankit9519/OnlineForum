const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../validators/userValidator");

// Route to handle user registration
router.post("/register", validateRegistration, authController.register);

// Route to handle user login
router.post("/login", validateLogin, authController.login);

module.exports = router; // Export the authentication routes

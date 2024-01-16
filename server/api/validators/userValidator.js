const { body, validationResult } = require("express-validator");

// Validation middleware for user registration
exports.validateRegistration = [
  body("username").not().isEmpty().withMessage("Username is required"), // Check if username is provided
  body("email").isEmail().withMessage("Valid email is required"), // Check if email is a valid email address
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"), // Check if password is at least 6 characters long
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
    }
    next();
  },
];

// Validation middleware for user login
exports.validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"), // Check if email is a valid email address
  body("password").not().isEmpty().withMessage("Password is required"), // Check if password is provided
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
    }
    next();
  },
];

// Load environment variables
require("dotenv").config(); // Load environment variables from a .env file

// Importing routes
const authRoutes = require("./api/routes/authRoutes");
const questionRoutes = require("./api/routes/questionRoutes");
const answerRoutes = require("./api/routes/answerRoutes");
const commentRoutes = require("./api/routes/commentRoutes");
const userProfile = require("./api/routes/userRoutes");

// Importing required modules
const express = require("express"); // Express framework for building the server
const cors = require("cors"); // CORS middleware for enabling cross-origin resource sharing
const connectDB = require("./config/db"); // Custom module for connecting to the database

// Connect to the database
connectDB();

// Create an instance of the Express application
const app = express();

// Enable CORS with a specific origin
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
  })
);

// Initialize Middleware
app.use(express.json({ extended: false })); // Parse incoming JSON data

// Define Routes
app.use("/api/users", authRoutes); // Use the authentication routes
app.use("/api/questions", questionRoutes); // Use the question routes
app.use("/api/answers", answerRoutes); // Use the answer routes
app.use("/api/comments", commentRoutes); // Use the comment routes
app.use("/api/profiles", userProfile); // Use the user profile routes

// Catch-all route for testing server setup
app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000; // Set the port for the server

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server and listen on the specified port

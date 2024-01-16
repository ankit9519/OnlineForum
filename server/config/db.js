const mongoose = require("mongoose");
require("dotenv").config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Use Mongoose to connect to the MongoDB database using the provided URI
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected..."); // Log a success message if the connection is successful
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit the process with an error code if there's an issue connecting to the database
  }
};

module.exports = connectDB;

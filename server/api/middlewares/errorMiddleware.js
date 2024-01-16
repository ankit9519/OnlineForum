// Error handling middleware
const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set the status code to 500 if it's not already an error status
  res.status(statusCode); // Set the HTTP status code of the response

  res.json({
    message: err.message, // Send the error message in the response
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack, // Send the error stack in development mode, or a pancake emoji in production
  });
};

module.exports = errorMiddleware; // Export the error handling middleware

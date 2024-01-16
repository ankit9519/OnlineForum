// Define a function to extract and format error messages based on different error scenarios
export const getErrorMessage = (error) => {
    // Log a message indicating the start of error handling
    console.log('Handling error:', error);

    // Check if the error has a response object (e.g., from the server)
    if (error.response) {
        // Return the response data message if available, or a default message
        return error.response.data?.message || "Server responded with an error";
    } else if (error.request) {
        // Return a message indicating no response was received from the server
        return "No response was received from the server";
    } else {
        // Return the error message if available, or a default message
        return error.message || "An error occurred during the request";
    }
};

// Define a function to show an error message to the user (e.g., using an alert)
export const showError = (message) => {
    // Log a message indicating the start of showing an error message
    console.log('Showing error message:', message);

    // Display an alert with the specified error message
    alert(message);
};

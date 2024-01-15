export const getErrorMessage = (error) => {
    console.log('Handling error:', error);
    if (error.response) {
        return error.response.data?.message || "Server responded with an error";
    } else if (error.request) {
        return "No response was received from the server";
    } else {
        return error.message || "An error occurred during the request";
    }
};

export const showError = (message) => {
    console.log('Showing error message:', message);
    alert(message);
};

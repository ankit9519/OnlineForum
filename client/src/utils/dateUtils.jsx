// Define a function to format a date string using specified options
export const formatDate = (dateString) => {
    // Log a message indicating the start of date formatting
    console.log('Formatting date:', dateString);

    // Specify the formatting options for the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Convert the date string to a formatted date using the specified options
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Define a function to calculate relative time from a given date string
export const relativeTime = (dateString) => {
    // Log a message indicating the start of relative time calculation
    console.log('Calculating relative time for:', dateString);

    // Create a Date object from the given date string
    const date = new Date(dateString);

    // Get the current date and time
    const now = new Date();

    // Calculate the time difference in seconds
    const secondsAgo = Math.round((now - date) / 1000);

    // Determine the appropriate relative time format based on the time difference
    if (secondsAgo < 60) {
        return `${secondsAgo} seconds ago`;
    } else if (secondsAgo < 3600) {
        return `${Math.round(secondsAgo / 60)} minutes ago`;
    } else if (secondsAgo < 86400) {
        return `${Math.round(secondsAgo / 3600)} hours ago`;
    } else {
        // If more than a day, use the formatDate function for detailed date format
        return formatDate(dateString);
    }
};

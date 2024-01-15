export const formatDate = (dateString) => {
    console.log('Formatting date:', dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const relativeTime = (dateString) => {
    console.log('Calculating relative time for:', dateString);
    const date = new Date(dateString);
    const now = new Date();
    const secondsAgo = Math.round((now - date) / 1000);

    if (secondsAgo < 60) {
        return `${secondsAgo} seconds ago`;
    } else if (secondsAgo < 3600) {
        return `${Math.round(secondsAgo / 60)} minutes ago`;
    } else if (secondsAgo < 86400) {
        return `${Math.round(secondsAgo / 3600)} hours ago`;
    } else {
        return formatDate(dateString);
    }
};

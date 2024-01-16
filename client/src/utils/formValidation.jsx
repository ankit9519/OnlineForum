// Define a function to validate an email address using a regular expression
export const validateEmail = (email) => {
    // Log a message indicating the start of email validation
    console.log('Validating email:', email);

    // Regular expression for validating email addresses
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Return true if the email matches the regular expression, false otherwise
    return re.test(email.toLowerCase());
};

// Define a function to validate a password based on a minimum length requirement
export const validatePassword = (password) => {
    // Log a message indicating the start of password validation
    console.log('Validating password:', password);

    // Return true if the password meets the minimum length requirement, false otherwise
    return password.length >= 6;
};

// Define a function to validate that the confirm password matches the original password
export const validateConfirmPassword = (password, confirmPassword) => {
    // Log a message indicating the start of confirm password validation
    console.log('Validating confirm password:', password, confirmPassword);

    // Return true if the confirm password matches the original password, false otherwise
    return password === confirmPassword;
};

export const validateEmail = (email) => {
    console.log('Validating email:', email);
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
};

export const validatePassword = (password) => {
    console.log('Validating password:', password);
    return password.length >= 6;
};

export const validateConfirmPassword = (password, confirmPassword) => {
    console.log('Validating confirm password:', password, confirmPassword);
    return password === confirmPassword;
};

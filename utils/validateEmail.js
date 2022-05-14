const validateEmail = (email) => {
    var regex = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/;
    return regex.test(email);
};

module.exports = validateEmail;
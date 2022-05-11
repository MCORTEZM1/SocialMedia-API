const validateEmail = (email) => {
    var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email);
};

module.exports = validateEmail;
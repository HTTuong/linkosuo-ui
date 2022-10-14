exports.validateString = (value) => {
    if (value) {
        if (value.length > 0) {
            return null;
        } else {
            return 'Invalid value';
        }
    } else {
        return 'This field is required';
    }
};

exports.validateName = (name) => {
    const regex = /^[a-z ,.'-]+$/i;
    if (name) {
        if (name.match(regex)) {
            return null;
        } else {
            return 'Invalid name';
        }
    } else {
        return 'This field is required';
    }
};

exports.validateEmail = (email) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email) {
        if (email.match(validRegex)) {
            return null;
        } else {
            return 'Invalid email address';
        }
    } else {
        return 'Please enter a valid email address';
    }
};

exports.validatePassword = (password) => {
    if (password) {
        if (password.length >= 6) {
            return null;
        } else {
            return 'Password must be at least 6 characters';
        }
    } else {
        return 'This field is required';
    }
};

exports.validatePhoneNumber = (phoneNumber) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNumber) {
        if (phoneNumber.match(regex)) {
            return null;
        } else {
            return 'Please enter a valid phone number';
        }
    } else {
        return 'This field is required';
    }
};

exports.validateCardNumber = (cardNumber) => {
    if (cardNumber) {
        if (cardNumber.length === 16) {
            return null;
        } else {
            return 'Please enter a valid card number';
        }
    } else {
        return 'This field is required';
    }
};

exports.validateCVV = (cvv) => {
    if (cvv) {
        if (cvv.length === 3) {
            return null;
        } else {
            return 'Please enter a valid CVV number';
        }
    } else {
        return 'This field is required';
    }
};

// const refPassword = useRef();
// const validateConfirmPassword = (confirmPassword) => {
//     let password;
//     if (refPassword.current) {
//         password = refPassword.current.value;
//         if (password && confirmPassword) {
//             if (password === confirmPassword) {
//                 return null;
//             } else {
//                 return 'The password confirmation does not match';
//             }
//         } else {
//             return 'This field is required';
//         }
//     }
// };

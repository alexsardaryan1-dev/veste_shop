export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    if (password.length < 8) {
        return { valid: false, message: "Minimum 8 characters required" };
    }

    if (password.length > 64) {
        return { valid: false, message: 'Maximum 64 characters possible' }
    }

    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Add at least 1 uppercase letter" };
    }

    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Add at least 1 lowercase letter" };
    }

    if (!/[0-9]/.test(password)) {
        return { valid: false, message: "Add at least 1 number" };
    }

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
        return { valid: false, message: "Add at least 1 special character" };
    }

    return { valid: true };
};

export const validateRegister = (name, email, password) => {
    if (!name || !email || !password) {
        return { valid: false, message: 'Please fill in all required fields' };
    }

    if (!validateEmail(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }

    if (!validatePassword(password)) {
        return { valid: false, message: 'Password must be at least 6 characters with 1 uppercase letter and 1 number' };
    }

    return { valid: true };
};

export const validateLogin = (email, password) => {
    if (!email || !password) {
        return { valid: false, message: 'Please fill all required fields' };
    }

    if (!validateEmail(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }

    return { valid: true };
};
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    if (password.length < 6) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    return true;
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
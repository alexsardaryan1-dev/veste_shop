// authentication controller handles everything related to users: register, email verification, login, forgot password, reset password, change password, get current user, logout.

// so the controller's job is to receive data from the frontend (req.body), validate it, call models/services, send a response.

import { generateToken } from "../utils/jwt.js";

// JWT is used here to create a token after login.

import { validateRegister, validateLogin, validatePassword } from "../middleware/validation.js";

import {
    findUserByEmail,
    findUserById,
    findUserByIdWithPassword,
    createUser,
    hashPassword,
    comparePassword,
    updatePassword,
    setResetCode,
    clearResetCode
} from "../models/user.js";
import { sendVerificationEmail, sendResetPasswordEmail } from "../../services/emailService.js";
import pool from "../config/database.js";

const generateVerificationCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const cookies = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 30 * 24 * 60 * 60 * 1000
};

// this code controls the JWT cookie. 
// httpOnly:true - browser JS can't access the cookie. Protection from XSS attacks.
// secure: process.env.NODE_ENV === "production" - cookie only works with HTTPS. Development "localhost" allowed. 
// sameSite - cookie won't be sent from other websites. Protection from CSRF attacks.
// maxAge - the user stays logged in for 30 days.


// REGISTER:

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        // it's destructuring, the same as const name = req.body.name and so on;

        const validation = validateRegister(name, email, password);
        
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        const userExists = await findUserByEmail(email);

        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: "User is already registered" });
        }

        const hashedPassword = await hashPassword(password);
        const verificationCode = generateVerificationCode();
        const newUser = await createUser(name, email, hashedPassword, verificationCode);

        await sendVerificationEmail(email, name, verificationCode);

        if (process.env.NODE_ENV === "development") {
            console.log(`Verification code for ${email}: ${verificationCode}`);
        }

        // development means the application is running in a mode for the developer while building and testing. 
        // Development Environment is when you are coding on your computer.
        // Production Environment is when your application is live for real users. 

        return res.status(201).json({
            user: {
                id: newUser.rows[0].id,
                name: newUser.rows[0].name,
                email: newUser.rows[0].email
            },
            message: "Registered. Check your email for verification code."
        });

    } catch (error) {
        console.error("Register error:", error.message);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// VERIFY CODE:

export const verifyCode = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        if (!email || !verificationCode) {
            return res.status(400).json({ message: "Email and code required" });
        }

        const user = await findUserByEmail(email);
        
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const userData = user.rows[0];

        if (userData.verification_code !== verificationCode) {
            return res.status(401).json({ message: "Invalid verification code" });
        }

        await pool.query(
            "UPDATE users SET is_verified = true, verification_code = NULL WHERE id = $1",
            [userData.id]
        );

        const token = generateToken(userData.id);
        
        res.cookie("token", token, cookies);

        if (process.env.NODE_ENV === "development") {
            console.log(`User verified: ${userData.email}`);
        }

        res.json({
            token,
            user: { id: userData.id, name: userData.name, email: userData.email },
            message: "Email verified successfully"
        });

    } catch (error) {
        console.error("Verify code error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN:

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validation = validateLogin(email, password);
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        const user = await findUserByEmail(email);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const userData = user.rows[0];

        if (!userData.is_verified) {
            return res.status(403).json({ message: "Please verify your email first" });
        }

        const isMatch = await comparePassword(password, userData.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(userData.id);
        res.cookie("token", token, cookies);

        if (process.env.NODE_ENV === "development") {
            console.log(`User logged in: ${userData.email}`);
        }

        res.json({
            token,
            user: { id: userData.id, name: userData.name, email: userData.email },
            message: "Login successful"
        });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error during login" });
    }
};

// FORGOT PASSWORD 

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email required" });
        }

        const user = await findUserByEmail(email);
        if (user.rows.length === 0) {
            return res.status(200).json({
                message: "If an account exists, reset code has been sent to email."
            });
        }

        const userData = user.rows[0];
        const resetCode = generateVerificationCode();
        await setResetCode(email, resetCode);

        await sendResetPasswordEmail(email, userData.name, resetCode);

        if (process.env.NODE_ENV === "development") {
            console.log(`Password reset code for ${email}: ${resetCode}`);
        }

        res.json({
            message: "If an account exists, reset code has been sent to email."
        });

    } catch (error) {
        console.error("Forgot password error:", error.message);
        res.status(500).json({ message: "Unable to process request. Please try again." });
    }
};

// VERIFY RESET CODE

export const verifyResetCode = async (req, res) => {
    try {
        const { email, resetCode } = req.body;

        if (!email || !resetCode) {
            return res.status(400).json({ message: "Email and code required" });
        }

        const user = await findUserByEmail(email);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid or expired code" });
        }

        const userData = user.rows[0];

        if (userData.reset_code !== resetCode) {
            return res.status(401).json({ message: "Invalid reset code" });
        }

        if (new Date() > new Date(userData.reset_code_expires)) {
            return res.status(401).json({ message: "Reset code expired. Request a new one." });
        }

        res.json({ valid: true, message: "Code verified" });

    } catch (error) {
        console.error("Verify reset code error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// RESET PASSWORD

export const resetPassword = async (req, res) => {
    try {
        const { email, resetCode, newPassword } = req.body;

        if (!email || !resetCode || !newPassword) {
            return res.status(400).json({ message: "Email, code, and password required" });
        }

        if (!validatePassword(newPassword)) {
            return res.status(400).json({
                message: "Password must be at least 6 characters with 1 uppercase letter and 1 number"
            });
        }

        const user = await findUserByEmail(email);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const userData = user.rows[0];

        if (userData.reset_code !== resetCode) {
            return res.status(401).json({ message: "Invalid reset code" });
        }

        if (new Date() > new Date(userData.reset_code_expires)) {
            return res.status(401).json({ message: "Reset code expired. Request a new one." });
        }

        const hashedPassword = await hashPassword(newPassword);
        await updatePassword(userData.id, hashedPassword);
        await clearResetCode(userData.id);

        if (process.env.NODE_ENV === "development") {
            console.log(`Password reset for: ${userData.email}`);
        }

        res.json({
            message: "Password reset successfully. You can now login."
        });

    } catch (error) {
        console.error("Reset password error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// CHANGE PASSWORD

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!validatePassword(newPassword)) {
            return res.status(400).json({
                message: "Password must be at least 6 characters with 1 uppercase letter and 1 number"
            });
        }

        const user = await findUserByIdWithPassword(userId);
        const userData = user.rows[0];

        const isMatch = await comparePassword(currentPassword, userData.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        const hashedPassword = await hashPassword(newPassword);
        await updatePassword(userId, hashedPassword);

        if (process.env.NODE_ENV === "development") {
            console.log(`Password changed for: ${userData.email}`);
        }

        res.json({
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error("Change password error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// GET ME

export const getMe = async (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (error) {
        console.error("Get profile error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// LOG OUT

export const logout = (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });

        if (process.env.NODE_ENV === "development") {
            console.log(`User logged out`);
        }

        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error.message);
        res.status(500).json({ message: "Logout failed" });
    }
};
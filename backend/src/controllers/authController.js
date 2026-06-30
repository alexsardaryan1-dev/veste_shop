import { generateToken } from '../utils/jwt.js';
import { validateRegister, validateLogin, validatePassword } from '../middleware/validation.js';
import {
    findUserByEmail,
    findUserById,
    createUser,
    hashPassword,
    comparePassword,
    updatePassword,
    setResetCode,
    clearResetCode
} from '../models/user.js';
import pool from '../config/database.js';

const generateVerificationCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const cookies = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const validation = validateRegister(name, email, password);
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        const userExists = await findUserByEmail(email);
        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: 'User already exists with this email' });
        }

        const hashedPassword = await hashPassword(password);
        const verificationCode = generateVerificationCode();

        const newUser = await createUser(name, email, hashedPassword, verificationCode);

        console.log(`Verification code for ${email}: ${verificationCode}`);

        return res.status(201).json({
            user: { id: newUser.rows[0].id, name: newUser.rows[0].name, email: newUser.rows[0].email },
            message: 'User registered. Check console for verification code'
        });

    } catch (error) {
        console.error('Register error:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

export const verifyCode = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        if (!email || !verificationCode) {
            return res.status(400).json({ message: 'Email and code required' });
        }

        const user = await findUserByEmail(email);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const userData = user.rows[0];
        
        if (userData.verification_code !== verificationCode) {
            return res.status(401).json({ message: 'Invalid verification code' });
        }

        await pool.query(
            'UPDATE users SET is_verified = true, verification_code = NULL WHERE id = $1',
            [userData.id]
        );

        const token = generateToken(userData.id);
        res.cookie('token', token, cookies);

        res.json({
            token,
            user: { id: userData.id, name: userData.name, email: userData.email },
            message: 'Email verified successfully'
        });

    } catch (error) {
        console.error('Verify code error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validation = validateLogin(email, password);
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        const user = await findUserByEmail(email);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const userData = user.rows[0];

        if (!userData.is_verified) {
            return res.status(403).json({ message: 'Please verify your email first' });
        }

        const isMatch = await comparePassword(password, userData.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(userData.id);
        res.cookie('token', token, cookies);

        res.json({
            token,
            user: { id: userData.id, name: userData.name, email: userData.email },
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email required' });
        }

        const user = await findUserByEmail(email);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetCode = generateVerificationCode();
        await setResetCode(email, resetCode);

        console.log(`Password reset code for ${email}: ${resetCode}`);

        res.json({
            message: 'Reset code sent to email. Check console for code.'
        });

    } catch (error) {
        console.error('Forgot password error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, resetCode, newPassword } = req.body;

        if (!email || !resetCode || !newPassword) {
            return res.status(400).json({ message: 'Email, code, and password required' });
        }

        if (!validatePassword(newPassword)) {
            return res.status(400).json({ 
                message: 'Password must be at least 6 characters with 1 uppercase letter and 1 number' 
            });
        }

        const user = await findUserByEmail(email);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = user.rows[0];

        if (userData.reset_code !== resetCode) {
            return res.status(401).json({ message: 'Invalid reset code' });
        }

        if (new Date() > new Date(userData.reset_code_expires)) {
            return res.status(401).json({ message: 'Reset code expired. Request new one.' });
        }

        const hashedPassword = await hashPassword(newPassword);
        await updatePassword(userData.id, hashedPassword);
        await clearResetCode(userData.id);

        res.json({
            message: 'Password reset successfully. You can now login.'
        });

    } catch (error) {
        console.error('Reset password error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'All fields required' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        if (!validatePassword(newPassword)) {
            return res.status(400).json({ 
                message: 'Password must be at least 6 characters with 1 uppercase letter and 1 number' 
            });
        }

        const user = await findUserById(userId);
        const userData = user.rows[0];

        const isMatch = await comparePassword(currentPassword, userData.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await hashPassword(newPassword);
        await updatePassword(userId, hashedPassword);

        res.json({
            message: 'Password changed successfully'
        });

    } catch (error) {
        console.error('Change password error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMe = async (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (error) {
        console.error('Get profile error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token', cookies);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error.message);
        res.status(500).json({ message: 'Logout failed' });
    }
};
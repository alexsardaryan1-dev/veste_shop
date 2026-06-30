import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

const cookies = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// PASSWORD VALIDATION
const validatePassword = (password) => {
    if (password.length < 6) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    return true;
};

// REGISTER 

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log('Register request:', { name, email });

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ 
                message: 'Password must be at least 6 characters with 1 uppercase letter and 1 number' 
            });
        }

        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email';
        console.log('...Running query:', query);
        console.log('With values:', [name, email, '***hashed***']);

        const newUser = await pool.query(query, [name, email, hashedPassword]);

        console.log('Query result:', newUser);
        console.log('Rows returned:', newUser.rows);
        console.log('SUCCESS: User created:', newUser.rows[0]);

        const token = generateToken(newUser.rows[0].id);
        res.cookie('token', token, cookies);

        return res.status(201).json({
            token,
            user: newUser.rows[0],
            message: 'User registered successfully'
        });

    } catch (error) {
        console.error('ERROR: Register error details:', error.message);
        console.error('Full error:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
});

// LOGIN

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const userData = user.rows[0];

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(userData.id);

        res.cookie('token', token, cookies);

        console.log('SUCCESS: User logged in:', userData.email);

        res.json({
            token,
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email
            },
            message: 'Login successful'
        });

    } catch (error) {
        console.error('ERROR: Login error:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// ME (protected route)

router.get('/me', protect, async (req, res) => {
    try {
        res.json({
            user: req.user
        });
    } catch (error) {
        console.error('ERROR: Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// LOG OUT

router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token', cookies);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('ERROR: Logout error:', error);
        res.status(500).json({ message: 'Logout failed' });
    }
});

export default router;
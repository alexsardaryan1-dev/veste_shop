import jwt from 'jsonwebtoken';
import { findUserById } from '../models/user.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await findUserById(decoded.id);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user.rows[0];
        next();

    } catch (error) {
        console.error('Protect middleware error:', error.message);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
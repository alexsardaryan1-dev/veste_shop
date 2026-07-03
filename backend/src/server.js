import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import pool from './config/database.js';

dotenv.config();

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('FAIL: Database connection failed:', err);
    } else {
        console.log('SUCCESS: Database connected:', result.rows[0]);
    }
});

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
        ],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    console.log('Exiting...');
    await pool.end();
    process.exit(0);
});
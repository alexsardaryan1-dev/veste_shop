import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import pool from './config/database.js';

dotenv.config();

// DB test
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('FAIL: Database connection failed:', err);
    } else {
        console.log('SUCCESS: Database connected:', result.rows[0]);
    }
});

const app = express();

// middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// cleanup
process.on('SIGINT', async () => {
    console.log('Exiting...');
    await pool.end();
    process.exit(0);
});
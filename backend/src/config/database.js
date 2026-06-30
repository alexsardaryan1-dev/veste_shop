import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

console.log('...Connecting to database:', process.env.DB_NAME, 'as user:', process.env.DB_USER);

pool.on('connect', () => {
  console.log('SUCCESS: Connected to the database');
});

pool.on('error', (err) => {
  console.error('Database error', err);
  process.exit(-1);
});

export default pool;
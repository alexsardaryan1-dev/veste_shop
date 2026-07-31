import { Pool } from "pg";
// pg is the PostgreSQL package for Node.js. 
// It allows your application to:
// connect to PostgreSQL
// run SQL queries
// insert data
// update data
// delete data
// Without pg, JavaScript cannot communicate with PostgreSQL.

// Pool is a class provided by pg. It's like a connection manager. Instead of opening a new database connection every time someone visits your website, it creates a pool (collection) of reusable connections.

import dotenv from "dotenv";

// dotenv's job is to read your .env file.

dotenv.config();

// this line tells dotenv to read the .env file and put all its variables into process.env. 

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

// here we create a new connection manager with our db, giving important data mentioned in our .env. 

pool.on("error", (err) => {
    console.error("Unexpected error", err);
});

export default pool;
// This file is needed to handle all database operations related to users.
// The Architecture: controller -> model -> database.
// The controller shouldn't write SQL directly. Instead, it calls functiosn from this model.

import pool from "../config/database.js";
// pool is the object that allows to execute SQL queries. 
import bcrypt from "bcrypt";
// bcrypt hashes the password.

export const findUserByEmail = async (email) => {
    return pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

// $1 is a PostgreSQL placeholder. 

export const findUserById = async (id) => {
    return pool.query("SELECT id, name, email, is_verified FROM users WHERE id = $1", [id]);
};

export const createUser = async (name, email, hashedPassword, verificationCode) => {
    return pool.query(
        "INSERT INTO users (name, email, password, verification_code) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
        [name, email, hashedPassword, verificationCode]
    );
};

export const updatePassword = async (userId, hashedPassword) => {
    return pool.query(
        "UPDATE users SET password = $1 WHERE id = $2 RETURNING id, name, email",
        [hashedPassword, userId]
    );
};

export const setResetCode = async (email, resetCode) => {
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    return pool.query(
        "UPDATE users SET reset_code = $1, reset_code_expires = $2 WHERE email = $3",
        [resetCode, expiresAt, email]
    );
};

export const clearResetCode = async (userId) => {
    return pool.query(
        "UPDATE users SET reset_code = NULL, reset_code_expires = NULL WHERE id = $1",
        [userId]
    );
};

export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

export const findUserByIdWithPassword = async (id) => {
    return pool.query("SELECT id, name, email, password FROM users WHERE id = $1", [id]);
};
import pool from '../config/database.js';

export const getOrdersByUser = (userId, status) => {
    const query = status
        ? `SELECT id, total, status, created_at,
             (SELECT COUNT(*) FROM order_items WHERE order_id = orders.id) AS "itemsCount"
           FROM orders WHERE user_id = $1 AND status = $2 ORDER BY created_at DESC`
        : `SELECT id, total, status, created_at,
             (SELECT COUNT(*) FROM order_items WHERE order_id = orders.id) AS "itemsCount"
           FROM orders WHERE user_id = $1 ORDER BY created_at DESC`;

    const params = status ? [userId, status] : [userId];
    return pool.query(query, params);
};

export const getOrderStats = async (userId) => {
    const result = await pool.query(
        `SELECT
            COUNT(*) AS "totalOrders",
            COUNT(*) FILTER (WHERE status = 'confirmed') AS "confirmedOrders",
            COUNT(*) FILTER (WHERE status = 'pending') AS "pendingOrders",
            COALESCE(SUM(total), 0) AS "totalSpent"
         FROM orders WHERE user_id = $1`,
        [userId]
    );
    return result.rows[0];
};
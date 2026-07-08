import pool from '../config/database.js';

export const getOrdersByUser = (userId, status) => {
    const query = status
        ? `SELECT o.id, o.total, o.status, o.created_at,
             (
                SELECT json_agg(json_build_object(
                    'productId', oi.product_id,
                    'name', p.name,
                    'quantity', oi.quantity,
                    'price', oi.price,
                    'image', (
                        SELECT image_url FROM product_images
                        WHERE product_id = p.id
                        ORDER BY sort_order ASC
                        LIMIT 1
                    )
                ))
                FROM order_items oi
                JOIN products p ON p.id = oi.product_id
                WHERE oi.order_id = o.id
             ) AS items
           FROM orders o WHERE o.user_id = $1 AND o.status = $2 ORDER BY o.created_at DESC`
        : `SELECT o.id, o.total, o.status, o.created_at,
             (
                SELECT json_agg(json_build_object(
                    'productId', oi.product_id,
                    'name', p.name,
                    'quantity', oi.quantity,
                    'price', oi.price,
                    'image', (
                        SELECT image_url FROM product_images
                        WHERE product_id = p.id
                        ORDER BY sort_order ASC
                        LIMIT 1
                    )
                ))
                FROM order_items oi
                JOIN products p ON p.id = oi.product_id
                WHERE oi.order_id = o.id
             ) AS items
           FROM orders o WHERE o.user_id = $1 ORDER BY o.created_at DESC`;

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

export const createOrder = async (userId, total, items) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const orderResult = await client.query(
            `INSERT INTO orders (user_id, total, status) VALUES ($1, $2, 'confirmed') RETURNING id, total, status, created_at`,
            [userId, total]
        );
        const order = orderResult.rows[0];

        for (const item of items) {
            await client.query(
                `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`,
                [order.id, item.productId, item.quantity, item.price]
            );
        }

        await client.query('COMMIT');
        return order;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};
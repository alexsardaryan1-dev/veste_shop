import pool from "../config/database.js";

export const findAllProducts = () => {
    return pool.query(`
        SELECT
            p.id, p.name, p.price, p.sale_price, p.category,
            COALESCE(
                (
                    SELECT json_agg(image_url ORDER BY sort_order ASC)
                    FROM product_images
                    WHERE product_id = p.id
                ), '[]'
            ) AS images
        FROM products p
        ORDER BY p.created_at DESC
    `);
};

export const findProductById = async (id) => {
    const productResult = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
    );

    if (productResult.rows.length === 0) return null;

    const imagesResult = await pool.query(
        "SELECT id, image_url, sort_order FROM product_images WHERE product_id = $1 ORDER BY sort_order ASC",
        [id]
    );

    const variantsResult = await pool.query(
        "SELECT id, size, color, stock FROM product_variants WHERE product_id = $1",
        [id]
    );

    return {
        ...productResult.rows[0],
        images: imagesResult.rows,
        variants: variantsResult.rows,
    };
};
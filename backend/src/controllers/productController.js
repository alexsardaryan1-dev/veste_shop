import { findAllProducts, findProductById } from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const result = await findAllProducts();
        res.json({ products: result.rows });
    } catch (error) {
        console.error("Get products error:", error.message);
        res.status(500).json({ message: "Server error fetching products" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await findProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ product });
    } catch (error) {
        console.error("Get product error:", error.message);
        res.status(500).json({ message: "Server error fetching product" });
    }
};
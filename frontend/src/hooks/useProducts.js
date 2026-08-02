// It is a reusable function that gets products from your backend API and gives the product data to any component that needs it.
// Instead of writing the same fetch() code in Shop.jsx, ProductDetails.jsx, etc., we write it once here.

import { useEffect, useState } from "react";
import api from "../services/api";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/api/products");
                setProducts(res.data.products);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return { products, loading };
};
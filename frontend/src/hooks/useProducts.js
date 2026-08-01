// It is a reusable function that gets products from your backend API and gives the product data to any component that needs it.
// Instead of writing the same fetch() code in Shop.jsx, ProductDetails.jsx, etc., we write it once here.

import { useEffect, useState } from "react";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/products");
                const data = await res.json();
                setProducts(data.products);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return { products, loading };
};
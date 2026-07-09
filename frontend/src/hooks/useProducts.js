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
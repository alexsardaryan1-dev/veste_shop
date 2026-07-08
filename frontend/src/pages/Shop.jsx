import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Fuse from 'fuse.js';
import ProductGrid from '../components/product/ProductGrid.jsx';

const PAGE_SIZE = 8;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('http://localhost:5001/api/products');
            const data = await res.json();
            setProducts(data.products);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [category, search]);

    let filteredProducts = products;

    if (category === 'sale') {
        filteredProducts = filteredProducts.filter((p) => p.sale_price);
    } else if (category) {
        filteredProducts = filteredProducts.filter((p) => p.category === category);
    }

    if (search) {
        const fuse = new Fuse(filteredProducts, {
            keys: ['name'],
            threshold: 0.4,
        });
        filteredProducts = fuse.search(search).map((result) => result.item);
    }

    const visibleProducts = filteredProducts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredProducts.length;

    const categoryLabel = search
        ? `Results for "${search}"`
        : category === 'sale'
        ? 'Sale'
        : category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : 'All Products';

    const handleLoadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((prev) => prev + PAGE_SIZE);
            setLoadingMore(false);
        }, 600);
    };

    return (
        <div className="py-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <div className="text-base lg:text-lg text-gray-500">
                    <Link to="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-500">{categoryLabel}</span>
                </div>
                <h1 className="text-2xl lg:text-4xl font-medium tracking-wider">Shop</h1>
            </div>

            <div className="border border-gray-500 rounded-md p-4">
                <h2 className="text-xl text-center font-normal mb-4">{categoryLabel}</h2>
                {filteredProducts.length === 0 ? (
                    <p className="text-lg text-gray-500 py-10 text-center">
                        No products found.
                    </p>
                ) : (
                    <ProductGrid products={visibleProducts} />
                )}
            </div>

            {loadingMore && (
                <div className="flex flex-col items-center justify-center gap-3 py-10">
                    <Loader2 size={32} className="animate-spin text-gray-500" />
                    <span className="text-base lg:text-xl uppercase text-gray-500">Loading more products...</span>
                </div>
            )}

            {!loadingMore && hasMore && (
                <button
                    onClick={handleLoadMore}
                    className="border border-gray-500 text-base lg:text-xl px-5 py-2 self-center hover:bg-gray-500 hover:text-white transition-colors duration-300"
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default Shop;
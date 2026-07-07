import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid.jsx';

const PAGE_SIZE = 8;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

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
  }, [category]);

  const filteredProducts =
    category === 'sale'
      ? products.filter((p) => p.sale_price)
      : category
        ? products.filter((p) => p.category === category)
        : products;

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const categoryLabel =
    category === 'sale'
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
    <div className='py-6 flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-4xl font-semibold tracking-wider'>Shop</h1>
        <div className='text-lg text-gray-500'>
          <Link to='/' className='hover:underline'>
            Home
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-gray-900'>{categoryLabel}</span>
        </div>
      </div>

      <div className='border border-gray-200 rounded-md p-4'>
        <h2 className='text-3xl text-center tracking-wider font-light mb-4'>
          {categoryLabel}
        </h2>
        <ProductGrid products={visibleProducts} />
      </div>

      {loadingMore && (
        <div className='flex flex-col items-center justify-center gap-3 py-10'>
          <Loader2 size={32} className='animate-spin text-gray-700' />
          <span className='text-sm text-gray-500'>
            Loading more products...
          </span>
        </div>
      )}

      {!loadingMore && hasMore && (
        <button
          onClick={handleLoadMore}
          className='border border-gray-300 px-5 py-2 self-center hover:bg-gray-900 hover:text-white transition-colors duration-300'
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Shop;

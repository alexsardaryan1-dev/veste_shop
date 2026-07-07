import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:5001/api/products');
      const data = await res.json();
      setProducts(data.products.slice(0, 6));
    };
    fetchProducts();
  }, []);

  return (
    <section className='mt-10 px-5'>
      <h2 className='text-4xl font-light tracking-wider text-center mb-5'>
        NEW ARRIVALS
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5'>
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className='border border-black overflow-hidden block'
          >
            <div className='w-full aspect-[3/4] overflow-hidden'>
              <img
                className='w-full h-full object-cover object-top'
                src={product.images?.[0]}
                alt={product.name}
              />
            </div>

            <div className='p-2 text-center tracking-wider font-light'>
              <h3 className='text-xl font-medium lg:text-lg'>{product.name}</h3>
              <p className='text-lg lg:text-base'>
                {product.sale_price ? (
                  <>
                    <span className='line-through text-gray-400 mr-2'>${product.price}</span>
                    <span>${product.sale_price}</span>
                  </>
                ) : (
                  <span>${product.price}</span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
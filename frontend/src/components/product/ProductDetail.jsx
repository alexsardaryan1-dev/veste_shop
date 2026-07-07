import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductInfo from './ProductInfo';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5001/api/products/${id}`);
      const data = await res.json();
      setProduct(data.product);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className='text-center py-10'>Loading...</div>;

  return <ProductInfo product={product} />;
};

export default ProductDetail;

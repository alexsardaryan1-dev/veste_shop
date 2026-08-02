import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import api from "../../services/api";

const ProductDetail = () => {
  const { id } = useParams();
  // useParams gets paramaetrs from the URL. Suppose the URL /product/7, then const { id } = useParams() becomes id = "7".
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/api/products/${id}`);
      setProduct(res.data.product);
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="text-center py-10 text-base sm:text-lg">Loading...</div>
    );

  return <ProductInfo product={product} />;
};

export default ProductDetail;

import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import api from "../../services/api";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/api/products");
      setProducts(res.data.products.slice(0, 6));
    };

    fetchProducts();
  }, []);

  return (
    <section className="mt-10 px-4 sm:px-5">
      <h2 className="text-2xl sm:text-4xl font-light tracking-wider text-center mb-5">
        NEW ARRIVALS
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
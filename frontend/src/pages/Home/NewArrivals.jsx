import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5001/api/products");
      const data = await res.json();
      setProducts(data.products.slice(0, 6));
    };

    fetchProducts();
  }, []);

  return (
    <section className="mt-10 px-5">
      <h2 className="text-4xl font-light tracking-wider text-center mb-5">
        NEW ARRIVALS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
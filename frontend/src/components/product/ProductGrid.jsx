import ProductCard from "./ProductCard.jsx";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

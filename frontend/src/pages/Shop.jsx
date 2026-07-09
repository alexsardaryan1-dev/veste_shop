import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Fuse from "fuse.js";
import ProductGrid from "../components/product/ProductGrid.jsx";
import { useProducts } from "../hooks/useProducts.js";

const PAGE_SIZE = 8;

const Shop = () => {
  const { products } = useProducts();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let filteredProducts = products;

  if (category === "sale") {
    filteredProducts = filteredProducts.filter((p) => p.sale_price);
  } else if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (search) {
    const fuse = new Fuse(filteredProducts, {
      keys: ["name"],
      threshold: 0.4,
    });
    filteredProducts = fuse.search(search).map((result) => result.item);
  }

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const categoryLabel = search
    ? `Results for "${search}"`
    : category === "sale"
      ? "Sale"
      : category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : "All Products";

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
        <div
          aria-label="Breadcrumb"
          className="text-base lg:text-lg text-gray-500"
        >
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <span className="text-gray-500">{categoryLabel}</span>
        </div>
        <h1 className="text-2xl lg:text-4xl font-medium tracking-wider">
          Shop
        </h1>
      </div>

      <div className="border border-gray-500 rounded-md p-4">
        <h2
          aria-labelledby="products-title"
          className="text-xl text-center font-normal uppercase tracking-wider mb-4"
        >
          {categoryLabel}
        </h2>
        {filteredProducts.length === 0 ? (
          <p className="text-lg text-gray-500 py-10 text-center">
            No products found.
          </p>
        ) : (
          <ProductGrid products={visibleProducts} />
        )}
      </div>

      {loadingMore && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center gap-3 py-10"
        >
          <Loader2
            size={32}
            aria-hidden="true"
            className="animate-spin text-gray-500"
          />
          <span className="text-base lg:text-xl uppercase text-gray-500">
            Loading more products...
          </span>
        </div>
      )}

      {!loadingMore && hasMore && (
        <button
          onClick={handleLoadMore}
          className="border border-black text-base lg:text-base px-5 py-2 self-center hover:bg-black hover:text-white transition duration-300 uppercase"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Shop;

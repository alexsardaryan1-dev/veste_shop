import { useContext, useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, X, Check, ChevronDown } from "lucide-react";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";

const categoryFilters = [
  { value: "all", label: "All" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "accessories", label: "Accessories" },
];

const FavoriteCard = ({ item, removeFromWishlist, addToCart }) => {
  const [variants, setVariants] = useState(item.variants || []);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const sizeDropdownRef = useRef(null);

  const isAccessory = item.category === "accessories";
  const sizes = [...new Set(variants.map((v) => v.size))];

  useEffect(() => {
    if (isAccessory || item.variants) return;

    const fetchVariants = async () => {
      const res = await fetch(`http://localhost:5001/api/products/${item.id}`);
      const data = await res.json();
      setVariants(data.product?.variants || []);
    };
    fetchVariants();
  }, [item.id, isAccessory, item.variants]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sizeDropdownRef.current &&
        !sizeDropdownRef.current.contains(e.target)
      ) {
        setSizeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getImage = (i) => i.images?.[0]?.image_url || i.images?.[0];

  const handleSelectSize = (s) => {
    setSize(s);
    setSizeError(false);
    setSizeDropdownOpen(false);
  };

  const handleAddToCart = () => {
    if (!isAccessory && sizes.length > 0 && !size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(item, 1, isAccessory ? null : size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="rounded-lg border border-gray-300 flex flex-col h-full tracking-wider">
      <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-t-lg">
        <Link to={`/product/${item.id}`} className="block w-full h-full">
          <img
            src={getImage(item)}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </Link>
        <button
          onClick={() => removeFromWishlist(item.id)}
          aria-label="Remove from favorites"
          className="absolute top-1.5 right-1.5 bg-white rounded-full p-1 shadow"
        >
          <X size={10} />
        </button>
      </div>

      <div className="p-2 flex flex-col flex-1 gap-1.5 uppercase">
        <Link
          to={`/product/${item.id}`}
          className="text-base font-normal truncate"
        >
          {item.name}
        </Link>
        <p className="text-base text-gray-500">
          ${item.sale_price || item.price}
        </p>

        {!isAccessory && sizes.length > 0 && (
          <div className="relative" ref={sizeDropdownRef}>
            <button
              type="button"
              onClick={() => setSizeDropdownOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between border text-sm px-2 py-1.5 bg-white ${
                sizeError ? "border-red-500" : "border-black"
              }`}
            >
              <span className={size ? "text-black" : "text-gray-400"}>
                {size || "Select Size"}
              </span>
              <ChevronDown
                size={12}
                strokeWidth={1.5}
                className={`transition-transform duration-200 ${
                  sizeDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sizeDropdownOpen && (
              <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-black z-20 max-h-40 overflow-y-auto">
                {sizes.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => handleSelectSize(s)}
                      className={`w-full text-left px-2 py-1.5 text-sm hover:bg-black hover:text-white transition duration-200 ${
                        s === size ? "bg-black text-white" : "text-black"
                      }`}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {sizeError && (
              <p className="text-[10px] text-red-500 mt-1 normal-case">
                Select a size
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className={`mt-auto text-sm py-1.5 uppercase flex items-center justify-center gap-1 transition duration-300 border border-black ${
            added
              ? "bg-green-500 text-white"
              : "bg-black text-white hover:bg-white hover:text-black"
          }`}
        >
          {added ? (
            <>
              <Check size={14} /> Added
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
};

const MyFavorites = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return wishlistItems;
    return wishlistItems.filter((item) => item.category === activeFilter);
  }, [wishlistItems, activeFilter]);

  const hasActiveFilter = activeFilter !== "all";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-normal uppercase">My Favorites</h1>

      {wishlistItems.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {categoryFilters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wider border transition duration-200 ${
                activeFilter === value
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            >
              {label}
            </button>
          ))}

          {hasActiveFilter && (
            <button
              onClick={() => setActiveFilter("all")}
              className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider text-red-500 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {wishlistItems.length === 0 ? (
        <div className="rounded-xl border border-black p-10 flex flex-col items-center gap-3 text-gray-500 uppercase tracking-wider">
          <Heart size={32} className="text-red-500" fill="currentColor" />
          <p>You haven't added any favorites yet.</p>
          <Link
            to="/shop"
            className="text-sm text-black border border-black p-2 bg-white rounded-xl"
          >
            Go to Shop
          </Link>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-xl border border-gray-300 p-10 flex flex-col items-center gap-3 text-gray-500 uppercase tracking-wider">
          <p>No favorites in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          {filteredItems.map((item) => (
            <FavoriteCard
              key={item.id}
              item={item}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;

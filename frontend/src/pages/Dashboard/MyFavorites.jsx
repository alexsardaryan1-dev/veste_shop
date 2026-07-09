import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, X, Check, ChevronDown } from "lucide-react";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";

const FavoriteCard = ({ item, removeFromWishlist, addToCart }) => {
  const [variants, setVariants] = useState(item.variants || []);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

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

  const getImage = (i) => i.images?.[0]?.image_url || i.images?.[0];

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
    <div className="rounded-xl border border-gray-300 overflow-hidden flex flex-col tracking-wider">
      <div className="relative aspect-square bg-gray-100">
        <img
          src={getImage(item)}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => removeFromWishlist(item.id)}
          aria-label="Remove from favorites"
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow"
        >
          <X size={12} />
        </button>
      </div>

      <div className="p-3 flex flex-col gap-2 uppercase">
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
          <div>
            <div className="relative">
              <select
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                  setSizeError(false);
                }}
                className={`w-full border text-xs px-2 py-2 pr-8 appearance-none ${
                  sizeError ? "border-red-500" : "border-black"
                }`}
              >
                <option value="">Select Size</option>
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
            {sizeError && (
              <p className="text-xs text-red-500 mt-1">Please select a size</p>
            )}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className={`text-xs py-2 uppercase flex items-center justify-center gap-1 transition duration-300 ${
            added ? "bg-green-500 text-white" : "bg-black text-white"
          }`}
        >
          {added ? (
            <>
              <Check size={16} /> Added
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-normal uppercase">My Favorites</h1>

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
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
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

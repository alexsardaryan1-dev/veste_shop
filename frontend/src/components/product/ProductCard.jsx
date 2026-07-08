import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";

const ProductCard = ({ product }) => {
  const { id, name, price, sale_price, images } = product;
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cartPop, setCartPop] = useState(false);
  const [heartPop, setHeartPop] = useState(false);

  const inWishlist = isInWishlist(id);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product);
    setCartPop(true);
    setTimeout(() => setCartPop(false), 300);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    toggleWishlist(product);
    setHeartPop(true);
    setTimeout(() => setHeartPop(false), 300);
  };

  return (
    <div className="flex flex-col border border-gray-300 h-[420px]">
      <Link
        to={`/product/${id}`}
        className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden block"
      >
        {sale_price && (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1">
            Sale
          </span>
        )}

        <button
          onClick={handleToggleWishlist}
          aria-label="Toggle wishlist"
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${
            heartPop ? "animate-pop" : ""
          } ${
            inWishlist ? "bg-red-500 text-white" : "bg-white/80 text-gray-700 hover:bg-white"
          }`}
        >
          <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
        </button>

        <img
          src={images?.[0]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </Link>

      <div className="flex flex-col flex-1 p-4 justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">{name}</h3>

        <div className="flex justify-between items-center text-sm">
          <div>
            {sale_price ? (
              <>
                <span className="text-gray-400 line-through mr-2">
                  ${price}
                </span>
                <span className="text-gray-900">${sale_price}</span>
              </>
            ) : (
              <span className="text-gray-900">${price}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center w-8 h-8 bg-gray-300 text-black border border-gray-300 hover:bg-white hover:text-black transition-colors duration-300 rounded-xl ${
              cartPop ? "animate-pop" : ""
            }`}
            aria-label="Add to cart"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
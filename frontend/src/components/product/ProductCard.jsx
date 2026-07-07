import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const ProductCard = ({ product }) => {
  const { id, name, price, sale_price, images } = product;
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product);
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
            className="flex items-center justify-center w-8 h-8 bg-gray-300 text-black border border-gray-300 hover:bg-white hover:text-black transition-colors duration-300 rounded-xl"
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

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import { CartContext } from "../../context/CartContext";

const MyCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const getImage = (item) => item.images?.[0]?.image_url || item.images?.[0];
  const getPrice = (item) => Number(item.sale_price || item.price);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * item.quantity,
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light">My Cart</h1>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:underline"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-xl border border-gray-500 p-10 flex flex-col items-center gap-3 text-gray-500">
          <ShoppingCart size={32} />
          <p>Your cart is empty.</p>
          <Link to="/shop" className="text-sm text-black underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size || "nosize"}`}
                className="rounded-xl border border-gray-500 p-4 flex items-center gap-4"
              >
                <img
                  src={getImage(item)}
                  alt={item.name}
                  className="w-20 h-20 object-cover bg-gray-100 rounded-lg shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-light truncate">{item.name}</p>
                  {item.size && (
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    ${getPrice(item).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center border border-gray-500 rounded-lg">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity - 1)
                    }
                    className="px-3 py-2"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-3 text-sm">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity + 1)
                    }
                    className="px-3 py-2"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <p className="w-20 text-right font-light hidden sm:block">
                  ${(getPrice(item) * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  aria-label="Remove item"
                  className="p-2 text-gray-500 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-500 p-5 flex flex-col gap-4 max-w-sm ml-auto">
            <div className="flex justify-between text-lg font-light">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-black text-white py-3 uppercase text-sm rounded-lg"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCart;

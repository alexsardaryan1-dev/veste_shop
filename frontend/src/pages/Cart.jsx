import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  const getImage = (item) => item.images?.[0]?.image_url || item.images?.[0];
  const getPrice = (item) => Number(item.sale_price || item.price);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center flex flex-col gap-4 uppercase">
        <ShoppingCart size={32} className="mx-auto text-gray-400" />
        <h1 className="text-2xl">Your cart is empty.</h1>
        <Link
          to="/shop"
          className="text-sm text-black border border-black p-2 bg-white rounded-xl"
        >
          Go To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-28 lg:pb-10 flex flex-col gap-8 tracking-wider">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-3xl font-normal uppercase">Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs lg:text-base uppercase text-red-500 hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.size || "nosize"}`}
            className="rounded-xl border border-gray-500 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={getImage(item)}
                alt={item.name}
                className="w-20 h-20 object-cover bg-gray-100 rounded-lg shrink-0"
              />

              <div className="flex-1 min-w-0 sm:hidden uppercase">
                <p className="font-normal truncate text-sm">{item.name}</p>
                {item.size && (
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                )}
                <p className="text-sm text-gray-500">
                  ${getPrice(item).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="hidden sm:block flex-1 min-w-0 uppercase">
              <p className="font-normal text-lg truncate">{item.name}</p>
              {item.size && (
                <p className="text-lg font-light text-gray-500">
                  Size: {item.size}
                </p>
              )}
              <p className="text-lg font-light text-gray-500">
                ${getPrice(item).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="flex items-center border border-gray-500 rounded-lg">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.quantity - 1)
                  }
                  className="p-2"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <span className="p-2 text-xs">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.quantity + 1)
                  }
                  className="p-2"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>

              <p className="text-right font-light lg: text-lg hidden sm:block w-20">
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
          </div>
        ))}
      </div>

      {/* MOBILE: sticky full-width bar */}
      <div
        aria-label="Cart summary"
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between gap-4 z-40"
      >
        <div>
          <p className="text-lg text-gray-500 uppercase">Subtotal</p>
          <p className="text-lg font-medium">${subtotal.toFixed(2)}</p>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-black text-white py-3 px-6 uppercase text-base rounded-lg"
        >
          Checkout
        </button>
      </div>

      {/* DESKTOP: sticky summary card */}
      <div className="hidden lg:block w-full">
        <div className="sticky top-24 border border-gray-300 rounded-lg p-6 flex flex-col gap-6 tracking-wider">

          <div className="flex justify-between text-xl">
            <span className="text-gray-500 uppercase">Subtotal</span>

            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-black border border-black text-white py-3 uppercase text-xl rounded-lg hover:bg-white hover:text-black transition duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

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
    <div className="space-y-6 pb-28 lg:pb-6 tracking-wider">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal uppercase">My Cart</h1>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs lg:text-base uppercase text-red-500 hover:underline"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-xl border border-black p-10 flex flex-col items-center gap-3 text-gray-500 uppercase">
          <ShoppingCart size={32} />
          <p>Your cart is empty.</p>
          <Link
            to="/shop"
            className="text-sm text-black border border-black p-2 bg-white rounded-xl"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size || "nosize"}`}
                className="rounded-xl border border-grey-300 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={getImage(item)}
                    alt={item.name}
                    className="w-20 h-20 object-cover bg-gray-100 rounded-lg shrink-0"
                  />

                  <div className="flex-1 min-w-0 sm:hidden uppercase text-base">
                    <p className="truncate">{item.name}</p>
                    {item.size && (
                      <p className="text-gray-500">Size: {item.size}</p>
                    )}
                    <p className="text-gray-500">
                      ${getPrice(item).toFixed(2)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-gray-500">
                        Total: ${(getPrice(item) * item.quantity).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="hidden sm:block flex-1 min-w-0 text-base uppercase">
                  <p className="font-normal truncate">{item.name}</p>
                  {item.size && (
                    <p className="text-gray-500 font-light">
                      Size: {item.size}
                    </p>
                  )}
                  <p className="text-gray-500 font-light">
                    ${getPrice(item).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center border border-black text-black rounded-lg text-xs">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="p-2"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="p-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="p-2"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <p className="text-right text-lg font-light hidden sm:block w-20">
                    ${(getPrice(item) * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    aria-label="Remove item"
                    className="p-2 text-gray-500 hover:text-red-500 transition duration-300"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE: sticky full-width bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 flex items-center justify-between gap-4 z-40">
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
          <div className="hidden lg:flex sticky bottom-6 rounded-xl border border-gray-300 bg-white p-5 flex-col gap-4 max-w-sm ml-auto shadow-lg">
            <div className="flex justify-between text-lg font-normal uppercase">
              <span className="text-gray-500">Subtotal</span>
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

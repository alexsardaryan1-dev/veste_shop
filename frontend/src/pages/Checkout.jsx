import { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../services/api";

const getItemKey = (item) => `${item.id}-${item.size || "nosize"}`;

const Checkout = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedKeys = location.state?.selectedKeys;

  const checkoutItems = selectedKeys
    ? cartItems.filter((item) => selectedKeys.includes(getItemKey(item)))
    : cartItems;

  const getImage = (item) => item.images?.[0]?.image_url || item.images?.[0];
  const getPrice = (item) => Number(item.sale_price || item.price);

  const total = checkoutItems.reduce(
    (sum, item) => sum + getPrice(item) * item.quantity,
    0,
  );

  const handleApprove = async () => {
    setError("");
    setLoading(true);
    try {
      const items = checkoutItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: getPrice(item),
      }));

      await api.post("/api/orders", { items, total });

      checkoutItems.forEach((item) => removeFromCart(item.id, item.size));
      navigate("/dashboard/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/cart");
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center flex flex-col gap-4">
        <h1 className="text-2xl">No items selected for checkout.</h1>
        <Link to="/dashboard/cart" className="underline">
          Back to cart
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8 tracking-wider uppercase">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal">Checkout</h1>

      {error && (
        <div className="bg-red-50 border border-red-500 text-red-500 p-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {checkoutItems.map((item) => (
          <div
            key={getItemKey(item)}
            className="rounded-xl border border-gray-300 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={getImage(item)}
                alt={item.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover bg-gray-100 rounded-lg shrink-0"
              />

              <div className="flex-1 min-w-0 sm:hidden">
                <p className="font-normal line-clamp-2">{item.name}</p>
                {item.size && (
                  <p className="text-xs text-gray-500">Size: {item.size}</p>
                )}
                <p className="text-sm text-gray-500">
                  ${getPrice(item).toFixed(2)} × {item.quantity}
                </p>
                <p className="text-sm font-normal">
                  ${(getPrice(item) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="hidden sm:block flex-1 min-w-0">
              <p className="font-normal text-sm sm:text-base lg:text-lg line-clamp-2">{item.name}</p>
              {item.size && (
                <p className="text-xs text-gray-500 lg:text-base">
                  Size: {item.size}
                </p>
              )}
              <p className="text-sm lg:text-base text-gray-500">
                ${getPrice(item).toFixed(2)} × {item.quantity}
              </p>
            </div>

            <p className="hidden sm:block w-24 text-right font-normal lg:text-lg">
              ${(getPrice(item) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-300 p-4 sm:p-5 flex flex-col gap-4 w-full sm:max-w-sm sm:ml-auto">
        <div className="flex justify-between text-lg font-normal tracking-wider">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 border border-black uppercase text-sm sm:text-base py-3 hover:bg-red-500 hover:text-white hover:border-red-500 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleApprove}
            disabled={loading}
            className="flex-1 border border-black bg-black text-white py-3 uppercase text-base hover:bg-green-500 hover:text-white hover:border-green-500 transition duration-300"
          >
            {loading ? "Placing..." : "Approve"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

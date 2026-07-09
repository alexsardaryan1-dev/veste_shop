import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../services/api";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getImage = (item) => item.images?.[0]?.image_url || item.images?.[0];
  const getPrice = (item) => Number(item.sale_price || item.price);

  const total = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * item.quantity,
    0,
  );

  const handleApprove = async () => {
    setError("");
    setLoading(true);
    try {
      const items = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: getPrice(item),
      }));

      await api.post("/api/orders", { items, total });

      clearCart();
      navigate("/dashboard/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/cart");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center flex flex-col gap-4">
        <h1 className="text-2xl">Your cart is empty.</h1>
        <Link to="/shop" className="underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8 tracking-wider uppercase">
      <h1 className="text-2xl lg:text-3xl font-normal">Checkout</h1>

      {error && (
        <div className="bg-red-50 border border-red-500 text-red-500 p-3 rounded-xl text-sm">
          {error}
        </div>
      )}

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
              <p className="font-normal truncate lg:text-lg">{item.name}</p>
              {item.size && (
                <p className="text-xs text-gray-500 lg:text-base">
                  Size: {item.size}
                </p>
              )}
              <p className="text-sm lg:text-base text-gray-500">
                ${getPrice(item).toFixed(2)} × {item.quantity}
              </p>
            </div>

            <p className="w-24 text-right font-normal lg:text-lg">
              ${(getPrice(item) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-500 p-5 flex flex-col gap-4 max-w-sm ml-auto w-full">
        <div className="flex justify-between text-lg font-normal tracking-wider">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 border border-black uppercase text-black py-3 text-base hover:bg-red-500 hover:text-white hover:border-red-500 transition duration-300"
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

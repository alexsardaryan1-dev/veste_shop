import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const getPrice = (item) => Number(item.sale_price || item.price);

  const total = cartItems.reduce(
    (acc, item) => acc + getPrice(item) * item.quantity,
    0,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      customer: formData,
      products: cartItems,
      total,
      orderId: Date.now(),
    };

    console.log(order);

    clearCart();

    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-semibold mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Customer Information */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl mb-5">Shipping Information</h2>

          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl mb-5">Order Summary</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size || "nosize"}`}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.size && (
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p>${(getPrice(item) * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8 text-xl font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

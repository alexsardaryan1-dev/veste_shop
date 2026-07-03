import { useState, useEffect } from "react";
import { Package } from "lucide-react";
import api from "../../services/api";

const statusStyles = {
  pending: "bg-yellow-50 text-yellow-600",
  confirmed: "bg-green-50 text-green-600",
  shipped: "bg-blue-50 text-blue-600",
  cancelled: "bg-red-50 text-red-600",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders/me");
        setOrders(res.data.orders);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-gray-500">Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Orders</h1>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-gray-200 p-10 flex flex-col items-center gap-3 text-gray-400">
          <Package size={32} />
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-gray-200 p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">Order #{order.id}</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusStyles[order.status] || "bg-gray-50 text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                <span>{order.itemsCount} item(s)</span>
                <span className="font-medium text-black">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
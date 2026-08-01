import { useState, useEffect } from "react";
import { Package, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../services/api";

const statusStyles = {
  pending: "bg-yellow-50 text-yellow-600",
  confirmed: "bg-green-50 text-green-500",
  shipped: "bg-blue-50 text-blue-600",
  cancelled: "bg-red-50 text-red-500",
};

const PAGE_SIZE = 5;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders/me");
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    setCancellingId(orderId);
    try {
      await api.patch(`/api/orders/${orderId}/cancel`);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order,
        ),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancellingId(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const paginatedOrders = orders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  if (loading) return <p className="text-gray-500">Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-normal uppercase tracking-wider">
        My Orders
      </h1>
      {orders.length === 0 ? (
        <div className="rounded-xl border border-black p-10 flex flex-col items-center gap-3 text-gray-500">
          <Package size={32} />
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 tracking-wider">
            {paginatedOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-gray-300 p-4 sm:p-5 flex flex-col gap-1"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-normal uppercase text-lg">
                    Order #{order.id}
                  </p>
                  <span
                    className={`inline-flex w-fit px-2 py-1 rounded-full text-xs sm:text-sm lg:text-base font-normal uppercase ${
                      statusStyles[order.status] || "bg-gray-50 text-gray-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm lg:text-base text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="flex flex-col divide-y divide-gray-100">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 sm:gap-3 py-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover bg-gray-100 rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm lg:text-base uppercase truncate">
                          {item.name}
                        </p>
                        <p className="text-sm lg:text-base uppercase text-gray-500">
                          Quantity {item.quantity} * $
                          {Number(item.price).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm lg:text-base font-light">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-base uppercase font-normal border-t border-grey pt-3">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>

                {(order.status === "pending" ||
                  order.status === "confirmed") && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={cancellingId === order.id}
                    className="mt-3 self-end text-sm uppercase text-red-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancellingId === order.id
                      ? "Cancelling..."
                      : "Cancel Order"}
                  </button>
                )}
              </div>
            ))}
          </div>

          {orders.length > PAGE_SIZE && (
            <div className="flex items-center justify-between mt-2 text-sm lg:text-base normal-case">
              <p className="text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition duration-200"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-9 h-9 rounded-lg border text-sm transition duration-200 ${
                        currentPage === page
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition duration-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyOrders;

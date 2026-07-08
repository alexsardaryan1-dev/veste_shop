import { useEffect, useState } from "react";
import { Package, CheckCircle, Clock, Wallet } from "lucide-react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function MyProfile() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [statsRes, ordersRes] = await Promise.all([
          api.get("/api/users/me/stats"),
          api.get("/api/orders/me?status=confirmed"),
        ]);
        setStats(statsRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const cards = [
    {
      label: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Confirmed Orders",
      value: stats?.confirmedOrders ?? 0,
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Pending Orders",
      value: stats?.pendingOrders ?? 0,
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Total Spent",
      value: stats ? `$${stats.totalSpent.toFixed(2)}` : "$0.00",
      icon: Wallet,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-8 tracking-wider">
      <h1 className="text-2xl font-normal">My Profile</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-gray-500 p-5 flex items-center gap-4"
          >
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-xl font-light">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmed orders table */}
      <div>
        <h2 className="text-lg font-light mb-4">Confirmed Orders</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-500">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3 font-light">Order ID</th>
                <th className="px-4 py-3 font-light">Date</th>
                <th className="px-4 py-3 font-light">Items</th>
                <th className="px-4 py-3 font-light">Total</th>
                <th className="px-4 py-3 font-light">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No confirmed orders yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-3">
                      <Link
                        to="/dashboard/orders"
                        className="text-black hover:underline font-light"
                      >
                        #{order.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{order.itemsCount}</td>
                    <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-light bg-green-50 text-green-600">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

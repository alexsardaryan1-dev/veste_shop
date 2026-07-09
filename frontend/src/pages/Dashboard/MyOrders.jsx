import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import api from '../../services/api';

const statusStyles = {
  pending: 'bg-yellow-50 text-yellow-600',
  confirmed: 'bg-green-50 text-green-500',
  shipped: 'bg-blue-50 text-blue-600',
  cancelled: 'bg-red-50 text-red-500',
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/api/orders/me');
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className='text-gray-500'>Loading orders...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-normal uppercase tracking-wider'>My Orders</h1>

      {orders.length === 0 ? (
        <div className='rounded-xl border border-gray-500 p-10 flex flex-col items-center gap-3 text-gray-500'>
          <Package size={32} />
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className='flex flex-col gap-4 tracking-wider'>
          {orders.map((order) => (
            <div
              key={order.id}
              className='rounded-xl border border-gray-500 p-5 flex flex-col gap-1'
            >
              <div className='flex items-center justify-between'>
                <p className='font-normal uppercase text-lg'>Order #{order.id}</p>
                <span
                  className={`px-2 py-1 rounded-full text-lg font-normal ${
                    statusStyles[order.status] || 'bg-gray-50 text-gray-500'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className='text-sm text-gray-500'>
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className='flex flex-col divide-y divide-gray-100'>
                {order.items.map((item, i) => (
                  <div key={i} className='flex items-center gap-3 py-3'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-14 h-14 object-cover bg-gray-100 rounded-lg shrink-0'
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm uppercase truncate'>{item.name}</p>
                      <p className='text-sm text-gray-500'>
                        Quantity {item.quantity} * ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <p className='text-sm font-light'>
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className='flex justify-between text-base uppercase font-normal border-t border-gray-400 pt-3'>
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
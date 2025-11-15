import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import API, { API_BASE_URL } from '../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/my-orders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      await API.put(`/orders/${orderId}/cancel`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to cancel order');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'from-orange-500 to-yellow-500',
      processing: 'from-dark-primary to-dark-secondary',
      shipped: 'from-purple-500 to-pink-500',
      delivered: 'from-green-500 to-emerald-500',
      cancelled: 'from-red-500 to-rose-500'
    };
    return colors[status] || 'from-gray-500 to-gray-600';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FiPackage size={18} />;
      case 'processing': return <FiPackage size={18} />;
      case 'shipped': return <FiTruck size={18} />;
      case 'delivered': return <FiCheckCircle size={18} />;
      default: return <FiPackage size={18} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg-primary flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dark-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg-primary py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent mb-8"
        >
          My Orders
        </motion.h1>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-dark-bg-elevated rounded-3xl shadow-dark-md"
          >
            <FiPackage className="mx-auto mb-6 text-dark-text-muted" size={80} />
            <p className="text-2xl font-bold text-dark-text-primary mb-2">No orders yet</p>
            <p className="text-dark-text-secondary">You haven't placed any orders</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-bg-elevated rounded-3xl shadow-dark-md overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-gradient-to-r from-dark-bg-surface to-dark-bg-elevated border-b border-dark-border gap-4">
                  <div>
                    <p className="font-bold text-dark-text-primary text-lg">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-dark-text-secondary text-sm">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <span className={`bg-gradient-to-r ${getStatusColor(order.status)} text-white px-5 py-2.5 rounded-xl font-semibold text-sm capitalize flex items-center gap-2 shadow-dark-md`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  {order.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex gap-4 items-center p-4 bg-dark-bg-surface rounded-2xl"
                    >
                      <img
                        src={item.product?.image?.startsWith('http') ? item.product.image : `${API_BASE_URL}${item.product?.image}`}
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover rounded-xl shadow-dark-md"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-dark-text-primary">{item.product?.name}</h4>
                        <p className="text-dark-text-secondary text-sm">Size: {item.size} | Color: {item.color}</p>
                        <p className="text-dark-text-secondary text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-dark-primary text-xl">${item.price}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row justify-between p-6 bg-gradient-to-r from-dark-bg-surface to-dark-bg-elevated border-t border-dark-border gap-6">
                  <div className="text-dark-text-secondary text-sm">
                    <strong className="block text-dark-text-primary mb-2 text-base">Shipping Address:</strong>
                    <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                    <p>{order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}</p>
                  </div>
                  <div className="text-center md:text-right space-y-3">
                    <div>
                      <strong className="block text-dark-text-primary mb-2 text-base">Total Amount:</strong>
                      <p className="text-3xl font-bold bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="px-4 py-2 bg-dark-error hover:bg-red-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-all"
                      >
                        <FiXCircle size={18} />
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

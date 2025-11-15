import { motion } from 'framer-motion';
import { FiTrendingUp, FiShoppingBag, FiDollarSign, FiPackage, FiPlus } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { API_BASE_URL } from '../utils/api';
import { useAuthStore } from '../stores/authStore';

const StatCard = ({ icon: Icon, label, value, trend, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-dark-bg-elevated rounded-2xl p-6 border border-dark-border hover:border-dark-primary transition-all shadow-dark-md"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-dark-primary/10 rounded-xl">
        <Icon className="text-dark-primary" size={24} />
      </div>
      {trend && (
        <span className="text-dark-success text-sm font-semibold">+{trend}%</span>
      )}
    </div>
    <p className="text-dark-text-muted text-sm mb-1">{label}</p>
    <p className="text-dark-text-primary text-3xl font-bold">{value}</p>
  </motion.div>
);

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'seller') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        API.get('/products/seller/my-products'),
        API.get('/orders/seller-orders')
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg-primary flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dark-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-dark-text-primary mb-2">Seller Dashboard</h1>
          <p className="text-dark-text-secondary">Welcome back, {user?.name}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FiDollarSign}
            label="Total Sales"
            value={`$${totalSales.toLocaleString()}`}
            trend={12}
            delay={0}
          />
          <StatCard
            icon={FiShoppingBag}
            label="Total Orders"
            value={orders.length}
            trend={8}
            delay={0.1}
          />
          <StatCard
            icon={FiPackage}
            label="Products"
            value={products.length}
            delay={0.2}
          />
          <StatCard
            icon={FiTrendingUp}
            label="Active"
            value={products.filter(p => p.stock > 0).length}
            delay={0.3}
          />
        </div>

        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-bg-elevated rounded-2xl border border-dark-border overflow-hidden shadow-dark-md"
        >
          <div className="p-6 border-b border-dark-border flex items-center justify-between">
            <h2 className="text-2xl font-bold text-dark-text-primary">Your Products</h2>
            <button className="btn-primary flex items-center gap-2">
              <FiPlus size={20} />
              Add Product
            </button>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center">
              <FiShoppingBag className="mx-auto mb-4 text-dark-text-muted" size={64} />
              <p className="text-dark-text-secondary text-lg">No products yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-bg-surface">
                  <tr>
                    <th className="px-6 py-4 text-left text-dark-text-secondary text-sm font-semibold">Product</th>
                    <th className="px-6 py-4 text-left text-dark-text-secondary text-sm font-semibold">Category</th>
                    <th className="px-6 py-4 text-left text-dark-text-secondary text-sm font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-dark-text-secondary text-sm font-semibold">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="border-t border-dark-border hover:bg-dark-bg-surface transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image?.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <span className="text-dark-text-primary font-semibold">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-dark-text-secondary">{product.category}</td>
                      <td className="px-6 py-4 text-dark-primary font-bold">${product.price}</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${product.stock < 10 ? 'text-dark-warning' : 'text-dark-success'}`}>
                          {product.stock}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SellerDashboard;

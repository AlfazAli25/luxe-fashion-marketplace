import { motion } from 'framer-motion';
import { FiMapPin, FiCreditCard, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import API, { API_BASE_URL } from '../utils/api';

const Checkout = () => {
  const { items, clearCart, getTotal } = useCartStore();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);

  const total = getTotal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderItems = items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.product.price
      }));

      await API.post('/orders', {
        items: orderItems,
        shippingAddress: address
      });

      clearCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
      setLoading(false);
    }
  };

  if (!items || items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-bg-primary py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent mb-8"
        >
          Checkout
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-dark-bg-elevated p-8 md:p-10 rounded-3xl shadow-dark-md"
          >
            <div className="flex items-center gap-3 mb-8">
              <FiMapPin className="text-dark-primary" size={28} />
              <h2 className="text-3xl font-bold text-dark-text-primary">Shipping Address</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-semibold text-dark-text-primary mb-2">Street Address</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  required
                  placeholder="123 Main Street"
                  className="input"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-dark-text-primary mb-2">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                    placeholder="New York"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-dark-text-primary mb-2">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                    placeholder="NY"
                    className="input"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-dark-text-primary mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    required
                    placeholder="10001"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-dark-text-primary mb-2">Country</label>
                  <input
                    type="text"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    required
                    placeholder="USA"
                    className="input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-5 text-lg mt-8 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-dark-bg-primary border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiCreditCard size={24} />
                    Place Order
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-bg-elevated p-8 rounded-3xl shadow-dark-md h-fit sticky top-24"
          >
            <h2 className="text-3xl font-bold text-dark-text-primary mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {items.map(item => (
                <div key={item._id} className="flex gap-4 items-center p-3 bg-dark-bg-surface rounded-xl">
                  <img
                    src={item.product?.image?.startsWith('http') ? item.product.image : `${API_BASE_URL}${item.product?.image}`}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-dark-md"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-dark-text-primary text-sm line-clamp-1">{item.product?.name}</p>
                    <p className="text-dark-text-muted text-xs">Qty: {item.quantity} | {item.size} | {item.color}</p>
                  </div>
                  <p className="font-bold text-dark-primary">${(item.product?.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pt-6 border-t-2 border-dark-border">
              <div className="flex justify-between text-dark-text-secondary">
                <span>Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-dark-text-secondary">
                <span>Shipping</span>
                <span className="font-semibold text-dark-success">Free</span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-bold text-dark-text-primary pt-6 border-t-2 border-dark-border">
              <span>Total</span>
              <span className="bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { API_BASE_URL } from '../utils/api';
import { useEffect } from 'react';

const Cart = () => {
  const { items, removeItem, clearCart, getTotal, fetchCart } = useCartStore();
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const handleCheckout = () => {
    if (items?.length > 0) {
      navigate('/checkout');
    }
  };

  const total = getTotal();

  return (
    <div className="min-h-screen bg-dark-bg-primary py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent mb-8"
        >
          Shopping Cart
        </motion.h1>

        {!items || items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-dark-bg-elevated rounded-3xl shadow-dark-md"
          >
            <FiShoppingBag className="mx-auto mb-6 text-dark-text-muted" size={80} />
            <p className="text-3xl font-bold text-dark-text-primary mb-4">Your cart is empty</p>
            <p className="text-dark-text-secondary mb-8">Start adding some amazing products!</p>
            <Link to="/products" className="inline-block btn-primary">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-bg-elevated p-6 rounded-2xl shadow-dark-md hover:shadow-glow transition-all flex flex-col sm:flex-row gap-6 items-center"
                  >
                    <img
                      src={item.product?.image?.startsWith('http') ? item.product.image : `${API_BASE_URL}${item.product?.image}`}
                      alt={item.product?.name}
                      className="w-28 h-28 object-cover rounded-xl shadow-dark-md"
                    />

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-dark-text-primary mb-2">
                        {item.product?.name}
                      </h3>
                      <p className="text-dark-text-muted text-sm mb-2">
                        <span className="font-semibold">Size:</span> {item.size} | <span className="font-semibold">Color:</span> {item.color}
                      </p>
                      <p className="text-dark-primary font-bold text-lg">
                        ${item.product?.price}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="font-bold text-dark-text-secondary mb-2">Qty: {item.quantity}</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent">
                        ${(item.product?.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <motion.button
                      onClick={() => removeItem(item._id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-dark-error/10 text-dark-error p-4 rounded-xl hover:bg-dark-error/20 transition-all"
                    >
                      <FiTrash2 size={20} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-dark-bg-elevated p-8 rounded-2xl shadow-dark-md h-fit sticky top-24"
            >
              <h2 className="text-3xl font-bold text-dark-text-primary mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-dark-text-secondary text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-dark-text-secondary text-lg">
                  <span>Shipping</span>
                  <span className="font-semibold text-dark-success">Free</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-dark-text-primary pt-6 border-t-2 border-dark-border mb-8">
                <span>Total</span>
                <span className="bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary py-5 text-lg mb-4 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <FiArrowRight />
              </button>

              <button
                onClick={clearCart}
                className="w-full py-3 text-dark-error hover:bg-dark-error/10 font-semibold rounded-xl transition-all"
              >
                Clear Cart
              </button>

              <Link
                to="/products"
                className="block text-center text-dark-primary font-semibold hover:underline mt-4"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

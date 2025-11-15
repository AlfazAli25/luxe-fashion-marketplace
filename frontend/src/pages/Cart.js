import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { API_BASE_URL } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart?.items?.reduce((sum, item) => 
    sum + (item.product?.price || 0) * item.quantity, 0
  ) || 0;

  const handleCheckout = () => {
    if (cart?.items?.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8"
        >
          Shopping Cart
        </motion.h1>
        
        {!cart?.items || cart.items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-3xl shadow-glass"
          >
            <FiShoppingBag className="mx-auto mb-6 text-gray-300" size={80} />
            <p className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</p>
            <p className="text-gray-600 mb-8">Start adding some amazing products!</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/products" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all">
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-glass transition-all flex flex-col sm:flex-row gap-6 items-center"
                  >
                    <img 
                      src={item.product?.image?.startsWith('http') ? item.product.image : `${API_BASE_URL}${item.product?.image}`} 
                      alt={item.product?.name} 
                      className="w-28 h-28 object-cover rounded-xl shadow-soft" 
                    />
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.product?.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-semibold">Size:</span> {item.size} | <span className="font-semibold">Color:</span> {item.color}
                      </p>
                      <p className="text-blue-600 font-bold text-lg">${item.product?.price}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-bold text-gray-800 mb-2">Qty: {item.quantity}</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${(item.product?.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <motion.button 
                      onClick={() => removeFromCart(item._id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-red-50 text-red-600 p-4 rounded-xl hover:bg-red-100 transition-all shadow-soft"
                    >
                      <FiTrash2 size={20} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-2xl shadow-glass h-fit sticky top-24"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-lg">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>
              <div className="flex justify-between text-2xl font-bold text-gray-800 pt-6 border-t-2 mb-8">
                <span>Total</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
              <motion.button 
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all mb-4"
              >
                Proceed to Checkout
              </motion.button>
              <Link to="/products" className="block text-center text-blue-600 font-semibold hover:underline">
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

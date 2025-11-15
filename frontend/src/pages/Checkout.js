import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import API, { API_BASE_URL } from '../utils/api';
import { motion } from 'framer-motion';
import { FiMapPin, FiCreditCard } from 'react-icons/fi';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const total = cart?.items?.reduce((sum, item) => 
    sum + (item.product?.price || 0) * item.quantity, 0
  ) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderItems = cart.items.map(item => ({
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
          Checkout
        </motion.h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-glass"
          >
            <div className="flex items-center gap-3 mb-8">
              <FiMapPin className="text-blue-600" size={28} />
              <h2 className="text-3xl font-bold text-gray-800">Shipping Address</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  required
                  placeholder="123 Main Street"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    required
                    placeholder="New York"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({...address, state: e.target.value})}
                    required
                    placeholder="NY"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                    required
                    placeholder="10001"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={address.country}
                    onChange={(e) => setAddress({...address, country: e.target.value})}
                    required
                    placeholder="USA"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all mt-8 flex items-center justify-center gap-3"
              >
                <FiCreditCard size={24} />
                Place Order
              </motion.button>
            </div>
          </motion.form>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl shadow-glass h-fit sticky top-24"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cart?.items?.map(item => (
                <div key={item._id} className="flex gap-4 items-center p-3 bg-gray-50 rounded-xl">
                  <img 
                    src={item.product?.image?.startsWith('http') ? item.product.image : `${API_BASE_URL}${item.product?.image}`} 
                    alt={item.product?.name} 
                    className="w-16 h-16 object-cover rounded-lg shadow-soft" 
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-sm line-clamp-1">{item.product?.name}</p>
                    <p className="text-gray-600 text-xs">Qty: {item.quantity} | {item.size} | {item.color}</p>
                  </div>
                  <p className="font-bold text-blue-600">${(item.product?.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 mb-6 pt-6 border-t-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
            </div>
            
            <div className="flex justify-between text-2xl font-bold text-gray-800 pt-6 border-t-2">
              <span>Total</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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

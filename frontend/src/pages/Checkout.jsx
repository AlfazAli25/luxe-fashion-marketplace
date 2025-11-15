import { motion } from 'framer-motion';
import { FiMapPin, FiCreditCard, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import API, { API_BASE_URL } from '../utils/api';
import StripePayment from '../components/StripePayment';

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
  const [step, setStep] = useState(1);

  const total = getTotal();

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSuccess = async () => {
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
      navigate('/payment-success');
    } catch (error) {
      console.error('Error placing order:', error);
      navigate('/payment-failed');
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-dark-bg-elevated p-8 md:p-10 rounded-3xl shadow-dark-md"
          >
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-dark-primary' : 'text-dark-text-muted'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-dark-primary text-dark-bg-primary' : 'bg-dark-bg-surface'}`}>1</div>
                <span className="font-semibold">Address</span>
              </div>
              <div className="w-12 h-0.5 bg-dark-border" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-dark-primary' : 'text-dark-text-muted'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-dark-primary text-dark-bg-primary' : 'bg-dark-bg-surface'}`}>2</div>
                <span className="font-semibold">Payment</span>
              </div>
            </div>

            {step === 1 ? (
              <form onSubmit={handleAddressSubmit}>
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
                  className="w-full btn-primary py-5 text-lg mt-8"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
            ) : (
              <div>
                <button
                  onClick={() => setStep(1)}
                  className="text-dark-primary hover:underline mb-6"
                >
                  ← Back to Address
                </button>
                <StripePayment 
                  amount={total} 
                  onSuccess={handlePaymentSuccess}
                  onError={() => navigate('/payment-failed')}
                />
              </div>
            )}
          </motion.div>

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

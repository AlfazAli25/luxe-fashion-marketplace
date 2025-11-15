import { useState } from 'react';
import { FiCreditCard, FiLock } from 'react-icons/fi';
import API from '../utils/api';

const StripePayment = ({ amount, onSuccess, onError }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create payment intent
      const { data } = await API.post('/payment/create-payment-intent', { amount });
      
      // Simulate card processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Confirm payment
      await API.post('/payment/confirm-payment', { 
        paymentIntentId: data.clientSecret 
      });
      
      setLoading(false);
      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      if (onError) onError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FiCreditCard className="text-dark-primary" size={24} />
        <h3 className="text-xl font-bold text-dark-text-primary">Payment Details</h3>
        <FiLock className="text-dark-success ml-auto" size={20} />
      </div>

      <div>
        <label className="block font-semibold text-dark-text-primary mb-2">Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim())}
          placeholder="4242 4242 4242 4242"
          maxLength="19"
          required
          className="input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold text-dark-text-primary mb-2">Expiry</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').replace(/(.{2})/, '$1/').substr(0, 5))}
            placeholder="MM/YY"
            maxLength="5"
            required
            className="input"
          />
        </div>
        <div>
          <label className="block font-semibold text-dark-text-primary mb-2">CVC</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substr(0, 3))}
            placeholder="123"
            maxLength="3"
            required
            className="input"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-4 text-lg mt-6 flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-2 border-dark-bg-primary border-t-transparent rounded-full animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <FiLock size={20} />
            Pay ${amount.toFixed(2)}
          </>
        )}
      </button>

      <div className="mt-4 space-y-2">
        <p className="text-center text-dark-text-muted text-sm">
          <FiLock className="inline mr-1" size={14} />
          Secured by Stripe (Test Mode)
        </p>
        <p className="text-center text-dark-text-muted text-xs">
          Test Card: 4242 4242 4242 4242 | Any future date | Any 3 digits
        </p>
      </div>
    </form>
  );
};

export default StripePayment;

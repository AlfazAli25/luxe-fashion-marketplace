import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const PaymentSuccess = () => {
  useEffect(() => {
    // Confetti effect
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      if (Date.now() > end) return;
      requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg-primary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-dark-bg-elevated rounded-3xl p-8 text-center border border-dark-border shadow-dark-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 bg-dark-success/20 rounded-full flex items-center justify-center"
        >
          <FiCheckCircle className="text-dark-success" size={48} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-dark-text-primary mb-3"
        >
          Order Placed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-dark-success text-xl font-semibold mb-2"
        >
          Payment Successful
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-dark-text-secondary mb-8"
        >
          Thank you for your purchase! Your order has been confirmed and will be shipped soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Link to="/orders" className="block w-full btn-primary py-4 flex items-center justify-center gap-2">
            <FiPackage size={20} />
            View My Orders
          </Link>
          <Link to="/" className="block w-full btn-secondary py-4">
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

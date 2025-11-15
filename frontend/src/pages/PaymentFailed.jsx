import { motion } from 'framer-motion';
import { FiXCircle, FiRefreshCw } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

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
          className="w-24 h-24 mx-auto mb-6 bg-dark-error/20 rounded-full flex items-center justify-center"
        >
          <FiXCircle className="text-dark-error" size={48} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-dark-text-primary mb-3"
        >
          Payment Failed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-dark-error text-xl font-semibold mb-2"
        >
          Payment Cancelled
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-dark-text-secondary mb-8"
        >
          Your payment could not be processed. Please check your card details and try again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2"
          >
            <FiRefreshCw size={20} />
            Try Again
          </button>
          <Link to="/cart" className="block w-full btn-secondary py-4">
            Back to Cart
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;

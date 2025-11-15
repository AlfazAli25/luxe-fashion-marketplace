import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-4 right-4 z-50 bg-dark-bg-elevated border border-dark-border rounded-xl shadow-dark-md p-4 flex items-center gap-3 max-w-sm"
      >
        <div className="w-10 h-10 bg-dark-success/20 rounded-full flex items-center justify-center">
          <FiCheckCircle className="text-dark-success" size={20} />
        </div>
        <p className="text-dark-text-primary font-semibold flex-1">{message}</p>
        <button onClick={onClose} className="text-dark-text-muted hover:text-dark-text-primary">
          <FiX size={20} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;

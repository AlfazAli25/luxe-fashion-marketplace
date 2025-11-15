import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-dark text-white shadow-glass sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
            Fashion Store
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <Link to="/products" className="relative group py-2">
              <span className="font-medium">Shop</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            {user?.role === 'seller' && (
              <Link to="/seller/dashboard" className="relative group py-2">
                <span className="font-medium">Dashboard</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
            {user?.role === 'buyer' && (
              <Link to="/orders" className="relative group py-2">
                <span className="font-medium">Orders</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                {user.role === 'buyer' && (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/cart" className="relative">
                      <FiShoppingCart size={24} />
                      {cart?.items?.length > 0 && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg"
                        >
                          {cart.items.length}
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                )}
                <span className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg bg-white/10">
                  <FiUser size={20} /> {user.name}
                </span>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout} 
                  className="bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-soft"
                >
                  <FiLogOut /> Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-medium hover:text-blue-200 transition">Login</Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register" className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold shadow-soft hover:shadow-lg transition-all">
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 space-y-3 border-t border-white/20 pt-4"
            >
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-white/10 rounded transition font-medium">Shop</Link>
            {user?.role === 'seller' && <Link to="/seller/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-white/10 rounded transition font-medium">Dashboard</Link>}
            {user?.role === 'buyer' && <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-white/10 rounded transition font-medium">Orders</Link>}
            
            <div className="border-t border-white/20 pt-3 mt-3">
              {user ? (
                <>
                  {user.role === 'buyer' && (
                    <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded transition font-medium">
                      <FiShoppingCart size={18} /> Cart
                      {cart?.items?.length > 0 && (
                        <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {cart.items.length}
                        </span>
                      )}
                    </Link>
                  )}
                  <div className="px-4 py-2 flex items-center gap-2 font-medium"><FiUser size={18} /> {user.name}</div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-white/10 rounded transition flex items-center gap-2 font-medium">
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-white/10 rounded transition font-medium">Login</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 bg-white text-indigo-600 rounded font-semibold hover:opacity-90 transition">Sign Up</Link>
                </>
              )}
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

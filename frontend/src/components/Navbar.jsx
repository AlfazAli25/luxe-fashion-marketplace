import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import Tooltip from './Tooltip';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const itemCount = useCartStore(state => state.getItemCount());
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      useCartStore.getState().fetchCart();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categories = ['New Arrivals', 'Men', 'Women', 'Accessories'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-dark-bg-elevated/80 backdrop-blur-xl border-b border-dark-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent">
            LUXE
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={cat === 'New Arrivals' ? '/products?badge=NEW' : `/products?category=${cat}`}
                className="text-dark-text-secondary hover:text-dark-primary transition-colors relative group"
              >
                {cat}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dark-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Tooltip text="Search" position="bottom">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-dark-text-secondary hover:text-dark-primary transition-colors"
              >
                <FiSearch size={22} />
              </button>
            </Tooltip>

            {user?.role === 'buyer' && (
              <Tooltip text="Cart" position="bottom">
                <Link to="/cart" className="relative p-2 text-dark-text-secondary hover:text-dark-primary transition-colors">
                  <FiShoppingCart size={22} />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-dark-error text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </Tooltip>
            )}

            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <Tooltip text={user.role === 'seller' ? 'Dashboard' : 'Orders'} position="bottom">
                  <Link to={user.role === 'seller' ? '/seller/dashboard' : '/orders'} className="flex items-center gap-2 px-4 py-2 bg-dark-bg-surface hover:bg-dark-border rounded-lg transition-colors">
                    <FiUser size={18} />
                    <span className="text-dark-text-primary text-sm font-medium">{user.name}</span>
                  </Link>
                </Tooltip>
                <Tooltip text="Logout" position="bottom">
                  <button onClick={handleLogout} className="p-2 text-dark-text-secondary hover:text-dark-error transition-colors">
                    <FiLogOut size={20} />
                  </button>
                </Tooltip>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link to="/login" className="text-dark-text-secondary hover:text-dark-primary font-medium">Login</Link>
                <Link to="/register" className="px-6 py-2 bg-dark-primary hover:bg-dark-primary-hover text-dark-bg-primary font-bold rounded-lg shadow-glow">
                  Sign Up
                </Link>
              </div>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-dark-text-secondary">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pb-4"
            >
              <input
                type="search"
                placeholder="Search products..."
                autoFocus
                className="input"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-dark-border py-4 space-y-2"
            >
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={cat === 'New Arrivals' ? '/products?badge=NEW' : `/products?category=${cat}`}
                  className="block px-4 py-2 text-dark-text-secondary hover:text-dark-primary hover:bg-dark-bg-surface rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to={user.role === 'seller' ? '/seller/dashboard' : '/orders'} className="block px-4 py-2 text-dark-text-secondary hover:text-dark-primary hover:bg-dark-bg-surface rounded-lg" onClick={() => setIsMenuOpen(false)}>
                    {user.name}
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 text-dark-error hover:bg-dark-bg-surface rounded-lg">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 text-dark-text-secondary hover:text-dark-primary hover:bg-dark-bg-surface rounded-lg" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="block px-4 py-2 bg-dark-primary text-dark-bg-primary font-bold rounded-lg" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

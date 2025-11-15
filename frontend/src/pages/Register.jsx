import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiShoppingBag } from 'react-icons/fi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const register = useAuthStore(state => state.register);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password, role);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg-primary via-dark-bg-elevated to-dark-bg-primary flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-3xl shadow-dark-md w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-dark-text-primary mb-2">Create Account</h2>
          <p className="text-dark-text-secondary">Join our fashion community</p>
        </div>

        {error && (
          <div className="bg-dark-error/10 border border-dark-error text-dark-error p-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-dark-text-primary mb-2">Name</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text-muted" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="input pl-12"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-dark-text-primary mb-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text-muted" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="input pl-12"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-dark-text-primary mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text-muted" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a password"
                className="input pl-12"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-dark-text-primary mb-2">I want to</label>
            <div className="relative">
              <FiShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text-muted" size={20} />
              <select value={role} onChange={(e) => setRole(e.target.value)} className="input pl-12 appearance-none">
                <option value="buyer">Buy Clothes</option>
                <option value="seller">Sell Clothes</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full btn-primary">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-8 text-dark-text-secondary">
          Already have an account? <Link to="/login" className="text-dark-primary font-bold hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;

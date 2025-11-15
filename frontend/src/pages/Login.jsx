import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
          <h2 className="text-4xl font-bold text-dark-text-primary mb-2">Welcome Back</h2>
          <p className="text-dark-text-secondary">Login to your account</p>
        </div>

        {error && (
          <div className="bg-dark-error/10 border border-dark-error text-dark-error p-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
                className="input pl-12"
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary">
            Login
          </button>
        </form>

        <p className="text-center mt-8 text-dark-text-secondary">
          Don't have an account? <Link to="/register" className="text-dark-primary font-bold hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

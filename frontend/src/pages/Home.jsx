import { motion } from 'framer-motion';
import { FiArrowRight, FiTrendingUp, FiTag, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trending, setTrending] = useState([]);
  const [sale, setSale] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        
        // Divide products by badge
        setNewArrivals(data.filter(p => p.badge === 'NEW'));
        setTrending(data.filter(p => p.badge === 'TRENDING'));
        setSale(data.filter(p => p.badge === 'SALE'));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg-primary via-dark-bg-elevated to-dark-bg-primary">
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-dark-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block px-4 py-2 bg-dark-bg-elevated/50 backdrop-blur-sm border border-dark-border rounded-full mb-6"
          >
            <span className="text-dark-primary font-semibold text-sm">New Collection 2025</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-dark-primary via-dark-secondary to-dark-accent bg-clip-text text-transparent">
              Redefine
            </span>
            <br />
            <span className="text-dark-text-primary">Your Style</span>
          </h1>

          <p className="text-xl md:text-2xl text-dark-text-secondary mb-12 max-w-2xl mx-auto">
            Discover premium fashion pieces curated for the modern individual
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="px-8 py-4 bg-dark-primary hover:bg-dark-primary-hover text-dark-bg-primary font-bold rounded-xl shadow-glow flex items-center justify-center gap-2">
              Shop Now
              <FiArrowRight />
            </Link>
            <Link to="/register" className="px-8 py-4 bg-dark-bg-elevated hover:bg-dark-bg-surface text-dark-text-primary font-bold rounded-xl border border-dark-border">
              Become a Seller
            </Link>
          </div>
        </motion.div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div className="flex items-center gap-3">
                <FiStar className="text-dark-primary" size={32} />
                <h2 className="text-4xl md:text-5xl font-bold text-dark-text-primary">
                  New Arrivals
                </h2>
              </div>
              <Link to="/products?badge=NEW" className="text-dark-primary hover:text-dark-primary-hover font-semibold flex items-center gap-2">
                View All
                <FiArrowRight />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending */}
      {trending.length > 0 && (
        <section className="py-24 px-4 bg-dark-bg-elevated">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div className="flex items-center gap-3">
                <FiTrendingUp className="text-dark-accent" size={32} />
                <h2 className="text-4xl md:text-5xl font-bold text-dark-text-primary">
                  Trending Now
                </h2>
              </div>
              <Link to="/products?badge=TRENDING" className="text-dark-primary hover:text-dark-primary-hover font-semibold flex items-center gap-2">
                View All
                <FiArrowRight />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trending.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sale */}
      {sale.length > 0 && (
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div className="flex items-center gap-3">
                <FiTag className="text-dark-error" size={32} />
                <h2 className="text-4xl md:text-5xl font-bold text-dark-text-primary">
                  On Sale
                </h2>
              </div>
              <Link to="/products?badge=SALE" className="text-dark-primary hover:text-dark-primary-hover font-semibold flex items-center gap-2">
                View All
                <FiArrowRight />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sale.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 px-4 bg-dark-bg-elevated">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-dark-primary/10 to-dark-secondary/10 rounded-3xl p-12 border border-dark-border"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-text-primary mb-6">
            Start Selling Today
          </h2>
          <p className="text-dark-text-secondary text-lg mb-8">
            Join thousands of sellers and showcase your fashion brand to the world
          </p>
          <Link to="/register" className="inline-block px-8 py-4 bg-dark-primary hover:bg-dark-primary-hover text-dark-bg-primary font-bold rounded-xl shadow-glow">
            Become a Seller
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

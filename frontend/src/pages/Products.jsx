import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    setCategory(urlCategory || '');
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [searchParams, search]);

  const fetchProducts = async () => {
    try {
      const urlCategory = searchParams.get('category');
      const urlBadge = searchParams.get('badge');
      
      const { data } = await API.get('/products', { params: { category: urlCategory, search } });
      const filtered = urlBadge ? data.filter(p => p.badge === urlBadge) : data;
      setProducts(filtered);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg-primary py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent mb-8">
            Shop All Products
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text-muted" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-12"
              />
            </div>

            <select 
              value={category} 
              onChange={(e) => {
                setCategory(e.target.value);
                if (e.target.value) {
                  setSearchParams({ category: e.target.value });
                } else {
                  setSearchParams({});
                }
              }} 
              className="input md:w-64"
            >
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-dark-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-dark-bg-elevated rounded-3xl">
            <p className="text-2xl text-dark-text-secondary">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

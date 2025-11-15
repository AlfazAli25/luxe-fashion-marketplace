import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API, { API_BASE_URL } from '../utils/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiUser } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      if (data.size?.length > 0) setSelectedSize(data.size[0]);
      if (data.color?.length > 0) setSelectedColor(data.color[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const getImageForColor = () => {
    if (!product) return '';
    
    if (product.images && product.images.length > 0) {
      const colorImage = product.images.find(img => img.color === selectedColor);
      if (colorImage) return colorImage.url;
    }
    
    return product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`;
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'buyer') {
      alert('Only buyers can add items to cart');
      return;
    }
    await addToCart(product._id, quantity, selectedSize, selectedColor);
    alert('Added to cart!');
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-glass"
        >
          <motion.div 
            className="h-[500px] rounded-2xl overflow-hidden bg-gray-100 shadow-soft"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={getImageForColor()} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </motion.div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-3">{product.name}</h1>
              <p className="text-lg font-semibold text-blue-600 mb-4">{product.category}</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price}
              </p>
            </div>
            
            <div className="py-6 border-y border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {product.size?.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Size</h4>
                <div className="flex gap-3 flex-wrap">
                  {product.size.map(size => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        selectedSize === size 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {product.color?.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Color</h4>
                <div className="flex gap-3 flex-wrap">
                  {product.color.map(color => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        selectedColor === color 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-bold text-gray-800 mb-3">Quantity</h4>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-32 px-4 py-3 bg-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-semibold"
              />
            </div>

            <motion.button 
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
            >
              <FiShoppingCart size={24} />
              Add to Cart
            </motion.button>

            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-600 mb-2 flex items-center gap-2">
                <FiUser /> Seller
              </h4>
              <p className="font-bold text-gray-800 text-lg">{product.seller?.name}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;

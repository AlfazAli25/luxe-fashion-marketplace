import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { useState } from 'react';
import { API_BASE_URL } from '../utils/api';
import Tooltip from './Tooltip';

const ProductCard = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'buyer') {
      alert('Only buyers can add items to cart');
      return;
    }

    setIsAdding(true);
    try {
      await addItem(product._id, 1, product.size?.[0] || 'M', product.color?.[0] || 'Black');
      setTimeout(() => setIsAdding(false), 1000);
    } catch (error) {
      setIsAdding(false);
      console.error('Error adding to cart:', error);
    }
  };

  const handleLove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoved(!isLoved);
  };

  const imageUrl = product.image?.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-dark-bg-elevated rounded-2xl overflow-hidden shadow-dark-md hover:shadow-glow transition-all"
    >
      <Link to={`/products/${product._id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-dark-bg-surface">
          <motion.img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Overlay with Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
          >
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              {user?.role === 'buyer' && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full ${isAdding ? 'bg-dark-success' : 'bg-dark-primary hover:bg-dark-primary-hover'} text-dark-bg-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-glow transition-all`}
                >
                  {isAdding ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-dark-bg-primary border-t-transparent rounded-full"
                      />
                      Added!
                    </>
                  ) : (
                    <>
                      <FiShoppingCart size={18} />
                      Add to Cart
                    </>
                  )}
                </motion.button>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.preventDefault(); navigate(`/products/${product._id}`); }}
                className="w-full bg-dark-bg-elevated/80 backdrop-blur-sm hover:bg-dark-bg-surface text-dark-text-primary font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <FiEye size={18} />
                Quick View
              </motion.button>
            </div>
          </motion.div>

          {/* Love Button */}
          <Tooltip text={isLoved ? 'Remove from Wishlist' : 'Add to Wishlist'} position="left">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLove}
              className="absolute top-4 right-4 p-3 bg-dark-bg-elevated/80 backdrop-blur-sm rounded-full hover:bg-dark-bg-elevated transition-all z-10"
            >
              <motion.div
                animate={{ scale: isLoved ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <FiHeart
                  size={20}
                  className={`transition-all ${isLoved ? 'fill-dark-error text-dark-error' : 'text-dark-text-secondary'}`}
                />
              </motion.div>
            </motion.button>
          </Tooltip>

          {/* Badge */}
          {product.badge && (
            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
              product.badge === 'NEW' ? 'bg-dark-primary text-dark-bg-primary' :
              product.badge === 'SALE' ? 'bg-dark-error text-white' :
              product.badge === 'TRENDING' ? 'bg-dark-accent text-dark-bg-primary' :
              'bg-dark-secondary text-white'
            }`}>
              {product.badge}
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-14 left-4 px-3 py-1.5 bg-dark-error text-white rounded-full text-xs font-bold shadow-lg">
              -{product.discount}%
            </div>
          )}

          {/* Stock Warning */}
          {product.stock < 10 && (
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-dark-warning/90 backdrop-blur-sm text-dark-bg-primary rounded-full text-xs font-bold">
              Only {product.stock} left!
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-dark-text-primary font-bold text-lg mb-1 line-clamp-1 group-hover:text-dark-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-dark-text-muted text-sm mb-3 line-clamp-1">
            {product.category}
          </p>
          
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-dark-primary font-bold text-2xl">
                ${product.price}
              </span>
              {hasDiscount && (
                <span className="text-dark-text-muted text-sm line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Colors */}
          {product.color && product.color.length > 0 && (
            <div className="flex gap-2 mb-3">
              {product.color.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-dark-border hover:border-dark-primary cursor-pointer transition-all shadow-sm"
                  style={{ 
                    backgroundColor: color.toLowerCase() === 'white' ? '#FFFFFF' : 
                                   color.toLowerCase() === 'black' ? '#000000' :
                                   color.toLowerCase() === 'gray' ? '#808080' :
                                   color.toLowerCase() === 'navy' ? '#000080' :
                                   color.toLowerCase() === 'brown' ? '#8B4513' :
                                   color.toLowerCase() === 'beige' ? '#F5F5DC' :
                                   color.toLowerCase() === 'khaki' ? '#C3B091' :
                                   color.toLowerCase() === 'blue' ? '#4169E1' :
                                   color.toLowerCase() === 'cream' ? '#FFFDD0' :
                                   color.toLowerCase() === 'charcoal' ? '#36454F' :
                                   color.toLowerCase() === 'camel' ? '#C19A6B' :
                                   color.toLowerCase() === 'ivory' ? '#FFFFF0' :
                                   color.toLowerCase() === 'burgundy' ? '#800020' :
                                   color.toLowerCase() === 'tortoise' ? '#8B4513' :
                                   '#808080'
                  }}
                  title={color}
                />
              ))}
              {product.color.length > 4 && (
                <div className="w-6 h-6 rounded-full border-2 border-dark-border flex items-center justify-center text-xs text-dark-text-muted">
                  +{product.color.length - 4}
                </div>
              )}
            </div>
          )}

          {/* Sizes */}
          {product.size && product.size.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.size.slice(0, 5).map((size, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-dark-bg-surface text-dark-text-secondary text-xs rounded border border-dark-border"
                >
                  {size}
                </span>
              ))}
              {product.size.length > 5 && (
                <span className="px-2 py-1 text-dark-text-muted text-xs">
                  +{product.size.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;

import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API, { API_BASE_URL } from '../utils/api';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoved, setIsLoved] = useState(false);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        if (data.size?.length > 0) setSelectedSize(data.size[0]);
        if (data.color?.length > 0) setSelectedColor(data.color[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'buyer') {
      alert('Only buyers can add items to cart');
      return;
    }
    await addItem(product._id, quantity, selectedSize, selectedColor);
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg-primary flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dark-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-dark-text-secondary mb-4">Product not found</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = product.image?.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="min-h-screen bg-dark-bg-primary py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 bg-dark-bg-elevated p-8 md:p-12 rounded-3xl shadow-dark-md"
        >
          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-dark-bg-surface shadow-dark-md">
              <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            {product.badge && (
              <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                product.badge === 'NEW' ? 'bg-dark-primary text-dark-bg-primary' :
                product.badge === 'SALE' ? 'bg-dark-error text-white' :
                product.badge === 'TRENDING' ? 'bg-dark-accent text-dark-bg-primary' :
                'bg-dark-secondary text-white'
              }`}>
                {product.badge}
              </div>
            )}

            {hasDiscount && (
              <div className="absolute top-16 left-4 px-4 py-2 bg-dark-error text-white rounded-full text-sm font-bold shadow-lg">
                -{product.discount}% OFF
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-dark-text-primary mb-3">
                {product.name}
              </h1>
              <p className="text-lg font-semibold text-dark-primary mb-4">{product.category}</p>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-bold text-dark-primary">
                  ${product.price}
                </span>
                {hasDiscount && (
                  <span className="text-2xl text-dark-text-muted line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="py-6 border-y border-dark-border">
              <p className="text-dark-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            {product.size?.length > 0 && (
              <div>
                <h4 className="font-bold text-dark-text-primary mb-3">Select Size</h4>
                <div className="flex gap-3 flex-wrap">
                  {product.size.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-dark-primary text-dark-bg-primary shadow-glow'
                          : 'bg-dark-bg-surface text-dark-text-primary hover:bg-dark-border'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.color?.length > 0 && (
              <div>
                <h4 className="font-bold text-dark-text-primary mb-3">Select Color</h4>
                <div className="flex gap-3 flex-wrap">
                  {product.color.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        selectedColor === color
                          ? 'bg-dark-primary text-dark-bg-primary shadow-glow'
                          : 'bg-dark-bg-surface text-dark-text-primary hover:bg-dark-border'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h4 className="font-bold text-dark-text-primary mb-3">Quantity</h4>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-dark-bg-surface hover:bg-dark-border rounded-xl font-bold text-xl transition-colors"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-dark-text-primary w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-dark-bg-surface hover:bg-dark-border rounded-xl font-bold text-xl transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-3 py-5 text-lg"
              >
                <FiShoppingCart size={24} />
                Add to Cart
              </button>
              <button
                onClick={() => setIsLoved(!isLoved)}
                className={`p-5 rounded-xl transition-all ${
                  isLoved
                    ? 'bg-dark-error text-white'
                    : 'bg-dark-bg-surface text-dark-text-secondary hover:bg-dark-border'
                }`}
              >
                <FiHeart size={24} className={isLoved ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-dark-border">
              <div className="text-center">
                <FiTruck className="mx-auto mb-2 text-dark-primary" size={24} />
                <p className="text-sm text-dark-text-secondary">Free Shipping</p>
              </div>
              <div className="text-center">
                <FiShield className="mx-auto mb-2 text-dark-primary" size={24} />
                <p className="text-sm text-dark-text-secondary">Secure Payment</p>
              </div>
              <div className="text-center">
                <FiRefreshCw className="mx-auto mb-2 text-dark-primary" size={24} />
                <p className="text-sm text-dark-text-secondary">Easy Returns</p>
              </div>
            </div>

            {/* Stock & Seller */}
            <div className="pt-6 border-t border-dark-border space-y-3">
              <div className="flex justify-between">
                <span className="text-dark-text-secondary">Stock:</span>
                <span className={`font-bold ${product.stock < 10 ? 'text-dark-warning' : 'text-dark-success'}`}>
                  {product.stock} available
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-text-secondary">Seller:</span>
                <span className="font-bold text-dark-text-primary">{product.seller?.name}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;

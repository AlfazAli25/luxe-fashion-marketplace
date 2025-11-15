import { motion } from 'framer-motion';
import { FiUpload, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Men',
    stock: '',
    image: '',
    badge: '',
    discount: 0,
    size: [],
    color: []
  });

  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/products', formData);
      navigate('/seller/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add product');
      setLoading(false);
    }
  };

  const addSize = () => {
    if (sizeInput && !formData.size.includes(sizeInput)) {
      setFormData({ ...formData, size: [...formData.size, sizeInput] });
      setSizeInput('');
    }
  };

  const addColor = () => {
    if (colorInput && !formData.color.includes(colorInput)) {
      setFormData({ ...formData, color: [...formData.color, colorInput] });
      setColorInput('');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg-primary py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-dark-text-primary mb-2">Add New Product</h1>
          <p className="text-dark-text-secondary">Fill in the details to add a new product</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-dark-bg-elevated rounded-2xl p-8 border border-dark-border space-y-6"
        >
          <div>
            <label className="block text-dark-text-primary font-semibold mb-2">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              placeholder="Premium Leather Jacket"
            />
          </div>

          <div>
            <label className="block text-dark-text-primary font-semibold mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input min-h-[100px]"
              placeholder="Detailed product description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-dark-text-primary font-semibold mb-2">Price ($)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="input"
                placeholder="299"
              />
            </div>

            <div>
              <label className="block text-dark-text-primary font-semibold mb-2">Stock</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="input"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-dark-text-primary font-semibold mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-dark-text-primary font-semibold mb-2">Badge (Optional)</label>
              <select
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="input"
              >
                <option value="">None</option>
                <option value="NEW">NEW</option>
                <option value="TRENDING">TRENDING</option>
                <option value="SALE">SALE</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-dark-text-primary font-semibold mb-2">Image URL</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="input"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="block text-dark-text-primary font-semibold mb-2">Sizes</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                className="input flex-1"
                placeholder="S, M, L, XL"
              />
              <button type="button" onClick={addSize} className="btn-primary">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.size.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-dark-bg-surface text-dark-text-primary rounded-lg flex items-center gap-2">
                  {s}
                  <FiX className="cursor-pointer" onClick={() => setFormData({ ...formData, size: formData.size.filter((_, idx) => idx !== i) })} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-dark-text-primary font-semibold mb-2">Colors</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                className="input flex-1"
                placeholder="Black, White, Navy"
              />
              <button type="button" onClick={addColor} className="btn-primary">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.color.map((c, i) => (
                <span key={i} className="px-3 py-1 bg-dark-bg-surface text-dark-text-primary rounded-lg flex items-center gap-2">
                  {c}
                  <FiX className="cursor-pointer" onClick={() => setFormData({ ...formData, color: formData.color.filter((_, idx) => idx !== i) })} />
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Adding...' : 'Add Product'}
            </button>
            <button type="button" onClick={() => navigate('/seller/dashboard')} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddProduct;

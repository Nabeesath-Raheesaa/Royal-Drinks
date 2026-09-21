import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar.jsx';
import { productService } from '../../services/productService.js';
import './Admin.css';

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Cola',
    size: '330ml Glass Bottle',
    description: '',
    shortDescription: '',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    stock: 50,
    featured: false,
    ingredients: 'Carbonated Alpine Water, Pure Cane Sugar, Organic Natural Flavors',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        ingredients: formData.ingredients.split(',').map((s) => s.trim()),
      };

      await productService.createProduct(payload);
      navigate('/admin/products');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to create product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-page section-padding">
      <div className="container admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <div className="admin-header flex-between">
            <div>
              <h1 className="admin-title">Add New <span className="text-gold">Drink Product</span></h1>
              <p className="admin-subtitle">Add an artisanal soft drink to the catalog</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin/products')}>
              <ArrowLeft size={14} /> Back to Products
            </button>
          </div>

          <div className="admin-section card-glass">
            {errorMsg && <div className="auth-error-alert">{errorMsg}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Royal Cola Reserve"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Cola">Cola</option>
                    <option value="Citrus">Citrus</option>
                    <option value="Orange">Orange</option>
                    <option value="Lemon">Lemon</option>
                    <option value="Berry">Berry</option>
                    <option value="Energy">Energy</option>
                    <option value="Sparkling">Sparkling</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="120"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Bottle Size *</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="330ml Glass Bottle"
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Initial Stock Quantity *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group flex-center" style={{ justifyContent: 'flex-start', paddingTop: '1.5rem' }}>
                  <label className="flex-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    <span className="text-gold font-bold">Mark as Featured Drink</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Product Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Short Summary Description *</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Signature artisanal cola infused with exotic botanicals..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Full Craft Description *</label>
                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Elaborate details on ingredients, origin, carbonation..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Ingredients (Comma separated)</label>
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-gold btn-lg" disabled={submitting}>
                <Save size={18} /> {submitting ? 'Creating...' : 'Save & Publish Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

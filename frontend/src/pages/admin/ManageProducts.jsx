import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, RefreshCw, AlertTriangle } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { productService } from '../../services/productService.js';
import './Admin.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({ limit: 100 });
      setProducts(data.products || []);
    } catch (err) {
      console.warn('API error loading products list:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page section-padding">
      <div className="container admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <div className="admin-header flex-between">
            <div>
              <h1 className="admin-title">Manage <span className="text-gold">Products</span></h1>
              <p className="admin-subtitle">Add, edit, or archive Royal Drinks inventory items</p>
            </div>
            <Link to="/admin/products/add" className="btn btn-gold">
              <Plus size={16} /> Add Product
            </Link>
          </div>

          <div className="admin-section card-glass">
            <div className="flex-between section-head-row">
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="btn btn-outline btn-sm" onClick={fetchProducts}>
                <RefreshCw size={14} /> Reload
              </button>
            </div>

            {loading ? (
              <LoadingSpinner message="Fetching Inventory..." />
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                            />
                          </td>
                          <td className="font-bold">{product.name}</td>
                          <td>
                            <span className="badge badge-gold">{product.category}</span>
                          </td>
                          <td>{product.size || '330ml'}</td>
                          <td className="font-bold">₹{product.price}</td>
                          <td>
                            {product.stock <= 10 ? (
                              <span className="text-gold flex-center gap-1">
                                <AlertTriangle size={14} /> Low ({product.stock})
                              </span>
                            ) : (
                              `${product.stock} units`
                            )}
                          </td>
                          <td>{product.rating?.toFixed(1)} ★</td>
                          <td>
                            <Link to={`/admin/products/edit/${product._id}`} className="icon-action-btn" title="Edit">
                              <Edit size={16} />
                            </Link>
                            <button
                              className="icon-action-btn delete-btn"
                              onClick={() => handleDelete(product._id, product.name)}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-muted">
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart.js';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const formattedPrice = `₹${product.price}`;

  return (
    <div className="product-card card-glass">
      {/* Product Image & Badges */}
      <div className="product-image-container">
        {product.featured && <span className="product-badge badge-gold">Featured</span>}
        <span className="product-category-badge">{product.category}</span>
        
        <Link to={`/products/${product.slug || product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </Link>

        {/* Quick View Hover Overlay */}
        <div className="product-overlay">
          <Link
            to={`/products/${product.slug || product._id}`}
            className="quick-view-btn"
          >
            <Eye size={18} /> View Details
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-meta">
          <span className="product-size">{product.size || '330ml'}</span>
          <div className="product-rating">
            <Star size={14} className="star-icon" fill="#D4AF37" color="#D4AF37" />
            <span className="rating-score">{product.rating.toFixed(1)}</span>
            <span className="rating-count">({product.reviewsCount || 0})</span>
          </div>
        </div>

        <Link to={`/products/${product.slug || product._id}`} className="product-title">
          <h3>{product.name}</h3>
        </Link>

        <p className="product-short-desc">{product.shortDescription}</p>

        {/* Price & Action */}
        <div className="product-footer">
          <div className="product-price-block">
            <span className="price-label">Price</span>
            <span className="product-price">{formattedPrice}</span>
          </div>

          <button
            className={`add-cart-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {added ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

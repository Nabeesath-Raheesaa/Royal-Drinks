import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingBag, Zap, CheckCircle, AlertCircle, ArrowLeft, Send } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { productService } from '../services/productService.js';
import { useCart } from '../hooks/useCart.js';
import { useAuth } from '../hooks/useAuth.js';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedNotice, setAddedNotice] = useState(false);

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const data = await productService.getProductByIdOrSlug(id);
      setProduct(data);
      setSelectedImage(data.image);

      // Fetch related products by category
      if (data.category) {
        const related = await productService.getProducts({ category: data.category, limit: 4 });
        setRelatedProducts(related.products.filter(p => p._id !== data._id));
      }
    } catch (err) {
      console.warn('API error, using fallback product details:', err.message);
      const fallback = getFallbackProduct(id);
      setProduct(fallback);
      setSelectedImage(fallback.image);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setReviewSubmitting(true);
    setReviewMessage({ type: '', text: '' });

    try {
      await productService.addReview(product._id, {
        rating: newRating,
        comment: newComment,
      });
      setReviewMessage({ type: 'success', text: 'Thank you! Your royal review has been published.' });
      setNewComment('');
      fetchProductDetails(); // Refresh product data
    } catch (err) {
      setReviewMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to submit review. You may have already reviewed this drink.',
      });
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Uncorking Product Details..." />;
  if (!product) return <div className="container section-padding">Product not found</div>;

  return (
    <div className="product-details-page section-padding">
      <div className="container">
        {/* Back Link */}
        <Link to="/products" className="back-link">
          <ArrowLeft size={16} /> Back to Collection
        </Link>

        {/* Top Product Hero Block */}
        <div className="product-main-grid">
          {/* Left Image Gallery */}
          <div className="gallery-block">
            <div className="main-image-frame card-glass">
              <img src={selectedImage || product.image} alt={product.name} className="detail-main-img" />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-list">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${selectedImage === img ? 'active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Spec & Purchase Block */}
          <div className="purchase-block">
            <div className="details-header">
              <div className="details-tags">
                <span className="badge badge-gold">{product.category}</span>
                <span className="badge badge-burgundy">{product.size || '330ml Glass Bottle'}</span>
              </div>
              <h1 className="details-title">{product.name}</h1>
              
              <div className="details-rating">
                <div className="stars flex-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating) ? '#D4AF37' : 'none'}
                      color="#D4AF37"
                    />
                  ))}
                </div>
                <span className="rating-number">{product.rating.toFixed(1)}</span>
                <span className="rating-count">({product.reviewsCount || product.reviews?.length || 0} reviews)</span>
              </div>

              <div className="details-price-tag">
                <span className="price-value">₹{product.price}</span>
                <span className="price-tax">Includes all taxes • Free delivery &gt; ₹500</span>
              </div>
            </div>

            <p className="details-short-desc">{product.shortDescription}</p>

            <div className="stock-status-block">
              {product.stock > 0 ? (
                <span className="stock-badge in-stock">
                  <CheckCircle size={14} /> In Stock ({product.stock} units available)
                </span>
              ) : (
                <span className="stock-badge out-stock">
                  <AlertCircle size={14} /> Temporarily Out of Stock
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="quantity-controls">
              <label className="control-label">Quantity</label>
              <div className="qty-picker">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="action-button-group">
              <button
                className="btn btn-gold btn-lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                <Zap size={20} /> Buy Now
              </button>
            </div>

            {addedNotice && (
              <div className="add-success-alert badge badge-gold animate-fadeIn">
                ✓ Added {quantity} bottle(s) of {product.name} to your cart!
              </div>
            )}
          </div>
        </div>

        {/* Tabbed Specifications */}
        <div className="tabs-container card-glass">
          <div className="tab-headers">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description & Craftsmanship
            </button>
            <button
              className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button
              className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutritional Facts
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Customer Reviews ({product.reviews?.length || 0})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane animate-fadeIn">
                <h3>Artisanal Heritage</h3>
                <p className="tab-text">{product.description}</p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="tab-pane animate-fadeIn">
                <h3>Pure & Selected Botanicals</h3>
                <ul className="ingredients-list">
                  {product.ingredients?.map((ing, i) => (
                    <li key={i}>
                      <CheckCircle size={16} className="ing-check" /> {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="tab-pane animate-fadeIn">
                <h3>Nutritional Profile (per 100ml)</h3>
                <div className="nutrition-grid">
                  <div className="nutri-item">
                    <span className="nutri-label">Calories</span>
                    <span className="nutri-val">{product.nutritionalFacts?.calories || '140 kcal'}</span>
                  </div>
                  <div className="nutri-item">
                    <span className="nutri-label">Sugar</span>
                    <span className="nutri-val">{product.nutritionalFacts?.sugar || '32g'}</span>
                  </div>
                  <div className="nutri-item">
                    <span className="nutri-label">Caffeine</span>
                    <span className="nutri-val">{product.nutritionalFacts?.caffeine || '0mg'}</span>
                  </div>
                  <div className="nutri-item">
                    <span className="nutri-label">Sodium</span>
                    <span className="nutri-val">{product.nutritionalFacts?.sodium || '15mg'}</span>
                  </div>
                  <div className="nutri-item">
                    <span className="nutri-label">Total Carbs</span>
                    <span className="nutri-val">{product.nutritionalFacts?.carbs || '35g'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane animate-fadeIn">
                <h3>Connoisseur Feedback</h3>

                {/* Review List */}
                <div className="reviews-list">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev, index) => (
                      <div key={index} className="review-item">
                        <div className="review-user-row">
                          <span className="user-name">{rev.userName}</span>
                          <div className="user-stars">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < rev.rating ? '#D4AF37' : 'none'}
                                color="#D4AF37"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="review-text">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No reviews yet. Be the first to share your experience!</p>
                  )}
                </div>

                {/* Add Review Form */}
                <div className="add-review-box">
                  <h4>Write a Royal Review</h4>
                  {user ? (
                    <form onSubmit={handleReviewSubmit} className="review-form">
                      {reviewMessage.text && (
                        <div className={`alert-box ${reviewMessage.type}`}>
                          {reviewMessage.text}
                        </div>
                      )}
                      <div className="rating-picker">
                        <label>Rating:</label>
                        <select
                          value={newRating}
                          onChange={(e) => setNewRating(Number(e.target.value))}
                        >
                          <option value="5">5 ★★★★★ Excellent</option>
                          <option value="4">4 ★★★★☆ Great</option>
                          <option value="3">3 ★★★☆☆ Good</option>
                          <option value="2">2 ★★☆☆☆ Average</option>
                          <option value="1">1 ★☆☆☆☆ Poor</option>
                        </select>
                      </div>

                      <textarea
                        rows="3"
                        placeholder="Share your thoughts on flavor, carbonation, and aroma..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                      ></textarea>

                      <button
                        type="submit"
                        className="btn btn-gold"
                        disabled={reviewSubmitting}
                      >
                        Submit Review <Send size={16} />
                      </button>
                    </form>
                  ) : (
                    <p className="login-prompt">
                      Please <Link to="/login" className="text-gold">Login</Link> to post a review.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-section">
            <h2 className="related-title">You Might Also <span className="text-gold">Enjoy</span></h2>
            <div className="grid-4">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard key={rel._id || rel.slug} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Fallback data function
function getFallbackProduct(id) {
  return {
    _id: id || 'f1',
    name: 'Royal Cola',
    slug: 'royal-cola',
    description: 'Experience the crown jewel of dark sodas. Royal Cola is meticulously crafted with real kola nut extract, organic cane sugar, and a proprietary blend of 12 exotic botanical spices including cinnamon bark and Madagascar vanilla.',
    shortDescription: 'Signature artisanal cola infused with exotic botanicals and Madagascar vanilla.',
    price: 120,
    category: 'Cola',
    size: '330ml Glass Bottle',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 120,
    rating: 4.9,
    reviewsCount: 38,
    ingredients: ['Carbonated Alpine Spring Water', 'Pure Cane Sugar', 'Kola Nut Extract', 'Natural Spices', 'Caramel Color'],
    nutritionalFacts: {
      calories: '140 kcal',
      sugar: '32g',
      caffeine: '34mg',
      sodium: '15mg',
      carbs: '35g'
    },
    reviews: [
      { userName: 'Lord Sterling', rating: 5, comment: 'Absolutely sensational taste profile.' }
    ]
  };
}

export default ProductDetails;

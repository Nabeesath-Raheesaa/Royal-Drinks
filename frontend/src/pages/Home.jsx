import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Leaf, Shield, Heart, Send } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { productService } from '../services/productService.js';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await productService.getFeaturedProducts();
        setFeaturedProducts(data.length ? data : getFallbackFeatured());
      } catch (err) {
        console.warn('API error, loading fallback products:', err.message);
        setFeaturedProducts(getFallbackFeatured());
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const categories = [
    { name: 'Cola', title: 'Artisanal Cola', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400' },
    { name: 'Citrus', title: 'Citrus & Lime', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400' },
    { name: 'Orange', title: 'Valencia Orange', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=400' },
    { name: 'Lemon', title: 'Sicilian Lemon', img: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=400' },
    { name: 'Berry', title: 'Wild Berry', img: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=400' },
    { name: 'Energy', title: 'Botanical Energy', img: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Sparkling', title: 'Alpine Sparkling', img: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=400' },
  ];

  const sampleReviews = [
    {
      userName: 'Lady Eleanor Vance',
      rating: 5,
      comment: 'Royal Cola is unlike any soft drink I have ever tasted. The Madagascar vanilla and botanical spices create an unforgettable luxury sensation.',
    },
    {
      userName: 'Duchess Victoria Vance',
      rating: 5,
      comment: 'Royal Berry is my staple for weekend soirées. Crisp, subtle sweetness, and a sparkling finish that delights all my guests.',
    },
    {
      userName: 'Baron Julian Sterling',
      rating: 5,
      comment: 'The packaging, the exquisite taste, the speed of concierge delivery - Royal Drinks has truly elevated beverage craft to pure art.',
    },
  ];

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge badge-gold animate-fadeIn">
              <Sparkles size={14} /> The Pinnacle of Luxury Beverage Craft
            </span>
            <h1 className="hero-title animate-fadeIn">
              ROYAL <span className="text-gold">DRINKS</span>
            </h1>
            <p className="hero-tagline">“Refresh Your Royal Moment”</p>
            <p className="hero-description animate-fadeIn">
              Hand-crafted soft drinks distilled from organic juices, rare botanicals, and triple-filtered alpine spring water. Elevate your everyday moments with regal taste.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-gold">
                Explore Drinks <ArrowRight size={18} />
              </Link>
              <Link to="/products?featured=true" className="btn btn-primary">
                Shop Featured
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-label">Natural Botanicals</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">4.9★</span>
                <span className="stat-label">Customer Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">Zero</span>
                <span className="stat-label">Artificial Additives</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="bottle-wrapper animate-float">
              <img
                src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800"
                alt="Royal Cola Hero Bottle"
                className="hero-bottle-img"
              />
              <div className="bottle-shadow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED DRINKS SECTION */}
      <section className="section-padding featured-section">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Signature Selections</span>
            <h2 className="title">Featured <span className="text-gold">Royal Drinks</span></h2>
            <p className="description">
              Curated brews created for discerning palates. Discover our top-rated flagship soft drinks.
            </p>
          </div>

          {loading ? (
            <LoadingSpinner message="Fetching Featured Drinks..." />
          ) : (
            <div className="grid-4 featured-grid">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id || product.slug} product={product} />
              ))}
            </div>
          )}

          <div className="view-all-wrapper">
            <Link to="/products" className="btn btn-outline">
              View Entire Collection ({featuredProducts.length + 4}+ Drinks) <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BRAND STORY SECTION */}
      <section className="brand-story-section">
        <div className="container story-container">
          <div className="story-image-block">
            <img
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800"
              alt="Artisanal Soft Drink Craft"
              className="story-img"
            />
          </div>
          <div className="story-content">
            <span className="subtitle">The Royal Heritage</span>
            <h2 className="story-title">“Crafted for moments that deserve a little more.”</h2>
            <p className="story-desc">
              Founded on the belief that everyday beverages should feel extraordinary, Royal Drinks brings centuries of botanical alchemy into modern soft drink craft.
            </p>
            <p className="story-desc">
              We reject high-fructose syrups and synthetic flavorings. Instead, our master blenders harvest cold-pressed citrus from Sicily, wild berries from Nordic hills, and rare spices from Sri Lanka to formulate beverages worthy of your finest occasions.
            </p>
            <Link to="/about" className="btn btn-gold">
              Discover Our Story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES SECTION */}
      <section className="section-padding categories-section">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Curated Flavors</span>
            <h2 className="title">Explore By <span className="text-gold">Category</span></h2>
            <p className="description">
              Find your signature taste profile across our seven distinct beverage collections.
            </p>
          </div>

          <div className="category-scroll-grid">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className="category-card card-glass"
              >
                <div className="cat-img-wrapper">
                  <img src={cat.img} alt={cat.title} className="cat-img" />
                </div>
                <h4 className="cat-title">{cat.title}</h4>
                <span className="cat-link-text">Shop Line →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY ROYAL DRINKS? */}
      <section className="section-padding why-section">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Uncompromising Quality</span>
            <h2 className="title">Why Choose <span className="text-gold">Royal Drinks?</span></h2>
          </div>

          <div className="grid-4 why-grid">
            <div className="why-card card-glass">
              <Award className="why-icon" size={32} />
              <h3>Premium Taste</h3>
              <p>Formulated by master flavorists for an unforgettable layered taste sensation.</p>
            </div>
            <div className="why-card card-glass">
              <Leaf className="why-icon" size={32} />
              <h3>Selected Ingredients</h3>
              <p>100% organic fruit extracts, real cane sugar, and natural mountain spring water.</p>
            </div>
            <div className="why-card card-glass">
              <Sparkles className="why-icon" size={32} />
              <h3>Refreshing Experience</h3>
              <p>Micro-fine carbonation engineered to invigorate your palate gently.</p>
            </div>
            <div className="why-card card-glass">
              <Shield className="why-icon" size={32} />
              <h3>Quality You Can Trust</h3>
              <p>Glass-bottled at the source with strict international quality certification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROMOTIONAL BANNER */}
      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner-card">
            <div className="promo-content">
              <span className="badge badge-gold">Exclusive Offer</span>
              <h2>“Your next refreshment awaits.”</h2>
              <p>Experience the royal treatment. Enjoy complimentary concierge shipping on all orders above ₹500.</p>
              <Link to="/products" className="btn btn-gold">
                Explore Collection <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="section-padding reviews-section">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Connoisseur Praise</span>
            <h2 className="title">Customer <span className="text-gold">Reviews</span></h2>
            <p className="description">Read what beverage enthusiasts say about the Royal Drinks experience.</p>
          </div>

          <div className="grid-3 reviews-grid">
            {sampleReviews.map((rev, idx) => (
              <ReviewCard key={idx} review={rev} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIPTION */}
      <section className="section-padding newsletter-section">
        <div className="container">
          <div className="newsletter-card card-glass">
            <div className="newsletter-content">
              <span className="subtitle">Join The Royal Club</span>
              <h2>Subscribe for Private Reserve Access</h2>
              <p>Receive exclusive invitations to limited-edition seasonal releases and tasting notes.</p>
              {subscribed ? (
                <div className="subscribed-msg badge badge-gold">
                  ✓ Welcome to the Royal Club! Check your inbox for your welcome privilege gift.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-gold">
                    Subscribe <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Fallback data if API backend hasn't seeded yet
function getFallbackFeatured() {
  return [
    {
      _id: 'f1',
      name: 'Royal Cola',
      slug: 'royal-cola',
      shortDescription: 'Signature artisanal cola infused with exotic botanicals and Madagascar vanilla.',
      price: 120,
      category: 'Cola',
      size: '330ml Glass Bottle',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
      stock: 120,
      rating: 4.9,
      reviewsCount: 38,
      featured: true,
    },
    {
      _id: 'f2',
      name: 'Royal Orange',
      slug: 'royal-orange',
      shortDescription: 'Lush Valencia orange elixir delicately floral and effervescent.',
      price: 110,
      category: 'Orange',
      size: '330ml Glass Bottle',
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
      stock: 85,
      rating: 4.8,
      reviewsCount: 26,
      featured: true,
    },
    {
      _id: 'f3',
      name: 'Royal Lemon',
      slug: 'royal-lemon',
      shortDescription: 'Crisp Sicilian lemon spritz with mountain honey undertones.',
      price: 99,
      category: 'Lemon',
      size: '330ml Glass Bottle',
      image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=800',
      stock: 90,
      rating: 4.7,
      reviewsCount: 19,
      featured: true,
    },
    {
      _id: 'f4',
      name: 'Royal Berry',
      slug: 'royal-berry',
      shortDescription: 'Velvety blackberry & elderflower brew with micro-fine bubbles.',
      price: 135,
      category: 'Berry',
      size: '330ml Glass Bottle',
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800',
      stock: 60,
      rating: 4.95,
      reviewsCount: 42,
      featured: true,
    },
  ];
}

export default Home;

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { productService } from '../services/productService.js';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter States initialized from URL search params
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get('featured') === 'true');

  const categoriesList = ['All', 'Cola', 'Citrus', 'Orange', 'Lemon', 'Berry', 'Energy', 'Sparkling'];

  useEffect(() => {
    fetchProducts();
  }, [category, sort, featuredOnly, page, searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        category: category !== 'All' ? category : undefined,
        search: search.trim() || undefined,
        sort,
        featured: featuredOnly ? 'true' : undefined,
        page,
        limit: 12,
      };

      const data = await productService.getProducts(params);
      setProducts(data.products || []);
      setTotalPages(data.pages || 1);
      setTotalProducts(data.totalProducts || 0);
    } catch (err) {
      console.warn('API error, loading fallback list:', err.message);
      // Fallback data if DB server isn't populated
      setProducts(getFallbackAllProducts());
      setTotalProducts(8);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (cat !== 'All') newParams.set('category', cat);
    else newParams.delete('category');
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (search.trim()) newParams.set('search', search.trim());
    else newParams.delete('search');
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setCategory('All');
    setSearch('');
    setSort('newest');
    setFeaturedOnly(false);
    setPage(1);
    setSearchParams({});
  };

  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="products-header-banner">
        <div className="container">
          <span className="subtitle">The Royal Reserve</span>
          <h1 className="title">Explore <span className="text-gold">Royal Drinks</span></h1>
          <p className="description">
            Discover artisanal soft drinks formulated with organic botanicals, real fruit infusions, and sparkling spring water.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        {/* Controls Strip: Search & Filter bar */}
        <div className="controls-bar card-glass">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search drinks by name or ingredient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button type="submit" className="search-btn">
                Search
              </button>
            )}
          </form>

          {/* Sort & Featured Filter */}
          <div className="filter-actions">
            <button
              className={`featured-filter-btn ${featuredOnly ? 'active' : ''}`}
              onClick={() => setFeaturedOnly(!featuredOnly)}
            >
              <Sparkles size={16} /> Featured Only
            </button>

            <div className="sort-dropdown-wrapper">
              <SlidersHorizontal size={16} className="sort-icon" />
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="category-pills">
          <Filter size={16} className="filter-label-icon" />
          {categoriesList.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="results-meta flex-between">
          <p className="meta-count">
            Showing <span className="highlight">{products.length}</span> of {totalProducts} Royal Drinks
          </p>
          {(category !== 'All' || search || featuredOnly) && (
            <button className="clear-filter-btn" onClick={handleClearFilters}>
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <LoadingSpinner message="Curating Royal Drinks Collection..." />
        ) : products.length === 0 ? (
          <div className="no-products card-glass">
            <h3>No Royal Drinks Match Your Criteria</h3>
            <p>Try adjusting your search terms or selecting another category.</p>
            <button className="btn btn-gold" onClick={handleClearFilters}>
              View All Drinks
            </button>
          </div>
        ) : (
          <div className="grid-4 products-grid">
            {products.map((product) => (
              <ProductCard key={product._id || product.slug} product={product} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="page-btn"
            >
              ← Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`page-num ${page === i + 1 ? 'active' : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="page-btn"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Fallback data if backend is offline or empty
function getFallbackAllProducts() {
  return [
    {
      _id: 'p1',
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
      _id: 'p2',
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
      _id: 'p3',
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
      _id: 'p4',
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
    {
      _id: 'p5',
      name: 'Royal Citrus',
      slug: 'royal-citrus',
      shortDescription: 'Ruby grapefruit & Key lime nectar with subtle botanicals.',
      price: 115,
      category: 'Citrus',
      size: '330ml Glass Bottle',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
      stock: 75,
      rating: 4.6,
      reviewsCount: 14,
      featured: false,
    },
    {
      _id: 'p6',
      name: 'Royal Energy',
      slug: 'royal-energy',
      shortDescription: 'Clean botanical stamina elixir with green tea & organic guarana.',
      price: 150,
      category: 'Energy',
      size: '355ml Sleek Can',
      image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=800',
      stock: 100,
      rating: 4.85,
      reviewsCount: 31,
      featured: true,
    },
    {
      _id: 'p7',
      name: 'Royal Sparkling',
      slug: 'royal-sparkling',
      shortDescription: 'Effervescent alpine spring water with white peach nectar.',
      price: 105,
      category: 'Sparkling',
      size: '500ml Glass Bottle',
      image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
      stock: 110,
      rating: 4.75,
      reviewsCount: 22,
      featured: false,
    },
    {
      _id: 'p8',
      name: 'Royal Vintage Velvet',
      slug: 'royal-vintage-velvet',
      shortDescription: 'Limited Reserve oak-aged black cherry & Madagascar vanilla brew.',
      price: 180,
      category: 'Berry',
      size: '330ml Gold Foil Bottle',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800',
      stock: 40,
      rating: 5.0,
      reviewsCount: 50,
      featured: true,
    },
  ];
}

export default Products;

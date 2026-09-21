import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, Shield, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          <Crown className="logo-crown" size={24} />
          <span className="logo-text">ROYAL <span className="logo-gold">DRINKS</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>Shop</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
        </nav>

        {/* Action Icons */}
        <div className="navbar-actions">
          {/* Search Trigger */}
          <div className="search-wrapper">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="search-form animate-fadeIn">
                <input
                  type="text"
                  placeholder="Search Royal Drinks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="button" className="search-close" onClick={() => setSearchOpen(false)}>
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button className="action-icon-btn" onClick={() => setSearchOpen(true)} title="Search">
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Shopping Cart Icon */}
          <Link to="/cart" className="action-icon-btn cart-btn" title="Shopping Cart">
            <ShoppingBag size={20} />
            {totalItemsCount > 0 && <span className="cart-badge">{totalItemsCount}</span>}
          </Link>

          {/* User Account / Admin Dropdown */}
          <div className="account-dropdown-container">
            {user ? (
              <div className="user-menu-wrapper">
                <button
                  className="user-avatar-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <User size={18} />
                  <span className="user-first-name">{user.name.split(' ')[0]}</span>
                </button>

                {userDropdownOpen && (
                  <div className="dropdown-menu card-glass animate-fadeIn">
                    <div className="dropdown-user-header">
                      <p className="dropdown-user-name">{user.name}</p>
                      <p className="dropdown-user-email">{user.email}</p>
                      {isAdmin && <span className="admin-pill"><Shield size={12} /> Administrator</span>}
                    </div>

                    <hr className="dropdown-divider" />

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="dropdown-item gold-text-item"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Shield size={16} /> Admin Portal
                      </Link>
                    )}

                    <button
                      className="dropdown-item logout-btn"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigate('/');
                      }}
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-nav-buttons">
                <Link to="/login" className="btn-login-link">Login</Link>
                <Link to="/register" className="btn btn-gold btn-sm">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fadeIn">
          <nav className="mobile-nav">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

            {user ? (
              <>
                <hr className="mobile-divider" />
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                <button
                  className="mobile-logout-btn"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="mobile-auth-actions">
                <Link to="/login" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-gold" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

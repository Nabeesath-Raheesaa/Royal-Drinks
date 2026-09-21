import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Home, ArrowLeft } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page section-padding">
      <div className="container flex-center text-center">
        <div className="not-found-card card-glass">
          <Crown size={64} className="not-found-crown" />
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-desc">
            The Royal Drink or destination you are searching for does not exist or has been moved to another domain.
          </p>

          <div className="not-found-actions flex-center">
            <Link to="/" className="btn btn-gold">
              <Home size={16} /> Return Home
            </Link>
            <Link to="/products" className="btn btn-outline">
              <ArrowLeft size={16} /> Shop All Drinks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

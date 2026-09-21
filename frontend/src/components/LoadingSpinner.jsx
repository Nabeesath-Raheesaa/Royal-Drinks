import React from 'react';
import { Crown } from 'lucide-react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Preparing Royal Elixir...' }) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-content">
        <div className="crown-pulse">
          <Crown size={48} className="spinner-crown" />
        </div>
        <div className="gold-ring"></div>
        <p className="spinner-text">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

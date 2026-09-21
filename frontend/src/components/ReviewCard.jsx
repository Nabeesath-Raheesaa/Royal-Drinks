import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card card-glass">
      <Quote size={28} className="quote-icon" />
      <div className="review-rating">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="star-icon"
            fill={i < review.rating ? '#D4AF37' : 'none'}
            color={i < review.rating ? '#D4AF37' : '#444'}
          />
        ))}
      </div>
      <p className="review-comment">“{review.comment}”</p>
      <div className="review-author">
        <div className="author-avatar">{review.userName?.charAt(0) || 'R'}</div>
        <div className="author-meta">
          <h4 className="author-name">{review.userName}</h4>
          <span className="verified-badge">
            <CheckCircle size={12} /> Verified Royal Connoisseur
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

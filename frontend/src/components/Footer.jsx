import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Brand Commitment Banner */}
      <div className="footer-trust-strip">
        <div className="container trust-container">
          <div className="trust-item">
            <Award className="trust-icon" size={24} />
            <div>
              <h4>Royal Excellence</h4>
              <p>Crafted using rare natural botanicals</p>
            </div>
          </div>
          <div className="trust-item">
            <ShieldCheck className="trust-icon" size={24} />
            <div>
              <h4>Quality Guaranteed</h4>
              <p>Triple filtered alpine spring water</p>
            </div>
          </div>
          <div className="trust-item">
            <HeartHandshake className="trust-icon" size={24} />
            <div>
              <h4>Royal Privilege</h4>
              <p>Concierge delivery for noble moments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Brand Bio */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <Crown className="logo-crown" size={26} />
              <span className="logo-text">ROYAL <span className="logo-gold">DRINKS</span></span>
            </Link>
            <p className="brand-tagline">“Refresh Your Royal Moment”</p>
            <p className="brand-desc">
              Pioneering the renaissance of luxury soft drinks. Masterfully brewed with organic juices, rare florals, and pure mountain spring water for moments that deserve extraordinary refinement.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram" className="social-icon"><Instagram size={18} /></a>
              <a href="#" aria-label="Facebook" className="social-icon"><Facebook size={18} /></a>
              <a href="#" aria-label="Twitter" className="social-icon"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Explore Collection</Link></li>
              <li><Link to="/about">Our Craft & Story</Link></li>
              <li><Link to="/contact">Contact Concierge</Link></li>
              <li><Link to="/cart">My Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Beverage Lines</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=Cola">Royal Artisan Cola</Link></li>
              <li><Link to="/products?category=Orange">Royal Citrus & Orange</Link></li>
              <li><Link to="/products?category=Berry">Royal Wild Berry Elixirs</Link></li>
              <li><Link to="/products?category=Energy">Royal Botanical Energy</Link></li>
              <li><Link to="/products?category=Sparkling">Royal Alpine Sparkling</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-heading">Royal Headquarters</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>100 Royal Esplanade, Kensington, London UK</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <span>+1 (800) ROYAL-DRINKS</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <span>concierge@royaldrinks.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Strip */}
      <div className="footer-bottom">
        <div className="container flex-between bottom-container">
          <p>© {new Date().getFullYear()} ROYAL DRINKS Inc. All Rights Reserved.</p>
          <div className="policy-links">
            <a href="#">Privacy Policy</a>
            <span className="dot">•</span>
            <a href="#">Terms & Conditions</a>
            <span className="dot">•</span>
            <a href="#">Quality Assurance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

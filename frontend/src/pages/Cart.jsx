import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Tag, Plus, Minus } from 'lucide-react';
import { useCart } from '../hooks/useCart.js';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, deliveryFee, totalAmount } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ROYAL10') {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.1);
    } else {
      alert('Invalid Promo Code. Try "ROYAL10" for 10% privilege discount!');
    }
  };

  const finalTotal = totalAmount - promoDiscount;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page section-padding">
        <div className="container text-center flex-center">
          <div className="empty-cart-card card-glass">
            <ShoppingBag size={64} className="empty-cart-icon" />
            <h2>Your Royal Shopping Cart is Empty</h2>
            <p>Explore our craft collection of artisanal soft drinks and curate your refreshment order.</p>
            <Link to="/products" className="btn btn-gold btn-lg">
              Explore Royal Drinks Collection <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="cart-header flex-between">
          <div>
            <h1 className="cart-title">Your Shopping <span className="text-gold">Cart</span></h1>
            <p className="cart-subtitle">Review items before proceeding to Royal Checkout</p>
          </div>
          <button className="clear-cart-btn" onClick={clearCart}>
            <Trash2 size={16} /> Clear Cart
          </button>
        </div>

        <div className="cart-grid">
          {/* Item List */}
          <div className="cart-items-list card-glass">
            <div className="table-header flex-between">
              <span>Beverage Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span>Action</span>
            </div>

            {cartItems.map((item, idx) => (
              <div key={`${item.product}-${item.size}-${idx}`} className="cart-item-row flex-between">
                <div className="item-info">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div>
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-size badge badge-gold">{item.size}</span>
                  </div>
                </div>

                <div className="item-unit-price">
                  ₹{item.price}
                </div>

                <div className="item-qty-picker">
                  <button onClick={() => updateQuantity(item.product, item.size, item.quantity - 1)}>
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product, item.size, item.quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>

                <div className="item-subtotal">
                  ₹{item.price * item.quantity}
                </div>

                <button
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item.product, item.size)}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <div className="cart-actions-bar flex-between">
              <Link to="/products" className="back-shop-link">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary-card card-glass">
            <h3>Order Summary</h3>
            <div className="summary-divider"></div>

            <div className="summary-row flex-between">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row flex-between">
              <span>Concierge Delivery</span>
              <span>{deliveryFee === 0 ? <span className="free-tag">FREE</span> : `₹${deliveryFee}`}</span>
            </div>

            {promoApplied && (
              <div className="summary-row flex-between discount-row">
                <span>ROYAL10 Privilege Discount</span>
                <span>-₹{promoDiscount.toFixed(2)}</span>
              </div>
            )}

            {/* Promo Form */}
            <form onSubmit={handleApplyPromo} className="promo-form">
              <div className="promo-input-group">
                <Tag size={16} className="tag-icon" />
                <input
                  type="text"
                  placeholder="Promo code (e.g. ROYAL10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                <button type="submit" className="apply-btn" disabled={promoApplied}>
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
            </form>

            <div className="summary-divider"></div>

            <div className="summary-row flex-between total-row">
              <span>Total Amount</span>
              <span className="total-price">₹{finalTotal.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-gold btn-lg w-100 checkout-cta-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div className="trust-badge-row flex-center">
              <ShieldCheck size={16} className="text-gold" />
              <span>Guaranteed Fresh & Secure Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

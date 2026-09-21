import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, ArrowRight, ShieldCheck } from 'lucide-react';
import { orderService } from '../services/orderService.js';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId && !orderId.startsWith('ORD-')) {
      orderService.getOrderById(orderId)
        .then((data) => setOrder(data))
        .catch(() => setOrder(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId]);

  return (
    <div className="order-success-page section-padding">
      <div className="container flex-center">
        <div className="success-card card-glass text-center">
          <div className="success-icon-badge">
            <CheckCircle size={64} className="check-icon" />
          </div>

          <span className="badge badge-gold">Order Confirmed</span>
          <h1 className="success-title">Thank You For Your Royal Order!</h1>
          <p className="success-subtitle">
            Your artisanal beverage order has been successfully placed and sent to our master blenders.
          </p>

          <div className="order-ref-box">
            <span className="ref-label">Order Reference ID</span>
            <span className="ref-id">{orderId}</span>
          </div>

          {/* Timeline Status Tracker */}
          <div className="status-tracker">
            <div className="step active">
              <CheckCircle size={20} />
              <span>Confirmed</span>
            </div>
            <div className="tracker-line active"></div>
            <div className="step active">
              <Package size={20} />
              <span>Preparing</span>
            </div>
            <div className="tracker-line"></div>
            <div className="step">
              <Truck size={20} />
              <span>Shipped</span>
            </div>
          </div>

          {order && (
            <div className="order-details-summary">
              <h4>Order Summary</h4>
              <div className="summary-list">
                {order.items?.map((item, i) => (
                  <div key={i} className="summary-row flex-between">
                    <span>{item.quantity}x {item.name} ({item.size})</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total flex-between">
                <span>Total Amount Paid</span>
                <span className="text-gold">₹{order.totalAmount}</span>
              </div>
            </div>
          )}

          <div className="action-row flex-center">
            <Link to="/" className="btn btn-outline">
              <Home size={16} /> Return to Home
            </Link>
            <Link to="/products" className="btn btn-gold">
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

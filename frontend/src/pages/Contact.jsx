import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container text-center">
          <span className="subtitle">At Your Service</span>
          <h1 className="title">Contact <span className="text-gold">Royal Concierge</span></h1>
          <p className="description">
            Whether you are inquiring about private events, wholesale distribution, or general orders, our team is at your disposal.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="contact-grid grid-2">
          {/* Left Concierge Form */}
          <div className="contact-form-card card-glass">
            <h3>Send a Direct Message</h3>
            {submitted ? (
              <div className="submitted-box badge-gold">
                <CheckCircle size={20} /> Thank you! Your message has been received by our Royal Concierge. We will reply within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Lord / Lady Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="yourname@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Inquiry Subject</label>
                  <input
                    type="text"
                    placeholder="Wholesale, Event, or Order Question"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea
                    rows="5"
                    placeholder="How may our beverage masters assist you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-gold btn-lg">
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Right Info */}
          <div className="contact-info-block">
            <div className="info-card card-glass">
              <MapPin size={24} className="info-icon" />
              <div>
                <h4>Global Flagship</h4>
                <p>100 Royal Esplanade, Kensington, London UK</p>
              </div>
            </div>

            <div className="info-card card-glass">
              <Phone size={24} className="info-icon" />
              <div>
                <h4>Concierge Line</h4>
                <p>+1 (800) ROYAL-DRINKS (Toll Free)</p>
              </div>
            </div>

            <div className="info-card card-glass">
              <Mail size={24} className="info-icon" />
              <div>
                <h4>Electronic Mail</h4>
                <p>concierge@royaldrinks.com</p>
              </div>
            </div>

            <div className="info-card card-glass">
              <MessageSquare size={24} className="info-icon" />
              <div>
                <h4>Wholesale & Partner Enquiries</h4>
                <p>trade@royaldrinks.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

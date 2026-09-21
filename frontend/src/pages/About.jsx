import React from 'react';
import { ShieldCheck, Award, Sparkles, GlassWater, Leaf, RefreshCw } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <div className="about-hero">
        <div className="container text-center">
          <span className="subtitle">The Royal Philosophy</span>
          <h1 className="title">Crafting Pure <span className="text-gold">Beverage Majesty</span></h1>
          <p className="description">
            We exist to revolutionize soft drinks by blending ancestral botanical craftsmanship with modern culinary excellence.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        {/* Origin Grid */}
        <div className="about-grid grid-2">
          <div className="about-text-block">
            <span className="badge badge-gold">Our Origins</span>
            <h2>Born From a Passion for Uncompromising Elegance</h2>
            <p>
              Royal Drinks was founded in London with a single audacious mission: to banish mass-produced, chemically laden sodas from dining tables and replace them with artisanal beverages crafted for refined tastes.
            </p>
            <p>
              We believe every bottle should tell a story. From cold-pressed Sicilian lemons harvested under Mediterranean sunshine to wild blackberries gathered from pristine Nordic valleys, every ingredient is selected for its rich aromatic depth.
            </p>
          </div>

          <div className="about-img-frame card-glass">
            <img
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800"
              alt="Botanical Craftsmanship"
            />
          </div>
        </div>

        {/* Pillars of Royal Quality */}
        <div className="pillars-section section-padding">
          <div className="section-header">
            <span className="subtitle">Our Promises</span>
            <h2 className="title">The Four <span className="text-gold">Royal Pillars</span></h2>
          </div>

          <div className="grid-4">
            <div className="pillar-card card-glass">
              <GlassWater className="pillar-icon" size={32} />
              <h3>Alpine Spring Water</h3>
              <p>Triple filtered through glacial rock for pristine clarity and velvet minerality.</p>
            </div>
            <div className="pillar-card card-glass">
              <Leaf className="pillar-icon" size={32} />
              <h3>100% Organic Juice</h3>
              <p>No high-fructose corn syrups. Only raw fruit extractions and organic cane sugar.</p>
            </div>
            <div className="pillar-card card-glass">
              <Sparkles className="pillar-icon" size={32} />
              <h3>Micro-Carbonation</h3>
              <p>Effervescence calibrated to release delicate aromatics without overwhelming your palate.</p>
            </div>
            <div className="pillar-card card-glass">
              <ShieldCheck className="pillar-icon" size={32} />
              <h3>Glass Bottled</h3>
              <p>Preserved in amber & emerald glass to protect subtle floral notes from degradation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

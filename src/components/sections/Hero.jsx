import { useState, useEffect } from 'react';
import { ShieldCheck, Award, Sparkles, MapPin } from 'lucide-react';
import '../../styles/Hero.css';

const MAIN_SLIDES = [
  '/images/bridal_gold_jewelry.png',
  '/images/bridal_diamond_jewelry.png'
];

const ACCENT_SLIDES = [
  '/images/traditional_himachali_chandrahaar.png',
  '/images/gold_bangle_luxury.png',
  '/images/diamond_solitaire_ring.png'
];

export default function Hero({ onExploreClick, onOpenVipModal }) {
  const [activeMain, setActiveMain] = useState(0);
  const [activeAccent, setActiveAccent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMain((prev) => (prev + 1) % MAIN_SLIDES.length);
      setActiveAccent((prev) => (prev + 1) % ACCENT_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      {/* Cinematic Dual-Pane Collage Slideshow */}
      <div className="hero-slideshow-container">
        {/* Left/Main Pane: Bride Portraits */}
        <div className="hero-main-pane">
          {MAIN_SLIDES.map((slide, idx) => (
            <div
              key={slide}
              className={`hero-pane-slide ${idx === activeMain ? 'active' : ''}`}
              style={{ backgroundImage: `url('${slide}')` }}
            />
          ))}
        </div>

        {/* Right/Accent Pane: Detail Close-ups */}
        <div className="hero-accent-pane">
          {ACCENT_SLIDES.map((slide, idx) => (
            <div
              key={slide}
              className={`hero-pane-slide ${idx === activeAccent ? 'active' : ''}`}
              style={{ backgroundImage: `url('${slide}')` }}
            />
          ))}
        </div>
      </div>
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="container hero-container-content">
        <div className="hero-badge-wrapper animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="hero-mini-badge">
            <Sparkles size={12} className="text-gold" />
            Shimla's Oldest Showroom on The Mall
          </span>
        </div>

        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
          The Pinnacle of <span className="italic-title-gold">Purity</span>,<br />
          The Legacy of <span className="italic-title">Trust</span>
        </h1>

        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Serving exquisite designs, BIS 916 Government hallmarked gold, and premium certified diamonds since 1980. Explore our famous Himachali traditional heritage collections and experience on-the-spot Karatmeter testing.
        </p>

        <div className="hero-ctas animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button className="button-premium hero-btn-explore" onClick={onExploreClick}>
            Explore Collections
          </button>
          <button className="button-premium-outline hero-btn-book" onClick={onOpenVipModal}>
            Book Private Consultation
          </button>
        </div>

        {/* Highlight Badges */}
        <div className="hero-highlights animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="highlight-item">
            <ShieldCheck size={20} className="highlight-icon" />
            <div className="highlight-text">
              <h5>100% Karatmeter Tested</h5>
              <p>Instant scientific purity report</p>
            </div>
          </div>
          <div className="highlight-item">
            <Award size={20} className="highlight-icon" />
            <div className="highlight-text">
              <h5>BIS Hallmark Certified</h5>
              <p>Government certified gold authenticity</p>
            </div>
          </div>
          <div className="highlight-item">
            <MapPin size={20} className="highlight-icon" />
            <div className="highlight-text">
              <h5>Showroom Est. 1980</h5>
              <p>Shimla's trusted heritage destination</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gravity Pendulum Scroll Cue */}
      <div className="hero-scroll-cue" />
    </section>
  );
}

import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Award, ShieldCheck, RefreshCw } from 'lucide-react';
import { whatsappLink, SITE } from '../../config/site';
import '../../styles/Footer.css';

export default function Footer({ onNavigate, onOpenVipModal, theme }) {
  return (
    <footer className="footer-wrapper">
      {/* Premium Trust Badges Banner */}
      <div className="trust-banner">
        <div className="container trust-container">
          <div className="trust-badge">
            <Award className="trust-icon" size={24} />
            <div className="trust-info">
              <h4>100% Hallmarked Gold</h4>
              <p>BIS Hallmark Government Certified Jewellery</p>
            </div>
          </div>
          <div className="trust-badge">
            <ShieldCheck className="trust-icon" size={24} />
            <div className="trust-info">
              <h4>Karatmeter Tested</h4>
              <p>On-the-spot scientific purity verification</p>
            </div>
          </div>
          <div className="trust-badge">
            <RefreshCw className="trust-icon" size={24} />
            <div className="trust-info">
              <h4>Easy Buyback & Exchange</h4>
              <p>Transparent evaluation policies since 1980</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {SITE.logoFooterDark || SITE.logoFooterLight ? (
                <img 
                  src={theme === 'light' ? SITE.logoFooterLight : SITE.logoFooterDark} 
                  alt={SITE.brand} 
                  className="footer-logo-img" 
                />
              ) : (
                <>
                  <span className="logo-satya text-gold-gradient">SATYA</span>
                  <span className="logo-subtitle">JEWELLERS SHIMLA</span>
                </>
              )}
            </Link>
            <p className="brand-desc">
              Shimla's premier jewelry destination on The Mall since 1980. Crafting exquisite memories with unmatched purity, traditional craftsmanship, and state-of-the-art Karatmeter testing.
            </p>
            <div className="heritage-badge">ESTABLISHED 1980</div>
          </div>

          {/* Collections links */}
          <div className="footer-col">
            <h3>Collections</h3>
            <ul className="footer-links">
              <li><a href="#gold" onClick={(e) => { e.preventDefault(); onNavigate('gold'); }}>Gold Jewellery</a></li>
              <li><a href="#diamond" onClick={(e) => { e.preventDefault(); onNavigate('diamond'); }}>Diamond Boutique</a></li>
              <li><a href="#himachali" onClick={(e) => { e.preventDefault(); onNavigate('himachali'); }}>Silver Collection</a></li>
              <li><a href="#popular" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Most Popular Ornaments</a></li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h3>Our Boutique</h3>
            <ul className="footer-links">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Our Legacy</a></li>
              <li><a href="#vip" onClick={(e) => { e.preventDefault(); onOpenVipModal(); }}>VIP Appointment</a></li>
              <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a></li>
            </ul>
          </div>

          {/* Contact details */}
          <div className="footer-col contact-col">
            <h3>Showroom Address</h3>
            <ul className="contact-details">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>Shop No. 62, Satya Complex,<br />The Mall Shimla, HP, 171001, India</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <div className="phone-lines">
                  <span>+91 98160 05000</span>
                  <span>0177-2805808</span>
                </div>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <span>satyajewellers@gmail.com</span>
              </li>
              <li>
                <Clock size={18} className="contact-icon" />
                <span>10:00 AM – 7:00 PM IST<br />(Monday – Saturday)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Sub-footer */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>© {new Date().getFullYear()} Satya Jewellers. All Rights Reserved. Purity Tested with Government Karatmeter standards.</p>
          <div className="bottom-links">
            <a href="#terms">Terms & Conditions</a>
            <span className="bullet">•</span>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

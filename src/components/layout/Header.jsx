import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Phone, MapPin, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { SITE } from '../../config/site';
import '../../styles/Header.css';

export default function Header({ wishlistCount, onOpenWishlist, onOpenVipModal, onNavigate, activeTab, theme, onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'gold', label: 'Gold Collection' },
    { id: 'diamond', label: 'Diamond Boutique' },
    { id: 'himachali', label: 'Silver Collection' },
    { id: 'about', label: 'Our Story' },
  ];

  return (
    <>
      {/* Top Banner Info */}
      <div className="top-banner">
        <div className="container banner-content">
          <div className="banner-left">
            <span className="banner-item">
              <MapPin size={13} className="text-gold" />
              The Mall, Shimla
            </span>
            <span className="banner-item">
              <Phone size={13} className="text-gold" />
              +91 98160 05000
            </span>
          </div>
          <div className="banner-right">
            <span className="banner-badge">100% Karatmeter Certified Purity</span>
            <span className="banner-divider">|</span>
            <span>Since 1980</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header 
        className={`main-header ${isScrolled ? 'header-scrolled' : ''}`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="container header-container">
          {/* Logo */}
          <Link to="/" className="logo-area" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {SITE.logoHeaderDark || SITE.logoHeaderLight ? (
              <img 
                src={theme === 'light' ? SITE.logoHeaderLight : SITE.logoHeaderDark} 
                alt={SITE.brand} 
                className="logo-img" 
              />
            ) : (
              <>
                <span className="logo-satya">SATYA</span>
                <div className="logo-subtitle">
                  <span>JEWELLERS</span>
                  <span className="logo-sparkle"><Sparkles size={8} /></span>
                  <span>SHIMLA</span>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeTab === item.id ? 'nav-active' : ''}`}
                onMouseEnter={() => {
                  if (['gold', 'diamond', 'himachali'].includes(item.id)) {
                    setActiveDropdown(item.id);
                  } else {
                    setActiveDropdown(null);
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                  setActiveDropdown(null);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="header-actions">
            {/* Theme Toggle Button */}
            <button 
              className="action-btn theme-toggle" 
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Wishlist Icon */}
            <button 
              className="action-btn wishlist-trigger" 
              onClick={onOpenWishlist}
              aria-label="View Wishlist"
            >
              <Heart size={20} className={wishlistCount > 0 ? 'heart-filled' : ''} />
              {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
            </button>

            {/* VIP Booking Button */}
            <button className="button-premium header-vip-btn" onClick={onOpenVipModal}>
              <Calendar size={15} style={{ marginRight: '8px' }} />
              VIP Booking
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mega Menu Overlay */}
        <div 
          className={`mega-menu-overlay ${activeDropdown ? 'active' : ''}`}
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="container mega-menu-grid">
            <div className="mega-menu-links">
              {activeDropdown === 'gold' && (
                <>
                  <div className="mega-menu-col">
                    <h5>Traditional Gold</h5>
                    <a href="#catalog" onClick={() => { onNavigate('gold', 'necklace'); setActiveDropdown(null); }}>Necklaces &amp; Mangalsutras</a>
                    <a href="#catalog" onClick={() => { onNavigate('gold', 'bangles'); setActiveDropdown(null); }}>Royal Bangles &amp; Kadas</a>
                  </div>
                  <div className="mega-menu-col">
                    <h5>Modern Gold</h5>
                    <a href="#catalog" onClick={() => { onNavigate('gold', 'chains'); setActiveDropdown(null); }}>Luxury Gold Chains</a>
                  </div>
                </>
              )}
              {activeDropdown === 'diamond' && (
                <>
                  <div className="mega-menu-col">
                    <h5>Bridal Diamonds</h5>
                    <a href="#catalog" onClick={() => { onNavigate('diamond', 'rings'); setActiveDropdown(null); }}>Solitaire Rings</a>
                    <a href="#catalog" onClick={() => { onNavigate('diamond', 'necklace'); setActiveDropdown(null); }}>VVS Diamond Necklaces</a>
                  </div>
                  <div className="mega-menu-col">
                    <h5>Everyday Luxury</h5>
                    <a href="#catalog" onClick={() => { onNavigate('diamond', 'earrings'); setActiveDropdown(null); }}>Hoop Earrings</a>
                  </div>
                </>
              )}
              {activeDropdown === 'himachali' && (
                <>
                  <div className="mega-menu-col">
                    <h5>Traditional Heritage</h5>
                    <a href="#catalog" onClick={() => { onNavigate('himachali', 'necklace'); setActiveDropdown(null); }}>Chandrahaar Necklaces</a>
                  </div>
                  <div className="mega-menu-col">
                    <h5>Heritage Classics</h5>
                    <a href="#catalog" onClick={() => { onNavigate('himachali', 'earrings'); setActiveDropdown(null); }}>Heritage Jhumkas</a>
                  </div>
                </>
              )}
            </div>
            <div className="mega-menu-card">
              <div className="menu-card-image-box">
                <img src="/images/hero_jewelry_banner.png" alt="Luxury jewelry collection" />
                <div className="menu-card-overlay" />
                <div className="menu-card-text">
                  <span className="card-badge">Satya Signature</span>
                  <h4>Handcrafted Masterpieces</h4>
                  <span className="card-link">View Catalogue</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
          <div className="drawer-content">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`drawer-link ${activeTab === item.id ? 'drawer-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <button 
              className="button-premium drawer-vip-btn" 
              onClick={() => {
                onOpenVipModal();
                setMobileMenuOpen(false);
              }}
            >
              <Calendar size={16} style={{ marginRight: '8px' }} />
              Book VIP Consultation
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

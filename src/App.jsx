import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import { productsData } from './data/products';
import VipConsultationModal from './components/modals/VipConsultationModal';
import FloatingBookButton from './components/layout/FloatingBookButton';
import Footer from './components/layout/Footer';
import { Heart, Trash2, MessageSquare, X } from 'lucide-react';
import { whatsappLink } from './config/site';
import './styles/App.css';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const glowRef = useRef(null);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('satya_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load wishlist", e);
      }
    }
    return [];
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('satya_theme') || 'dark';
  });

  // Fade out the first-paint preloader once the app has mounted
  useEffect(() => {
    document.body.classList.add('app-ready');
  }, []);

  // Sync theme with body class
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('satya_theme', theme);
  }, [theme]);

  // Handle cursor spotlight positioning (60fps animation)
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      glow.style.display = 'none';
      return;
    }

    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        if (glow) {
          glow.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Which header tab is highlighted, derived from the current URL
  const activeTab = pathname === '/'
    ? 'home'
    : pathname === '/about'
      ? 'about'
      : pathname.startsWith('/collection/')
        ? pathname.split('/')[2]
        : '';

  const handleToggleWishlist = (id) => {
    setWishlist(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id];
      localStorage.setItem('satya_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist(prev => {
      const updated = prev.filter(item => item !== id);
      localStorage.setItem('satya_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const handleOpenDetail = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleNavigate = (tabId, type = 'all') => {
    if (tabId === 'home') {
      if (pathname !== '/') navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'about') {
      // Dedicated About / Our Story page
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'gold' || tabId === 'diamond' || tabId === 'himachali') {
      // Dedicated, shareable category page
      const query = type !== 'all' ? `?type=${type}` : '';
      navigate(`/collection/${tabId}${query}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Get full products in wishlist
  const wishlistProducts = productsData.filter(p => wishlist.includes(p.id));

  // Wishlist WhatsApp Inquiry Link
  const getWishlistWhatsAppLink = () => {
    const itemsText = wishlistProducts.map((p, idx) => `${idx + 1}. ${p.title} (${p.purity}, Weight: ${p.weight})`).join('\n');
    const message = `Hi Satya Jewellers, I have selected the following items in my wishlist on your website and would like to inquire about current price estimates:\n\n${itemsText}\n\nCan I schedule an appointment to view these at your showroom on The Mall Shimla?`;
    return whatsappLink(message);
  };

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <Header 
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenVipModal={() => setVipModalOpen(true)}
        onNavigate={handleNavigate}
        activeTab={activeTab}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main>
        {/* Page content — keyed by route so it fades in on each navigation */}
        <div className="route-fade" key={pathname}>
          <Outlet
            context={{
              wishlist,
              onToggleWishlist: handleToggleWishlist,
              onViewDetails: handleOpenDetail,
              onOpenVipModal: () => setVipModalOpen(true)
            }}
          />
        </div>
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenVipModal={() => setVipModalOpen(true)}
        theme={theme}
      />

      {/* Floating WhatsApp contact button (site-wide) */}
      <FloatingBookButton />

      {/* VIP Booking Consultation Modal */}
      <VipConsultationModal 
        isOpen={vipModalOpen}
        onClose={() => setVipModalOpen(false)}
      />

      {/* Wishlist Sliding Drawer Panel */}
      {wishlistOpen && (
        <div className="wishlist-drawer-backdrop" onClick={() => setWishlistOpen(false)}>
          <div className="wishlist-drawer glass-panel animate-slide-in" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>My Wishlist ({wishlist.length})</h3>
              <button className="close-drawer-btn" onClick={() => setWishlistOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="drawer-body">
              {wishlistProducts.length > 0 ? (
                <>
                  <div className="wishlist-items-list">
                    {wishlistProducts.map(product => (
                      <div key={product.id} className="wishlist-drawer-item">
                        <img src={product.image} alt={product.title} className="wishlist-item-img" />
                        <div className="wishlist-item-details">
                          <h4>{product.title}</h4>
                          <span className="item-spec">{product.purity} • {product.weight}</span>
                        </div>
                        <button 
                          className="wishlist-remove-btn"
                          onClick={() => handleRemoveFromWishlist(product.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="drawer-footer">
                    <a 
                      href={getWishlistWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-premium wishlist-submit-btn"
                    >
                      <MessageSquare size={16} style={{ marginRight: '8px' }} />
                      Inquire Wishlist on WhatsApp
                    </a>
                  </div>
                </>
              ) : (
                <div className="wishlist-empty-state">
                  <Heart size={36} className="text-gold" style={{ marginBottom: '15px' }} />
                  <p>Your wishlist is empty.</p>
                  <button 
                    className="button-premium-outline"
                    onClick={() => {
                      setWishlistOpen(false);
                      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Browse Collections
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

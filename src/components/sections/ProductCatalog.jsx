import { useState } from 'react';
import { Eye, Heart, MessageSquare, Sparkles } from 'lucide-react';
import { productsData } from '../../data/products';
import Reveal from '../ui/Reveal';
import TiltCard from '../ui/TiltCard';
import { whatsappLink } from '../../config/site';
import '../../styles/ProductCatalog.css';

export default function ProductCatalog({
  wishlist,
  onToggleWishlist,
  onViewDetails,
  onOpenVipModal,
  selectedCategory = 'all',
  setSelectedCategory,
  lockedCategory = null,
  initialType = 'all'
}) {
  const [selectedType, setSelectedType] = useState(initialType);
  const [prevInitialType, setPrevInitialType] = useState(initialType);

  if (initialType !== prevInitialType) {
    setPrevInitialType(initialType);
    setSelectedType(initialType);
  }

  // On a dedicated category page the category is fixed and its tabs/header are hidden
  const activeCategory = lockedCategory || selectedCategory;

  const categories = [
    { id: 'all', label: 'All Ornaments' },
    { id: 'gold', label: 'Gold Jewellery' },
    { id: 'diamond', label: 'Diamond Boutique' },
    { id: 'himachali', label: 'Silver Collection' }
  ];

  const types = [
    { id: 'all', label: 'All Ornaments' },
    { id: 'necklace', label: 'Necklaces' },
    { id: 'bangles', label: 'Bangles & Bracelets' },
    { id: 'rings', label: 'Rings' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'chains', label: 'Chains' }
  ];

  const filteredProducts = productsData.filter(product => {
    const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
    const typeMatch = selectedType === 'all' || product.type === selectedType;
    return categoryMatch && typeMatch;
  });

  return (
    <section id="catalog-section" className={`catalog-wrapper ${lockedCategory ? 'catalog-page' : ''}`}>
      <div className="container">
        {/* Catalog Header + category tabs (homepage only) */}
        {!lockedCategory && (
          <>
            <Reveal className="catalog-header">
              <span className="section-mini-title">Boutique Catalog</span>
              <h2>Explore Our <span className="text-gold-gradient">Signature Collections</span></h2>
              <p className="catalog-intro">
                Browse our curated collections of masterfully crafted jewelry. Each piece is BIS hallmarked, karatmeter verified, and carries our 40-year legacy of trust in Shimla.
              </p>
            </Reveal>

            <div className="category-tabs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`cat-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedType('all'); // reset sub-filter
                  }}
                >
                  {cat.id !== 'all' && <Sparkles size={11} className="tab-sparkle" />}
                  {cat.label}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Sub-Filters: Ornaments Type */}
        <div className="type-subfilters">
          {types.map(t => (
            <button
              key={t.id}
              className={`type-filter-btn ${selectedType === t.id ? 'active' : ''}`}
              onClick={() => setSelectedType(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <Reveal>
        <div className="products-grid">
          {filteredProducts.map(product => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <TiltCard 
                key={product.id} 
                className="product-card glass-panel"
                maxRotation={6}
                scale={1.02}
              >
                {/* Product Image Box */}
                <div 
                  className="product-image-box"
                  onClick={() => onViewDetails(product)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={product.image} alt={product.title} className="product-img" />
                  <div className="product-overlay-actions">
                    <button
                      className="quick-action-icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(product);
                      }}
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="quick-action-icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        const message = `Hi Satya Jewellers, I am interested in "${product.title}" (${product.id}) listed on your website. Weight: ${product.weight}, Purity: ${product.purity}. Please share details and price.`;
                        window.open(whatsappLink(message), '_blank');
                      }}
                      title="Enquire on WhatsApp"
                    >
                      <MessageSquare size={18} />
                    </button>
                  </div>
                  
                  {/* Badge overlays */}
                  <span className="purity-badge">{product.purity.split(' (')[0]}</span>
                  
                  {/* Wishlist Button */}
                  <button 
                    className={`wishlist-card-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label="Add to Wishlist"
                  >
                    <Heart size={18} className={isWishlisted ? 'heart-filled' : ''} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="product-info-box">
                  <div className="product-meta">
                    <span className="meta-weight">{product.weight}</span>
                    <span className="meta-divider">|</span>
                    <span className="meta-cert">{product.cert.split(' ')[0]} Certified</span>
                  </div>
                  <h3 className="product-title" onClick={() => onViewDetails(product)}>{product.title}</h3>
                  <p className="product-desc-truncate">{product.desc}</p>

                  <button
                    className="inquire-catalog-btn"
                    onClick={() => {
                      const message = `Hi Satya Jewellers, I am interested in "${product.title}" (${product.id}) listed on your website. Weight: ${product.weight}, Purity: ${product.purity}. Please share the details and price.`;
                      window.open(whatsappLink(message), '_blank');
                    }}
                  >
                    <MessageSquare size={15} style={{ marginRight: '8px' }} />
                    Enquire on WhatsApp
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>
        </Reveal>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="catalog-empty">
            <h3>No Ornaments Found</h3>
            <p>We craft custom boutique designs. Please book a VIP consultation or visit our Shimla showroom to design custom rings, necklaces, or bangles according to your requirements.</p>
            <button className="button-premium" onClick={onOpenVipModal}>
              Custom Design Inquiry
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

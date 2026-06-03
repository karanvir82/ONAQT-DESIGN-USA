import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, useOutletContext, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageSquare, Sparkles, ChevronRight, Copy, Check, Share2 } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import ProductGallery from '../components/ui/ProductGallery';
import { productsData } from '../data/products';
import { whatsappLink, SITE } from '../config/site';
import { applyPageMeta, setPageJsonLd, productJsonLd } from '../utils/seo';
import '../styles/ProductDetailPage.css';

const CATEGORY_LABEL = {
  gold: 'Gold Jewellery',
  diamond: 'Diamond Boutique',
  himachali: 'Himachali Heritage'
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, onToggleWishlist, onOpenVipModal } = useOutletContext();

  const product = productsData.find((p) => p.id === id);

  // Jump to top whenever the product changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  // Per-product SEO: title, description, Open Graph image + Product/Breadcrumb structured data
  useEffect(() => {
    if (!product) return;
    applyPageMeta({
      title: `${product.title} | ${SITE.brand} Shimla`,
      description: product.desc,
      image: product.image,
      path: `/product/${product.id}`
    });
    setPageJsonLd(productJsonLd(product, CATEGORY_LABEL[product.category] || product.category));
    return () => setPageJsonLd(null);
  }, [product]);

  const [copied, setCopied] = useState(false);

  // Snapshot of previously-viewed pieces (read before we record the current one)
  const recentProducts = useMemo(() => {
    let ids;
    try { ids = JSON.parse(localStorage.getItem('satya_recent') || '[]'); } catch { ids = []; }
    return ids
      .filter((x) => x !== id)
      .map((rid) => productsData.find((p) => p.id === rid))
      .filter(Boolean)
      .slice(0, 4);
  }, [id]);

  // Record the current piece into "recently viewed"
  useEffect(() => {
    if (!product) return;
    let ids;
    try { ids = JSON.parse(localStorage.getItem('satya_recent') || '[]'); } catch { ids = []; }
    const updated = [product.id, ...ids.filter((x) => x !== product.id)].slice(0, 8);
    localStorage.setItem('satya_recent', JSON.stringify(updated));
  }, [product]);

  if (!product) {
    return (
      <div className="pd-notfound container">
        <h2>Product not found</h2>
        <p>This piece is no longer listed. Browse our collections instead.</p>
        <Link to="/" className="button-premium">Back to Home</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  // Related: same collection first, then fill with others (max 4)
  const sameCategory = productsData.filter((p) => p.id !== product.id && p.category === product.category);
  const otherCategory = productsData.filter((p) => p.id !== product.id && p.category !== product.category);
  const suggestions = [...sameCategory, ...otherCategory].slice(0, 4);

  const inquiryLink = whatsappLink(
    `Hi Satya Jewellers, I am interested in "${product.title}" (${product.id}) listed on your website. Weight: ${product.weight}, Purity: ${product.purity}. Please share the details and price.`
  );

  const gallery = product.images || [product.image];
  const shareUrl = `${SITE.url}/product/${product.id}`;
  const shareWa = whatsappLink(`Check out this piece from Satya Jewellers — ${product.title}: ${shareUrl}`);
  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="pd-page">
      <div className="container pd-container">
        {/* Back + Breadcrumb */}
        <button className="pd-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="pd-breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <Link to={`/collection/${product.category}`} className="pd-crumb-cat">
            {CATEGORY_LABEL[product.category] || product.category}
          </Link>
          <ChevronRight size={13} />
          <span className="pd-crumb-active">{product.title}</span>
        </div>

        {/* Main Detail Layout */}
        <Reveal className="pd-main-grid">
          <div className="pd-image-col">
            <ProductGallery images={gallery} alt={product.title} badge={product.purity.split(' (')[0]} />
          </div>

          <div className="pd-info-col">
            <span className="pd-category">
              <Sparkles size={12} className="text-gold" />
              {product.category.toUpperCase()} COLLECTION
            </span>
            <h1 className="pd-title">{product.title}</h1>
            <p className="pd-desc">{product.desc}</p>

            <div className="pd-specs">
              <div className="pd-spec-row"><span>Ornament Weight</span><strong>{product.weight}</strong></div>
              <div className="pd-spec-row"><span>Gold / Metal Purity</span><strong>{product.purity}</strong></div>
              <div className="pd-spec-row"><span>Certification</span><strong>{product.cert}</strong></div>
              <div className="pd-spec-row"><span>Ornament Type</span><strong style={{ textTransform: 'capitalize' }}>{product.type}</strong></div>
            </div>

            {/* Accreditation Badges with Tooltips */}
            <div className="pd-accreditation-badges">
              <div className="accreditation-badge-card">
                <div className="badge-icon-wrap">
                  <svg className="badge-svg" viewBox="0 0 100 100" fill="none">
                    <polygon points="50,15 85,75 15,75" stroke="var(--gold-primary)" strokeWidth="2.5" fill="none" />
                    <circle cx="50" cy="53" r="14" stroke="var(--gold-primary)" strokeWidth="1.5" />
                    <text x="50" y="57" fill="var(--gold-primary)" fontSize="10" fontWeight="bold" textAnchor="middle">916</text>
                  </svg>
                </div>
                <div className="badge-tooltip">
                  <h6>Govt. BIS Hallmark</h6>
                  <p>Guarantees absolute gold purity (22 Karat / 91.6% fine gold) hallmarked by Govt. of India.</p>
                </div>
              </div>

              <div className="accreditation-badge-card">
                <div className="badge-icon-wrap">
                  <svg className="badge-svg" viewBox="0 0 100 100" fill="none">
                    <rect x="20" y="20" width="60" height="60" rx="4" stroke="var(--gold-primary)" strokeWidth="2.5" fill="none" />
                    <line x1="20" y1="35" x2="80" y2="35" stroke="var(--gold-primary)" strokeWidth="1.5" />
                    <line x1="20" y1="65" x2="80" y2="65" stroke="var(--gold-primary)" strokeWidth="1.5" />
                    <text x="50" y="52" fill="var(--gold-primary)" fontSize="12" fontWeight="bold" textAnchor="middle">IGI</text>
                    <text x="50" y="60" fill="var(--gold-primary)" fontSize="6" textAnchor="middle" letterSpacing="1">CERTIFIED</text>
                  </svg>
                </div>
                <div className="badge-tooltip">
                  <h6>IGI Diamond Grading</h6>
                  <p>International Gemological Institute certification guaranteeing cut, color, clarity, and carat weight.</p>
                </div>
              </div>
              
              <div className="accreditation-badge-card">
                <div className="badge-icon-wrap">
                  <svg className="badge-svg" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="35" stroke="var(--gold-primary)" strokeWidth="2.5" fill="none" />
                    <path d="M 35,50 L 45,60 L 68,38" stroke="var(--gold-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="badge-tooltip">
                  <h6>Karatmeter Verified</h6>
                  <p>Tested under precise scientific X-ray fluorescence spectrometry inside our showroom.</p>
                </div>
              </div>
            </div>

            <div className="pd-actions">
              <a href={inquiryLink} target="_blank" rel="noopener noreferrer" className="button-premium pd-inquire-btn">
                <MessageSquare size={17} style={{ marginRight: '8px' }} />
                Enquire on WhatsApp
              </a>
              <button
                className={`button-premium-outline pd-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product.id)}
              >
                <Heart size={16} style={{ marginRight: '8px' }} className={isWishlisted ? 'heart-filled' : ''} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>

            <p className="pd-note">
              Prices are shared on inquiry and confirmed in-store with live Karatmeter purity
              testing at our showroom on The Mall, Shimla. Visit us or message on WhatsApp for
              the current valuation.
            </p>

            <button className="pd-vip-link" onClick={onOpenVipModal}>
              Or book a private VIP showroom consultation →
            </button>

            <div className="pd-share">
              <span className="pd-share-label"><Share2 size={14} /> Share</span>
              <a href={shareWa} target="_blank" rel="noopener noreferrer" className="pd-share-btn">
                <MessageSquare size={14} /> WhatsApp
              </a>
              <button className="pd-share-btn" onClick={copyLink}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Suggested / Related Products */}
        {suggestions.length > 0 && (
          <Reveal className="pd-suggest">
            <div className="pd-suggest-head">
              <span className="section-mini-title">You May Also Like</span>
              <h2>Related <span className="text-gold-gradient">Ornaments</span></h2>
            </div>

            <div className="pd-suggest-grid">
              {suggestions.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`} className="pd-suggest-card glass-panel">
                  <div className="pd-suggest-img">
                    <img src={item.image} alt={item.title} />
                    <span className="pd-suggest-badge">{item.purity.split(' (')[0]}</span>
                  </div>
                  <div className="pd-suggest-info">
                    <div className="pd-suggest-meta">
                      <span>{item.weight}</span>
                      <span className="pd-meta-dot">•</span>
                      <span>{item.cert.split(' ')[0]} Certified</span>
                    </div>
                    <h4>{item.title}</h4>
                    <span className="pd-suggest-cta">View Details <ChevronRight size={13} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        )}

        {/* Recently Viewed */}
        {recentProducts.length > 0 && (
          <Reveal className="pd-suggest pd-recent">
            <div className="pd-suggest-head">
              <span className="section-mini-title">Continue Browsing</span>
              <h2>Recently <span className="text-gold-gradient">Viewed</span></h2>
            </div>
            <div className="pd-suggest-grid">
              {recentProducts.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`} className="pd-suggest-card glass-panel">
                  <div className="pd-suggest-img">
                    <img src={item.image} alt={item.title} />
                    <span className="pd-suggest-badge">{item.purity.split(' (')[0]}</span>
                  </div>
                  <div className="pd-suggest-info">
                    <div className="pd-suggest-meta">
                      <span>{item.weight}</span>
                      <span className="pd-meta-dot">•</span>
                      <span>{item.cert.split(' ')[0]} Certified</span>
                    </div>
                    <h4>{item.title}</h4>
                    <span className="pd-suggest-cta">View Details <ChevronRight size={13} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import ShopByCollection from '../components/sections/ShopByCollection';
import SignaturePieces from '../components/sections/SignaturePieces';
import ProductCatalog from '../components/sections/ProductCatalog';
import FeatureBanner from '../components/ui/FeatureBanner';
import WhySatya from '../components/sections/WhySatya';
import Testimonials from '../components/sections/Testimonials';
import Lookbook from '../components/ui/Lookbook';
import WhatsappCatalogCta from '../components/sections/WhatsappCatalogCta';
import { applyPageMeta } from '../utils/seo';
import '../styles/HomePage.css';

const DEFAULT_TITLE =
  'Satya Jewellers | Fine Gold, Diamond & Traditional Himachali Jewellery';

export default function HomePage() {
  const { wishlist, onToggleWishlist, onViewDetails, onOpenVipModal } = useOutletContext();
  const [catalogCategory, setCatalogCategory] = useState('all');

  useEffect(() => {
    applyPageMeta({
      title: DEFAULT_TITLE,
      description:
        "Shimla's oldest jewellery showroom on The Mall, since 1980. 100% Karatmeter-tested gold, certified diamonds and traditional Himachali heritage jewellery.",
      image: '/images/hero_jewelry_banner.png',
      path: '/'
    });
  }, []);

  const scrollToCatalog = () =>
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Hero
        onExploreClick={() => {
          setCatalogCategory('all');
          scrollToCatalog();
        }}
        onOpenVipModal={onOpenVipModal}
      />

      {/* Editorial collection tiles → category pages */}
      <ShopByCollection />

      {/* Curated hero pieces */}
      <SignaturePieces />

      {/* Full filterable catalog */}
      <ProductCatalog
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onViewDetails={onViewDetails}
        onOpenVipModal={onOpenVipModal}
        selectedCategory={catalogCategory}
        setSelectedCategory={setCatalogCategory}
      />

      {/* Bridal feature banner */}
      <FeatureBanner onOpenVipModal={onOpenVipModal} />

      {/* Trust pillars */}
      <WhySatya />

      {/* Social proof */}
      <Testimonials />

      {/* Heritage teaser → links to full About / Our Story page */}
      <section className="home-heritage-teaser">
        <div className="hht-bg" />
        <div className="hht-overlay" />
        <div className="container hht-content">
          <span className="section-mini-title">Our Heritage</span>
          <h2>Four Decades on <span className="text-gold-gradient">The Mall, Shimla</span></h2>
          <p>
            From a small silver counter in 1980 to Shimla’s most trusted jewellery house — discover
            the story of the Verma family and our promise of 100% purity.
          </p>
          <Link to="/about" className="button-premium">Read Our Story</Link>
        </div>
      </section>

      {/* Lookbook / Instagram gallery */}
      <Lookbook />

      {/* WhatsApp catalogue lead capture */}
      <WhatsappCatalogCta />
    </>
  );
}

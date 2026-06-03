import { useEffect } from 'react';
import { useParams, useOutletContext, Link, useSearchParams } from 'react-router-dom';
import { Sparkles, ShieldCheck } from 'lucide-react';
import ProductCatalog from '../components/sections/ProductCatalog';
import Reveal from '../components/ui/Reveal';
import { productsData } from '../data/products';
import { applyPageMeta, setPageJsonLd, breadcrumbJsonLd } from '../utils/seo';
import '../styles/CategoryPage.css';

// Per-category content: drives the banner, the page <title>, and meta description (SEO).
const CATEGORIES = {
  gold: {
    kicker: 'Gold Collection',
    label: 'Gold Jewellery',
    tagline:
      'Hallmarked 22K & 18K gold ornaments — necklaces, bangles, chains and mangalsutras, each Karatmeter-tested for guaranteed purity at our showroom on The Mall, Shimla.',
    title: 'Gold Jewellery Collection | Satya Jewellers Shimla',
    desc: 'Explore BIS hallmarked 22K & 18K gold necklaces, bangles, chains and mangalsutras at Satya Jewellers, The Mall, Shimla. 100% Karatmeter-tested purity since 1980.',
    image: '/images/collection_gold_cover.png'
  },
  diamond: {
    kicker: 'Diamond Boutique',
    label: 'Diamond Boutique',
    tagline:
      'IGI-certified diamond rings, necklaces and earrings set in fine white gold and platinum. World-class luxury, crafted and verified in Shimla.',
    title: 'Diamond Jewellery Boutique | Satya Jewellers Shimla',
    desc: 'Discover IGI-certified diamond rings, solitaires, necklaces and earrings at Satya Jewellers, The Mall, Shimla. Premium VVS diamonds in platinum & white gold.',
    image: '/images/collection_diamond_cover.png'
  },
  himachali: {
    kicker: 'Silver Collection',
    label: 'Traditional Silver Collection',
    tagline:
      'Handcrafted traditional silver and alloy ornaments — Chandrahaar, Jhumka and heritage pieces made by master artisans, preserving the alpine craft legacy of Himachal Pradesh.',
    title: 'Traditional Silver Jewellery | Satya Jewellers Shimla',
    desc: 'Shop authentic handcrafted silver heritage jewellery — Chandrahaar, Jhumka and traditional ornaments — at Satya Jewellers, The Mall, Shimla.',
    image: '/images/collection_silver_cover.png'
  }
};

export default function CategoryPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'all';
  const ctx = useOutletContext();
  const meta = CATEGORIES[category];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [category]);

  useEffect(() => {
    if (!meta) return;
    applyPageMeta({
      title: meta.title,
      description: meta.desc,
      image: meta.image,
      path: `/collection/${category}`
    });
    setPageJsonLd(
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: meta.label, path: `/collection/${category}` }
      ])
    );
    return () => {
      setPageJsonLd(null);
    };
  }, [meta, category]);

  if (!meta) {
    return (
      <div className="cat-notfound container">
        <h2>Collection not found</h2>
        <p>The collection you’re looking for doesn’t exist.</p>
        <Link to="/" className="button-premium">Back to Home</Link>
      </div>
    );
  }

  const count = productsData.filter((p) => p.category === category).length;

  return (
    <>
      {/* Category banner */}
      <section className="cat-hero">
        <Reveal className="container">
          <nav className="cat-crumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="cat-crumb-active">{meta.label}</span>
          </nav>
          <span className="section-mini-title">
            <Sparkles size={12} className="text-gold" /> {meta.kicker}
          </span>
          <h1>{meta.label}</h1>
          <p className="cat-tagline">{meta.tagline}</p>
          <div className="cat-hero-meta">
            <span className="cat-count">{count} {count === 1 ? 'piece' : 'pieces'} available</span>
            <span className="cat-trust"><ShieldCheck size={14} className="text-gold" /> Karatmeter Tested · BIS / IGI Certified</span>
          </div>
        </Reveal>
      </section>

      {/* Locked product grid for this category (type sub-filters stay) */}
      <ProductCatalog
        wishlist={ctx.wishlist}
        onToggleWishlist={ctx.onToggleWishlist}
        onViewDetails={ctx.onViewDetails}
        onOpenVipModal={ctx.onOpenVipModal}
        lockedCategory={category}
        initialType={type}
      />
    </>
  );
}

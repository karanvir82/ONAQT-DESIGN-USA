import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import '../../styles/ShopByCollection.css';

const COLLECTIONS = [
  {
    id: 'gold',
    label: 'Gold Jewellery',
    sub: 'Hallmarked 22K & 18K',
    image: '/images/collection_gold_cover.png'
  },
  {
    id: 'diamond',
    label: 'Diamond Boutique',
    sub: 'IGI Certified Brilliance',
    image: '/images/collection_diamond_cover.png'
  },
  {
    id: 'himachali',
    label: 'Silver Collection',
    sub: 'Handcrafted Heritage',
    image: '/images/collection_silver_cover.png'
  }
];

export default function ShopByCollection() {
  return (
    <section className="sbc-wrapper">
      <div className="container">
        <Reveal className="sbc-head">
          <span className="section-mini-title">Curated For You</span>
          <h2>Shop By <span className="text-gold-gradient">Collection</span></h2>
          <p>Three signature worlds of craftsmanship — explore the one made for your moment.</p>
        </Reveal>

        <div className="sbc-grid">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.id} delay={i * 120}>
              <Link to={`/collection/${c.id}`} className={`sbc-card sbc-card-${i}`}>
                <div className="sbc-img" style={{ backgroundImage: `url(${c.image})` }} />
                <div className="sbc-overlay" />
                <div className="sbc-content">
                  <span className="sbc-sub">{c.sub}</span>
                  <h3>{c.label}</h3>
                  <span className="sbc-cta">Explore Collection <ArrowRight size={16} /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

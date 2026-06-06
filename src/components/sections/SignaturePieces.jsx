import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import TiltCard from '../ui/TiltCard';
import { productsData } from '../../data/products';
import '../../styles/SignaturePieces.css';

// Hand-picked hero pieces for the homepage spotlight
const FEATURED_IDS = ['p4', 'p1', 'p3', 'p2'];

export default function SignaturePieces() {
  const featured = FEATURED_IDS
    .map((id) => productsData.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="sig-wrapper">
      <div className="container">
        <Reveal className="sig-head">
          <span className="section-mini-title">Boutique Highlights</span>
          <h2>Our <span className="text-gold-gradient">Signature Pieces</span></h2>
          <p>A handpicked selection of our most cherished ornaments, each a testament to our craftsmanship.</p>
        </Reveal>

        <div className="sig-grid">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <TiltCard maxRotation={8} scale={1.03}>
                <Link 
                  to={`/product/${p.id}`} 
                  className="sig-card glass-panel"
                >
                  <div className="sig-img">
                    <img src={p.image} alt={p.title} />
                    <span className="sig-badge">{p.purity.split(' (')[0]}</span>
                  </div>
                  <div className="sig-info">
                    <span className="sig-cat">{p.category}</span>
                    <h4>{p.title}</h4>
                    <span className="sig-cta">View Details <ChevronRight size={13} /></span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

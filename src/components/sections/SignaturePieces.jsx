import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { productsData } from '../../data/products';
import '../../styles/SignaturePieces.css';

// Hand-picked hero pieces for the homepage spotlight
const FEATURED_IDS = ['p4', 'p1', 'p3', 'p2'];

export default function SignaturePieces() {
  const featured = FEATURED_IDS
    .map((id) => productsData.find((p) => p.id === id))
    .filter(Boolean);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = -(y - centerY) / (rect.height / 12);
    const rotateY = (x - centerX) / (rect.width / 12);
    
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.setProperty('--shine-x', `${shineX}%`);
    card.style.setProperty('--shine-y', `${shineY}%`);
    card.style.setProperty('--shine-opacity', '0.12');
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    card.style.setProperty('--shine-opacity', '0');
  };

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
              <Link 
                to={`/product/${p.id}`} 
                className="sig-card glass-panel luxury-tilt-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-shine-glare" />
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

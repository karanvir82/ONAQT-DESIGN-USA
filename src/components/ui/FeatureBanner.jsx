import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import '../../styles/FeatureBanner.css';

export default function FeatureBanner({ onOpenVipModal }) {
  return (
    <section className="fb-wrapper">
      <div className="fb-bg" />
      <div className="fb-overlay" />
      <div className="container fb-content">
        <Reveal>
          <span className="section-mini-title">The Bridal Edit</span>
          <h2>Crafted for the<br /><span className="text-gold-gradient">Day You’ll Never Forget</span></h2>
          <p>
            From statement diamond necklaces to traditional bridal sets, let our designers create the
            heirloom that begins your new journey. Enjoy a private, unhurried viewing at our showroom on
            The Mall, Shimla.
          </p>
          <div className="fb-actions">
            <button className="button-premium" onClick={onOpenVipModal}>
              <Calendar size={16} style={{ marginRight: '8px' }} />
              Book a Bridal Consultation
            </button>
            <Link to="/collection/diamond" className="button-premium-outline">
              Explore Diamonds <ArrowRight size={15} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

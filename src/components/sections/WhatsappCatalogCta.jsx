import { MessageSquare } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { whatsappLink } from '../../config/site';
import '../../styles/WhatsappCatalogCta.css';

const WA_LINK = whatsappLink(
  'Hi Satya Jewellers, I would like to receive your latest jewellery catalogue and current offers on WhatsApp.'
);

export default function WhatsappCatalogCta() {
  return (
    <section className="wcc-wrapper">
      <div className="container">
        <Reveal>
          <div className="wcc-card glass-panel">
            <div className="wcc-text">
              <span className="section-mini-title">Stay In Touch</span>
              <h2>Get Our Latest Catalogue on <span className="text-gold-gradient">WhatsApp</span></h2>
              <p>New arrivals, festive collections and exclusive offers — sent straight to your chat. No spam, only sparkle.</p>
            </div>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="button-premium wcc-btn">
              <MessageSquare size={17} style={{ marginRight: '8px' }} />
              Request Catalogue
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

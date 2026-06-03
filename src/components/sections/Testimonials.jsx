import { Quote, Star } from 'lucide-react';
import Reveal from '../ui/Reveal';
import '../../styles/Testimonials.css';

// NOTE: Placeholder reviews — replace with your real Google reviews.
const REVIEWS = [
  { 
    quote: 'Bought my daughter’s wedding set here. The Karatmeter testing in front of us gave total peace of mind. Trustworthy and warm people.', 
    name: 'Anjali Sharma', 
    place: 'Shimla',
    signature: 'Anjali Sharma'
  },
  { 
    quote: 'The oldest name on The Mall for a reason. Beautiful Himachali designs you simply don’t find anywhere else, and honest pricing.', 
    name: 'Rohit Thakur', 
    place: 'Solan',
    signature: 'R. Thakur'
  },
  { 
    quote: 'Three generations of my family have bought gold from Satya Jewellers. That says everything about their trust and quality.', 
    name: 'Meena Kapoor', 
    place: 'Shimla',
    signature: 'Meena Kapoor'
  }
];

export default function Testimonials() {
  return (
    <section className="tst-wrapper">
      <div className="container">
        <Reveal className="tst-head">
          <span className="section-mini-title">Words From Our Family</span>
          <h2>Loved by <span className="text-gold-gradient">Generations of Shimla</span></h2>
        </Reveal>

        <div className="tst-grid">
          {REVIEWS.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <div className="tst-card glass-panel">
                <div className="tst-top">
                  <Quote size={20} className="tst-quote" />
                  <div className="tst-stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={13} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="tst-text">{t.quote}</p>
                <div className="tst-author-wrapper">
                  <div className="tst-author">
                    <div className="tst-avatar">{t.name.charAt(0)}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.place}</span>
                    </div>
                  </div>
                  <div className="tst-signature">{t.signature}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

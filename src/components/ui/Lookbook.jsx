import { Camera } from 'lucide-react';
import Reveal from './Reveal';
import '../../styles/Lookbook.css';

// Reuses available imagery as a styled gallery. Swap with real lifestyle shots later.
const SHOTS = [
  { src: '/images/lookbook_shot_1.png', span: 'tall' },
  { src: '/images/lookbook_shot_2.png', span: '' },
  { src: '/images/lookbook_shot_3.png', span: '' },
  { src: '/images/lookbook_shot_4.png', span: 'wide' },
  { src: '/images/lookbook_shot_5.png', span: '' }
];

export default function Lookbook() {
  return (
    <section className="lb-wrapper">
      <div className="container">
        <Reveal className="lb-head">
          <span className="section-mini-title">The Lookbook</span>
          <h2>From Our <span className="text-gold-gradient">Boutique</span></h2>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="lb-insta">
            <Camera size={16} /> Follow @satyajewellers
          </a>
        </Reveal>

        <Reveal>
          <div className="lb-grid">
            {SHOTS.map((s, i) => (
              <a
                key={i}
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`lb-cell ${s.span}`}
              >
                <img src={s.src} alt="Satya Jewellers boutique piece" />
                <div className="lb-cell-overlay"><Camera size={22} /></div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

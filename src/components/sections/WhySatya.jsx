import { ShieldCheck, Award, Coins, RefreshCw } from 'lucide-react';
import Reveal from '../ui/Reveal';
import '../../styles/WhySatya.css';

const PILLARS = [
  { icon: ShieldCheck, title: '100% Karatmeter Tested', text: 'Scientific X-ray purity testing done transparently in front of you, every time.' },
  { icon: Award, title: 'BIS & IGI Certified', text: 'Government-hallmarked gold and internationally certified diamonds you can trust.' },
  { icon: Coins, title: 'Minimum Making Charges', text: 'Honest, transparent pricing — among the fairest making charges in the state.' },
  { icon: RefreshCw, title: 'Easy Buyback & Exchange', text: 'Transparent lifetime evaluation and exchange policies, trusted since 1980.' }
];

export default function WhySatya() {
  return (
    <section className="why-wrapper">
      <div className="container">
        <Reveal className="why-head">
          <span className="section-mini-title">The Satya Promise</span>
          <h2>Four Decades of <span className="text-gold-gradient">Trust You Can Verify</span></h2>
        </Reveal>

        <div className="why-grid">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="why-card glass-panel">
                <div className="laurel-seal-container">
                  <svg className="laurel-wreath-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Left wreath branch */}
                    <path d="M 35,80 C 23,72 17,57 18,42 C 19,32 23,23 30,17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 22,68 Q 14,64 20,57 Q 26,62 22,68 Z" fill="currentColor" />
                    <path d="M 17,52 Q 9,47 16,41 Q 23,46 17,52 Z" fill="currentColor" />
                    <path d="M 18,37 Q 11,31 19,26 Q 27,31 18,37 Z" fill="currentColor" />
                    <path d="M 23,24 Q 18,17 26,14 Q 31,21 23,24 Z" fill="currentColor" />
                    <path d="M 30,17 Q 27,10 35,9 Q 39,16 30,17 Z" fill="currentColor" />

                    {/* Right wreath branch */}
                    <path d="M 65,80 C 77,72 83,57 82,42 C 81,32 77,23 70,17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 78,68 Q 86,64 80,57 Q 74,62 78,68 Z" fill="currentColor" />
                    <path d="M 83,52 Q 91,47 84,41 Q 77,46 83,52 Z" fill="currentColor" />
                    <path d="M 82,37 Q 89,31 81,26 Q 73,31 82,37 Z" fill="currentColor" />
                    <path d="M 77,24 Q 82,17 74,14 Q 69,21 77,24 Z" fill="currentColor" />
                    <path d="M 70,17 Q 73,10 65,9 Q 61,16 70,17 Z" fill="currentColor" />

                    {/* Outer dotted hallmark ring */}
                    <circle cx="50" cy="48" r="32" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3,3" fill="none" opacity="0.5" />
                  </svg>
                  <div className="why-inner-circle">
                    <p.icon size={26} strokeWidth={1.5} />
                  </div>
                </div>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

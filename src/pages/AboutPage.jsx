import { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  Sparkles, ShieldCheck, Award, Gem, RefreshCw, BadgeCheck, Coins,
  Lightbulb, PenTool, Layers, Flame, MapPin, Phone, Clock,
  Calendar, MessageSquare, ChevronRight
} from 'lucide-react';
import HeritageTimeline from '../components/sections/HeritageTimeline';
import Reveal from '../components/ui/Reveal';
import CountUp from '../components/ui/CountUp';
import { whatsappLink } from '../config/site';
import { applyPageMeta } from '../utils/seo';
import '../styles/AboutPage.css';

const WA = whatsappLink();

const PROMISES = [
  { icon: ShieldCheck, title: '100% Purity Guarantee', text: 'Every ornament is sold exactly at its certified purity — no compromise, in writing.' },
  { icon: BadgeCheck, title: 'Karatmeter Tested', text: 'On-the-spot electronic X-ray purity testing, done transparently in front of you.' },
  { icon: Award, title: 'BIS Hallmarked Gold', text: 'Government-certified 22K & 18K gold, authenticity you can verify.' },
  { icon: Gem, title: 'IGI Certified Diamonds', text: 'Premium VVS diamonds graded and certified by international labs.' },
  { icon: Coins, title: 'Minimum Making Charges', text: 'Fair, transparent pricing with some of the lowest making charges in the state.' },
  { icon: RefreshCw, title: 'Easy Buyback & Exchange', text: 'Transparent evaluation and exchange policies, trusted since 1980.' }
];

const PROCESS = [
  { icon: Lightbulb, step: '01', title: 'Concept', text: 'We listen to your vision, occasion and budget to shape the right idea.' },
  { icon: PenTool, step: '02', title: 'Drawing & Design', text: 'Our designers sketch and render the piece for your approval before crafting.' },
  { icon: Layers, step: '03', title: 'Master Moulding', text: 'A master model is hand-crafted, defining every fine detail of the ornament.' },
  { icon: Flame, step: '04', title: 'Casting & Setting', text: 'Pure gold is cast and the stones are precision-set by master artisans.' },
  { icon: Sparkles, step: '05', title: 'Finishing & Hallmarking', text: 'Polished, Karatmeter-verified and BIS hallmarked before it reaches you.' }
];

const FAMILY = [
  { initials: 'SV', name: 'Shri Shelender Verma', role: 'Founder', note: 'Opened the doors in 1980 with a single promise — uncompromised purity.' },
  { initials: 'RV', name: 'Smt. Rajni Verma', role: 'Co-Founder', note: 'The steady hand behind the showroom and its family of loyal customers.' },
  { initials: 'SV', name: 'Mr. Sachin Verma', role: 'Director & Certified Gemologist', note: 'Joined in 2001 with formal training in gemology and diamond grading.' }
];

const BRANDS = ['Nakshatra', "D'damas", 'Asmi', 'Sangini', 'Eternity', 'Dazzle', 'Intergold', 'Platinum'];

const HOTSPOTS = [
  {
    id: 1,
    title: 'Heritage Filigree Work',
    top: '28%', left: '42%',
    desc: 'Delicate gold threads are twisted, shaped, and soldered by hand, reproducing heirloom Himachali motifs.'
  },
  {
    id: 2,
    title: 'Micro-Prong Stone Setting',
    top: '48%', left: '62%',
    desc: 'Each diamond is aligned under microscope magnification for optimal light refraction and lifetime security.'
  },
  {
    id: 3,
    title: 'BIS Laser Hallmark Stamp',
    top: '72%', left: '35%',
    desc: 'The official government hallmark registration and our 1980 heritage mark is laser-etched onto the inner core.'
  }
];

export default function AboutPage() {
  const { onOpenVipModal } = useOutletContext();
  const years = new Date().getFullYear() - 1980;
  const [activeHotspot, setActiveHotspot] = useState(0);

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
    card.style.setProperty('--shine-opacity', '0.15');
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    card.style.setProperty('--shine-opacity', '0');
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    applyPageMeta({
      title: 'About Satya Jewellers | Oldest Jewellery Showroom on The Mall, Shimla',
      description:
        'The story of Satya Jewellers — founded in 1980 by Shri Shelender Verma on The Mall, Shimla. A family-run, 100% purity-guaranteed jewellery house spanning generations.',
      image: '/images/hero_jewelry_banner.png',
      path: '/about'
    });
  }, []);

  return (
    <div className="about-page">
      {/* 1. Banner */}
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-hero-overlay" />
        <div className="container about-hero-content">
          <div className="hero-crest-container">
            <svg className="hero-crest-svg" width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--gold-light)" />
                  <stop offset="50%" stopColor="var(--gold-primary)" />
                  <stop offset="100%" stopColor="var(--gold-dark)" />
                </linearGradient>
              </defs>
              <path d="M50 15 L80 32 V58 C80 73 50 85 50 85 C50 85 20 73 20 58 V32 Z" stroke="url(#crestGold)" strokeWidth="1.2" fill="none" strokeDasharray="3 2" />
              <path d="M50 18 L76 34 V56 C76 69 50 80 50 80 C50 80 24 69 24 56 V34 Z" stroke="url(#crestGold)" strokeWidth="0.6" fill="none" />
              <path d="M50 24 L52 28 L57 29 L53 32 L54 37 L50 34 L46 37 L47 32 L43 29 L48 28 Z" fill="url(#crestGold)" />
              <path d="M34 45 Q32 55 38 63" stroke="url(#crestGold)" strokeWidth="0.8" fill="none" />
              <path d="M66 45 Q68 55 62 63" stroke="url(#crestGold)" strokeWidth="0.8" fill="none" />
              <text x="50" y="58" fontFamily="var(--font-heading)" fontSize="18" fontWeight="300" fill="url(#crestGold)" textAnchor="middle" letterSpacing="0">SV</text>
            </svg>
          </div>
          <nav className="about-crumb">
            <Link to="/">Home</Link>
            <ChevronRight size={13} />
            <span>Our Story</span>
          </nav>
          <span className="hero-mini-badge">
            <Sparkles size={12} className="text-gold" /> The Oldest Showroom on The Mall, Shimla
          </span>
          <h1>A Legacy of <span className="italic-title-gold">Purity &amp; Trust</span>,<br /><span className="italic-title">Since 1980</span></h1>
          <p>“We add value to gold.” For over four decades, Satya Jewellers has been Shimla’s most trusted name in fine gold, diamond and traditional Himachali jewellery.</p>
        </div>
        <div className="about-scroll-cue" />
      </section>

      {/* 2. Founder's Story */}
      <section className="about-story">
        <div className="container about-story-grid">
          <Reveal className="about-story-media-collage">
            <div className="main-image-wrapper">
              <img src="/images/about_heritage_story.png" alt="A vintage handcrafted heritage necklace by Satya Jewellers" className="about-story-main-image" />
            </div>
            <div className="archival-image-wrapper">
              <img src="/images/hero_jewelry_banner.png" alt="Archival vintage storefront on The Mall, Shimla" className="about-story-archival-image" />
              <span className="archival-image-label">The Mall, Shimla (Archival)</span>
            </div>
            <div className="about-story-stamp">Est. 1980</div>
          </Reveal>
          <Reveal className="about-story-text" delay={120}>
            <span className="section-mini-title">Our Beginning</span>
            <h2>From a Small Silver Counter to Shimla’s <span className="text-gold-gradient">Finest Showroom</span></h2>
            <p>
              <span className="gold-drop-cap">O</span>n 14<sup>th</sup> October 1980, <strong>Shri Shelender Verma</strong> and his wife
              <strong> Smt. Rajni Verma</strong> opened a modest silver jewellery business on the
              prestigious Mall Road in Shimla. Their capital was simple but powerful — honesty,
              fair weight, and the trust of local families.
            </p>
            <p>
              Over the years that small counter grew into a complete jewellery destination, expanding
              into hallmarked gold, certified diamonds, and the rich traditional ornaments of Himachal
              Pradesh. In <strong>2001</strong>, their son <strong>Mr. Sachin Verma</strong> joined the
              family business after formal training in gemology, diamond grading and import–export —
              bringing modern expertise to a heritage built on relationships.
            </p>
            <blockquote className="about-quote">
              “Trust was our only capital, and customer satisfaction our only metric.”
            </blockquote>
            <div className="founder-signature-block">
              <span className="founder-signature-text">Shelender Verma</span>
              <span className="founder-signature-title">Shri Shelender Verma, Founder</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Timeline */}
      <HeritageTimeline />

      {/* 4. By the Numbers */}
      <section className="about-stats">
        <div className="container about-stats-grid">
          {[
            { num: `${years}+`, label: 'Years of Trust' },
            { num: '1980', label: 'Established on The Mall' },
            { num: '100%', label: 'Purity Guaranteed' },
            { num: `${BRANDS.length}+`, label: 'National Brands' }
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="about-stat">
                <CountUp value={s.num} className="about-stat-num text-gold-gradient" />
                <span className="about-stat-label">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. How We Craft */}
      <section className="about-block">
        <div className="container">
          <Reveal className="about-block-head">
            <span className="section-mini-title">Our Craftsmanship</span>
            <h2>How Your Ornament <span className="text-gold-gradient">Comes to Life</span></h2>
            <p>Every bespoke piece travels through five careful stages — from a spark of an idea to a hallmarked treasure.</p>
          </Reveal>
          <div className="about-process-grid">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 80}>
                <div className="about-process-card glass-panel">
                  <span className="about-process-step">{p.step}</span>
                  <p.icon size={26} className="about-process-icon" />
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Interactive Spotlight Workbench */}
          <Reveal className="about-spotlight-section" delay={100}>
            <div className="spotlight-title-row">
              <span className="spotlight-badge"><Sparkles size={11} style={{ marginRight: '4px' }} /> Artisan Spotlight</span>
              <h3>Anatomy of a <span className="text-gold-gradient">Satya Masterpiece</span></h3>
              <p>Hover or click on the glowing pins to examine the microscopic precision of our craftsmanship.</p>
            </div>
            <div className="spotlight-grid">
              <div className="spotlight-workbench">
                <img src="/images/traditional_himachali_chandrahaar.png" alt="Spotlight details on Chandrahaar jewelry" className="spotlight-main-image" />
                <div className="spotlight-overlay-glow" />
                
                {HOTSPOTS.map((h, idx) => (
                  <div
                    key={h.id}
                    className={`spotlight-pin ${activeHotspot === idx ? 'active' : ''}`}
                    style={{ top: h.top, left: h.left }}
                    onMouseEnter={() => setActiveHotspot(idx)}
                    onClick={() => setActiveHotspot(idx)}
                  >
                    <span className="pin-pulse" />
                    <span className="pin-dot" />
                  </div>
                ))}
              </div>

              <div className="spotlight-details-card glass-panel">
                <div className="details-header">
                  <div className="details-num">0{activeHotspot + 1}</div>
                  <h4>{HOTSPOTS[activeHotspot].title}</h4>
                </div>
                <p className="details-desc">{HOTSPOTS[activeHotspot].desc}</p>
                <div className="details-metric">
                  <span className="metric-tag">Precision Standard</span>
                  <span className="metric-val">100% Guaranteed Purity</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Why Satya / Our Promise */}
      <section className="about-block about-block-alt">
        <div className="container">
          <Reveal className="about-block-head">
            <span className="section-mini-title">Why Satya Jewellers</span>
            <h2>Promises We <span className="text-gold-gradient">Never Break</span></h2>
          </Reveal>
          <div className="about-promise-grid">
            {PROMISES.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 90}>
                <div className="about-promise-card glass-panel">
                  <div className="about-promise-icon"><item.icon size={22} /></div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Meet the Family */}
      <section className="about-block">
        <div className="container">
          <Reveal className="about-block-head">
            <span className="section-mini-title">The People Behind the Counter</span>
            <h2>Meet the <span className="text-gold-gradient">Verma Family</span></h2>
          </Reveal>
          <div className="about-family-grid">
            {FAMILY.map((m, i) => (
              <Reveal key={m.name} delay={i * 110}>
                <div 
                  className="about-family-card glass-panel luxury-tilt-card"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="card-shine-glare" />
                  <div className="about-crest-wrapper">
                    <div className="about-avatar-crest">
                      <span className="crest-initials">{m.initials}</span>
                      <div className="crest-border-dashed" />
                      <Sparkles className="crest-sparkle" size={12} />
                    </div>
                  </div>
                  <h4>{m.name}</h4>
                  <span className="about-family-role">{m.role}</span>
                  <p>{m.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Brands We Carry */}
      <section className="about-block about-block-alt">
        <div className="container">
          <Reveal className="about-block-head">
            <span className="section-mini-title">Trusted Partnerships</span>
            <h2>Leading <span className="text-gold-gradient">Brands We Carry</span></h2>
            <p>Alongside our own designs, we bring you India’s most loved national jewellery brands.</p>
          </Reveal>
          <Reveal>
            <div className="about-brands-grid">
              {BRANDS.map((b) => (
                <div key={b} className="about-brand-grid-item">
                  <span className="brand-logo-text">{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Visit Us */}
      <section className="about-block about-visit-section">
        <div className="container">
          <Reveal className="about-block-head">
            <span className="section-mini-title">Come See Us</span>
            <h2>Visit Our <span className="text-gold-gradient">Showroom</span></h2>
          </Reveal>
          <Reveal>
            <div className="about-visit-grid">
              <div className="about-visit-info glass-panel">
                <ul>
                  <li><MapPin size={18} className="text-gold" /><span>Shop No. 62, Satya Complex,<br />The Mall, Shimla, HP 171001</span></li>
                  <li><Phone size={18} className="text-gold" /><span>+91 98160 05000<br />0177-2805808</span></li>
                  <li><Clock size={18} className="text-gold" /><span>10:00 AM – 7:00 PM IST<br />Monday – Saturday</span></li>
                </ul>
                <div className="about-visit-cta">
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="button-premium">
                    <MessageSquare size={16} style={{ marginRight: '8px' }} /> Message on WhatsApp
                  </a>
                  <button className="button-premium-outline" onClick={onOpenVipModal}>
                    <Calendar size={16} style={{ marginRight: '8px' }} /> Book VIP Visit
                  </button>
                </div>
              </div>
              <div className="about-visit-map">
                <iframe
                  title="Satya Jewellers location on The Mall, Shimla"
                  src="https://www.google.com/maps?q=Satya+Jewellers+The+Mall+Shimla&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { Calendar, Award, Gem, Sparkles } from 'lucide-react';
import '../../styles/HeritageTimeline.css';

const timelineData = [
  {
    year: '1980',
    title: 'The Foundation on The Mall',
    icon: <Calendar className="timeline-icon" size={20} />,
    subtitle: 'Oldest Showroom in Shimla',
    desc: 'Shri Shelender Verma and Smt. Rajni Verma open a small silver jewellery business at Shop No. 62, Satya Complex, on the prestigious Mall Road in Shimla — built on fair weight and the trust of local families.',
    quote: '"Trust was our only capital, and customer satisfaction was our only metric."'
  },
  {
    year: '1990s',
    title: 'Beyond Silver — Into Gold & Diamonds',
    icon: <Gem className="timeline-icon" size={20} />,
    subtitle: 'A Complete Jewellery Showroom',
    desc: 'Responding to a growing family of loyal customers, we expand from silver into hallmarked gold and fine certified diamonds — becoming a complete jewellery destination for every occasion in Shimla.',
    quote: '"We grew alongside our customers, one celebration at a time."'
  },
  {
    year: '2001',
    title: 'The Next Generation Joins',
    icon: <Award className="timeline-icon" size={20} />,
    subtitle: 'Modern Expertise, Same Values',
    desc: 'Mr. Sachin Verma joins the family business after professional training in gemology, diamond grading and import–export — bringing scientific precision and a wider world of designs to the mountains.',
    quote: '"Global standards, without ever losing our local relationships."'
  },
  {
    year: 'Today',
    title: 'Serving Generations of Trust',
    icon: <Sparkles className="timeline-icon" size={20} />,
    subtitle: 'Heritage Meets Today',
    desc: 'We proudly serve third-generation families for their wedding and festive jewellery — from traditional Himachali Chandrahaars to contemporary certified diamonds — all backed by 100% Karatmeter-verified purity.',
    quote: '"Crafting trust for over four decades, one ornament at a time."'
  }
];

export default function HeritageTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [gigaStyle, setGigaStyle] = useState({ transform: 'translate(0px, 0px)' });

  const handleMouseMove = (e) => {
    const box = e.currentTarget;
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const transX = ((x / rect.width) - 0.5) * 30;
    const transY = ((y / rect.height) - 0.5) * 30;
    
    setGigaStyle({
      transform: `translate(${transX}px, ${transY}px)`
    });
  };

  const handleMouseLeave = () => {
    setGigaStyle({
      transform: 'translate(0px, 0px)',
      transition: 'transform 0.4s ease'
    });
  };

  return (
    <section id="about-section" className="timeline-section-wrapper">
      <div className="container">
        {/* Header */}
        <div className="timeline-header">
          <span className="section-mini-title">Our Heritage Story</span>
          <h2>A Legacy of Trust <span className="text-gold-gradient">Since 1980</span></h2>
          <p className="timeline-intro">
            Over four decades ago, we began with a single promise: uncompromised purity. Today, we remain Shimla's most trusted jewelry destination, celebrating relationships across generations.
          </p>
        </div>

        {/* Timeline Stepper Navigation */}
        <div className="timeline-stepper glass-panel">
          {timelineData.map((item, idx) => (
            <div 
              key={item.year}
              className={`step-node-wrapper ${idx === activeIndex ? 'active' : ''} ${idx < activeIndex ? 'completed' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="step-connector"></div>
              <div className="step-node">
                <span className="step-year">{item.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Detail Card */}
        <div className="timeline-card-viewport">
          <div key={activeIndex} className="timeline-detail-card glass-panel animate-fade-in">
            <div 
              className="timeline-detail-image-box"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img src="/images/hero_jewelry_banner.png" alt="Heritage store in Shimla" className="timeline-card-bg-img" />
              <div className="timeline-card-image-overlay"></div>
              
              <div 
                className="timeline-year-giga" 
                style={gigaStyle}
              >
                {timelineData[activeIndex].year}
              </div>
            </div>

            <div className="timeline-detail-info">
              <div className="timeline-badge-row">
                {timelineData[activeIndex].icon}
                <span className="timeline-sub">{timelineData[activeIndex].subtitle}</span>
              </div>
              
              <h3>{timelineData[activeIndex].title}</h3>
              <p className="timeline-desc">{timelineData[activeIndex].desc}</p>
              
              <div className="timeline-blockquote">
                <p>{timelineData[activeIndex].quote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

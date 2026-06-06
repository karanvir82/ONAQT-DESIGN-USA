import { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Award, Sparkles, MapPin } from 'lucide-react';
import '../../styles/Hero.css';

const HERO_SLIDES = [
  '/images/hero_jewelry_banner.png',
  '/images/hero_slide_2.png',
  '/images/hero_slide_3.png'
];

export default function Hero({ onExploreClick, onOpenVipModal }) {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // Slideshow rotation logic
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = hero.offsetWidth);
    let height = (canvas.height = hero.offsetHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150,
      active: false
    };

    const handleResize = () => {
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    // Color choices: champagne gold, diamond white, deep gold, and bright gold
    const colors = [
      'rgba(212, 175, 55, ', // Gold primary
      'rgba(243, 229, 171, ', // Champagne
      'rgba(255, 255, 255, ', // Diamond White
      'rgba(254, 215, 102, '  // Bright Gold
    ];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.2 + 1.2; // Increased size: 1.2px to 3.4px
        this.baseVelocityX = (Math.random() - 0.5) * 0.25;
        this.baseVelocityY = -0.35 - Math.random() * 0.45; // Slightly faster drift
        this.vx = this.baseVelocityX;
        this.vy = this.baseVelocityY;
        this.alpha = Math.random() * 0.35 + 0.55; // Increased alpha: 0.55 to 0.90 base opacity
        this.shimmerSpeed = Math.random() * 0.05 + 0.02;
        this.shimmer = Math.random() * Math.PI * 2;
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        this.isSparkle = Math.random() < 0.22; // Increased sparkle rate to 22%
      }

      update() {
        // Add random ambient drift
        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.01;

        // Apply velocities
        this.x += this.vx;
        this.y += this.vy;

        // Apply decay to cursor push velocities
        this.vx += (this.baseVelocityX - this.vx) * 0.05;
        this.vy += (this.baseVelocityY - this.vy) * 0.05;

        // Fluctuate alpha for shimmer (higher minimum alpha for visibility)
        this.shimmer += this.shimmerSpeed;
        this.currentAlpha = this.alpha * (0.35 + 0.65 * Math.abs(Math.sin(this.shimmer)));

        // Cursor avoidance physics
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius; // 0 to 1
            const angle = Math.atan2(dy, dx);
            // Push away
            this.vx += Math.cos(angle) * force * 1.5;
            this.vy += Math.sin(angle) * force * 1.5;
          }
        }

        // Boundary checks
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset(false);
        }
      }

      draw() {
        ctx.fillStyle = `${this.colorPrefix}${this.currentAlpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw diamond glint cross for sparkle particles at peak shimmer
        if (this.isSparkle && this.currentAlpha > 0.5) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${this.currentAlpha * 0.55})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          // Horizontal bar
          ctx.moveTo(this.x - this.size * 2.5, this.y);
          ctx.lineTo(this.x + this.size * 2.5, this.y);
          // Vertical bar
          ctx.moveTo(this.x, this.y - this.size * 2.5);
          ctx.lineTo(this.x, this.y + this.size * 2.5);
          ctx.stroke();
        }
      }
    }

    // Adjust particle count dynamically based on area (increased multiplier)
    const particleCount = Math.min(130, Math.floor((width * height) / 8000));
    const particles = Array.from({ length: particleCount }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <canvas ref={canvasRef} className="hero-particle-canvas" />

      {/* Cinematic Full-Screen Ken Burns Slideshow */}
      <div className="hero-slideshow-container">
        {HERO_SLIDES.map((slideSrc, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${slideSrc}')` }}
          />
        ))}
      </div>

      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="container hero-container-content">
        <div className="hero-badge-wrapper animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="hero-mini-badge">
            <Sparkles size={12} className="text-gold" />
            Shimla's Oldest Showroom on The Mall
          </span>
        </div>

        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
          The Pinnacle of <span className="italic-title-gold">Purity</span>,<br />
          The Legacy of <span className="italic-title">Trust</span>
        </h1>

        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Serving exquisite designs, BIS 916 Government hallmarked gold, and premium certified diamonds since 1980. Explore our famous Himachali traditional heritage collections and experience on-the-spot Karatmeter testing.
        </p>

        <div className="hero-ctas animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button className="button-premium hero-btn-explore" onClick={onExploreClick}>
            Explore Collections
          </button>
          <button className="button-premium-outline hero-btn-book" onClick={onOpenVipModal}>
            Book Private Consultation
          </button>
        </div>

        {/* Highlight Badges */}
        <div className="hero-highlights animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="highlight-item">
            <ShieldCheck size={20} className="highlight-icon" />
            <div className="highlight-text">
              <h5>100% Karatmeter Tested</h5>
              <p>Instant scientific purity report</p>
            </div>
          </div>
          <div className="highlight-item">
            <Award size={20} className="highlight-icon" />
            <div className="highlight-text">
              <h5>BIS Hallmark Certified</h5>
              <p>Government certified gold authenticity</p>
            </div>
          </div>
          <div className="highlight-item">
            <MapPin size={20} className="highlight-icon" />
            <div className="highlight-text">
              <h5>Showroom Est. 1980</h5>
              <p>Shimla's trusted heritage destination</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gravity Pendulum Scroll Cue */}
      <div className="hero-scroll-cue" />
    </section>
  );
}

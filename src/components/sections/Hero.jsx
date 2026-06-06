import { useRef, useEffect } from 'react';
import { ShieldCheck, Award, Sparkles, MapPin } from 'lucide-react';
import '../../styles/Hero.css';

const ROW1_ITEMS = [
  { src: '/images/bridal_gold_jewelry.png', ratio: '4/3' },
  { src: '/images/himachali_bride_gen_1.png', ratio: '1/1' },
  { src: '/images/lookbook_shot_1.png', ratio: '1/1' },
  { src: '/images/himachali_bride_gen_2.png', ratio: '4/3' },
  { src: '/images/himachali_bride_gen_4.png', ratio: '1/1' },
  { src: '/images/himachali_bride_gen_5.png', ratio: '4/3' },
  { src: '/images/lookbook_shot_4.png', ratio: '3/2' }
];

const ROW2_ITEMS = [
  { src: '/images/bridal_diamond_jewelry.png', ratio: '1/1' },
  { src: '/images/himachali_bride_gen_3.png', ratio: '1/1' },
  { src: '/images/lookbook_shot_2.png', ratio: '4/3' },
  { src: '/images/himachali_bride_gen_6.png', ratio: '1/1' },
  { src: '/images/about_heritage_story.png', ratio: '4/3' },
  { src: '/images/himachali_bride_gen_7.png', ratio: '4/3' }
];

function CollageItem({ item }) {
  return (
    <div
      className="collage-item image-item"
      style={{
        aspectRatio: item.ratio,
        backgroundImage: `url('${item.src}')`
      }}
    />
  );
}

export default function Hero({ onExploreClick, onOpenVipModal }) {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

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

    // Color choices: champagne gold, diamond white, deep gold
    const colors = [
      'rgba(212, 175, 55, ', // Gold primary
      'rgba(243, 229, 171, ', // Champagne
      'rgba(255, 255, 255, ', // Diamond White
      'rgba(184, 144, 32, '  // Gold dark
    ];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.size = Math.random() * 2 + 0.8; // 0.8px to 2.8px
        this.baseVelocityX = (Math.random() - 0.5) * 0.2;
        this.baseVelocityY = -0.3 - Math.random() * 0.4; // Slowly drift upwards
        this.vx = this.baseVelocityX;
        this.vy = this.baseVelocityY;
        this.alpha = Math.random() * 0.6 + 0.2; // Max opacity 0.8
        this.shimmerSpeed = Math.random() * 0.05 + 0.02;
        this.shimmer = Math.random() * Math.PI * 2;
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        this.isSparkle = Math.random() < 0.15; // 15% are diamond glints
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

        // Fluctuate alpha for shimmer
        this.shimmer += this.shimmerSpeed;
        this.currentAlpha = this.alpha * (0.2 + 0.8 * Math.abs(Math.sin(this.shimmer)));

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
        if (this.isSparkle && this.currentAlpha > 0.45) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${this.currentAlpha * 0.5})`;
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

    // Adjust particle count dynamically based on area
    const particleCount = Math.min(100, Math.floor((width * height) / 10000));
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
      {/* Cinematic Horizontal Scrolling Collage */}
      <div className="hero-collage-container">
        {/* Row 1 (scrolls left) */}
        <div className="collage-row row-1">
          <div className="collage-track scroll-left">
            {ROW1_ITEMS.concat(ROW1_ITEMS).map((item, idx) => (
              <CollageItem key={`r1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 (scrolls right) */}
        <div className="collage-row row-2">
          <div className="collage-track scroll-right">
            {ROW2_ITEMS.concat(ROW2_ITEMS).map((item, idx) => (
              <CollageItem key={`r2-${idx}`} item={item} />
            ))}
          </div>
        </div>
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

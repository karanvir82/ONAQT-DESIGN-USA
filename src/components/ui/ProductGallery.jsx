import { useState, useRef } from 'react';
import { ZoomIn } from 'lucide-react';
import '../../styles/ProductGallery.css';

// Main image with hover-to-zoom (magnifier) + thumbnail strip when multiple images exist.
export default function ProductGallery({ images, alt, badge }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="pg">
      <div
        className="pg-main"
        ref={ref}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
      >
        <img
          src={images[active]}
          alt={alt}
          style={{ transformOrigin: `${pos.x}% ${pos.y}%`, transform: zoom ? 'scale(2)' : 'scale(1)' }}
        />
        {badge && <span className="pg-badge">{badge}</span>}
        <span className="pg-zoom-hint"><ZoomIn size={12} /> Hover to zoom</span>
      </div>

      {images.length > 1 && (
        <div className="pg-thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              className={`pg-thumb ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

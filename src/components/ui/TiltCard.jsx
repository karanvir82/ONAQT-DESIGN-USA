import { useRef, useEffect } from 'react';

/**
 * TiltCard provides a premium 3D tilt effect on hover, complete with a golden glare sheen.
 * Optimized with direct style mutations (avoiding state re-renders)
 * and disables itself automatically on touch/mobile devices.
 */
export default function TiltCard({ children, className = '', maxRotation = 10, scale = 1.03, showShine = true, ...props }) {
  const cardRef = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Detect touch/coarse pointers (mobile/tablet devices)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation on X (vertical tilt) and Y (horizontal tilt) axes
      const rotateX = ((centerY - y) / centerY) * maxRotation;
      const rotateY = ((x - centerX) / centerX) * maxRotation;
      
      // Direct style update for 60fps scrolling and hover rendering
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      // Update the holographic gold shine spot
      if (showShine && shineRef.current) {
        const shineX = (x / rect.width) * 100;
        const shineY = (y / rect.height) * 100;
        shineRef.current.style.setProperty('--shine-x', `${shineX}%`);
        shineRef.current.style.setProperty('--shine-y', `${shineY}%`);
        shineRef.current.style.setProperty('--shine-opacity', '0.15');
      }
    };

    const handleMouseLeave = () => {
      // Smoothly animate back to neutral position
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (showShine && shineRef.current) {
        shineRef.current.style.setProperty('--shine-opacity', '0');
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxRotation, scale, showShine]);

  return (
    <div 
      ref={cardRef} 
      className={`tilt-card-wrapper ${className}`}
      style={{
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
      {...props}
    >
      {showShine && (
        <div 
          ref={shineRef}
          className="card-shine-glare"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 3,
            background: 'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(212, 175, 55, var(--shine-opacity, 0)) 0%, transparent 60%)',
            transition: 'background 0.1s ease-out',
          }}
        />
      )}
      {children}
    </div>
  );
}

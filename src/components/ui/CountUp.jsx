import { useState, useRef, useEffect } from 'react';

// Counts up to a numeric value the first time it scrolls into view.
// Accepts strings like "46+", "100%", "1980" — keeps any prefix/suffix.
export default function CountUp({ value, className }) {
  const match = String(value).match(/^(\D*)(\d[\d,]*)(\D*)$/);
  const prefix = match ? match[1] : '';
  const target = match ? parseInt(match[2].replace(/,/g, ''), 10) : 0;
  const suffix = match ? match[3] : String(value);

  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          const duration = 1400;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

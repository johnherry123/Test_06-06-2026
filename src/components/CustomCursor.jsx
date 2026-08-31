/* ══════════════════════════════════════════════════════════════════════
   CUSTOM CURSOR — mix-blend-mode: difference
   - Outer ring: slow follow, enlarges on hover
   - Inner dot: exact position
   - Inverts color automatically on dark/light backgrounds
══════════════════════════════════════════════════════════════════════ */
import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const posRef   = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });
  const rafRef   = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const onMove = useCallback((e) => {
    posRef.current = { x: e.clientX, y: e.clientY };
    if (!visible) setVisible(true);
  }, [visible]);

  const onLeave  = useCallback(() => setVisible(false), []);
  const onDown   = useCallback(() => setIsClick(true), []);
  const onUp     = useCallback(() => setIsClick(false), []);

  // Detect hover targets
  const onOver = useCallback((e) => {
    const target = e.target.closest('button, a, [data-cursor-hover], input, textarea, select, label');
    setIsHover(!!target);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', () => setVisible(true));
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver, { passive: true });

    const animate = () => {
      // Dot: instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      }
      // Ring: lerp follow
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        const size = isHover ? 52 : isClick ? 18 : 36;
        ringRef.current.style.width  = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onMove, onLeave, onDown, onUp, onOver, isHover, isClick]);

  // Hide on touch devices
  const [isTouch] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  if (isTouch) return null;

  return (
    <>
      {/* Inner dot — exact position */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          backgroundColor: '#FDFBF7',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 999999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
      {/* Outer ring — lerp follow */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1.5px solid #FDFBF7',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 999998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s, width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform, width, height',
        }}
      />
    </>
  );
}

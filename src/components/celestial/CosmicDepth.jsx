import { useEffect, useRef } from 'react';

const BASE = `${import.meta.env.BASE_URL}cosmos/`;

/* Celestial bodies drifting in the side margins.
   Each one is anchored to a section and moves at a fraction of the scroll speed (parallax depth). */
const BODIES = [
  { id: 'planet-gold', src: 'planet.jpg', anchor: 'hai-vi-sao', side: 'right', size: 'clamp(220px, 30vw, 500px)', edge: '-9vw', offset: -0.05, speed: 0.55, spin: 0, cls: '' },
  { id: 'galaxy-rose', src: 'galaxy.jpg', anchor: 'tuan-trang', side: 'left', size: 'clamp(240px, 34vw, 560px)', edge: '-12vw', offset: 0.1, speed: 0.5, spin: 1, cls: 'cosmic-body--spin' },
  { id: 'planet-ice', src: 'planet.jpg', anchor: 'toa-do', side: 'left', size: 'clamp(160px, 20vw, 320px)', edge: '-5vw', offset: 0.05, speed: 0.62, spin: 0, cls: 'cosmic-body--ice' },
  { id: 'galaxy-far', src: 'galaxy.jpg', anchor: 'tin-hieu', side: 'right', size: 'clamp(200px, 26vw, 420px)', edge: '-8vw', offset: 0.0, speed: 0.5, spin: -1, cls: 'cosmic-body--spin cosmic-body--teal' },
];

/* Section → colour mood of the nebulae */
const MOODS = {
  'bau-troi': 0,
  'loi-moi': -18,
  'hai-vi-sao': 14,
  'tuan-trang': -30,
  'giao-hoi': 32,
  'toa-do': 8,
  'tinh-tu': -40,
  'tin-hieu': 24,
  'qua-mung': -12,
};

export default function CosmicDepth({ active = true }) {
  const rootRef = useRef(null);
  const bodyRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    let raf = 0;
    let lastY = -1;
    let lastW = -1;

    const tick = () => {
      const y = window.scrollY;
      const w = window.innerWidth;
      if (y !== lastY || w !== lastW) {
        lastY = y;
        lastW = w;
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        root.style.setProperty('--p', (y / max).toFixed(4));

        const vh = window.innerHeight;
        BODIES.forEach((b, i) => {
          const el = bodyRefs.current[i];
          const anchor = document.getElementById(b.anchor);
          if (!el || !anchor) return;
          const top = anchor.getBoundingClientRect().top;
          const ty = top * b.speed + vh * b.offset;
          const rot = b.spin ? 0 : (top / vh) * -4;
          el.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* Mood shifts */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id in MOODS) {
            root.style.setProperty('--hue', `${MOODS[e.target.id]}deg`);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const t = setTimeout(() => {
      Object.keys(MOODS).forEach((id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
    }, 300);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className={`cosmic${active ? ' is-active' : ''}`} aria-hidden="true">
      {/* Base sky lives inside this layer so `mix-blend-mode: screen` below can blend against it */}
      <div className="cosmos" />
      <div className="cosmic__aurora" />
      <img className="cosmic__nebula cosmic__nebula--l" src={`${BASE}nebula-left.jpg`} alt="" decoding="async" />
      <img className="cosmic__nebula cosmic__nebula--r" src={`${BASE}nebula-right.jpg`} alt="" decoding="async" />

      {BODIES.map((b, i) => (
        <div
          key={b.id}
          ref={(el) => {
            bodyRefs.current[i] = el;
          }}
          className={`cosmic-body ${b.cls}`}
          style={{ width: b.size, [b.side]: b.edge, '--spin-dir': b.spin < 0 ? 'reverse' : 'normal' }}
        >
          <img src={`${BASE}${b.src}`} alt="" loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}

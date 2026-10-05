import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Telescope } from 'lucide-react';
import { COUPLE, WEDDING, SKY } from '../../weddingData';
import { initialOf, sparkle } from '../../celestial/utils';

/* ── Brass astrolabe (pure SVG, rings spin independently) ── */
function Astrolabe({ left, right, ringText }) {
  const ticks = useMemo(() => {
    let fine = '';
    let bold = '';
    for (let i = 0; i < 180; i += 1) {
      const a = (i * 2 * Math.PI) / 180;
      const long = i % 5 === 0;
      const r1 = 192;
      const r2 = long ? 179 : 186;
      const seg = `M${(200 + r1 * Math.cos(a)).toFixed(2)} ${(200 + r1 * Math.sin(a)).toFixed(2)}L${(200 + r2 * Math.cos(a)).toFixed(2)} ${(200 + r2 * Math.sin(a)).toFixed(2)}`;
      if (long) bold += seg;
      else fine += seg;
    }
    return { fine, bold };
  }, []);

  const sectors = useMemo(() => {
    const lines = [];
    const glyphs = [];
    for (let i = 0; i < 12; i += 1) {
      const a = (i * Math.PI) / 6;
      lines.push(
        `M${(200 + 104 * Math.cos(a)).toFixed(2)} ${(200 + 104 * Math.sin(a)).toFixed(2)}L${(200 + 136 * Math.cos(a)).toFixed(2)} ${(200 + 136 * Math.sin(a)).toFixed(2)}`,
      );
      const b = a + Math.PI / 12;
      glyphs.push(sparkle(200 + 120 * Math.cos(b), 200 + 120 * Math.sin(b), i % 3 === 0 ? 5 : 3));
    }
    return { lines: lines.join(''), glyphs };
  }, []);

  const pointers = useMemo(
    () =>
      [20, 95, 150, 210, 285, 330].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        const r = 84;
        const x = 200 + r * Math.cos(a);
        const y = 178 + r * Math.sin(a);
        return { x, y, d: sparkle(x, y, i % 2 ? 4 : 6.5) };
      }),
    [],
  );

  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <linearGradient id="obsBrass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6c3a" />
          <stop offset="0.42" stopColor="#f0ddae" />
          <stop offset="0.6" stopColor="#c9a86a" />
          <stop offset="1" stopColor="#7a5e30" />
        </linearGradient>
        <radialGradient id="obsCore" cx="50%" cy="42%" r="60%">
          <stop offset="0" stopColor="#1d2763" />
          <stop offset="1" stopColor="#070b1e" />
        </radialGradient>
        <radialGradient id="obsHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0.6" stopColor="rgba(201,168,106,0.16)" />
          <stop offset="1" stopColor="rgba(201,168,106,0)" />
        </radialGradient>
        <path id="obsTextRing" d="M50,200 A150,150 0 1,1 350,200 A150,150 0 1,1 50,200" />
      </defs>

      <circle cx="200" cy="200" r="200" fill="url(#obsHalo)" />
      <circle cx="200" cy="200" r="196" fill="none" stroke="url(#obsBrass)" strokeWidth="0.8" opacity="0.75" />

      <g className="spin" style={{ animationDuration: '160s' }} stroke="url(#obsBrass)" fill="none">
        <path d={ticks.fine} strokeWidth="0.5" opacity="0.7" />
        <path d={ticks.bold} strokeWidth="1.1" />
      </g>

      <circle cx="200" cy="200" r="172" fill="none" stroke="url(#obsBrass)" strokeWidth="0.6" opacity="0.6" />

      <g className="spin spin--rev" style={{ animationDuration: '110s' }}>
        <text
          fill="#c9a86a"
          fontSize="10.5"
          fontFamily="'IBM Plex Mono', monospace"
          letterSpacing="3"
        >
          <textPath href="#obsTextRing" textLength="930" lengthAdjust="spacing">
            {ringText}
          </textPath>
        </text>
      </g>

      <circle cx="200" cy="200" r="136" fill="none" stroke="url(#obsBrass)" strokeWidth="0.9" />
      <circle cx="200" cy="200" r="104" fill="none" stroke="url(#obsBrass)" strokeWidth="0.5" opacity="0.6" />

      <g className="spin" style={{ animationDuration: '70s' }}>
        <path d={sectors.lines} stroke="url(#obsBrass)" strokeWidth="0.6" opacity="0.8" />
        {sectors.glyphs.map((d, i) => (
          <path key={i} d={d} fill="#e9d29d" opacity={i % 3 === 0 ? 0.95 : 0.55} />
        ))}
      </g>

      <g className="spin spin--rev" style={{ animationDuration: '46s' }}>
        <circle cx="200" cy="178" r="84" fill="none" stroke="#c9a86a" strokeWidth="0.7" strokeDasharray="2 5" opacity="0.8" />
        {pointers.map((p, i) => (
          <g key={i}>
            <line x1="200" y1="200" x2={p.x} y2={p.y} stroke="#c9a86a" strokeWidth="0.35" opacity="0.4" />
            <path d={p.d} fill="#f0ddae" />
          </g>
        ))}
      </g>

      <g stroke="#c9a86a" strokeWidth="0.5" opacity="0.32">
        <line x1="200" y1="28" x2="200" y2="372" />
        <line x1="28" y1="200" x2="372" y2="200" />
      </g>

      <circle cx="200" cy="200" r="62" fill="url(#obsCore)" stroke="url(#obsBrass)" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="55" fill="none" stroke="#c9a86a" strokeWidth="0.4" opacity="0.5" />
      <text
        x="176"
        y="214"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontStyle="italic"
        fontWeight="400"
        fontSize="40"
        fill="url(#obsBrass)"
      >
        {left}
      </text>
      <path d={sparkle(200, 200, 7)} fill="#f0ddae" />
      <text
        x="224"
        y="214"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontStyle="italic"
        fontWeight="400"
        fontSize="40"
        fill="url(#obsBrass)"
      >
        {right}
      </text>
    </svg>
  );
}

/* ── Intro overlay ── */
export default function Observatory({ guest, onBegin, onReveal, onDone }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const astroRef = useRef(null);
  const copyRef = useRef(null);
  const speed = useRef({ v: 0.00005 });
  const [leaving, setLeaving] = useState(false);

  const ringText = useMemo(
    () =>
      `${COUPLE.groom.firstName} ✦ ${COUPLE.bride.firstName} ✦ ${WEDDING.date} ✦ ${SKY.coords} ✦ `.toUpperCase(),
    [],
  );

  /* Warp starfield */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    const stars = [];

    const reset = (s, initial) => {
      s.x = Math.random() * 2 - 1;
      s.y = Math.random() * 2 - 1;
      s.z = initial ? 0.05 + Math.random() * 0.95 : 1;
      s.pz = s.z;
    };
    for (let i = 0; i < 560; i += 1) {
      const s = {};
      reset(s, true);
      stars.push(s);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t) => {
      const dt = Math.min(50, t - last);
      last = t;
      const v = speed.current.v;
      const cx = w / 2;
      const cy = h / 2;
      const f = Math.max(w, h) * 0.55;

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round';

      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= v * dt;
        if (s.z <= 0.03) {
          reset(s, false);
          continue;
        }
        const sx = cx + (s.x / s.z) * f;
        const sy = cy + (s.y / s.z) * f;
        if (sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) {
          reset(s, false);
          continue;
        }
        const px = cx + (s.x / s.pz) * f;
        const py = cy + (s.y / s.pz) * f;
        const b = Math.min(1, (1 - s.z) * 1.35);
        ctx.strokeStyle = `rgba(240, 228, 200, ${b})`;
        ctx.lineWidth = Math.max(0.5, (1 - s.z) * 2.2);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleOpen = () => {
    if (leaving) return;
    setLeaving(true);
    onBegin?.(); // must run inside the click gesture so audio can start

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      onReveal?.();
      gsap.to(rootRef.current, { opacity: 0, duration: 0.5, onComplete: onDone });
      return;
    }

    gsap
      .timeline({ onComplete: onDone })
      .to(copyRef.current, { opacity: 0, y: 24, duration: 0.7, ease: 'power2.in' }, 0)
      .to(astroRef.current, { rotation: 160, scale: 0.88, duration: 1, ease: 'power2.inOut' }, 0)
      .to(astroRef.current, { scale: 4.2, opacity: 0, duration: 1.3, ease: 'power3.in' }, 0.85)
      .to(speed.current, { v: 0.003, duration: 1.7, ease: 'power3.in' }, 0.2)
      .call(() => onReveal?.(), null, 1.75)
      .to(rootRef.current, { opacity: 0, duration: 1.1, ease: 'power2.out' }, 1.85);
  };

  return (
    <div ref={rootRef} className="obs" role="dialog" aria-modal="true" aria-label="Mở thiệp cưới">
      <canvas ref={canvasRef} className="obs__canvas" aria-hidden="true" />
      <div className="obs__vignette" aria-hidden="true" />

      <div className="obs__inner">
        <p className="obs__eyebrow mono">Đài quan sát · {SKY.city} · {SKY.coords}</p>

        <div ref={astroRef} className="obs__astrolabe">
          <Astrolabe
            left={initialOf(COUPLE.groom.firstName)}
            right={initialOf(COUPLE.bride.firstName)}
            ringText={ringText}
          />
        </div>

        <div ref={copyRef} className="obs__copy">
          <p className="obs__to mono">Kính gửi</p>
          <p className="obs__guest">{guest}</p>
          <p className="obs__line">Có một lời hẹn đã được viết sẵn giữa các vì sao.</p>
          <button id="obs-open-sky" type="button" className="btn obs__btn" onClick={handleOpen} disabled={leaving}>
            <Telescope size={16} strokeWidth={1.6} />
            Mở bầu trời
          </button>
          <p className="obs__hint mono">Bật âm thanh để trọn vẹn trải nghiệm</p>
        </div>
      </div>
    </div>
  );
}

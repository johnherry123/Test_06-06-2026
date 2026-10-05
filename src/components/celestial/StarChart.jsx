import { useMemo } from 'react';
import { COUPLE, SKY, WEDDING } from '../../weddingData';
import { mulberry32, sparkle } from '../../celestial/utils';

const C = 500;
const SKY_R = 436;

/* Ring-shaped constellation: an ellipse with a "gem" on top.
   The groom's star sits on the left, the bride's on the right —
   their two paths meet at the gem (the vow) and at the bottom (the wedding day). */
const RX = 122;
const RY = 96;
const RC = [500, 520];
const onRing = (deg) => [RC[0] + RX * Math.cos((deg * Math.PI) / 180), RC[1] - RY * Math.sin((deg * Math.PI) / 180)];
const P = {
  groom: onRing(180),
  gU1: onRing(150),
  gU2: onRing(120),
  gem: onRing(90),
  gD1: onRing(210),
  gD2: onRing(240),
  wed: onRing(270),
  bride: onRing(0),
  bU1: onRing(30),
  bU2: onRing(60),
  bD1: onRing(330),
  bD2: onRing(300),
  gemL: [479, 402],
  gemT: [500, 380],
  gemR: [521, 402],
};
const line = (...pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');

const PATHS = [
  { d: line(P.groom, P.gU1, P.gU2, P.gem), delay: 0.9 },
  { d: line(P.groom, P.gD1, P.gD2, P.wed), delay: 0.9 },
  { d: line(P.bride, P.bU1, P.bU2, P.gem), delay: 0.9 },
  { d: line(P.bride, P.bD1, P.bD2, P.wed), delay: 0.9 },
  { d: line(P.gem, P.gemL, P.gemT, P.gemR, P.gem), delay: 2.6 },
  { d: line(P.gemL, P.gemR), delay: 3.1 },
];

const MINOR = [
  { p: P.gU1, d: 1.3 }, { p: P.gU2, d: 1.7 }, { p: P.gD1, d: 1.3 }, { p: P.gD2, d: 1.7 },
  { p: P.bU1, d: 1.3 }, { p: P.bU2, d: 1.7 }, { p: P.bD1, d: 1.3 }, { p: P.bD2, d: 1.7 },
  { p: P.gem, d: 2.4 }, { p: P.gemL, d: 2.9 }, { p: P.gemR, d: 2.9 },
];

/* Faint classical constellations for context */
const CLASSICS = [
  {
    name: 'Cassiopeia',
    pts: [[178, 318], [222, 276], [262, 314], [306, 268], [348, 296]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    label: [262, 250],
  },
  {
    name: 'Đại Hùng',
    pts: [[600, 196], [646, 210], [688, 232], [728, 252], [736, 304], [806, 310], [814, 258]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
    label: [700, 178],
  },
  {
    name: 'Lạp Hộ',
    pts: [[232, 640], [338, 650], [272, 712], [288, 717], [304, 722], [246, 800], [340, 806]],
    edges: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]],
    label: [286, 846],
  },
  {
    name: 'Thiên Cầm',
    pts: [[742, 682], [770, 720], [756, 770], [800, 778], [814, 728]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]],
    label: [780, 818],
  },
];

function Star({ x, y, size, delay, main = false, born = false }) {
  return (
    <g className="chart__star" style={{ '--d': `${delay}s` }}>
      <circle cx={x} cy={y} r={size * (main ? 9 : 5)} fill="url(#starGlow)" />
      {(main || born) && <circle className="chart__pulse" cx={x} cy={y} r={size * 3.2} fill="none" stroke="#f0ddae" strokeWidth="0.8" />}
      <path d={sparkle(x, y, size * (main ? 5.5 : 3.4), size * 0.7)} fill="#fff4d8" opacity={main ? 1 : 0.85} />
      <circle cx={x} cy={y} r={size} fill="#fffaf0" />
    </g>
  );
}

export default function StarChart() {
  const field = useMemo(() => {
    const rnd = mulberry32(20261020);
    const out = [];
    let guard = 0;
    while (out.length < 330 && guard < 4000) {
      guard += 1;
      const a = rnd() * Math.PI * 2;
      const r = Math.sqrt(rnd()) * (SKY_R - 12);
      const x = C + r * Math.cos(a);
      const y = C + r * Math.sin(a);
      // keep the couple's constellation area calm
      if (Math.abs(x - 500) < 175 && y > 360 && y < 740 && rnd() < 0.82) continue;
      const big = rnd();
      out.push({
        x,
        y,
        r: 0.55 + big ** 6 * 2.6,
        tw: rnd() < 0.18,
        dur: 2.5 + rnd() * 4,
        delay: -rnd() * 6,
        warm: rnd() < 0.16,
      });
    }
    return out;
  }, []);

  const bezel = useMemo(() => {
    let fine = '';
    let mid = '';
    let bold = '';
    for (let i = 0; i < 360; i += 1) {
      const a = (i * Math.PI) / 180;
      const len = i % 15 === 0 ? 20 : i % 5 === 0 ? 12 : 6;
      const r1 = 490;
      const r2 = r1 - len;
      const seg = `M${(C + r1 * Math.cos(a)).toFixed(1)} ${(C + r1 * Math.sin(a)).toFixed(1)}L${(C + r2 * Math.cos(a)).toFixed(1)} ${(C + r2 * Math.sin(a)).toFixed(1)}`;
      if (len === 20) bold += seg;
      else if (len === 12) mid += seg;
      else fine += seg;
    }
    return { fine, mid, bold };
  }, []);

  const ringText = `${SKY.city} · ${SKY.coords} · ${SKY.observedAt} · ${SKY.constellationLatin} · `.toUpperCase();

  return (
    <div className="chart" data-reveal style={{ '--d': '.1s' }}>
      <div className="chart__disk" aria-hidden="true" />

      {/* Rotating bezel (separate SVG so it composites cheaply) */}
      <svg className="chart__bezel" viewBox="0 0 1000 1000" aria-hidden="true">
        <defs>
          <linearGradient id="bezelBrass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a6c3a" />
            <stop offset="0.45" stopColor="#f0ddae" />
            <stop offset="0.65" stopColor="#c9a86a" />
            <stop offset="1" stopColor="#7a5e30" />
          </linearGradient>
          <path id="chartTextRing" d="M48,500 A452,452 0 1,1 952,500 A452,452 0 1,1 48,500" />
        </defs>
        <circle cx={C} cy={C} r="494" fill="none" stroke="url(#bezelBrass)" strokeWidth="1.2" />
        <path d={bezel.fine} stroke="#c9a86a" strokeWidth="0.6" opacity="0.55" />
        <path d={bezel.mid} stroke="#c9a86a" strokeWidth="0.9" opacity="0.8" />
        <path d={bezel.bold} stroke="url(#bezelBrass)" strokeWidth="1.6" />
        <circle cx={C} cy={C} r="468" fill="none" stroke="#c9a86a" strokeWidth="0.6" opacity="0.6" />
        <text fill="#c9a86a" fontSize="13" fontFamily="'IBM Plex Mono', monospace" opacity="0.9">
          <textPath href="#chartTextRing" textLength="2820" lengthAdjust="spacing">
            {ringText + ringText}
          </textPath>
        </text>
        <circle cx={C} cy={C} r="438" fill="none" stroke="url(#bezelBrass)" strokeWidth="1" />
      </svg>

      {/* Sky */}
      <svg
        className="chart__sky"
        viewBox="0 0 1000 1000"
        role="img"
        aria-label={`Bản đồ sao bầu trời ${SKY.city} đêm ${WEDDING.date}, với chòm sao nối hai vì sao ${COUPLE.groom.firstName} và ${COUPLE.bride.firstName}`}
      >
        <defs>
          <radialGradient id="starGlow">
            <stop offset="0" stopColor="rgba(255,240,205,0.55)" />
            <stop offset="0.35" stopColor="rgba(240,221,174,0.16)" />
            <stop offset="1" stopColor="rgba(240,221,174,0)" />
          </radialGradient>
          <clipPath id="skyClip">
            <circle cx={C} cy={C} r={SKY_R} />
          </clipPath>
        </defs>

        <g clipPath="url(#skyClip)">
          {/* Coordinate grid */}
          <g fill="none" stroke="#afc2ff" strokeWidth="0.6" opacity="0.14">
            <circle cx={C} cy={C} r="109" />
            <circle cx={C} cy={C} r="218" strokeDasharray="3 6" />
            <circle cx={C} cy={C} r="327" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i * Math.PI) / 6;
              return <line key={i} x1={C + 40 * Math.cos(a)} y1={C + 40 * Math.sin(a)} x2={C + SKY_R * Math.cos(a)} y2={C + SKY_R * Math.sin(a)} />;
            })}
          </g>
          {/* Ecliptic */}
          <circle cx={C} cy={C + 70} r="330" fill="none" stroke="#c9a86a" strokeWidth="0.7" strokeDasharray="1 7" opacity="0.5" />
          <text x="214" y="420" fill="#c9a86a" opacity="0.5" fontSize="12" fontStyle="italic" fontFamily="'Cormorant Garamond', serif" transform="rotate(-58 214 420)">
            hoàng đạo
          </text>

          {/* Background field */}
          {field.map((s, i) => (
            <circle
              key={i}
              cx={s.x.toFixed(1)}
              cy={s.y.toFixed(1)}
              r={s.r.toFixed(2)}
              fill={s.warm ? '#ffe2b4' : '#eef0ff'}
              opacity={0.35 + Math.min(0.6, s.r / 3)}
              className={s.tw ? 'chart__twinkle' : undefined}
              style={s.tw ? { '--tw': `${s.dur}s`, '--td': `${s.delay}s` } : undefined}
            />
          ))}

          {/* Classical constellations */}
          {CLASSICS.map((c) => (
            <g key={c.name} className="chart__classic">
              {c.edges.map(([a, b], i) => (
                <line key={i} x1={c.pts[a][0]} y1={c.pts[a][1]} x2={c.pts[b][0]} y2={c.pts[b][1]} stroke="#afc2ff" strokeWidth="0.7" opacity="0.3" />
              ))}
              {c.pts.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r={i % 2 ? 1.8 : 2.4} fill="#e8ecff" opacity="0.8" />
              ))}
              <text x={c.label[0]} y={c.label[1]} textAnchor="middle" fill="#afc2ff" opacity="0.45" fontSize="14" fontStyle="italic" fontFamily="'Cormorant Garamond', serif">
                {c.name}
              </text>
            </g>
          ))}

          {/* Couple constellation */}
          <g fill="none" stroke="#f0ddae" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            {PATHS.map((p, i) => (
              <path key={i} d={p.d} pathLength="1" className="chart__line" style={{ '--d': `${p.delay}s` }} />
            ))}
          </g>
          {MINOR.map((m, i) => (
            <Star key={i} x={m.p[0]} y={m.p[1]} size={1.6} delay={m.d} />
          ))}
          <Star x={P.gemT[0]} y={P.gemT[1]} size={2.2} delay={3.2} born />
          <Star x={P.wed[0]} y={P.wed[1]} size={2.6} delay={3.3} born />
          <Star x={P.groom[0]} y={P.groom[1]} size={3.2} delay={0.4} main />
          <Star x={P.bride[0]} y={P.bride[1]} size={3.2} delay={0.4} main />

          {/* Labels */}
          <g className="chart__label" style={{ '--d': '1.2s' }}>
            <text x={P.groom[0] - 26} y={P.groom[1] + 6} textAnchor="end" fill="#efe6d2" fontSize="25" fontStyle="italic" fontFamily="'Cormorant Garamond', serif">
              α {COUPLE.groom.firstName}
            </text>
            <text x={P.groom[0] - 26} y={P.groom[1] + 28} textAnchor="end" fill="#c9a86a" fontSize="11" letterSpacing="3" fontFamily="'IBM Plex Mono', monospace">
              {COUPLE.groom.role.toUpperCase()}
            </text>
            <text x={P.bride[0] + 26} y={P.bride[1] + 6} textAnchor="start" fill="#efe6d2" fontSize="25" fontStyle="italic" fontFamily="'Cormorant Garamond', serif">
              α {COUPLE.bride.firstName}
            </text>
            <text x={P.bride[0] + 26} y={P.bride[1] + 28} textAnchor="start" fill="#c9a86a" fontSize="11" letterSpacing="3" fontFamily="'IBM Plex Mono', monospace">
              {COUPLE.bride.role.toUpperCase()}
            </text>
          </g>
          <g className="chart__label" style={{ '--d': '3.6s' }}>
            <text x={P.wed[0]} y={P.wed[1] + 40} textAnchor="middle" fill="#f0ddae" fontSize="13" letterSpacing="4" fontFamily="'IBM Plex Mono', monospace">
              {WEDDING.date.replace(/\./g, ' · ')}
            </text>
            <text x={C} y="700" textAnchor="middle" fill="#efe6d2" opacity="0.85" fontSize="20" fontStyle="italic" fontFamily="'Cormorant Garamond', serif">
              {SKY.constellation}
            </text>
            <text x={C} y="722" textAnchor="middle" fill="#c9a86a" opacity="0.7" fontSize="10" letterSpacing="4" fontFamily="'IBM Plex Mono', monospace">
              {SKY.constellationLatin.toUpperCase()}
            </text>
          </g>
        </g>

        {/* Compass marks */}
        <g fill="#c9a86a" fontFamily="'IBM Plex Mono', monospace" fontSize="12" letterSpacing="2" textAnchor="middle" opacity="0.75">
          <text x={C} y={C - SKY_R + 22}>B</text>
          <text x={C} y={C + SKY_R - 12}>N</text>
          <text x={C - SKY_R + 18} y={C + 4}>Đ</text>
          <text x={C + SKY_R - 18} y={C + 4}>T</text>
        </g>
      </svg>
    </div>
  );
}

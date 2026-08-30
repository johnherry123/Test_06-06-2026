import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

/* ─── Audio ─── */
let _ctx = null;
const getCtx = () => { if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)(); return _ctx; };

const playCrack = () => {
  try {
    const ctx = getCtx();
    const len = Math.floor(ctx.sampleRate * 0.09);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.5, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    src.connect(g); g.connect(ctx.destination); src.start(); src.stop(ctx.currentTime + 0.15);
  } catch (_) {}
};

const playFanfare = () => {
  try {
    const ctx = getCtx();
    const notes = [
      { f: 523, t: 0,    dur: 1.8 },
      { f: 659, t: 0.18, dur: 1.5 },
      { f: 784, t: 0.36, dur: 1.2 },
      { f: 1047,t: 0.54, dur: 2.0 },
    ];
    notes.forEach(({ f, t, dur }) => {
      const osc = ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = f;
      const g = ctx.createGain(); const start = ctx.currentTime + t;
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(0.06, start + 0.08);
      g.gain.setValueAtTime(0.06, start + dur - 0.3);
      g.gain.exponentialRampToValueAtTime(0.001, start + dur);
      osc.connect(g); g.connect(ctx.destination); osc.start(start); osc.stop(start + dur + 0.1);
    });
  } catch (_) {}
};

/* ─── Premium Gold Ornament SVG (entire panel frame) ─── */
function PanelSVG({ side }) {
  const flipped = side === 'right';
  return (
    <svg
      viewBox="0 0 680 960"
      preserveAspectRatio="none"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        transform: flipped ? 'scaleX(-1)' : 'none',
      }}
    >
      <defs>
        {/* Gold gradient — vertical */}
        <linearGradient id={`gv_${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(240,215,100,0.55)"/>
          <stop offset="28%"  stopColor="rgba(212,175,55,0.85)"/>
          <stop offset="50%"  stopColor="rgba(245,229,140,1)"/>
          <stop offset="72%"  stopColor="rgba(212,175,55,0.85)"/>
          <stop offset="100%" stopColor="rgba(200,160,45,0.55)"/>
        </linearGradient>
        {/* Gold gradient — horizontal */}
        <linearGradient id={`gh_${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(240,215,100,0.4)"/>
          <stop offset="40%"  stopColor="rgba(212,175,55,0.8)"/>
          <stop offset="60%"  stopColor="rgba(245,229,140,0.95)"/>
          <stop offset="100%" stopColor="rgba(200,160,45,0.3)"/>
        </linearGradient>
        {/* Gold fill for medallions */}
        <radialGradient id={`gf_${side}`} cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="rgba(255,242,160,0.9)"/>
          <stop offset="45%"  stopColor="rgba(212,175,55,0.7)"/>
          <stop offset="100%" stopColor="rgba(150,110,20,0.4)"/>
        </radialGradient>
        {/* Glow filter */}
        <filter id={`glow_${side}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Outer border frame (double line) ── */}
      <rect x="22" y="22" width="636" height="916" rx="2" fill="none" stroke={`url(#gv_${side})`} strokeWidth="1.4"/>
      <rect x="36" y="36" width="608" height="888" rx="1" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.7"/>

      {/* ── Corner accent brackets ── */}
      {/* Top-left */}
      <g filter={`url(#glow_${side})`}>
        <path d="M22 90 L22 22 L90 22" fill="none" stroke={`url(#gh_${side})`} strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M40 75 L40 40 L75 40" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="22" cy="22" r="5.5" fill={`url(#gf_${side})`}/>
        <circle cx="22" cy="22" r="2.5" fill="rgba(255,245,160,0.9)"/>
      </g>
      {/* Top-right */}
      <g filter={`url(#glow_${side})`} transform="translate(658,22) scale(-1,1)">
        <path d="M0 68 L0 0 L68 0" fill="none" stroke={`url(#gh_${side})`} strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="0" cy="0" r="5.5" fill={`url(#gf_${side})`}/>
        <circle cx="0" cy="0" r="2.5" fill="rgba(255,245,160,0.9)"/>
      </g>
      {/* Bottom-left */}
      <g filter={`url(#glow_${side})`} transform="translate(22,938) scale(1,-1)">
        <path d="M0 68 L0 0 L68 0" fill="none" stroke={`url(#gh_${side})`} strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="0" cy="0" r="5.5" fill={`url(#gf_${side})`}/>
        <circle cx="0" cy="0" r="2.5" fill="rgba(255,245,160,0.9)"/>
      </g>
      {/* Bottom-right */}
      <g filter={`url(#glow_${side})`} transform="translate(658,938) scale(-1,-1)">
        <path d="M0 68 L0 0 L68 0" fill="none" stroke={`url(#gh_${side})`} strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="0" cy="0" r="5.5" fill={`url(#gf_${side})`}/>
        <circle cx="0" cy="0" r="2.5" fill="rgba(255,245,160,0.9)"/>
      </g>

      {/* ── Top centre medallion ── */}
      <g transform="translate(340,88)" filter={`url(#glow_${side})`}>
        {Array.from({length:12}, (_,i) => {
          const a = (i/12)*Math.PI*2;
          const r = 32;
          return (
            <ellipse key={i}
              cx={r*Math.cos(a)} cy={r*Math.sin(a)}
              rx="9" ry="4"
              transform={`rotate(${i*30} ${r*Math.cos(a)} ${r*Math.sin(a)})`}
              fill={`url(#gf_${side})`} opacity="0.65"
            />
          );
        })}
        <circle r="16" fill="rgba(212,175,55,0.15)" stroke={`url(#gf_${side})`} strokeWidth="1"/>
        <circle r="8"  fill={`url(#gf_${side})`} opacity="0.8"/>
        <circle r="3.5" fill="rgba(255,248,180,0.95)"/>
      </g>

      {/* ── Bottom centre medallion ── */}
      <g transform="translate(340,872)">
        {Array.from({length:8}, (_,i) => {
          const a = (i/8)*Math.PI*2;
          const r = 22;
          return (
            <ellipse key={i}
              cx={r*Math.cos(a)} cy={r*Math.sin(a)}
              rx="6.5" ry="3"
              transform={`rotate(${i*45} ${r*Math.cos(a)} ${r*Math.sin(a)})`}
              fill={`url(#gf_${side})`} opacity="0.5"
            />
          );
        })}
        <circle r="9"  fill={`url(#gf_${side})`} opacity="0.6"/>
        <circle r="3.5" fill="rgba(255,248,180,0.8)"/>
      </g>

      {/* ── Left vertical ornamental vine ── */}
      <g opacity="0.7">
        <path d="M 55 130 C 45 200, 65 260, 52 330 C 40 400, 62 460, 50 530 C 38 600, 60 660, 50 730 C 40 800, 58 840" fill="none" stroke={`url(#gv_${side})`} strokeWidth="1.2"/>
        {[180, 260, 340, 420, 500, 580, 660, 740].map((y, i) => (
          <g key={i} transform={`translate(52,${y})`}>
            <ellipse rx="13" ry="6.5" fill="none" stroke="rgba(212,175,55,0.55)" strokeWidth="0.9" transform={`rotate(${i%2===0 ? -35 : 35})`}/>
            <ellipse rx="8" ry="3.5" fill="rgba(212,175,55,0.15)" stroke="rgba(212,175,55,0.35)" strokeWidth="0.6" transform={`rotate(${i%2===0 ? -35 : 35})`}/>
            <circle r="2.5" fill="rgba(212,175,55,0.5)"/>
          </g>
        ))}
      </g>

      {/* ── Right vertical ornamental vine (mirror) ── */}
      <g opacity="0.7">
        <path d="M 625 130 C 635 200, 615 260, 628 330 C 640 400, 618 460, 630 530 C 642 600, 620 660, 630 730 C 640 800, 622 840" fill="none" stroke={`url(#gv_${side})`} strokeWidth="1.2"/>
        {[180, 260, 340, 420, 500, 580, 660, 740].map((y, i) => (
          <g key={i} transform={`translate(628,${y})`}>
            <ellipse rx="13" ry="6.5" fill="none" stroke="rgba(212,175,55,0.55)" strokeWidth="0.9" transform={`rotate(${i%2===0 ? 35 : -35})`}/>
            <ellipse rx="8" ry="3.5" fill="rgba(212,175,55,0.15)" stroke="rgba(212,175,55,0.35)" strokeWidth="0.6" transform={`rotate(${i%2===0 ? 35 : -35})`}/>
            <circle r="2.5" fill="rgba(212,175,55,0.5)"/>
          </g>
        ))}
      </g>

      {/* ── Top horizontal decorative band ── */}
      <line x1="100" y1="140" x2="580" y2="140" stroke={`url(#gh_${side})`} strokeWidth="0.9"/>
      <line x1="130" y1="148" x2="550" y2="148" stroke="rgba(212,175,55,0.2)" strokeWidth="0.6"/>

      {/* ── Bottom horizontal decorative band ── */}
      <line x1="100" y1="820" x2="580" y2="820" stroke={`url(#gh_${side})`} strokeWidth="0.9"/>
      <line x1="130" y1="812" x2="550" y2="812" stroke="rgba(212,175,55,0.2)" strokeWidth="0.6"/>

      {/* ── Mid horizontal divider ── */}
      <line x1="80" y1="480" x2="600" y2="480" stroke="rgba(212,175,55,0.1)" strokeWidth="0.6"/>

      {/* ── Diamond ornament nodes on top & bottom lines ── */}
      {[200, 340, 480].map((x, i) => (
        <g key={i} transform={`translate(${x}, 140)`}>
          <rect width="7" height="7" x="-3.5" y="-3.5" fill="rgba(212,175,55,0.5)" transform="rotate(45)"/>
          <circle r="1.5" fill="rgba(255,248,180,0.7)"/>
        </g>
      ))}
      {[200, 340, 480].map((x, i) => (
        <g key={i} transform={`translate(${x}, 820)`}>
          <rect width="7" height="7" x="-3.5" y="-3.5" fill="rgba(212,175,55,0.5)" transform="rotate(45)"/>
          <circle r="1.5" fill="rgba(255,248,180,0.7)"/>
        </g>
      ))}
    </svg>
  );
}

/* ─── Panel Text Content ─── */
function PanelText({ side }) {
  const isLeft = side === 'left';
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 3,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(60px,8vw,100px) clamp(50px,7vw,90px)',
      textAlign: 'center',
    }}>
      {/* Eyebrow */}
      <div style={{
        fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
        fontSize: 'clamp(9px, 1.2vw, 12px)',
        color: 'rgba(245,236,216,0.45)',
        letterSpacing: '0.45em', textTransform: 'uppercase',
        marginBottom: '24px',
      }}>
        {isLeft ? 'Lễ Thành Hôn' : 'Trân Trọng'}
      </div>

      {/* Rule + diamond */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '220px', marginBottom: '28px' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.45))' }} />
        <svg width="9" height="9" viewBox="0 0 9 9">
          <rect x="1" y="1" width="7" height="7" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="1" transform="rotate(45 4.5 4.5)"/>
          <circle cx="4.5" cy="4.5" r="1.5" fill="rgba(212,175,55,0.7)"/>
        </svg>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.45))' }} />
      </div>

      {/* Name */}
      <div style={{
        fontFamily: '"Great Vibes", cursive',
        fontSize: 'clamp(2.8rem, 5.2vw, 4.8rem)',
        color: '#F5ECD8',
        lineHeight: 1.1,
        textShadow: '0 2px 25px rgba(0,0,0,0.4), 0 0 60px rgba(212,175,55,0.12)',
        marginBottom: '24px',
      }}>
        {isLeft ? 'Đại Nghĩa' : 'Thị Nhung'}
      </div>

      {/* Rule + diamond */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '220px', marginBottom: '28px' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.45))' }} />
        <svg width="9" height="9" viewBox="0 0 9 9">
          <rect x="1" y="1" width="7" height="7" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="1" transform="rotate(45 4.5 4.5)"/>
          <circle cx="4.5" cy="4.5" r="1.5" fill="rgba(212,175,55,0.7)"/>
        </svg>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.45))' }} />
      </div>

      {/* Bottom tag */}
      <div style={{
        fontFamily: '"Montserrat", sans-serif',
        fontSize: 'clamp(8px, 1vw, 10px)', fontWeight: 600,
        letterSpacing: '0.55em', textTransform: 'uppercase',
        color: 'rgba(212,175,55,0.5)',
      }}>
        {isLeft ? '20 · 10 · 2026' : 'Kính Mời'}
      </div>
    </div>
  );
}

/* ─── Wax Seal ─── */
const WaxSeal = React.forwardRef(({ onClick, hov, setHov }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    onMouseEnter={() => setHov(true)}
    onMouseLeave={() => setHov(false)}
    style={{
      position: 'fixed',
      top: '50%', left: '50%',
      transform: 'translate(-50%,-50%)',
      width: 'clamp(95px,10.5vw,130px)',
      height: 'clamp(95px,10.5vw,130px)',
      zIndex: 9999,
      cursor: 'pointer',
    }}
  >
    <style>{`
      @keyframes sealGlow{
        0%,100%{filter:drop-shadow(0 0 12px rgba(212,175,55,.35)) drop-shadow(0 6px 22px rgba(0,0,0,.6))}
        50%     {filter:drop-shadow(0 0 38px rgba(212,175,55,.8)) drop-shadow(0 6px 22px rgba(0,0,0,.6))}
      }
      @keyframes ringOut{0%{opacity:.55;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.75)}}
      @keyframes hintBlink{0%,100%{opacity:.2}50%{opacity:.7}}
    `}</style>

    {/* Animated rings */}
    {[0, 0.7].map((delay, i) => (
      <div key={i} style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '100%', height: '100%', borderRadius: '50%',
        border: '1px solid rgba(212,175,55,0.45)',
        animation: `ringOut ${2.2 + i * 0.4}s ease-out ${delay}s infinite`,
        pointerEvents: 'none',
      }} />
    ))}

    <svg viewBox="0 0 130 130" width="100%" height="100%"
      style={{
        display: 'block', position: 'relative', zIndex: 1,
        animation: 'sealGlow 3.2s ease-in-out infinite',
        transform: hov ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1)',
      }}
    >
      <defs>
        <radialGradient id="sg_main" cx="34%" cy="26%" r="72%">
          <stop offset="0%"   stopColor="#FFF9D0"/>
          <stop offset="15%"  stopColor="#F0D050"/>
          <stop offset="40%"  stopColor="#C09020"/>
          <stop offset="65%"  stopColor="#886010"/>
          <stop offset="85%"  stopColor="#503800"/>
          <stop offset="100%" stopColor="#281800"/>
        </radialGradient>
        <radialGradient id="sg_shadow" cx="50%" cy="75%" r="55%">
          <stop offset="0%" stopColor="rgba(0,0,0,.6)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        <radialGradient id="sg_highlight" cx="28%" cy="16%" r="52%">
          <stop offset="0%" stopColor="rgba(255,255,255,.6)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <filter id="sg_drop" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#000" floodOpacity=".55"/>
        </filter>
      </defs>

      {/* Scalloped wax edge */}
      {Array.from({length:30}, (_,i) => {
        const a = (i/30)*Math.PI*2;
        const r = i%2===0 ? 62 : 56;
        return <circle key={i} cx={65+r*Math.cos(a)} cy={65+r*Math.sin(a)} r="7" fill="url(#sg_main)"/>;
      })}

      {/* Main gold disk */}
      <circle cx="65" cy="65" r="55" fill="url(#sg_main)" filter="url(#sg_drop)"/>
      <circle cx="65" cy="65" r="55" fill="url(#sg_shadow)"/>
      <circle cx="65" cy="65" r="55" fill="url(#sg_highlight)"/>

      {/* Engraved rings */}
      <circle cx="65" cy="65" r="47" fill="none" stroke="rgba(120,80,8,0.5)" strokeWidth="1.5"/>
      <circle cx="65" cy="65" r="40" fill="none" stroke="rgba(255,230,80,0.18)" strokeWidth="0.8"/>

      {/* 囍 Character */}
      <text x="65" y="65"
        textAnchor="middle" dominantBaseline="central"
        fontFamily='"Playfair Display","Noto Serif SC",serif'
        fontSize="38" fontWeight="700"
        fill="#1C0A00"
        stroke="rgba(255,200,50,0.15)" strokeWidth="0.5"
        style={{userSelect:'none'}}
      >囍</text>
    </svg>
  </div>
));
WaxSeal.displayName = 'WaxSeal';

/* ────────────────────────────────────────
   MAIN COMPONENT — Premium Gatefold
──────────────────────────────────────── */
export default function EnvelopePortal({ onOpenComplete, onPortalDone, onSealClick }) {
  const [opened, setOpened]   = useState(false);
  const [sealHov, setSealHov] = useState(false);

  const leftRef   = useRef(null);
  const rightRef  = useRef(null);
  const sealRef   = useRef(null);
  const hintRef   = useRef(null);
  const flashRef  = useRef(null);
  const wrapRef   = useRef(null);

  /* ── Entrance ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    gsap.set([leftRef.current, rightRef.current], { opacity: 0 });
    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(leftRef.current,  { opacity: 1, duration: 1.1, ease: 'power2.out' }, 0);
    tl.to(rightRef.current, { opacity: 1, duration: 1.1, ease: 'power2.out' }, 0.08);
    tl.fromTo(hintRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 1.3);

    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  /* ── Open ── */
  const handleClick = () => {
    if (opened) return;
    setOpened(true);
    onSealClick?.();
    playCrack();

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    // 1. Seal pops away
    tl.to(sealRef.current, { scale: 0, opacity: 0, duration: 0.28, ease: 'back.in(3)' }, 0);
    tl.to(hintRef.current, { opacity: 0, duration: 0.2 }, 0);

    // 2. Mount main content BEFORE panels move away (so it's ready underneath)
    tl.add(() => {
      document.body.style.overflow = 'auto';
      onOpenComplete?.();
      playFanfare();
    }, 0.25);

    // 3. Cinematic door opening:
    //    Left panel: hinges at its LEFT edge (outer edge), swings AWAY to the left
    //    Right panel: hinges at its RIGHT edge (outer edge), swings AWAY to the right
    //    Combined with slight X slide for extra drama
    tl.to(leftRef.current, {
      rotateY: -18,           // slight 3D perspective tilt as it exits
      x: '-105%',
      transformOrigin: 'left center',
      duration: 1.8,
      ease: 'power4.inOut',
      onStart: () => {
        if (leftRef.current)  leftRef.current.style.transformStyle  = 'preserve-3d';
        if (rightRef.current) rightRef.current.style.transformStyle = 'preserve-3d';
        if (wrapRef.current)  wrapRef.current.style.perspective     = '1800px';
      }
    }, 0.26);

    tl.to(rightRef.current, {
      rotateY: 18,            // mirror tilt
      x: '105%',
      transformOrigin: 'right center',
      duration: 1.8,
      ease: 'power4.inOut',
    }, 0.26);

    // 4. Warm golden light spills from the centre seam as panels part
    tl.fromTo(flashRef.current,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.45, ease: 'power2.out' },
      0.26);
    tl.to(flashRef.current, { opacity: 0, duration: 1.1, ease: 'power2.in' }, 0.65);

    // 5. Done — remove from DOM
    tl.add(() => onPortalDone?.(), 2.1);
  };

  return (
    <>
      {/* ── WRAPPER (perspective container) ── */}
      <div ref={wrapRef} style={{ position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: opened ? 'none' : 'auto' }}>

        {/* ── LEFT PANEL ── */}
        <div ref={leftRef} style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '50%',
          overflow: 'hidden',
          // Rich crimson velvet gradient — warmer than before
          background: `
            radial-gradient(ellipse 90% 70% at 30% 40%, rgba(160,40,40,0.55) 0%, transparent 65%),
            linear-gradient(165deg, #9A2020 0%, #781212 25%, #5C0A0A 55%, #3E0505 100%)
          `,
          boxShadow: '5px 0 50px rgba(0,0,0,0.55)',
          willChange: 'transform',
        }}>
          {/* Paper weave texture */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.055,
            backgroundImage:
              'repeating-linear-gradient(0deg,rgba(255,255,255,1) 0,rgba(255,255,255,1) 1px,transparent 1px,transparent 5px),' +
              'repeating-linear-gradient(90deg,rgba(0,0,0,1) 0,rgba(0,0,0,1) 1px,transparent 1px,transparent 5px)',
            pointerEvents: 'none',
          }} />
          {/* Edge shadow at seam */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '70px', background: 'linear-gradient(to right,transparent,rgba(0,0,0,0.5))', pointerEvents: 'none' }} />
          {/* Top ambient highlight */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to bottom,rgba(200,80,80,0.08),transparent)', pointerEvents: 'none' }} />
          {/* Ornamental SVG */}
          <PanelSVG side="left" />
          {/* Text */}
          <PanelText side="left" />
        </div>

        {/* ── RIGHT PANEL ── */}
        <div ref={rightRef} style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%',
          overflow: 'hidden',
          background: `
            radial-gradient(ellipse 90% 70% at 70% 40%, rgba(160,40,40,0.55) 0%, transparent 65%),
            linear-gradient(195deg, #9A2020 0%, #781212 25%, #5C0A0A 55%, #3E0505 100%)
          `,
          boxShadow: '-5px 0 50px rgba(0,0,0,0.55)',
          willChange: 'transform',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.055,
            backgroundImage:
              'repeating-linear-gradient(0deg,rgba(255,255,255,1) 0,rgba(255,255,255,1) 1px,transparent 1px,transparent 5px),' +
              'repeating-linear-gradient(90deg,rgba(0,0,0,1) 0,rgba(0,0,0,1) 1px,transparent 1px,transparent 5px)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '70px', background: 'linear-gradient(to left,transparent,rgba(0,0,0,0.5))', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to bottom,rgba(200,80,80,0.08),transparent)', pointerEvents: 'none' }} />
          <PanelSVG side="right" />
          <PanelText side="right" />
        </div>

        {/* ── Seam shadow (the spine) ── */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '50%',
          width: '4px', transform: 'translateX(-50%)',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.35))',
          zIndex: 9991, pointerEvents: 'none',
        }} />

        {/* ── Hint text ── */}
        <p ref={hintRef} style={{
          position: 'fixed', bottom: '7%', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9998,
          fontFamily: '"Montserrat",sans-serif',
          fontSize: '9px', fontWeight: 500, letterSpacing: '0.5em', textTransform: 'uppercase',
          color: 'rgba(212,175,55,0.6)',
          whiteSpace: 'nowrap',
          animation: 'hintBlink 2.8s ease-in-out infinite',
          opacity: 0, pointerEvents: 'none',
        }}>Chạm vào ấn ký để mở thiệp</p>
      </div>

      {/* ── Wax Seal ── */}
      {!opened && (
        <WaxSeal ref={sealRef} onClick={handleClick} hov={sealHov} setHov={setSealHov} />
      )}

      {/* ── Golden light flash from seam ── */}
      <div ref={flashRef} style={{
        position: 'fixed', top: 0, bottom: 0,
        left: '50%', width: '280px', transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255,248,200,0.98) 0%, rgba(255,235,160,0.85) 30%, rgba(255,210,100,0.45) 65%, transparent 85%)',
        zIndex: 9995, pointerEvents: 'none', opacity: 0, transformOrigin: 'center',
      }} />
    </>
  );
}

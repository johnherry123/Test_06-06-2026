import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

/* ─── Gold Dust Particles ─── */
function GoldParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.35 + 0.05),
      phase: Math.random() * Math.PI * 2,
      spd: 0.007 + Math.random() * 0.005,
    }));
    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = c.height + 5; p.x = Math.random() * c.width; }
        if (p.x < -5 || p.x > c.width + 5) p.x = Math.random() * c.width;
        const a = (Math.sin(t * p.spd + p.phase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,208,100,${a * 0.65})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />;
}

/* ─── Ornament line ─── */
const OrnLine = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', justifyContent: 'center', margin: '0.5rem 0' }}>
    <div style={{ width: '55px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(240,208,100,0.7))' }} />
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <polygon points="6,0 12,6 6,12 0,6" stroke="rgba(240,208,100,0.8)" strokeWidth="0.7" fill="rgba(240,208,100,0.15)" />
    </svg>
    <div style={{ width: '55px', height: '1px', background: 'linear-gradient(90deg,rgba(240,208,100,0.7),transparent)' }} />
  </div>
);

const CORNERS_DATA = [
  { top: 14, left: 14, sx: 1, sy: 1 },
  { top: 14, right: 14, sx: -1, sy: 1 },
  { bottom: 14, left: 14, sx: 1, sy: -1 },
  { bottom: 14, right: 14, sx: -1, sy: -1 },
];

export default function EnvelopePortal({ onOpenComplete, guestName }) {
  const [opened, setOpened] = useState(false);
  const flapRef = useRef(null);
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const wrapRef = useRef(null);
  const sealRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.to(wrapRef.current, { y: -10, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    const tl = gsap.timeline({
      onComplete: () => gsap.to(containerRef.current, {
        opacity: 0, duration: 1.3, ease: 'power2.inOut', onComplete: onOpenComplete,
      }),
    });
    tl.to(sealRef.current, { scale: 1.25, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0);
    tl.to(flapRef.current, {
      rotateX: -185, duration: 1.5, ease: 'back.out(1.1)',
      onUpdate() { if (this.progress() > 0.45) flapRef.current.style.zIndex = '5'; },
    }, 0.05);
    tl.to(cardRef.current, { y: -270, duration: 1.7, ease: 'power2.out' }, '-=0.6');
    tl.to(wrapRef.current, { scale: 4.5, opacity: 0, duration: 1.5, ease: 'power2.inOut' }, '+=0.05');
  };

  const name = guestName?.trim() || null;

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      /* Warm deep-red gradient — đỏ cưới ấm áp */
      background: 'radial-gradient(ellipse 130% 100% at 50% 115%, #C0392B 0%, #922B21 25%, #7B1A1A 50%, #5C0808 75%, #3D0505 100%)',
    }}>
      <GoldParticles />

      {/* Soft golden bloom behind envelope */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 65% 55% at 50% 55%, rgba(220,170,60,0.22) 0%, transparent 65%)',
      }} />

      {/* Top gold bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px', zIndex: 3,
        background: 'linear-gradient(90deg, transparent 5%, rgba(201,149,60,0.6) 25%, rgba(240,208,100,1) 50%, rgba(201,149,60,0.6) 75%, transparent 95%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', zIndex: 3,
        background: 'linear-gradient(90deg, transparent, rgba(201,149,60,0.4) 50%, transparent)',
      }} />

      {/* Ornate border frame */}
      <div style={{ position: 'absolute', inset: '1.2rem', border: '1px solid rgba(240,208,100,0.25)', zIndex: 3, pointerEvents: 'none' }}>
        {/* corner marks */}
        {[{ top: -1, left: -1 }, { top: -1, right: -1 }, { bottom: -1, left: -1 }, { bottom: -1, right: -1 }].map((pos, i) => {
          const fx = pos.right !== undefined;
          const fy = pos.bottom !== undefined;
          return (
            <svg key={i} style={{ position: 'absolute', width: '22px', height: '22px', ...pos, transform: `scale(${fx ? -1 : 1},${fy ? -1 : 1})` }} viewBox="0 0 22 22" fill="none">
              <path d="M1 21 L1 1 L21 1" stroke="rgba(240,208,100,0.6)" strokeWidth="1.5" fill="none" />
            </svg>
          );
        })}
      </div>

      {/* Guest name */}
      {name && (
        <div style={{
          position: 'relative', zIndex: 10, textAlign: 'center',
          marginBottom: '2rem',
          animation: 'fadeDown 1.2s ease both',
        }}>
          <p style={{
            fontFamily: '"Montserrat", sans-serif', fontWeight: 300,
            fontSize: '9px', letterSpacing: '0.6em', textTransform: 'uppercase',
            color: 'rgba(255,240,180,0.7)', marginBottom: '0.3rem',
          }}>Trân trọng kính mời</p>
          <OrnLine />
          <p style={{
            fontFamily: '"Dancing Script", cursive', fontWeight: 700,
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            color: '#FFF0B0',
            textShadow: '0 2px 30px rgba(240,180,60,0.55), 0 4px 20px rgba(0,0,0,0.4)',
            lineHeight: 1.1, marginTop: '0.3rem',
          }}>{name}</p>
          <OrnLine />
        </div>
      )}

      {/* Envelope */}
      <div ref={wrapRef} style={{ position: 'relative', width: '320px', maxWidth: '88vw', aspectRatio: '5/7', perspective: '2000px', zIndex: 10 }}>
        {/* Glow ring */}
        <div style={{
          position: 'absolute', inset: '-10px', borderRadius: '1.8rem', zIndex: 0, pointerEvents: 'none',
          boxShadow: '0 0 80px rgba(180,60,30,0.45), 0 60px 130px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,149,60,0.25)',
        }} />

        {/* Envelope body — real velvet texture image */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '1.4rem', overflow: 'hidden',
          backgroundImage: 'url("/envelope_front_velvet.png")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          border: '1px solid rgba(201,149,60,0.3)',
        }}>
          {/* Cinematic shine overlay */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 55%)', pointerEvents: 'none' }} />
        </div>

        {/* Inner card — real envelope_back.png with copper border pattern */}
        <div ref={cardRef} style={{
          position: 'absolute', left: '10px', right: '10px', top: '10px', bottom: '10px',
          zIndex: 10,
          backgroundImage: 'url("/envelope_back.png")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          borderRadius: '1rem',
          border: '1px solid rgba(201,149,60,0.3)',
          boxShadow: '0 12px 50px rgba(44,24,16,0.22)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* semi-transparent overlay so text remains readable */}
          <div style={{ position:'absolute', inset:0, background:'rgba(253,251,240,0.72)', pointerEvents:'none' }}/>
          <div style={{ position: 'absolute', inset: '10px', border: '0.5px solid rgba(201,149,60,0.22)', borderRadius: '0.65rem', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: '17px', border: '0.5px solid rgba(201,149,60,0.1)', borderRadius: '0.4rem', pointerEvents: 'none' }} />

          {/* corner ornaments */}
          {CORNERS_DATA.map(({ sx, sy, ...pos }, i) => (
            <svg key={i} style={{ position: 'absolute', width: '22px', height: '22px', ...pos, transform: `scale(${sx},${sy})` }} viewBox="0 0 22 22" fill="none">
              <path d="M1 21 L1 1 L21 1" stroke="#C9953C" strokeWidth="1.1" fill="none" />
              <circle cx="1" cy="1" r="1.3" fill="#C9953C" fillOpacity="0.7" />
            </svg>
          ))}

          {/* Card text */}
          <div style={{ textAlign: 'center', padding: '0 1.5rem', position: 'relative', zIndex: 10, width: '100%' }}>
            <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 600, fontSize: '7px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#C9953C', marginBottom: '0.5rem' }}>
              Thiệp Hồng
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.6rem' }}>
              <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg,transparent,rgba(201,149,60,0.6))' }} />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="5,0 10,5 5,10 0,5" stroke="#C9953C" strokeWidth="0.6" fill="rgba(201,149,60,0.1)" /></svg>
              <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg,rgba(201,149,60,0.6),transparent)' }} />
            </div>
            <h2 style={{ fontFamily: '"Dancing Script",cursive', fontWeight: 700, fontSize: 'clamp(2rem,8vw,2.9rem)', color: '#7B1A1A', lineHeight: 1, margin: '0 0 0.15rem' }}>Đại Nghĩa</h2>
            <p style={{ fontFamily: '"Playfair Display",serif', fontStyle: 'italic', fontSize: '1.2rem', color: '#C9953C', margin: '0.1rem 0', lineHeight: 1 }}>&amp;</p>
            <h2 style={{ fontFamily: '"Dancing Script",cursive', fontWeight: 700, fontSize: 'clamp(2rem,8vw,2.9rem)', color: '#7B1A1A', lineHeight: 1, margin: '0 0 0.7rem' }}>Thị Nhung</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
              <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg,transparent,rgba(201,149,60,0.5))' }} />
              <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 300, fontSize: '7px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6B4226', opacity: 0.8, margin: 0, whiteSpace: 'nowrap' }}>Trân trọng kính mời</p>
              <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg,rgba(201,149,60,0.5),transparent)' }} />
            </div>
            <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: '9px', letterSpacing: '0.28em', color: '#8B5E3C', opacity: 0.75 }}>20 · 10 · 2026</p>
          </div>
        </div>

        {/* Lower pocket */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none', borderRadius: '1.4rem', overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%' }} viewBox="0 0 320 170" preserveAspectRatio="none">
            <path d="M0,170 L320,170 L320,0 L0,55 Z" fill="#7B0C0C" fillOpacity="0.88" />
            <path d="M0,170 L320,170 L320,0 L0,55 Z" fill="none" stroke="rgba(201,149,60,0.32)" strokeWidth="1" />
          </svg>
        </div>

        {/* Flap */}
        <div ref={flapRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '62%', transformOrigin: 'top center', transformStyle: 'preserve-3d', zIndex: 30 }}>
          <div style={{ width: '100%', height: '100%', position: 'relative', backfaceVisibility: 'hidden' }}>
            <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 320 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fg2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C0392B" />
                  <stop offset="50%" stopColor="#9B1C1C" />
                  <stop offset="100%" stopColor="#6B0A0A" />
                </linearGradient>
              </defs>
              <path d="M0,0 L320,0 L320,170 Q160,265 0,170 Z" fill="url(#fg2)" />
              <path d="M0,0 L320,0 L320,170 Q160,265 0,170 Z" fill="none" stroke="rgba(201,149,60,0.5)" strokeWidth="1.2" />
              <path d="M22,18 L298,18 L298,150 Q160,238 22,150 Z" fill="none" stroke="rgba(201,149,60,0.12)" strokeWidth="0.7" />
              {/* diamond motif */}
              <polygon points="160,48 174,68 160,88 146,68" fill="none" stroke="rgba(240,208,128,0.22)" strokeWidth="0.8" />
              <circle cx="160" cy="68" r="2" fill="rgba(240,208,128,0.2)" />
            </svg>

            {/* Seal */}
            {!opened && (
              <button ref={sealRef} onClick={handleOpen} aria-label="Mở thiệp" style={{
                position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
                width: '84px', height: '84px', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'spinCW 16s linear infinite' }} viewBox="0 0 84 84">
                  <circle cx="42" cy="42" r="40" fill="none" stroke="rgba(240,208,100,0.45)" strokeWidth="0.8" strokeDasharray="6 5" />
                </svg>
                <svg style={{ position: 'absolute', inset: '8px', width: 'calc(100% - 16px)', height: 'calc(100% - 16px)', animation: 'spinCCW 10s linear infinite' }} viewBox="0 0 68 68">
                  <circle cx="34" cy="34" r="32" fill="none" stroke="rgba(201,149,60,0.3)" strokeWidth="0.6" strokeDasharray="3 5" />
                </svg>
                <div style={{
                  width: '62px', height: '62px', borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 28%, #F9ED70, #D4A020 40%, #A07010 70%, #7A5010)',
                  boxShadow: '0 6px 28px rgba(0,0,0,0.5), 0 0 0 2px rgba(240,208,100,0.45), 0 0 30px rgba(220,170,50,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'sealPulse 2.5s ease-out infinite',
                }}>
                  <span style={{ fontSize: '1.9rem', color: '#3D0505', lineHeight: 1, textShadow: '0 1px 3px rgba(0,0,0,0.3)', userSelect: 'none' }}>囍</span>
                </div>
              </button>
            )}
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
            <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 320 240" preserveAspectRatio="none">
              <path d="M0,0 L320,0 L320,170 Q160,265 0,170 Z" fill="#5C0808" fillOpacity="0.92" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      {!opened && (
        <p style={{
          position: 'relative', zIndex: 10, marginTop: '2.8rem',
          fontFamily: '"Montserrat",sans-serif', fontWeight: 300,
          fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase',
          color: 'rgba(255,230,150,0.5)',
          animation: 'fadeUp 1.5s ease 0.6s both',
        }}>Nhấn ấn ký để mở thiệp</p>
      )}

      <style>{`
        @keyframes spinCW  { to { transform: rotate(360deg);  } }
        @keyframes spinCCW { to { transform: rotate(-360deg); } }
        @keyframes sealPulse {
          0%   { box-shadow: 0 6px 28px rgba(0,0,0,0.5), 0 0 0 2px rgba(240,208,100,0.45), 0 0 0   rgba(220,170,50,0); }
          70%  { box-shadow: 0 6px 28px rgba(0,0,0,0.5), 0 0 0 2px rgba(240,208,100,0.45), 0 0 0 15px rgba(220,170,50,0); }
          100% { box-shadow: 0 6px 28px rgba(0,0,0,0.5), 0 0 0 2px rgba(240,208,100,0.45), 0 0 0   rgba(220,170,50,0); }
        }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)}  to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

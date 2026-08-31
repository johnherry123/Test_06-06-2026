/* ══════════════════════════════════════════════════════════════════════
   INTRO — Premium Editorial Wedding Opening Screen
   Direction: Full-bleed editorial photograph + names + minimal CTA
   Assets: Curated Unsplash wedding photo (cinematic, warm, intimate)
   Animation: Slow image reveal + staggered type reveal
   Tech: Pure CSS transitions — no WebGL needed
   
   Photography: Unsplash free license (unsplash.com/license)
   Replace src with real couple photograph when available.
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect } from 'react';

/* Editorial wedding photos — Unsplash free license
   Ordered by art direction preference (cinematic, intimate, Vietnamese aesthetic) */
const HERO_PHOTOS = [
  // Primary: elegant couple, warm light, editorial framing
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1800&q=90&fm=webp',
  // Fallback 1
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1800&q=90&fm=webp',
  // Fallback 2
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=90&fm=webp',
];

export default function IntroShader({ onComplete }) {
  const [phase, setPhase]       = useState('loading');  // loading | reveal | fadeout
  const [imgLoaded, setImgLoaded] = useState(false);

  /* Stagger text reveal after image loads (or after timeout) */
  useEffect(() => {
    const t = setTimeout(() => setPhase('reveal'), 400);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    setPhase('fadeout');
    setTimeout(onComplete, 800);
  };

  const revealed = phase === 'reveal';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Thiệp cưới Đại Nghĩa & Thị Nhung"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#231B15',
        overflow: 'hidden',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.9s cubic-bezier(0.65,0,0.35,1)',
        cursor: 'default',
      }}
    >
      {/* ── Full-bleed Editorial Photograph ── */}
      <div style={{
        position: 'absolute', inset: 0,
        overflow: 'hidden',
      }}>
        <img
          src={HERO_PHOTOS[0]}
          alt="Không gian tiệc cưới — ảnh minh họa"
          role="presentation"
          loading="eager"
          onLoad={() => setImgLoaded(true)}
          onError={e => { e.target.src = HERO_PHOTOS[1]; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            display: 'block',
            /* Slow Ken Burns — barely perceptible, 30s loop */
            animation: imgLoaded ? 'introKenBurns 30s ease-in-out infinite alternate' : 'none',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 1.2s ease',
            transform: 'scale(1.06)',
            transformOrigin: 'center center',
          }}
        />

        {/* ── Multi-layer cinematic overlay ──
             Layer 1: Bottom vignette — grounds typography
             Layer 2: Subtle warm tint — cohesion with cream palette
             Layer 3: Very light top vignette                          */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(18,10,6,0.88) 0%, rgba(18,10,6,0.45) 40%, rgba(18,10,6,0.10) 70%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(18,10,6,0.3) 0%, transparent 30%)',
          pointerEvents: 'none',
        }} />
        {/* Very subtle warm champagne tint at full opacity */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: 'rgba(184,149,85,0.04)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Thin horizontal rule lines — editorial frame ── */}
      <div style={{
        position: 'absolute',
        top: 'clamp(20px, 4vw, 36px)',
        left: 'clamp(24px, 5vw, 56px)',
        right: 'clamp(24px, 5vw, 56px)',
        height: '1px',
        background: 'rgba(248,244,236,0.2)',
        opacity: revealed ? 1 : 0,
        transition: 'opacity 1.2s 0.2s ease',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 'clamp(20px, 4vw, 36px)',
        left: 'clamp(24px, 5vw, 56px)',
        right: 'clamp(24px, 5vw, 56px)',
        height: '1px',
        background: 'rgba(248,244,236,0.2)',
        opacity: revealed ? 1 : 0,
        transition: 'opacity 1.2s 0.2s ease',
      }} />

      {/* ── Top — date label ── */}
      <div style={{
        position: 'absolute',
        top: 'clamp(24px, 4vw, 40px)',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: revealed ? 1 : 0,
        transition: 'opacity 0.9s 0.5s ease',
        pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.62rem',
          fontWeight: 500,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'rgba(248,244,236,0.65)',
          margin: 0,
        }}>
          Lễ Thành Hôn &nbsp;·&nbsp; 20 . 10 . 2026
        </p>
      </div>

      {/* ── Center — Couple names — PRIMARY FOCAL POINT ── */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(100px, 18vw, 180px)',
        left: 0, right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 24px',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.62rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(248,244,236,0.55)',
          marginBottom: 'clamp(12px, 2vw, 20px)',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.9s 0.6s ease',
        }}>
          Trân trọng kính mời
        </p>

        {/* Name 1 */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          fontWeight: 400,
          color: '#F8F4EC',
          lineHeight: 0.95,
          margin: 0,
          letterSpacing: '-0.02em',
          textShadow: '0 4px 32px rgba(18,10,6,0.4)',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(18px)',
          transition: 'all 1.1s 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          Đại Nghĩa
        </h1>

        {/* Ampersand */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: '#B89555',
          margin: 'clamp(2px, 0.8vw, 6px) 0',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 0.9s 1.1s ease',
        }}>
          &amp;
        </div>

        {/* Name 2 */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          fontWeight: 400,
          color: '#F8F4EC',
          lineHeight: 0.95,
          margin: '0 0 clamp(20px, 4vw, 36px)',
          letterSpacing: '-0.02em',
          textShadow: '0 4px 32px rgba(18,10,6,0.4)',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(18px)',
          transition: 'all 1.1s 1.0s cubic-bezier(0.16,1,0.3,1)',
        }}>
          Thị Nhung
        </h1>

        {/* Thin champagne line — grows in */}
        <div style={{
          width: revealed ? '40px' : '0px',
          height: '1px',
          backgroundColor: '#B89555',
          marginBottom: 'clamp(20px, 4vw, 32px)',
          transition: 'width 0.9s 1.3s cubic-bezier(0.16,1,0.3,1)',
        }} />

        {/* Venue */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.68rem',
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(248,244,236,0.5)',
          marginBottom: 'clamp(28px, 5vw, 44px)',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 0.8s 1.5s ease',
        }}>
          Gem Center &nbsp;·&nbsp; TP. Hồ Chí Minh
        </p>

        {/* CTA */}
        <button
          onClick={handleOpen}
          aria-label="Mở thiệp cưới và xem toàn bộ nội dung"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '15px 44px',
            backgroundColor: 'transparent',
            color: '#F8F4EC',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.76rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            border: '1px solid rgba(248,244,236,0.4)',
            borderRadius: '1px',
            cursor: 'pointer',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.8s 1.7s ease, background-color 0.25s ease, border-color 0.25s ease, transform 0.15s ease',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(248,244,236,0.1)';
            e.currentTarget.style.borderColor = 'rgba(248,244,236,0.7)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(248,244,236,0.4)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Mở thiệp cưới
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </button>
      </div>

      {/* ── Bottom corner — photographer credit placeholder ── */}
      <p style={{
        position: 'absolute',
        bottom: 'clamp(24px, 4vw, 36px)',
        right: 'clamp(24px, 5vw, 56px)',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.58rem',
        letterSpacing: '0.12em',
        color: 'rgba(248,244,236,0.28)',
        margin: 0,
        opacity: revealed ? 1 : 0,
        transition: 'opacity 0.8s 2s ease',
        pointerEvents: 'none',
      }}>
        Photo: Unsplash · Replace with couple's photos
      </p>

      {/* ── CSS Animations ── */}
      <style>{`
        @keyframes introKenBurns {
          from { transform: scale(1.06) translate(0, 0); }
          to   { transform: scale(1.0) translate(-1%, -0.5%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes introKenBurns { from, to { transform: scale(1.03); } }
        }
      `}</style>
    </div>
  );
}

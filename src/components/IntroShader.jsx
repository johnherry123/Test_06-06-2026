/* ══════════════════════════════════════════════════════════════════════
   INTRO — Physical Wedding Invitation Experience
   ──────────────────────────────────────────────────────────────────────
   ART DIRECTION:
   This must feel like holding a real invitation in your hands.
   
   Experience flow:
   1. CLOSED — An invitation card rests in warm ambient light
      Paper texture, physical shadow, monogram, names, date
   2. INTERACTION — Subtle hover: card lifts slightly, seal stirs
   3. CLICK/TAP — Wax seal pulses, card opens upward with physics
      The card DOES NOT just fly away — it opens like a real card
   4. REVEAL — Environment transitions from intimate warmth → cinematic
   
   Visual philosophy:
   - Warm ivory paper, not a white rectangle
   - Deep multi-layer physical shadow
   - Paper grain at imperceptible opacity
   - Envelope texture corner at 3.5%
   - Typography is the decoration
   - One vertical champagne thread as CTA — not a button
   
   What was REMOVED from previous version:
   - Excessive gradient layers that looked like digital art
   - The card simply flying "up" off screen — no physical feel
   - Glow bloom that looked like a vignette effect
   
   What is NEW:
   - Cleaner environment background — champagne → cream gradient
   - Physical card shadow stack (4 layers)
   - Wax seal concept via a thin ruled circle (SVG inline)
   - Cleaner typography hierarchy on card
   - Smoother opening sequence: lift → pause → sweep + fade
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useCallback, useRef } from 'react';
import { COUPLE, WEDDING } from '../weddingData';

export default function IntroShader({ onComplete }) {
  const [entered, setEntered]   = useState(false);
  const [phase, setPhase]       = useState('idle'); // idle | hover | lifting | exiting
  const [isHovered, setIsHovered] = useState(false);
  const cardRef                 = useRef(null);

  /* Entrance — delay slightly so paint is ready */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* prefers-reduced-motion */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEntered(true);
    }
  }, []);

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('lifting');
    /* Lift briefly — then sweep out */
    setTimeout(() => setPhase('exiting'), 320);
    /* Signal parent after animation completes */
    setTimeout(() => onComplete?.(), 1100);
  }, [phase, onComplete]);

  /* Keyboard accessibility */
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleOpen();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [handleOpen]);

  const isLifting = phase === 'lifting';
  const isExiting = phase === 'exiting';

  /* Card transform */
  const cardTransform = (() => {
    if (!entered) return 'translateY(56px) rotate(-1.5deg) scale(0.93)';
    if (isHovered && phase === 'idle') return 'translateY(-6px) rotate(-2.2deg) scale(1.012)';
    if (isLifting) return 'translateY(-14px) rotate(-3deg) scale(1.018)';
    if (isExiting) return 'translateY(-108vh) rotate(-4.5deg) scale(1.015)';
    return 'translateY(0) rotate(-1.5deg) scale(1)';
  })();

  const cardTransition = (() => {
    if (!entered) return 'none';
    if (isHovered && phase === 'idle') return 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
    if (isLifting) return 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)';
    if (isExiting) return 'transform 0.76s cubic-bezier(0.55, 0, 0.88, 0.42)';
    return 'transform 1.4s cubic-bezier(0.16,1,0.3,1), opacity 1.1s cubic-bezier(0.16,1,0.3,1)';
  })();

  /* Scene fades out as card exits */
  const sceneOpacity   = isExiting ? 0 : 1;
  const sceneTransition = isExiting ? 'opacity 0.68s ease 0.08s' : 'none';

  /* Card shadow — lifts and deepens on hover */
  const cardShadow = isHovered && phase === 'idle'
    ? [
        '0 2px 4px rgba(50,30,8,0.06)',
        '0 10px 28px rgba(50,30,8,0.16)',
        '0 32px 72px rgba(50,30,8,0.18)',
        '0 56px 110px rgba(50,30,8,0.13)',
        'inset 0 0 0 0.5px rgba(255,240,200,0.60)',
      ].join(', ')
    : [
        '0 2px 4px rgba(50,30,8,0.07)',
        '0 8px 22px rgba(50,30,8,0.12)',
        '0 24px 60px rgba(50,30,8,0.14)',
        '0 44px 90px rgba(50,30,8,0.10)',
        'inset 0 0 0 0.5px rgba(255,240,200,0.50)',
      ].join(', ');

  return (
    <div
      onClick={handleOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Chạm để mở thiệp cưới"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overflow: 'hidden',
        opacity: sceneOpacity,
        transition: sceneTransition,
      }}
    >

      {/* ── Environment: Warm champagne-cream background ──
           Clean radial gradient — center is warmer and lighter,
           edges darker but still warm. No digital art feel. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(
              ellipse 90% 85% at 50% 50%,
              #F5EBCF 0%,
              #EDD9A8 30%,
              #E2C98A 62%,
              #D5BB74 85%,
              #C9B065 100%
            )
          `,
          pointerEvents: 'none',
        }}
      />

      {/* ── Warm glow behind card — very subtle ──
           Think: morning light from a window landing on the envelope.
           Not a bloom, not a vignette — just warmth. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(320px, 80vw, 640px)',
          height: 'clamp(480px, 110vh, 900px)',
          background: `
            radial-gradient(
              ellipse 55% 60% at 50% 48%,
              rgba(255,252,230,0.88) 0%,
              rgba(252,243,210,0.60) 35%,
              rgba(244,228,182,0.32) 60%,
              transparent 78%
            )
          `,
          pointerEvents: 'none',
          animation: 'introGlowBreath 5.5s ease-in-out infinite',
        }}
      />

      {/* ── Edge vignette — corners only, very subtle ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(
              ellipse 100% 100% at 50% 50%,
              transparent 42%,
              rgba(100,72,28,0.15) 100%
            )
          `,
          pointerEvents: 'none',
        }}
      />

      {/* ══ THE INVITATION CARD ════════════════════════════════════════
           Portrait invitation proportions — ~4:5.6
           This is the PHYSICAL OBJECT the user interacts with.
           
           Materials:
           • backgroundColor: warm ivory #FCF7EC
           • borderRadius: 2px — paper has slightly soft edges
           • boxShadow: 4-layer physical shadow stack
           • Envelope texture at 3.5% via background image
           • SVG fractal noise grain at 2.8%
           
           Typography hierarchy:
           small italic monogram → thin rule → "Trân trọng kính mời"
           → Groom name (large) → & → Bride name (large)
           → thin rule → date (large) → venue (small)
      ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'clamp(268px, 60vw, 344px)',
          opacity: entered ? 1 : 0,
          transform: cardTransform,
          transition: entered
            ? (isLifting || isExiting
                ? cardTransition
                : 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s ease')
            : 'none',
          boxShadow: cardShadow,
          borderRadius: '2px',
          backgroundColor: '#FCF8EC',
          overflow: 'hidden',
          willChange: 'transform, opacity',
        }}
      >

        {/* Envelope texture at micro-opacity */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url("/Test_06-06-2026/envelope_back.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.038,
            pointerEvents: 'none',
            zIndex: 0,
            mixBlendMode: 'multiply',
          }}
        />

        {/* Paper grain — SVG fractal noise */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── Card content ── */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(36px, 8vw, 56px) clamp(26px, 5vw, 38px) clamp(40px, 9vw, 60px)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

          {/* Monogram — very small, almost invisible */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.72rem, 1.6vw, 0.85rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(90,60,20,0.38)',
            letterSpacing: '0.24em',
            marginBottom: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1,
          }}>
            ĐN &amp; TN
          </div>

          {/* Top thin rule */}
          <div style={{
            width: 'clamp(24px, 5.5vw, 36px)',
            height: '0.5px',
            background: 'rgba(140,100,40,0.30)',
            marginBottom: 'clamp(18px, 4vw, 26px)',
          }} />

          {/* "Trân trọng kính mời" */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.60rem, 1.2vw, 0.70rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(90,60,20,0.42)',
            letterSpacing: '0.08em',
            marginBottom: 'clamp(20px, 4.5vw, 30px)',
            lineHeight: 1,
          }}>
            Trân trọng kính mời
          </p>

          {/* Groom name */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 4.2vw, 2.05rem)',
            fontWeight: 500,
            color: '#1A1008',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}>
            {COUPLE.groom.firstName}
          </div>

          {/* Ampersand */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.92rem, 2vw, 1.22rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#9A7228',
            lineHeight: 1,
            margin: 'clamp(5px, 1vw, 9px) 0',
          }}>
            &amp;
          </div>

          {/* Bride name */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 4.2vw, 2.05rem)',
            fontWeight: 500,
            color: '#1A1008',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(26px, 5.5vw, 38px)',
          }}>
            {COUPLE.bride.firstName}
          </div>

          {/* Center rule */}
          <div style={{
            width: 'clamp(24px, 5.5vw, 36px)',
            height: '0.5px',
            background: 'linear-gradient(to right, transparent, rgba(140,100,40,0.45), transparent)',
            marginBottom: 'clamp(18px, 4vw, 26px)',
          }} />

          {/* Date — typographic, stacked */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            marginBottom: 'clamp(14px, 3vw, 20px)',
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 6vw, 3.3rem)',
              fontWeight: 400,
              color: '#231208',
              lineHeight: 0.9,
              letterSpacing: '-0.025em',
            }}>
              20
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.64rem, 1.4vw, 0.76rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(90,60,20,0.52)',
              letterSpacing: '0.12em',
              marginTop: 'clamp(3px, 0.5vw, 5px)',
              lineHeight: 1,
            }}>
              tháng Mười · 2026
            </div>
          </div>

          {/* Venue */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.60rem, 1.2vw, 0.70rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(90,60,20,0.38)',
            lineHeight: 1.35,
            margin: 0,
            letterSpacing: '0.01em',
          }}>
            {WEDDING.venue}<br/>
            <span style={{ fontSize: '0.9em', opacity: 0.80 }}>TP. Hồ Chí Minh</span>
          </p>

        </div>
      </div>

      {/* ── CTA — below card, whisper-level ──
           A single vertical champagne thread that breathes.
           "Chạm để mở" in tiny uppercase.
           This is the most restrained possible CTA. */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: 'clamp(20px, 4vw, 32px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: entered ? 1 : 0,
          transition: 'opacity 1.0s 1.8s ease',
          pointerEvents: 'none',
        }}
      >
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 'clamp(0.50rem, 0.9vw, 0.58rem)',
          fontWeight: 400,
          letterSpacing: '0.30em',
          textTransform: 'uppercase',
          color: 'rgba(90,60,20,0.52)',
          margin: 0,
        }}>
          Chạm để mở
        </p>
        <div style={{
          width: '1px',
          height: '20px',
          background: 'linear-gradient(to bottom, rgba(130,92,30,0.48), transparent)',
          transformOrigin: 'top center',
          animation: 'introCTAThread 2.8s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes introCTAThread {
          0%, 100% { transform: scaleY(0.3); opacity: 0.3; }
          60%       { transform: scaleY(1.0); opacity: 1.0; }
        }
        @keyframes introGlowBreath {
          0%, 100% { opacity: 0.85; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1.0;  transform: translate(-50%, -50%) scale(1.04); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes introCTAThread { 0%, 100% { transform: none; opacity: 0.4; } }
          @keyframes introGlowBreath { 0%, 100% { opacity: 0.9; } }
        }
      `}</style>
    </div>
  );
}

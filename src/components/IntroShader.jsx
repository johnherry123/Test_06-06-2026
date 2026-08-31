/* ══════════════════════════════════════════════════════════════════════
   INTRO — Soft Editorial Stationery
   ──────────────────────────────────────────────────────────────────────
   Art direction: A beautiful physical wedding invitation, photographed
   in soft natural daylight on warm ivory paper.

   Concept: NOT a cinematic intro. NOT a website hero. NOT a movie trailer.
   It should feel like: opening an envelope and finding this inside.

   Animation sequence:
     1. Warm ivory background fades in (instant, no flash)
     2. Invitation card drifts up gently + fades in (1.8s)
     3. "Chạm để mở" CTA fades in after card (delay 1.2s)
     4. On click anywhere: card softly scales + fades → onComplete()

   Removed from previous version:
     - CSS polygon envelope (synthetic-looking)
     - Multiple botanical SVG layers (geometric, artificial)
     - Complex phase machine (lifting/revealing/fullscreen/exit)
     - Fullscreen photo reveal (wrong emotional tone)
     - Dark espresso background moments
     - Multiple grain/noise layers
     - Giant wax seal SVG
     - Heavy radial vignettes
     - Dramatic cinematic zoom

   Accessibility: prefers-reduced-motion supported — fades only, no motion.
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useCallback } from 'react';
import { COUPLE, WEDDING } from '../weddingData';

/* ── Delicate organic botanical — hand-drawn feeling SVG ──
   Asymmetric, small, top-left of card.
   Uses a single curved branch with simple leaves — restrained. */
function DelicateBotanical() {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {/* Main stem — organic curve */}
      <path
        d="M 60 155 C 58 130 54 110 48 90 C 42 70 32 52 24 38 C 18 28 14 18 18 8"
        stroke="rgba(120,95,55,0.45)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left branch */}
      <path
        d="M 42 82 C 30 76 20 72 10 74"
        stroke="rgba(120,95,55,0.38)"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right branch */}
      <path
        d="M 46 68 C 56 60 62 54 66 46"
        stroke="rgba(120,95,55,0.35)"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small leaves on left branch */}
      <ellipse cx="14" cy="71" rx="6" ry="3.5" transform="rotate(-20 14 71)" fill="rgba(100,130,80,0.28)" />
      <ellipse cx="22" cy="69" rx="5" ry="3" transform="rotate(-35 22 69)" fill="rgba(100,130,80,0.24)" />
      <ellipse cx="8"  cy="76" rx="4" ry="2.5" transform="rotate(10 8 76)"  fill="rgba(100,130,80,0.20)" />
      {/* Leaves on right branch */}
      <ellipse cx="63" cy="49" rx="6" ry="3"   transform="rotate(50 63 49)" fill="rgba(100,130,80,0.25)" />
      <ellipse cx="56" cy="55" rx="5" ry="3"   transform="rotate(30 56 55)" fill="rgba(100,130,80,0.22)" />
      {/* Small leaves on main stem */}
      <ellipse cx="28" cy="40" rx="7" ry="3.5" transform="rotate(-60 28 40)" fill="rgba(100,130,80,0.22)" />
      <ellipse cx="36" cy="60" rx="6" ry="3"   transform="rotate(-45 36 60)" fill="rgba(100,130,80,0.18)" />
      <ellipse cx="50" cy="100" rx="7" ry="3"  transform="rotate(-30 50 100)" fill="rgba(100,130,80,0.18)" />
      {/* Tiny flower bud at top */}
      <circle cx="18" cy="8" r="3" fill="rgba(184,149,85,0.30)" />
      <circle cx="18" cy="8" r="1.5" fill="rgba(184,149,85,0.45)" />
    </svg>
  );
}

/* ── Thin champagne rule ── */
function GoldRule({ width = '32px', opacity = 0.5 }) {
  return (
    <div aria-hidden="true" style={{
      width, height: '0.6px',
      background: `linear-gradient(to right, transparent, rgba(184,149,85,${opacity}), transparent)`,
      margin: '0 auto',
    }} />
  );
}

export default function IntroShader({ onComplete }) {
  /* Single simple state: idle → opening → done */
  const [phase, setPhase] = useState('idle'); // idle | opening | done
  const [entered, setEntered] = useState(false);

  /* Entrance animation — card drifts in from below */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* prefers-reduced-motion — skip animation entirely */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setEntered(true);
    }
  }, []);

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('opening');
    /* After fade-out completes → notify parent */
    setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 820);
  }, [phase, onComplete]);

  /* Keyboard support */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleOpen();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleOpen]);

  /* Derived visual states */
  const isOpening = phase === 'opening';

  /* ── Root container ──
     Full-viewport warm ivory. Click anywhere triggers opening. */
  return (
    <div
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label="Chạm để mở thiệp cưới"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        /* Warm ivory — clean, natural, paper-like */
        backgroundColor: '#F5EDE0',
        /* Fade out entire intro on opening */
        opacity: isOpening ? 0 : 1,
        transition: isOpening
          ? 'opacity 0.72s cubic-bezier(0.4, 0, 0.6, 1)'
          : 'none',
        cursor: phase === 'idle' ? 'pointer' : 'default',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        /* Very subtle warm vignette — almost invisible */
        background: `
          radial-gradient(ellipse 90% 80% at 50% 45%,
            #FAF4E8 0%,
            #F3E9D4 55%,
            #EAD9BE 100%
          )
        `,
      }}
    >
      {/* ── Botanical element — top-left, asymmetric, small ──
           Positioned outside the card, framing it from upper-left. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          /* Positioned relative to card — upper left corner area */
          top: 'clamp(12%, 16vh, 18%)',
          left: 'clamp(4%, 6vw, 10%)',
          /* Small: frames without competing — ~72px mobile */
          width:  'clamp(52px, 8vw, 88px)',
          height: 'clamp(72px, 11vh, 120px)',
          opacity: entered ? 0.88 : 0,
          transform: entered ? 'translateY(0) rotate(-6deg)' : 'translateY(12px) rotate(-6deg)',
          transition: 'opacity 2.2s 0.6s ease, transform 2.2s 0.6s ease',
          pointerEvents: 'none',
        }}
      >
        <DelicateBotanical />
      </div>

      {/* ── Mirrored smaller botanical — bottom-right ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(10%, 14vh, 16%)',
          right: 'clamp(4%, 6vw, 10%)',
          width:  'clamp(36px, 5vw, 60px)',
          height: 'clamp(50px, 8vh, 82px)',
          opacity: entered ? 0.55 : 0,
          transform: entered ? 'translateY(0) rotate(168deg) scaleX(-1)' : 'translateY(8px) rotate(168deg) scaleX(-1)',
          transition: 'opacity 2.2s 0.9s ease, transform 2.2s 0.9s ease',
          pointerEvents: 'none',
        }}
      >
        <DelicateBotanical />
      </div>

      {/* ══ INVITATION CARD ══
          Portrait, small, elegant — like holding an actual card.
          Mobile 390px: ~56vw = ~218px wide. Not a poster. Not a banner.
          Natural ambient shadow — paper sitting on a surface. */}
      <div
        style={{
          /*
           * Size: small enough to feel like a real card held in hand.
           *   390px mobile → 56vw = ~218px
           *   1440px desktop → max 300px
           */
          width: 'clamp(200px, 56vw, 300px)',
          position: 'relative',
          /* Gentle drift-up entrance */
          opacity: entered ? 1 : 0,
          transform: entered
            ? (isOpening ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)')
            : 'translateY(18px) scale(0.98)',
          transition: entered
            ? (isOpening
                ? 'transform 0.6s cubic-bezier(0.4,0,0.2,1)'
                : 'none')
            : 'opacity 1.8s ease, transform 1.8s cubic-bezier(0.16,1,0.3,1)',
          /* Natural paper shadow */
          boxShadow: [
            '0 2px 4px rgba(60,40,20,0.06)',
            '0 8px 24px rgba(60,40,20,0.09)',
            '0 20px 56px rgba(60,40,20,0.08)',
            '0 1px 0px rgba(255,255,255,0.7) inset',
          ].join(', '),
          /* Thin champagne border — stationery aesthetic */
          border: '0.8px solid rgba(184,149,85,0.28)',
          borderRadius: '1px',
          overflow: 'hidden',
          backgroundColor: '#FDFBF6',
        }}
      >
        {/* Very subtle paper texture — FEEL it, don't SEE it */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23p)' opacity='0.018'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px',
          }}
        />

        {/* Card inner padding */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: 'clamp(28px, 7vw, 44px) clamp(20px, 5vw, 32px)',
          textAlign: 'center',
        }}>

          {/* ── Monogram / Initials ── */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#B89555',
            letterSpacing: '0.08em',
            marginBottom: 'clamp(10px, 2.5vw, 16px)',
            lineHeight: 1,
          }}>
            ĐN
          </div>

          {/* Top thin rule */}
          <GoldRule width="clamp(24px,5vw,36px)" opacity={0.4} />

          {/* Couple names — the dominant typographic element */}
          <div style={{ margin: 'clamp(16px, 4vw, 24px) 0' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.15rem, 3.2vw, 1.7rem)',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}>
              {COUPLE.groom.firstName}
            </div>

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#B89555',
              lineHeight: 1,
              margin: 'clamp(6px, 1.5vw, 10px) 0',
            }}>
              &amp;
            </div>

            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.15rem, 3.2vw, 1.7rem)',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}>
              {COUPLE.bride.firstName}
            </div>
          </div>

          {/* Bottom thin rule */}
          <GoldRule width="clamp(24px,5vw,36px)" opacity={0.35} />

          {/* Date */}
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.56rem, 1.2vw, 0.66rem)',
            fontWeight: 500,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#9E8E7E',
            marginTop: 'clamp(12px, 3vw, 18px)',
            marginBottom: 0,
          }}>
            {WEDDING.date}
          </p>

          {/* Venue — smallest, most discreet */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.66rem, 1.4vw, 0.78rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#B0A090',
            marginTop: 'clamp(4px, 1vw, 7px)',
            marginBottom: 0,
          }}>
            {WEDDING.venue}
          </p>

        </div>
      </div>

      {/* ── CTA — below the card, restrained ──
           Fades in after card. Simple, not demanding. */}
      <div
        aria-hidden="true"
        style={{
          marginTop: 'clamp(20px, 3.5vw, 28px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: entered ? 1 : 0,
          transition: 'opacity 1.2s 1.4s ease',
          pointerEvents: 'none',
        }}
      >
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 'clamp(0.60rem, 1.2vw, 0.68rem)',
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(90,75,62,0.55)',
          margin: 0,
        }}>
          Chạm để mở
        </p>
        {/* Small animated chevron */}
        <svg
          width="12" height="7" viewBox="0 0 12 7"
          fill="none" stroke="rgba(90,75,62,0.35)"
          strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
          style={{
            animation: 'introChevronFloat 2s ease-in-out infinite',
          }}
          aria-hidden="true"
        >
          <path d="M1 1l5 5 5-5" />
        </svg>
      </div>

      {/* Chevron float animation */}
      <style>{`
        @keyframes introChevronFloat {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(3px); opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes introChevronFloat { 0%, 100% { transform: none; } }
        }
      `}</style>
    </div>
  );
}

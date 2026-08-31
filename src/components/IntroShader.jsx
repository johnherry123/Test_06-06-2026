/* ══════════════════════════════════════════════════════════════════════
   INTRO — Atmospheric Wedding Experience  [REBUILT]
   ──────────────────────────────────────────────────────────────────────
   ART DIRECTION:
   The intro IS a photographic moment — a beautifully photographed
   invitation card resting in a warm, atmospheric environment.

   Visual composition:
     [full-screen atmospheric photo — darkened, cinematic warm]
     [warm espresso color overlay — creates physical depth]
     [lotus botanical — large, partially off-screen, upper-left]
     [invitation card — off-center, slightly tilted, physical paper]
     [CTA — barely visible, inviting]

   Animation:
     1. Photo fades in slowly (2.0s — creates atmosphere before anything)
     2. Botanical drifts in from upper-left (1.8s, delay 0.3s)
     3. Card rises into position (1.4s, delay 0.5s)
     4. CTA fades in last (0.8s, delay 1.8s)
     5. Click: card lifts + scene fades → Hero emerges beneath

   Design decisions:
   • Photo IS the background — not decoration, it's the scene
   • Card tilt (-0.8deg) gives physicality vs. UI flatness
   • Envelope texture at 5.5% — feel paper, don't see texture
   • Botanical: mix-blend-mode screen on dark photo = luminous illustration
   • No chevron CTA — a growing thin line is more elegant
   • Warm overlay: keeps card warm even on cool-toned photos

   Previous version problems fixed:
   • Was: developer SVG botanical paths on plain beige
   • Was: small card (56vw = 218px on mobile) — too safe, too empty
   • Was: boring fade-only entrance with no scene-setting
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useCallback } from 'react';
import { COUPLE, WEDDING, INTRO_PHOTO } from '../weddingData';

export default function IntroShader({ onComplete }) {
  const [entered, setEntered]       = useState(false);
  const [photoReady, setPhotoReady] = useState(false);
  const [phase, setPhase]           = useState('idle'); // idle | opening

  /* Preload photo — start entrance only after photo loads */
  useEffect(() => {
    const img = new Image();
    const done = () => {
      setPhotoReady(true);
      setTimeout(() => setEntered(true), 80);
    };
    img.addEventListener('load', done);
    img.addEventListener('error', done); // Fail gracefully
    img.src = INTRO_PHOTO.src;
    if (img.complete) done();
    return () => { img.removeEventListener('load', done); img.removeEventListener('error', done); };
  }, []);

  /* prefers-reduced-motion — skip all animation */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhotoReady(true);
      setEntered(true);
    }
  }, []);

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('opening');
    setTimeout(() => onComplete?.(), 820);
  }, [phase, onComplete]);

  /* Keyboard: Enter or Space opens */
  useEffect(() => {
    const h = (e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [handleOpen]);

  const isOpening = phase === 'opening';

  return (
    <div
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label="Chạm để xem thiệp cưới"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        /* Dark warm base — visible before photo loads */
        backgroundColor: '#16100A',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overflow: 'hidden',
        /* Opening: whole scene fades to reveal Hero below */
        opacity: isOpening ? 0 : 1,
        transition: isOpening ? 'opacity 0.8s cubic-bezier(0.4,0,1,1)' : 'none',
      }}
    >

      {/* ── Layer 1: Atmospheric photo background ──
           Darkened and desaturated. Creates the physical "scene" environment.
           Photo fades in slowly — atmosphere builds before card appears. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-6px', /* Prevent subpixel white edge on some browsers */
          backgroundImage: photoReady ? `url("${INTRO_PHOTO.src}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          opacity: (photoReady && entered) ? 1 : 0,
          transition: 'opacity 2.0s ease',
          /* Dark, warm, slightly desaturated — creates paper/candlelight environment */
          /* Keep photo in separate preload reference — avoid re-render flicker */
          filter: 'brightness(0.38) saturate(0.68) sepia(0.12)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 2: Warm color atmosphere overlay ──
           Deep warm espresso with subtle radial warmth in the center.
           This gives the card a "warm spotlight" feel — as if the invitation
           is illuminated by window light or candlelight. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 100% 90% at 45% 55%,
              rgba(72,35,10,0.38) 0%,
              rgba(26,13,4,0.62) 55%,
              rgba(14,7,2,0.80) 100%
            )
          `,
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 3: Lotus botanical — upper left, large ──
           Uses mix-blend-mode:screen on the dark photo background.
           Result: looks like a luminous botanical illustration in natural light.
           Positioned partially off-screen for asymmetry + editorial feel. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'clamp(-70px, -7vh, -30px)',
          left: 'clamp(-55px, -5vw, -20px)',
          width: 'clamp(190px, 30vw, 320px)',
          opacity: entered ? 0.62 : 0,
          transform: entered
            ? 'translate(0,0) rotate(-10deg)'
            : 'translate(-28px,-28px) rotate(-10deg)',
          transition: 'opacity 1.8s 0.35s ease, transform 1.8s 0.35s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none',
          filter: 'sepia(55%) saturate(0.75) brightness(1.55)',
          mixBlendMode: 'screen',
        }}
      >
        <img
          src="/Test_06-06-2026/lotus-botanical.svg"
          alt=""
          role="presentation"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* ── Secondary botanical — bottom right, mirrored, smaller ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(-35px, -3.5vh, -15px)',
          right: 'clamp(-35px, -3.5vw, -15px)',
          width: 'clamp(120px, 18vw, 210px)',
          opacity: entered ? 0.36 : 0,
          transform: entered
            ? 'rotate(174deg) scaleX(-1)'
            : 'translate(20px, 20px) rotate(174deg) scaleX(-1)',
          transition: 'opacity 1.8s 0.65s ease, transform 1.8s 0.65s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none',
          filter: 'sepia(55%) saturate(0.75) brightness(1.55)',
          mixBlendMode: 'screen',
        }}
      >
        <img
          src="/Test_06-06-2026/lotus-botanical.svg"
          alt=""
          role="presentation"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* ══ INVITATION CARD ══════════════════════════════════════
           Physical paper invitation resting in the scene.
           Key details that make it feel physical vs. UI:
           • Slight tilt (-0.8deg) — real cards aren't perfectly straight
           • Multi-layer shadow — depth from ambient + direct light
           • Envelope_back.png at 5.5% — feel texture, don't see it
           • SVG noise layer — paper grain (imperceptible but felt)
           • borderRadius: 1.5px — real paper has slightly soft edges
      ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'clamp(252px, 68vw, 340px)',
          opacity: entered ? 1 : 0,
          transform: entered
            ? (isOpening
                ? 'translateY(-22px) rotate(-0.8deg) scale(1.022)'
                : 'translateY(0) rotate(-0.8deg) scale(1)')
            : 'translateY(40px) rotate(-0.8deg) scale(0.95)',
          transition: entered
            ? (isOpening
                ? 'transform 0.68s cubic-bezier(0.4,0,0.2,1)'
                : 'none')
            : 'opacity 1.4s 0.5s ease, transform 1.4s 0.5s cubic-bezier(0.16,1,0.3,1)',
          /* Realistic paper shadow — simulates ambient + raked light */
          boxShadow: [
            '0 1px 2px rgba(6,3,1,0.30)',
            '0 4px 14px rgba(6,3,1,0.25)',
            '0 16px 44px rgba(6,3,1,0.30)',
            '0 44px 90px rgba(6,3,1,0.22)',
            'inset 0 0 0 0.5px rgba(240,215,160,0.20)',
          ].join(', '),
          borderRadius: '1.5px',
          overflow: 'hidden',
          /* Warm cotton paper base */
          backgroundColor: '#FDFAF3',
        }}
      >

        {/* Envelope texture — warmth and botanical letterpress at micro-opacity */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url("/Test_06-06-2026/envelope_back.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.055,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* SVG paper grain — tactile without visible noise */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.022'/%3E%3C/svg%3E")`,
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
          /* Vertical padding > horizontal = portrait invitation proportions */
          padding: 'clamp(48px, 11vw, 72px) clamp(28px, 6vw, 44px)',
          textAlign: 'center',
        }}>

          {/* Header — smallest, most discreet */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.64rem, 1.4vw, 0.76rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(75,55,32,0.52)',
            letterSpacing: '0.10em',
            marginBottom: 'clamp(24px, 5.5vw, 36px)',
            lineHeight: 1,
          }}>
            Trân trọng kính mời
          </p>

          {/* Groom — dominant typography */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.55rem, 4.6vw, 2.25rem)',
            fontWeight: 500,
            color: '#19100A',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}>
            {COUPLE.groom.firstName}
          </div>

          {/* Ampersand — champagne, italic, breathes */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.05rem, 2.6vw, 1.5rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#B89555',
            lineHeight: 1,
            margin: 'clamp(7px, 1.3vw, 11px) 0',
          }}>
            &amp;
          </div>

          {/* Bride — same weight as groom */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.55rem, 4.6vw, 2.25rem)',
            fontWeight: 500,
            color: '#19100A',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(22px, 5vw, 32px)',
          }}>
            {COUPLE.bride.firstName}
          </div>

          {/* Champagne rule — narrow, centered */}
          <div style={{
            width: 'clamp(32px, 8vw, 46px)',
            height: '0.7px',
            background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.65), transparent)',
            margin: '0 auto clamp(18px, 4vw, 26px)',
          }} />

          {/* Date — small caps */}
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.58rem, 1.2vw, 0.68rem)',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(62,45,25,0.60)',
            marginBottom: 'clamp(6px, 1.2vw, 9px)',
            lineHeight: 1,
          }}>
            {WEDDING.date}
          </p>

          {/* Venue — softest element */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.68rem, 1.4vw, 0.80rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(75,55,32,0.48)',
            lineHeight: 1,
            margin: 0,
          }}>
            {WEDDING.venue}
          </p>

        </div>
      </div>

      {/* ── CTA — minimal, below card ──
           A growing line is more elegant than a chevron or button.
           Color: warm ivory at low opacity — invites without demanding. */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: 'clamp(24px, 5vw, 36px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          opacity: entered ? 1 : 0,
          transition: 'opacity 0.8s 1.8s ease',
          pointerEvents: 'none',
        }}
      >
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 'clamp(0.56rem, 1.1vw, 0.64rem)',
          fontWeight: 400,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'rgba(240,218,182,0.48)',
          margin: 0,
        }}>
          Chạm để xem
        </p>
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'linear-gradient(to bottom, rgba(236,212,168,0.48), transparent)',
            transformOrigin: 'top center',
            animation: 'introLinePulse 2.4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes introLinePulse {
          0%, 100% { transform: scaleY(0.35); opacity: 0.30; }
          55%       { transform: scaleY(1.00); opacity: 0.85; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes introLinePulse { 0%, 100% { transform: none; opacity: 0.5; } }
        }
      `}</style>
    </div>
  );
}

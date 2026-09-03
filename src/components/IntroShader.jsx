/* ══════════════════════════════════════════════════════════════════════
   INTRO — Physical Wedding Invitation  [REFINED]
   ──────────────────────────────────────────────────────────────────────
   
   AUDIT FINDINGS fixed in this version:
   
   PROBLEM: Wax seal existed only in code comments — not in the actual UI.
   FIX: Wax seal SVG is now rendered as the primary interaction point.
        It sits centered on the card. Hover: seal breathes subtly.
        Click: seal "presses" (scale down briefly), then the card opens.
   
   PROBLEM: "Opening" was just translateY(-108vh) — card flies away.
   FIX: Two-layer opening:
        1. Card itself slides up with realistic physics
        2. Scene background cross-fades into Hero warmth, not hard cut
   
   PROBLEM: Background was a very visible radial gradient "glow" 
            centered behind the card — too digital-looking.
   FIX: Flatter, more uniform warm paper surface. The center lightness
        is reduced. Edge vignette kept very subtle.

   PROBLEM: "Chạm để mở" text was hidden (aria-hidden) and 
            pointerEvents: none — inaccessible.
   FIX: Moved below seal as a visible visual cue. Removed aria-hidden.
   
   KEPT:
   - Paper grain SVG
   - Envelope texture at micro-opacity
   - 4-layer physical shadow stack
   - Card proportions and typography hierarchy
   - prefers-reduced-motion support
   - Keyboard accessibility
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useCallback, useRef } from 'react';
import { COUPLE, WEDDING } from '../weddingData';

/* Wax seal path — inline for reliable rendering without asset load delay */
const WAX_SEAL_PATH = '/Test_06-06-2026/wax-seal.svg';

export default function IntroShader({ onComplete }) {
  const [entered,   setEntered]   = useState(false);
  const [phase,     setPhase]     = useState('idle'); // idle | sealing | lifting | exiting
  const [isHovered, setIsHovered] = useState(false);
  const [sealPressed, setSealPressed] = useState(false);

  /* Entrance — short delay so paint is ready */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* prefers-reduced-motion: skip animation entirely */
  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return;

    if (reducedMotion) {
      setPhase('exiting');
      setTimeout(() => onComplete?.(), 200);
      return;
    }

    /* Seal press feedback */
    setSealPressed(true);
    setPhase('sealing');

    /* After seal press: lift card */
    setTimeout(() => {
      setSealPressed(false);
      setPhase('lifting');
    }, 340);

    /* Card sweeps: start exiting */
    setTimeout(() => setPhase('exiting'), 660);

    /* Signal parent — Hero can mount */
    setTimeout(() => onComplete?.(), 1080);
  }, [phase, onComplete, reducedMotion]);

  /* Keyboard */
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleOpen();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [handleOpen]);

  const isLifting = phase === 'lifting';
  const isExiting = phase === 'exiting';
  const isSealing = phase === 'sealing';

  /* ── Card transform states ──
     idle:     slight natural tilt, resting
     hovered:  lifts 5px, rotates a touch more — physical pickup
     sealing:  presses down slightly — weight of tap
     lifting:  rises, rotates, scale up slightly — paper leaving surface
     exiting:  sweeps up fast with mild tilt
  */
  const cardTransform = (() => {
    if (!entered)     return 'translateY(52px) rotate(-1.8deg) scale(0.92)';
    if (isExiting)    return 'translateY(-115vh) rotate(-5deg) scale(1.02)';
    if (isLifting)    return 'translateY(-12px) rotate(-3.2deg) scale(1.02)';
    if (isSealing)    return 'translateY(3px) rotate(-1.2deg) scale(0.985)';
    if (isHovered)    return 'translateY(-7px) rotate(-2.5deg) scale(1.014)';
    return 'translateY(0px) rotate(-1.8deg) scale(1)';
  })();

  const cardTransition = (() => {
    if (!entered)  return 'none';
    if (isExiting) return 'transform 0.72s cubic-bezier(0.55, 0, 0.88, 0.42), opacity 0.5s ease 0.05s';
    if (isLifting) return 'transform 0.36s cubic-bezier(0.34, 1.56, 0.64, 1)';
    if (isSealing) return 'transform 0.18s cubic-bezier(0.55, 0, 1, 1)';
    if (isHovered) return 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
    return 'transform 1.5s cubic-bezier(0.16,1,0.3,1), opacity 1.1s cubic-bezier(0.16,1,0.3,1)';
  })();

  /* Shadow deepens on hover, lightens on press */
  const cardShadow = (() => {
    if (isSealing) return [
      '0 1px 3px rgba(50,30,8,0.05)',
      '0 4px 14px rgba(50,30,8,0.10)',
      '0 10px 32px rgba(50,30,8,0.10)',
      'inset 0 0 0 0.5px rgba(255,240,200,0.45)',
    ].join(', ');
    if (isHovered && phase === 'idle') return [
      '0 3px 6px rgba(50,30,8,0.07)',
      '0 12px 30px rgba(50,30,8,0.17)',
      '0 34px 76px rgba(50,30,8,0.20)',
      '0 58px 116px rgba(50,30,8,0.14)',
      'inset 0 0 0 0.5px rgba(255,240,200,0.62)',
    ].join(', ');
    return [
      '0 2px 4px rgba(50,30,8,0.07)',
      '0 8px 22px rgba(50,30,8,0.13)',
      '0 26px 62px rgba(50,30,8,0.15)',
      '0 46px 94px rgba(50,30,8,0.10)',
      'inset 0 0 0 0.5px rgba(255,240,200,0.50)',
    ].join(', ');
  })();

  /* Scene fades with card */
  const sceneOpacity    = isExiting ? 0 : 1;
  const sceneTransition = isExiting ? 'opacity 0.60s ease 0.10s' : 'none';

  return (
    <div
      onClick={handleOpen}
      onMouseEnter={() => phase === 'idle' && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Chạm để mở thiệp cưới"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: isLifting || isExiting ? 'default' : 'pointer',
        userSelect: 'none', WebkitUserSelect: 'none',
        overflow: 'hidden',
        opacity: sceneOpacity,
        transition: sceneTransition,
      }}
    >

      {/* ── Surface background ──
           Warm paper/stationery feel.
           Flat enough to feel physical, not digital.
           Avoid prominent center glow — too "spotlight". */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(
            ellipse 110% 100% at 50% 48%,
            #F0E4C4 0%,
            #EAD9AB 38%,
            #E3CC90 68%,
            #D9C07B 88%,
            #CDB56A 100%
          )
        `,
        pointerEvents: 'none',
      }} />

      {/* Corner vignette — just edges, not a bloom */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(
            ellipse 108% 108% at 50% 50%,
            transparent 50%,
            rgba(80,55,15,0.18) 100%
          )
        `,
        pointerEvents: 'none',
      }} />

      {/* Paper texture on surface */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.020'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '160px 160px',
      }} />

      {/* ══ INVITATION CARD ══════════════════════════════════════════════
           Physical proportions: ~A5 portrait  (148 × 210mm ratio ≈ 0.70)
           Width constrained: never wider than 344px on desktop,
                              never narrower than 272px on mobile.
           Natural slight tilt at -1.8deg — resting on surface.
      ════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'clamp(272px, 60vw, 344px)',
          opacity: entered ? 1 : 0,
          transform: cardTransform,
          transition: cardTransition,
          boxShadow: cardShadow,
          borderRadius: '2px',
          backgroundColor: '#FCF8EE',
          overflow: 'hidden',
          willChange: 'transform, opacity',
        }}
      >
        {/* Envelope texture — extremely subtle */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("/Test_06-06-2026/envelope_back.png")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.032, pointerEvents: 'none', zIndex: 0,
          mixBlendMode: 'multiply',
        }} />

        {/* Paper grain */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.74' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.026'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '180px 180px',
        }} />

        {/* ── Card content ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: 'clamp(38px, 9vw, 58px) clamp(28px, 6vw, 40px) clamp(28px, 6vw, 40px)',
          textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>

          {/* "Trân trọng kính mời" — first line */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.58rem, 1.1vw, 0.68rem)',
            fontStyle: 'italic', fontWeight: 400,
            color: 'rgba(80,54,16,0.48)',
            letterSpacing: '0.10em',
            marginBottom: 'clamp(16px, 3.5vw, 24px)',
            lineHeight: 1,
          }}>
            Trân trọng kính mời
          </p>

          {/* Thin rule */}
          <div style={{
            width: 'clamp(22px, 5vw, 32px)', height: '0.5px',
            background: 'linear-gradient(to right, transparent, rgba(130,95,35,0.38), transparent)',
            marginBottom: 'clamp(16px, 3.5vw, 24px)',
          }} />

          {/* Groom */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.48rem, 4.2vw, 2.0rem)',
            fontWeight: 500, color: '#1A1008',
            lineHeight: 1.05, letterSpacing: '-0.01em',
          }}>
            {COUPLE.groom.firstName}
          </div>

          {/* Ampersand */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.90rem, 2vw, 1.18rem)',
            fontStyle: 'italic', fontWeight: 300,
            color: '#9A7228',
            lineHeight: 1, margin: 'clamp(4px, 0.8vw, 8px) 0',
          }}>
            &amp;
          </div>

          {/* Bride */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.48rem, 4.2vw, 2.0rem)',
            fontWeight: 500, color: '#1A1008',
            lineHeight: 1.05, letterSpacing: '-0.01em',
            marginBottom: 'clamp(22px, 5vw, 32px)',
          }}>
            {COUPLE.bride.firstName}
          </div>

          {/* ── WAX SEAL — the interaction point ──
               Centered on card. Sits between names and date.
               Hover: breathes subtly.
               Click (sealing): presses / scale down briefly.
               This is the tactile focal point. */}
          <div style={{
            width: 'clamp(52px, 12vw, 64px)',
            height: 'clamp(52px, 12vw, 64px)',
            marginBottom: 'clamp(20px, 4.5vw, 28px)',
            position: 'relative',
            transform: sealPressed ? 'scale(0.88)' : isHovered ? 'scale(1.06)' : 'scale(1)',
            transition: sealPressed
              ? 'transform 0.16s cubic-bezier(0.55, 0, 1, 1)'
              : 'transform 0.50s cubic-bezier(0.16, 1, 0.3, 1)',
            animation: entered && !isHovered && !sealPressed && phase === 'idle'
              ? 'sealBreath 4.5s ease-in-out infinite'
              : 'none',
          }}>
            <img
              src={WAX_SEAL_PATH}
              alt="Wax seal — nhấn để mở thiệp"
              width="64" height="64"
              style={{
                width: '100%', height: '100%',
                display: 'block',
                opacity: 0.92,
                filter: sealPressed ? 'brightness(0.82)' : 'brightness(1)',
                transition: 'filter 0.15s ease',
              }}
              onError={e => {
                /* Fallback: inline SVG circle if asset fails */
                e.currentTarget.parentElement.innerHTML = `
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
                    <circle cx="32" cy="32" r="29" fill="#7C1D21" opacity="0.92"/>
                    <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.10)" stroke-width="0.5" fill="none"/>
                    <circle cx="32" cy="32" r="22" stroke="rgba(248,244,236,0.18)" stroke-width="0.5" fill="none" stroke-dasharray="2 3"/>
                    <text x="32" y="37" font-family="Georgia,serif" font-size="14" font-style="italic" fill="#FDF8EC" text-anchor="middle" opacity="0.95">ĐN</text>
                  </svg>`;
              }}
            />
          </div>

          {/* Date */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.0rem, 5.5vw, 3.0rem)',
            fontWeight: 400, color: '#231208',
            lineHeight: 0.9, letterSpacing: '-0.025em',
            marginBottom: 'clamp(3px, 0.6vw, 6px)',
          }}>
            20
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.62rem, 1.3vw, 0.74rem)',
            fontStyle: 'italic', fontWeight: 400,
            color: 'rgba(80,54,16,0.52)',
            letterSpacing: '0.12em',
            marginBottom: 'clamp(12px, 2.5vw, 18px)',
            lineHeight: 1,
          }}>
            tháng Mười · 2026
          </div>

          {/* Venue */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.58rem, 1.1vw, 0.68rem)',
            fontStyle: 'italic', fontWeight: 400,
            color: 'rgba(80,54,16,0.36)',
            lineHeight: 1.4, margin: 0, letterSpacing: '0.01em',
          }}>
            {WEDDING.venue}
            <br/>
            <span style={{ opacity: 0.78, fontSize: '0.92em' }}>TP. Hồ Chí Minh</span>
          </p>

        </div>
      </div>

      {/* ── CTA cue — below card ──
           Visible label, not aria-hidden.
           "Nhấn để mở" is the most minimal possible instruction.
           Thread below pulses gently. */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          marginTop: 'clamp(18px, 3.5vw, 28px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '7px',
          opacity: entered && phase === 'idle' ? 1 : 0,
          transition: entered ? 'opacity 0.6s ease' : 'none',
          transitionDelay: entered ? '2.0s' : '0s',
        }}
      >
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 'clamp(0.48rem, 0.9vw, 0.56rem)',
          fontWeight: 400, letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(80,54,16,0.44)', margin: 0,
        }}>
          Nhấn để mở
        </p>
        <div style={{
          width: '1px', height: '18px',
          background: 'linear-gradient(to bottom, rgba(120,86,24,0.45), transparent)',
          transformOrigin: 'top center',
          animation: 'introCTAThread 2.6s ease-in-out infinite',
        }} aria-hidden="true" />
      </div>

      <style>{`
        @keyframes introCTAThread {
          0%, 100% { transform: scaleY(0.25); opacity: 0.25; }
          55%       { transform: scaleY(1.0);  opacity: 0.90; }
        }
        @keyframes sealBreath {
          0%, 100% { transform: scale(1.00); }
          50%       { transform: scale(1.04); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes introCTAThread { 0%, 100% { opacity: 0.35; } }
          @keyframes sealBreath { 0%, 100% { transform: none; } }
        }
      `}</style>
    </div>
  );
}

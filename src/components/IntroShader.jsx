/*
  INTRO — Wedding Invitation Front Cover
  ─────────────────────────────────────────────────────────────────
  
  Philosophy:
  This is the FRONT COVER of a physical wedding invitation.
  A guest picks it up, sees the names and date, finds the seal,
  and breaks it open. That is the entire experience.
  
  Design:
  - Cream/ivory card on a warm paper surface
  - Clean stationery typography: Cormorant + Be Vietnam Pro
  - Monogram SVG at top
  - Names: elegant serif, not huge
  - Wedding date in Be Vietnam Pro
  - Wax seal centered at bottom — the only call to action
  - "Mở thiệp" whisper text below seal
  
  Opening animation:
  - Tap seal → seal presses slightly
  - Card lifts 10px, shadow deepens
  - Card fades out in place (does NOT fly away)
  - Hero fades in beneath
  - Total: ~900ms

  Rule: The card OPENS. It does NOT disappear.
*/
import { useState, useEffect, useCallback } from 'react';
import { COUPLE, WEDDING } from '../weddingData';

export default function IntroShader({ onComplete }) {
  const [entered,  setEntered]  = useState(false);
  const [phase,    setPhase]    = useState('idle');
  // idle → pressing → lifting → opening → done

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Entrance */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  const open = useCallback(() => {
    if (phase !== 'idle') return;

    if (reducedMotion) {
      setPhase('opening');
      setTimeout(() => onComplete?.(), 300);
      return;
    }

    // 1. Seal presses
    setPhase('pressing');

    // 2. Card lifts
    setTimeout(() => setPhase('lifting'), 200);

    // 3. Card opens (fades in place — not flies away)
    setTimeout(() => setPhase('opening'), 480);

    // 4. Signal parent
    setTimeout(() => onComplete?.(), 920);
  }, [phase, onComplete, reducedMotion]);

  /* Keyboard */
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Enter' || e.key === ' ') open();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open]);

  const isPressing = phase === 'pressing';
  const isLifting  = phase === 'lifting';
  const isOpening  = phase === 'opening';

  /* Card visual state */
  const cardY = (() => {
    if (!entered) return '52px';
    if (isOpening) return '0px';
    if (isLifting) return '-10px';
    if (isPressing) return '3px';
    return '0px';
  })();

  const cardScale = (() => {
    if (!entered)   return '0.92';
    if (isOpening)  return '1.04';
    if (isLifting)  return '1.015';
    if (isPressing) return '0.984';
    return '1';
  })();

  const cardOpacity = isOpening ? 0 : entered ? 1 : 0;

  const cardTransition = (() => {
    if (!entered)   return 'none';
    if (isOpening)  return 'opacity 0.44s ease, transform 0.44s cubic-bezier(0.4,0,0.6,1)';
    if (isLifting)  return 'transform 0.32s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.32s ease';
    if (isPressing) return 'transform 0.18s cubic-bezier(0.55,0,1,1)';
    return 'opacity 1.0s cubic-bezier(0.16,1,0.3,1), transform 1.4s cubic-bezier(0.16,1,0.3,1)';
  })();

  const cardShadow = (() => {
    if (isLifting) return [
      '0 4px 8px rgba(40,24,6,0.09)',
      '0 16px 40px rgba(40,24,6,0.18)',
      '0 40px 90px rgba(40,24,6,0.18)',
      '0 72px 130px rgba(40,24,6,0.12)',
    ].join(', ');
    if (isPressing) return [
      '0 1px 4px rgba(40,24,6,0.06)',
      '0 4px 16px rgba(40,24,6,0.10)',
      '0 10px 36px rgba(40,24,6,0.10)',
    ].join(', ');
    return [
      '0 2px 5px rgba(40,24,6,0.07)',
      '0 8px 24px rgba(40,24,6,0.13)',
      '0 24px 64px rgba(40,24,6,0.14)',
      '0 48px 96px rgba(40,24,6,0.09)',
    ].join(', ');
  })();

  /* Seal visual state */
  const sealScale = isPressing ? 0.86 : 1;
  const sealTransition = isPressing
    ? 'transform 0.16s cubic-bezier(0.55,0,1,1)'
    : 'transform 0.40s cubic-bezier(0.16,1,0.3,1)';

  /* Scene fades with card opening */
  const sceneOpacity    = isOpening ? 0 : 1;
  const sceneTransition = isOpening ? 'opacity 0.42s ease 0.06s' : 'none';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        cursor: isLifting || isOpening ? 'default' : 'pointer',
        userSelect: 'none', WebkitUserSelect: 'none',
        opacity: sceneOpacity,
        transition: sceneTransition,
      }}
      onClick={open}
      role="button"
      tabIndex={0}
      aria-label="Mở thiệp cưới"
    >

      {/* ── Background surface — warm paper, not a gradient ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#EDE3C8',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.040'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '240px 240px',
        pointerEvents: 'none',
      }} />

      {/* Corner vignette — very subtle, just the edges */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 48%, rgba(60,38,10,0.20) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ══ THE INVITATION CARD ════════════════════════════════════
           Physical A5 portrait proportions.
           This is the FRONT COVER. Nothing more.
      ════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'clamp(280px, 82vw, 360px)',
          opacity: cardOpacity,
          transform: `translateY(${cardY}) scale(${cardScale})`,
          transition: cardTransition,
          boxShadow: cardShadow,
          willChange: 'transform, opacity',
        }}
      >
        {/* Card itself */}
        <div style={{
          backgroundColor: '#FAF6EC',
          /* Thin 1px border — like a printed card edge */
          border: '1px solid rgba(180,148,80,0.18)',
          /* Paper grain */
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          padding: 'clamp(44px, 10vw, 60px) clamp(32px, 7vw, 44px) clamp(40px, 9vw, 52px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}>

          {/* Thin inner border — printed stationery detail */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            inset: '8px',
            border: '0.5px solid rgba(180,148,80,0.14)',
            pointerEvents: 'none',
          }} />

          {/* Monogram */}
          <img
            src="/Test_06-06-2026/monogram.svg"
            alt=""
            aria-hidden="true"
            width="64"
            height="42"
            style={{
              opacity: 0.55,
              marginBottom: 'clamp(14px, 3.5vw, 20px)',
              filter: 'brightness(0.55) sepia(0.4)',
            }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />

          {/* Thin champagne rule */}
          <div style={{
            width: 'clamp(28px, 6vw, 40px)', height: '0.5px',
            background: 'rgba(160,120,50,0.30)',
            marginBottom: 'clamp(14px, 3.5vw, 20px)',
          }} aria-hidden="true" />

          {/* "Trân trọng kính mời" — small, quiet */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.68rem, 1.4vw, 0.82rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(80,54,16,0.55)',
            letterSpacing: '0.04em',
            marginBottom: 'clamp(20px, 5vw, 28px)',
          }}>
            Trân trọng kính mời
          </p>

          {/* Groom name */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.55rem, 4.8vw, 2.10rem)',
            fontWeight: 500,
            fontStyle: 'normal',
            color: '#1A1008',
            lineHeight: 1.10,
            letterSpacing: '0.01em',
            margin: 0,
          }}>
            {COUPLE.groom.firstName}
          </p>

          {/* Ampersand — part of the typography, not a big symbol */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.95rem, 2.2vw, 1.20rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'rgba(155,115,42,0.80)',
            margin: 'clamp(4px, 1vw, 7px) 0',
            lineHeight: 1,
          }}>
            &amp;
          </p>

          {/* Bride name */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.55rem, 4.8vw, 2.10rem)',
            fontWeight: 500,
            fontStyle: 'normal',
            color: '#1A1008',
            lineHeight: 1.10,
            letterSpacing: '0.01em',
            marginBottom: 'clamp(24px, 6vw, 34px)',
          }}>
            {COUPLE.bride.firstName}
          </p>

          {/* Wedding date */}
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.65rem, 1.4vw, 0.76rem)',
            fontWeight: 500,
            letterSpacing: '0.14em',
            color: 'rgba(80,54,16,0.50)',
            textTransform: 'uppercase',
            marginBottom: 'clamp(28px, 7vw, 38px)',
          }}>
            20 · 10 · 2026
          </p>

          {/* ── WAX SEAL — the interaction point ──
               Centered. Breathes subtly. Tap to open.
               Does NOT bounce, spin, or glow.              */}
          <button
            onClick={e => { e.stopPropagation(); open(); }}
            aria-label="Nhấn để mở thiệp"
            style={{
              background: 'transparent', border: 'none', padding: 0,
              cursor: isLifting || isOpening ? 'default' : 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
            }}
          >
            <div style={{
              width: 'clamp(52px, 13vw, 62px)',
              height: 'clamp(52px, 13vw, 62px)',
              transform: `scale(${sealScale})`,
              transition: sealTransition,
              animation: entered && phase === 'idle'
                ? 'sealBreath 4.8s ease-in-out infinite'
                : 'none',
            }}>
              <img
                src="/Test_06-06-2026/wax-seal.svg"
                alt=""
                aria-hidden="true"
                width="62"
                height="62"
                style={{ width: '100%', height: '100%', display: 'block' }}
                onError={e => {
                  e.currentTarget.outerHTML = `<svg viewBox="0 0 62 62" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%"><circle cx="31" cy="31" r="28" fill="#7C1D21" opacity="0.90"/><circle cx="31" cy="31" r="25" stroke="rgba(255,255,255,0.12)" stroke-width="0.5" fill="none"/><circle cx="31" cy="31" r="21" stroke="rgba(248,244,236,0.20)" stroke-width="0.5" fill="none" stroke-dasharray="2 3"/><text x="31" y="36" font-family="Georgia,serif" font-size="13" font-style="italic" fill="#FDF8EC" text-anchor="middle" opacity="0.95">ĐN</text></svg>`;
                }}
              />
            </div>

            {/* "Mở thiệp" — whisper level */}
            <span style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.46rem, 1vw, 0.54rem)',
              fontWeight: 400,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(80,54,16,0.38)',
              display: 'block',
              opacity: entered ? 1 : 0,
              transition: 'opacity 0.8s ease',
              transitionDelay: '2.2s',
            }}>
              Mở thiệp
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes sealBreath {
          0%, 100% { transform: scale(1.00); }
          50%       { transform: scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes sealBreath { 0%, 100% { transform: none; } }
        }
      `}</style>
    </div>
  );
}

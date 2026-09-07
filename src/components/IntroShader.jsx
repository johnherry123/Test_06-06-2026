import { useState, useEffect, useCallback, useMemo } from 'react';
import { COUPLE, WEDDING } from '../weddingData';

export default function IntroShader({ onComplete, onStartMusic }) {
  // Phases: 'idle' -> 'opening' -> 'zooming' -> 'done'
  const [phase, setPhase] = useState('idle');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 24 golden sparks radiating outward when wax seal breaks
  const sparks = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * 360 + (Math.random() * 15 - 7.5);
      const dist = 90 + Math.random() * 90;
      const rad = (angle * Math.PI) / 180;
      return {
        id: i,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        scale: 0.7 + Math.random() * 0.9,
      };
    });
  }, []);

  // Subtle 3D tilt tracking mouse on desktop before opening
  const handleMouseMove = useCallback(
    (e) => {
      if (phase !== 'idle' || window.innerWidth <= 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 10;
      const y = (e.clientY / innerHeight - 0.5) * -8;
      setTilt({ x: y, y: x });
    },
    [phase]
  );

  const startOpening = useCallback(() => {
    if (phase !== 'idle') return;

    // Immediately trigger music on user interaction
    onStartMusic?.();

    // Step 1: Trigger opening sequence (seal bursts, ribbon slides, golden glow blooms)
    setPhase('opening');

    // Step 2: Cinematic zoom into the invitation card
    setTimeout(() => {
      setPhase('zooming');
    }, 1200);

    // Step 3: Complete handoff to main wedding experience
    setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 1900);
  }, [phase, onComplete, onStartMusic]);

  // Click anywhere while opening to fast-forward into main page
  const handleCardClick = useCallback(() => {
    if (phase === 'idle') {
      startOpening();
    } else if (phase === 'opening') {
      setPhase('zooming');
      setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 500);
    }
  }, [phase, startOpening, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCardClick]);

  const isOpen = phase === 'opening' || phase === 'zooming' || phase === 'done';
  const isZooming = phase === 'zooming' || phase === 'done';

  return (
    <div
      role="dialog"
      aria-label={`Thiệp cưới ${COUPLE.groom.firstName} & ${COUPLE.bride.firstName} — Chạm để mở thiệp`}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#160508',
        background: 'radial-gradient(circle at 50% 45%, #340F16 0%, #1C060A 60%, #0C0204 100%)',
        userSelect: 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        perspective: '1400px',
        padding: '16px',
        opacity: isZooming ? 0 : 1,
        transition: isZooming ? 'opacity 0.75s ease-in 0.1s' : 'none',
      }}
    >
      {/* ── AMBIENT GOLDEN BOKEH LIGHTS ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(225, 185, 100, 0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(640px, 115vw)',
          height: 'min(640px, 115vw)',
          background:
            'radial-gradient(circle, rgba(197, 160, 89, 0.22) 0%, rgba(128, 29, 36, 0.15) 50%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── TOP HEADER CALLOUT ── */}
      <div
        style={{
          marginBottom: 'clamp(10px, 2.5vh, 22px)',
          textAlign: 'center',
          transition: 'all 0.5s ease',
          opacity: phase === 'idle' ? 1 : 0.4,
          transform: phase === 'idle' ? 'translateY(0)' : 'translateY(-10px)',
        }}
      >
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.72rem, 1.9vw, 0.86rem)',
            letterSpacing: '0.3em',
            color: '#E6CA85',
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
            fontWeight: 600,
          }}
        >
          ✦ Wedding Invitation · Lễ Thành Hôn ✦
        </p>
      </div>

      {/* ── 3D LUXURY INVITATION FOLIO CARD ── */}
      <div
        style={{
          position: 'relative',
          width: 'min(380px, 92vw)',
          height: 'min(550px, 80vh)',
          transformStyle: 'preserve-3d',
          transform: isZooming
            ? 'scale(1.32) translateZ(120px)'
            : isOpen
            ? 'scale(1.04) translateZ(30px)'
            : phase === 'idle'
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)`
            : 'scale(1)',
          transition: isZooming
            ? 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)'
            : isOpen
            ? 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
            : phase === 'idle'
            ? 'transform 0.15s ease-out'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* MAIN LUXURY INVITATION CARD (Pearl Ivory with Double Gold Foil Borders) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFDF9',
            background: 'linear-gradient(160deg, #FFFFFF 0%, #FAF6EE 50%, #F5EFE3 100%)',
            borderRadius: '16px',
            border: '2px solid #C5A059',
            boxShadow: isOpen
              ? '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(197, 160, 89, 0.45)'
              : '0 25px 60px rgba(0, 0, 0, 0.55), 0 8px 24px rgba(0, 0, 0, 0.35)',
            padding: '24px 18px 20px',
            boxSizing: 'border-box',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Inner Golden Foil Inset Border */}
          <div
            style={{
              position: 'absolute',
              inset: '8px',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              borderRadius: '11px',
              pointerEvents: 'none',
            }}
          />

          {/* Corner Floral Ornaments (SVG) */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 28 28"
            fill="none"
            style={{ position: 'absolute', top: '12px', left: '12px', opacity: 0.65 }}
          >
            <path d="M2 26V6C2 3.79086 3.79086 2 6 2H26" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="8" cy="8" r="2" fill="#C5A059" />
          </svg>
          <svg
            width="26"
            height="26"
            viewBox="0 0 28 28"
            fill="none"
            style={{ position: 'absolute', top: '12px', right: '12px', opacity: 0.65 }}
          >
            <path d="M26 26V6C26 3.79086 24.2091 2 22 2H2" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="20" cy="8" r="2" fill="#C5A059" />
          </svg>
          <svg
            width="26"
            height="26"
            viewBox="0 0 28 28"
            fill="none"
            style={{ position: 'absolute', bottom: '12px', left: '12px', opacity: 0.65 }}
          >
            <path d="M2 2V22C2 24.2091 3.79086 26 6 26H26" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="8" cy="20" r="2" fill="#C5A059" />
          </svg>
          <svg
            width="26"
            height="26"
            viewBox="0 0 28 28"
            fill="none"
            style={{ position: 'absolute', bottom: '12px', right: '12px', opacity: 0.65 }}
          >
            <path d="M26 2V22C26 24.2091 24.2091 26 22 26H2" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="20" cy="20" r="2" fill="#C5A059" />
          </svg>

          {/* Light Sheen Effect */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background:
                'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.45) 50%, transparent 60%)',
              pointerEvents: 'none',
              transform: 'rotate(25deg)',
              animation: 'cardShimmer 6s ease-in-out infinite',
            }}
          />

          {/* ── CARD HEADER: MONOGRAM CREST ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Royal Wedding Crest SVG (Intertwined Golden Rings with Diamond & Laurel Wreath) */}
            <svg
              width="74"
              height="66"
              viewBox="0 0 100 90"
              fill="none"
              style={{ filter: 'drop-shadow(0 2px 5px rgba(197, 160, 89, 0.35))' }}
            >
              <defs>
                <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DFC37C" />
                  <stop offset="50%" stopColor="#B38734" />
                  <stop offset="100%" stopColor="#DFC37C" />
                </linearGradient>
                <linearGradient id="ringGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2D4" />
                  <stop offset="50%" stopColor="#DFC37C" />
                  <stop offset="100%" stopColor="#B38734" />
                </linearGradient>
              </defs>

              {/* Classical Laurel Wreath */}
              <path
                d="M26 38C22 47 24 60 33 68C37 72 43 75 50 75"
                stroke="url(#crestGold)"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M74 38C78 47 76 60 67 68C63 72 57 75 50 75"
                stroke="url(#crestGold)"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />

              {/* Laurel Leaf Sprigs */}
              <path d="M22 44C20 42 17 43 17 45C17 47 21 47 22 44Z" fill="url(#crestGold)" />
              <path d="M24 53C21 52 18 54 18 56C19 58 23 57 24 53Z" fill="url(#crestGold)" />
              <path d="M29 62C26 62 24 65 25 67C26 69 30 67 29 62Z" fill="url(#crestGold)" />
              <path d="M78 44C80 42 83 43 83 45C83 47 79 47 78 44Z" fill="url(#crestGold)" />
              <path d="M76 53C79 52 82 54 82 56C81 58 77 57 76 53Z" fill="url(#crestGold)" />
              <path d="M71 62C74 62 76 65 75 67C74 69 70 67 71 62Z" fill="url(#crestGold)" />

              {/* Centered Intertwined Wedding Rings with Solitaire Diamond */}
              <circle cx="43" cy="49" r="14" stroke="url(#ringGoldLight)" strokeWidth="2.2" fill="none" />
              <circle cx="57" cy="49" r="14" stroke="url(#crestGold)" strokeWidth="2.2" fill="none" />
              {/* Diamond Solitaire Accent on Left Ring */}
              <path d="M43 31L46.5 35.5L43 38L39.5 35.5L43 31Z" fill="#FFF9E6" stroke="#C5A059" strokeWidth="0.8" />
              <circle cx="43" cy="35" r="1.5" fill="#FFFFFF" />

              {/* Bottom Ribbon */}
              <path
                d="M36 72C44 75 56 75 64 72M45 78L50 81L55 78"
                stroke="url(#crestGold)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>

            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.64rem',
                fontWeight: 700,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#9A7836',
                margin: '2px 0 0 0',
              }}
            >
              Thiệp Cưới Báo Hỷ
            </p>
          </div>

          {/* ── COUPLE NAMES IN ROYAL WINE CURSIVE ── */}
          <div style={{ margin: '4px 0 2px 0' }}>
            <h1
              style={{
                fontFamily: "'Alex Brush', cursive",
                fontSize: 'clamp(2.1rem, 6.2vw, 3.2rem)',
                color: '#801D24',
                lineHeight: 1.12,
                margin: '0 0 2px 0',
                fontWeight: 400,
                textShadow: '0 1px 4px rgba(128, 29, 36, 0.12)',
                wordBreak: 'break-word',
              }}
            >
              {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName}
            </h1>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.96rem, 2.2vw, 1.15rem)',
                fontStyle: 'italic',
                fontWeight: 600,
                color: '#42332A',
                margin: 0,
              }}
            >
              ({COUPLE.groom.fullName} &amp; {COUPLE.bride.fullName})
            </p>
          </div>

          {/* Gold Floral Flourish Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '160px',
              margin: '3px auto',
            }}
          >
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #C5A059)' }} />
            <span style={{ color: '#C5A059', fontSize: '11px' }}>❦</span>
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #C5A059)' }} />
          </div>

          {/* ── DATE & VENUE ── */}
          <div style={{ margin: '2px 0 4px 0' }}>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(0.88rem, 2vw, 1.02rem)',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#1E1612',
                margin: '0 0 2px 0',
              }}
            >
              20 · 10 · 2026
            </p>

            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 'clamp(0.62rem, 1.4vw, 0.70rem)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#801D24',
                margin: 0,
              }}
            >
              Trung Tâm GEM Center · TP.HCM
            </p>
          </div>
        </div>

        {/* ── ROYAL BURGUNDY SILK BELLY BAND / RIBBON ── */}
        <div
          style={{
            position: 'absolute',
            top: '80%',
            left: '-6px',
            right: '-6px',
            height: '48px',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(90deg, #6B141A 0%, #8A1D25 25%, #A82C35 50%, #8A1D25 75%, #6B141A 100%)',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.45)',
            borderTop: '1px solid rgba(225, 185, 100, 0.7)',
            borderBottom: '1px solid rgba(225, 185, 100, 0.7)',
            zIndex: 20,
            pointerEvents: 'none',
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'translateY(-50%) scaleX(1.15)' : 'translateY(-50%) scaleX(1)',
            transition: 'all 0.5s ease',
          }}
        >
          {/* Subtle Ribbon Texture Lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.18,
              backgroundImage: 'repeating-linear-gradient(90deg, #000, #000 1px, transparent 1px, transparent 4px)',
            }}
          />
        </div>

        {/* ── 3D WAX SEAL WITH GOLD SONG HỶ (囍) ── */}
        <div
          style={{
            position: 'absolute',
            top: '80%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: phase === 'idle' ? 'auto' : 'none',
          }}
        >
          {/* Bursting Golden Sparkles */}
          {isOpen &&
            sparks.map((s) => (
              <span
                key={s.id}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: s.id % 2 === 0 ? '#FFE194' : '#FFD700',
                  boxShadow: '0 0 10px #FFD700, 0 0 18px #FFA500',
                  transform: `translate(${s.x}px, ${s.y}px) scale(${s.scale})`,
                  opacity: 0,
                  transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none',
                }}
              />
            ))}

          {/* 3D Wax Seal Button */}
          <button
            type="button"
            aria-label="Chạm vào con dấu Song Hỷ để mở thiệp cưới"
            onClick={(e) => {
              e.stopPropagation();
              startOpening();
            }}
            style={{
              position: 'relative',
              width: '82px',
              height: '82px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
              outline: 'none',
              transform: isOpen ? 'scale(1.25) rotate(14deg)' : 'scale(1)',
              opacity: isOpen ? 0 : 1,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
              filter:
                'drop-shadow(0 10px 24px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 18px rgba(180, 30, 40, 0.45))',
              animation: phase === 'idle' ? 'waxSealPulse 3s ease-in-out infinite' : 'none',
            }}
          >
            <svg
              width="82"
              height="82"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Molten Red Wax Lacquer Radial Gradient */}
                <radialGradient id="waxLacquer" cx="38%" cy="32%" r="68%">
                  <stop offset="0%" stopColor="#D22B36" />
                  <stop offset="45%" stopColor="#8C141D" />
                  <stop offset="85%" stopColor="#550A0E" />
                  <stop offset="100%" stopColor="#2E0407" />
                </radialGradient>

                {/* Embossed Metallic Gold Foil Gradient */}
                <linearGradient id="waxGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2D4" />
                  <stop offset="35%" stopColor="#E6CA85" />
                  <stop offset="70%" stopColor="#B38734" />
                  <stop offset="100%" stopColor="#FFE4A0" />
                </linearGradient>

                {/* Inner Shadow for Deep Deboss Depth */}
                <filter id="debossShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000000" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Artisanal Organic Molten Wax Outlines (12 Wavy Lobes) */}
              <path
                d="M50 3
                   C59 3 64 8 72 12
                   C80 16 86 18 90 26
                   C94 34 94 41 97 50
                   C100 59 96 66 92 74
                   C88 82 82 86 74 90
                   C66 94 59 97 50 97
                   C41 97 34 94 26 90
                   C18 86 12 82 8 74
                   C4 66 2 59 3 50
                   C4 41 6 34 10 26
                   C14 18 20 16 28 12
                   C36 8 41 3 50 3 Z"
                fill="url(#waxLacquer)"
              />

              {/* Shiny Specular Wax Highlight */}
              <path
                d="M28 14C35 10 42 7 50 7C58 7 66 10 72 14C65 11 57 9 50 9C43 9 35 11 28 14Z"
                fill="rgba(255, 255, 255, 0.45)"
              />

              {/* Inner Raised Ring */}
              <circle
                cx="50"
                cy="50"
                r="36"
                stroke="rgba(255, 215, 140, 0.45)"
                strokeWidth="1.6"
                fill="none"
              />

              {/* Beaded Royal Border */}
              <circle
                cx="50"
                cy="50"
                r="32"
                stroke="url(#waxGold)"
                strokeWidth="1.2"
                strokeDasharray="2.5 3"
                fill="none"
                opacity="0.85"
              />

              {/* ── THE TRADITIONAL SONG HỶ (囍) EMBLEM IN EMBOSSED GOLD ── */}
              <g filter="url(#debossShadow)">
                <text
                  x="50"
                  y="62"
                  fontFamily="'Playfair Display', 'Cinzel', 'Noto Serif SC', 'Songti SC', serif"
                  fontSize="38"
                  fontWeight="900"
                  fill="url(#waxGold)"
                  textAnchor="middle"
                  letterSpacing="0"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.85))',
                  }}
                >
                  囍
                </text>
              </g>
            </svg>
          </button>

          {/* Invitation Hint Pill */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              startOpening();
            }}
            style={{
              marginTop: '10px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(255, 253, 249, 0.96)',
              border: '1.5px solid #C5A059',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55)',
              opacity: phase === 'idle' ? 1 : 0,
              transform: phase === 'idle' ? 'translateY(0)' : 'translateY(8px)',
              transition: 'all 0.35s ease',
              cursor: 'pointer',
              animation: 'pillPulse 2.4s ease-in-out infinite',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#801D24',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              ✉ Chạm để mở thiệp &amp; bật nhạc
            </span>
          </div>
        </div>
      </div>

      {/* ── GLOBAL LUXURY KEYFRAME ANIMATIONS ── */}
      <style>{`
        @keyframes waxSealPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 16px rgba(180, 30, 40, 0.35));
          }
          50% {
            transform: scale(1.08);
            filter: drop-shadow(0 16px 36px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 26px rgba(220, 50, 60, 0.65));
          }
        }
        @keyframes pillPulse {
          0%, 100% {
            transform: translateY(0);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
          }
          50% {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(197, 160, 89, 0.35);
          }
        }
        @keyframes cardShimmer {
          0% {
            transform: translateX(-100%) rotate(25deg);
            opacity: 0;
          }
          30% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(200%) rotate(25deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

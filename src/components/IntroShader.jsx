import { useState, useEffect, useCallback, useMemo } from 'react';
import { COUPLE, WEDDING } from '../weddingData';

export default function IntroShader({ onComplete, onStartMusic }) {
  // Phases: 'idle' -> 'opening' -> 'done'
  const [phase, setPhase] = useState('idle');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 24 golden sparks radiating outward when wax seal breaks
  const sparks = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * 360 + (Math.random() * 15 - 7.5);
      const dist = 80 + Math.random() * 80;
      const rad = (angle * Math.PI) / 180;
      return {
        id: i,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        scale: 0.6 + Math.random() * 0.8,
      };
    });
  }, []);

  // Subtle 3D tilt tracking mouse on desktop before opening
  const handleMouseMove = useCallback(
    (e) => {
      if (phase !== 'idle' || window.innerWidth <= 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 8;
      const y = (e.clientY / innerHeight - 0.5) * -6;
      setTilt({ x: y, y: x });
    },
    [phase]
  );

  const startOpening = useCallback(() => {
    if (phase !== 'idle') return;

    // Immediately trigger music on user interaction
    onStartMusic?.();

    // Trigger instant opening motion
    setPhase('opening');

    // Smoothly hand off to main wedding page during the cinematic zoom
    setTimeout(() => {
      onComplete?.();
    }, 450);

    // Complete transition
    setTimeout(() => {
      setPhase('done');
    }, 900);
  }, [phase, onComplete, onStartMusic]);

  // Click anywhere while idle to open
  const handleCardClick = useCallback(() => {
    if (phase === 'idle') {
      startOpening();
    }
  }, [phase, startOpening]);

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

  const isOpen = phase === 'opening' || phase === 'done';

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
        padding: '12px',
        boxSizing: 'border-box',
        opacity: isOpen ? 0 : 1,
        transition: isOpen ? 'opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.1s' : 'none',
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
          marginBottom: 'clamp(8px, 1.8vh, 16px)',
          textAlign: 'center',
          transition: 'all 0.4s ease',
          opacity: phase === 'idle' ? 1 : 0,
          transform: phase === 'idle' ? 'translateY(0)' : 'translateY(-10px)',
        }}
      >
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.68rem, 1.8vw, 0.82rem)',
            letterSpacing: '0.28em',
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
          maxHeight: 'min(560px, 86vh)',
          transformStyle: 'preserve-3d',
          transform: isOpen
            ? 'scale(1.18) translateZ(80px)'
            : phase === 'idle'
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)`
            : 'scale(1)',
          transition: isOpen
            ? 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)'
            : phase === 'idle'
            ? 'transform 0.15s ease-out'
            : 'transform 0.4s ease',
        }}
      >
        {/* MAIN LUXURY INVITATION CARD (Pearl Ivory with Double Gold Foil Borders) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#FFFDF9',
            background: 'linear-gradient(160deg, #FFFFFF 0%, #FAF6EE 50%, #F5EFE3 100%)',
            borderRadius: '16px',
            border: '2px solid #C5A059',
            boxShadow: isOpen
              ? '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(197, 160, 89, 0.45)'
              : '0 25px 60px rgba(0, 0, 0, 0.55), 0 8px 24px rgba(0, 0, 0, 0.35)',
            padding: 'clamp(14px, 2.4vh, 20px) clamp(14px, 3.5vw, 22px) clamp(12px, 2vh, 18px)',
            boxSizing: 'border-box',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          {/* Inner Golden Foil Inset Border */}
          <div
            style={{
              position: 'absolute',
              inset: '7px',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              borderRadius: '11px',
              pointerEvents: 'none',
            }}
          />

          {/* Corner Floral Ornaments (SVG) */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
            style={{ position: 'absolute', top: '10px', left: '10px', opacity: 0.65 }}
          >
            <path d="M2 26V6C2 3.79086 3.79086 2 6 2H26" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="8" cy="8" r="2" fill="#C5A059" />
          </svg>
          <svg
            width="22"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
            style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.65 }}
          >
            <path d="M26 26V6C26 3.79086 24.2091 2 22 2H2" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="20" cy="8" r="2" fill="#C5A059" />
          </svg>
          <svg
            width="22"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
            style={{ position: 'absolute', bottom: '10px', left: '10px', opacity: 0.65 }}
          >
            <path d="M2 2V22C2 24.2091 3.79086 26 6 26H26" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="8" cy="20" r="2" fill="#C5A059" />
          </svg>
          <svg
            width="22"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
            style={{ position: 'absolute', bottom: '10px', right: '10px', opacity: 0.65 }}
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

          {/* ── SECTION 1: HEADER & LAUREL CREST ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Royal Wedding Crest SVG (Complete Oval Laurel Wreath with Song Hỷ 囍) */}
            <svg
              width="72"
              height="64"
              viewBox="0 0 100 90"
              fill="none"
              style={{ filter: 'drop-shadow(0 2px 5px rgba(197, 160, 89, 0.35))' }}
            >
              <defs>
                <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2D4" />
                  <stop offset="30%" stopColor="#DFC37C" />
                  <stop offset="70%" stopColor="#B38734" />
                  <stop offset="100%" stopColor="#DFC37C" />
                </linearGradient>
              </defs>

              {/* Apex Star Accent */}
              <path
                d="M50 8 L51.5 13 L56 14 L52 17 L53 21.5 L50 19 L47 21.5 L48 17 L44 14 L48.5 13 Z"
                fill="url(#crestGold)"
              />

              {/* Complete Oval Laurel Branches (Left and Right) */}
              <path
                d="M48 76 C26 74 16 60 16 46 C16 32 26 18 47 16"
                stroke="url(#crestGold)"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M52 76 C74 74 84 60 84 46 C84 32 74 18 53 16"
                stroke="url(#crestGold)"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />

              {/* Left Laurel Leaves */}
              <path d="M16 58 C13 56 11 53 14 51 C16 53 18 56 16 58 Z" fill="url(#crestGold)" />
              <path d="M14 47 C11 45 10 42 13 40 C15 42 17 45 14 47 Z" fill="url(#crestGold)" />
              <path d="M17 36 C15 34 16 31 19 30 C20 32 20 35 17 36 Z" fill="url(#crestGold)" />
              <path d="M26 26 C24 24 26 21 29 21 C30 23 29 26 26 26 Z" fill="url(#crestGold)" />
              <path d="M37 19 C36 17 39 15 41 16 C41 18 40 20 37 19 Z" fill="url(#crestGold)" />
              <path d="M24 67 C21 66 21 63 24 62 C26 63 26 66 24 67 Z" fill="url(#crestGold)" />

              {/* Right Laurel Leaves */}
              <path d="M84 58 C87 56 89 53 86 51 C84 53 82 56 84 58 Z" fill="url(#crestGold)" />
              <path d="M86 47 C89 45 90 42 87 40 C85 42 83 45 86 47 Z" fill="url(#crestGold)" />
              <path d="M83 36 C85 34 84 31 81 30 C80 32 80 35 83 36 Z" fill="url(#crestGold)" />
              <path d="M74 26 C76 24 74 21 71 21 C70 23 71 26 74 26 Z" fill="url(#crestGold)" />
              <path d="M63 19 C64 17 61 15 59 16 C59 18 60 20 63 19 Z" fill="url(#crestGold)" />
              <path d="M76 67 C79 66 79 63 76 62 C74 63 74 66 76 67 Z" fill="url(#crestGold)" />

              {/* Bottom Ribbon Knot and Tails */}
              <circle cx="50" cy="76" r="2.5" fill="url(#crestGold)" />
              <path
                d="M48 77 C43 83 36 85 30 84"
                stroke="url(#crestGold)"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M52 77 C57 83 64 85 70 84"
                stroke="url(#crestGold)"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />

              {/* Traditional Song Hỷ (囍) in Exact Center of Wreath */}
              <text
                x="50"
                y="53"
                fontFamily="'Playfair Display', 'Cinzel', 'Songti SC', serif"
                fontSize="22"
                fontWeight="700"
                fill="url(#crestGold)"
                textAnchor="middle"
                style={{ filter: 'drop-shadow(0 1px 3px rgba(197, 160, 89, 0.45))' }}
              >
                囍
              </text>
            </svg>

            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 'clamp(0.58rem, 1.4vw, 0.64rem)',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#9A7836',
                margin: '2px 0 0 0',
              }}
            >
              Thiệp Cưới Báo Hỷ
            </p>
          </div>

          {/* ── SECTION 2: COUPLE NAMES & EVENT INFO ── */}
          <div style={{ margin: 'clamp(2px, 0.8vh, 6px) 0', width: '100%' }}>
            <h1
              style={{
                fontFamily: "'Alex Brush', cursive",
                fontSize: 'clamp(1.9rem, 4.8vh, 2.7rem)',
                color: '#801D24',
                lineHeight: 1.12,
                margin: '0 0 2px 0',
                fontWeight: 400,
                textShadow: '0 1px 4px rgba(128, 29, 36, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>{COUPLE.groom.firstName}</span>
              <span style={{ fontSize: '0.85em', color: '#C5A059' }}>&amp;</span>
              <span style={{ whiteSpace: 'nowrap' }}>{COUPLE.bride.firstName}</span>
            </h1>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.88rem, 1.8vh, 1.05rem)',
                fontStyle: 'italic',
                fontWeight: 600,
                color: '#42332A',
                margin: 0,
              }}
            >
              ({COUPLE.groom.fullName} &amp; {COUPLE.bride.fullName})
            </p>

            {/* Gold Floral Flourish Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '140px',
                margin: 'clamp(3px, 0.8vh, 6px) auto',
              }}
            >
              <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #C5A059)' }} />
              <span style={{ color: '#C5A059', fontSize: '10px' }}>❦</span>
              <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #C5A059)' }} />
            </div>

            {/* Date & Venue */}
            <div>
              <p
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(0.82rem, 1.8vh, 0.96rem)',
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
                  fontSize: 'clamp(0.60rem, 1.3vh, 0.68rem)',
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

          {/* ── SECTION 3: INTERACTIVE BELLY BAND, 3D WAX SEAL & HINT ── */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 'clamp(4px, 1vh, 8px)',
            }}
          >
            {/* Edge-to-Edge Silk Ribbon */}
            <div
              style={{
                width: 'calc(100% + 44px)',
                margin: '0 -22px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background:
                  'linear-gradient(90deg, #6B141A 0%, #8A1D25 25%, #A82C35 50%, #8A1D25 75%, #6B141A 100%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
                borderTop: '1px solid rgba(225, 185, 100, 0.7)',
                borderBottom: '1px solid rgba(225, 185, 100, 0.7)',
                opacity: isOpen ? 0 : 1,
                transform: isOpen ? 'scaleX(1.1)' : 'scaleX(1)',
                transition: 'all 0.4s ease',
              }}
            >
              {/* Subtle Ribbon Texture Lines */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.18,
                  backgroundImage:
                    'repeating-linear-gradient(90deg, #000, #000 1px, transparent 1px, transparent 4px)',
                }}
              />

              {/* 3D Wax Seal Button Centered Directly on Ribbon */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: s.id % 2 === 0 ? '#FFE194' : '#FFD700',
                        boxShadow: '0 0 10px #FFD700, 0 0 16px #FFA500',
                        transform: `translate(${s.x}px, ${s.y}px) scale(${s.scale})`,
                        opacity: 0,
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: 'none',
                      }}
                    />
                  ))}

                <button
                  type="button"
                  aria-label="Chạm vào con dấu Song Hỷ để mở thiệp cưới"
                  onClick={(e) => {
                    e.stopPropagation();
                    startOpening();
                  }}
                  style={{
                    position: 'relative',
                    width: '68px',
                    height: '68px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    padding: 0,
                    outline: 'none',
                    transform: isOpen ? 'scale(1.25) rotate(14deg)' : 'scale(1)',
                    opacity: isOpen ? 0 : 1,
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
                    filter:
                      'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 16px rgba(180, 30, 40, 0.45))',
                    animation: phase === 'idle' ? 'waxSealPulse 3s ease-in-out infinite' : 'none',
                  }}
                >
                  <svg
                    width="68"
                    height="68"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <radialGradient id="waxLacquer" cx="38%" cy="32%" r="68%">
                        <stop offset="0%" stopColor="#D22B36" />
                        <stop offset="45%" stopColor="#8C141D" />
                        <stop offset="85%" stopColor="#550A0E" />
                        <stop offset="100%" stopColor="#2E0407" />
                      </radialGradient>

                      <linearGradient id="waxGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF2D4" />
                        <stop offset="35%" stopColor="#E6CA85" />
                        <stop offset="70%" stopColor="#B38734" />
                        <stop offset="100%" stopColor="#FFE4A0" />
                      </linearGradient>

                      <filter id="debossShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000000" floodOpacity="0.8" />
                      </filter>
                    </defs>

                    <path
                      d="M50 3 C59 3 64 8 72 12 C80 16 86 18 90 26 C94 34 94 41 97 50 C100 59 96 66 92 74 C88 82 82 86 74 90 C66 94 59 97 50 97 C41 97 34 94 26 90 C18 86 12 82 8 74 C4 66 2 59 3 50 C4 41 6 34 10 26 C14 18 20 16 28 12 C36 8 41 3 50 3 Z"
                      fill="url(#waxLacquer)"
                    />

                    <path
                      d="M28 14C35 10 42 7 50 7C58 7 66 10 72 14C65 11 57 9 50 9C43 9 35 11 28 14Z"
                      fill="rgba(255, 255, 255, 0.45)"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="rgba(255, 215, 140, 0.45)"
                      strokeWidth="1.6"
                      fill="none"
                    />

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
              </div>
            </div>

            {/* Invitation Hint Pill Below Ribbon */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                startOpening();
              }}
              style={{
                marginTop: '8px',
                padding: '5px 16px',
                borderRadius: '999px',
                background: 'rgba(255, 253, 249, 0.96)',
                border: '1.5px solid #C5A059',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                opacity: phase === 'idle' ? 1 : 0,
                transform: phase === 'idle' ? 'translateY(0)' : 'translateY(6px)',
                transition: 'all 0.35s ease',
                cursor: 'pointer',
                animation: 'pillPulse 2.4s ease-in-out infinite',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: 'clamp(0.62rem, 1.3vh, 0.68rem)',
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
      </div>

      {/* ── GLOBAL LUXURY KEYFRAME ANIMATIONS ── */}
      <style>{`
        @keyframes waxSealPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 16px rgba(180, 30, 40, 0.35));
          }
          50% {
            transform: scale(1.08);
            filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 24px rgba(220, 50, 60, 0.65));
          }
        }
        @keyframes pillPulse {
          0%, 100% {
            transform: translateY(0);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
          }
          50% {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(197, 160, 89, 0.35);
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

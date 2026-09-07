import { useState, useEffect, useCallback, useMemo } from 'react';
import { COUPLE, WEDDING } from '../weddingData';

export default function IntroShader({ onComplete, onStartMusic }) {
  // Phases: 'idle' -> 'opening' -> 'presented' -> 'zooming' -> 'done'
  const [phase, setPhase] = useState('idle');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 18 golden sparks radiating outward when wax seal pops
  const sparks = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * 360 + (Math.random() * 20 - 10);
      const dist = 80 + Math.random() * 80;
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
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * -10;
      setTilt({ x: y, y: x });
    },
    [phase]
  );

  const startOpening = useCallback(() => {
    if (phase !== 'idle') return;

    // Immediately trigger music on user interaction
    onStartMusic?.();

    // Step 1: Trigger opening sequence (seal bursts, flap swings up, card slides out)
    setPhase('opening');

    // Step 2: Card reaches peak presentation height
    setTimeout(() => {
      setPhase('presented');
    }, 1100);

    // Step 3: Cinematic zoom into the card & fade out
    setTimeout(() => {
      setPhase('zooming');
    }, 3200);

    // Step 4: Complete handoff to main wedding experience
    setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 3900);
  }, [phase, onComplete, onStartMusic]);

  // Click anywhere while card is presented to fast-forward into main page immediately
  const handleCardClick = useCallback(() => {
    if (phase === 'idle') {
      startOpening();
    } else if (phase === 'opening' || phase === 'presented') {
      setPhase('zooming');
      setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 650);
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

  const isOpen = phase === 'opening' || phase === 'presented' || phase === 'zooming' || phase === 'done';
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
        backgroundColor: '#150E0C',
        background: 'radial-gradient(circle at 50% 45%, #2B1914 0%, #170E0B 75%, #0B0605 100%)',
        userSelect: 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        perspective: '1400px',
        padding: '14px',
        opacity: isZooming ? 0 : 1,
        transition: isZooming ? 'opacity 0.75s ease-in 0.1s' : 'none',
      }}
    >
      {/* ── AMBIENT GOLDEN LIGHT & POLKA TEXTURE ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.16) 1.5px, transparent 1.5px)',
          backgroundSize: '34px 34px',
          opacity: 0.65,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '32%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(620px, 110vw)',
          height: 'min(620px, 110vw)',
          background:
            'radial-gradient(circle, rgba(197, 160, 89, 0.24) 0%, rgba(128, 29, 36, 0.12) 45%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── TOP HEADER CALLOUT ── */}
      <div
        style={{
          marginBottom: 'clamp(8px, 2vh, 18px)',
          textAlign: 'center',
          transition: 'all 0.5s ease',
          opacity: phase === 'idle' ? 1 : 0.4,
          transform: phase === 'idle' ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.70rem, 1.8vw, 0.84rem)',
            letterSpacing: '0.28em',
            color: '#E6CA85',
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 2px 10px rgba(0,0,0,0.6)',
          }}
        >
          ✦ Wedding Invitation · Lễ Thành Hôn ✦
        </p>
      </div>

      {/* ── 3D PHYSICAL ENVELOPE STAGE ── */}
      <div
        style={{
          position: 'relative',
          width: 'min(350px, 88vw)',
          height: 'min(450px, 66vh)',
          transformStyle: 'preserve-3d',
          transform: isZooming
            ? 'scale(1.22) translateZ(100px)'
            : isOpen
            ? 'translateY(56px) scale(1)'
            : phase === 'idle'
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)`
            : 'translateY(0) scale(1)',
          transition: isZooming
            ? 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)'
            : isOpen
            ? 'transform 0.95s cubic-bezier(0.16, 1, 0.3, 1)'
            : phase === 'idle'
            ? 'transform 0.15s ease-out'
            : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* 1. ENVELOPE BACK (Lưng phong bì) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #2E1B17 0%, #1A0F0D 100%)',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            boxShadow:
              '0 30px 70px -10px rgba(0, 0, 0, 0.75), 0 10px 25px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
          }}
        >
          {/* Inner Golden Dot Lining */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.14,
              backgroundImage:
                'radial-gradient(#C5A059 1px, transparent 1px), radial-gradient(#C5A059 1px, transparent 1px)',
              backgroundSize: '18px 18px',
              backgroundPosition: '0 0, 9px 9px',
            }}
          />
        </div>

        {/* 2. INNER INVITATION CARD (Thiệp cưới trượt lên cao ngoạn mục) */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '4%',
            width: '92%',
            height: '90%',
            backgroundColor: '#FFFDF9',
            borderRadius: '12px',
            border: '2px solid #C5A059',
            boxShadow: isOpen
              ? '0 25px 60px rgba(0, 0, 0, 0.55), 0 0 30px rgba(197, 160, 89, 0.35)'
              : '0 4px 15px rgba(0, 0, 0, 0.2)',
            padding: 'clamp(18px, 3.5vw, 26px) clamp(14px, 3vw, 20px)',
            boxSizing: 'border-box',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: isOpen ? 30 : 5,
            transform: isOpen
              ? 'translateY(-56%) translateZ(45px) scale(1.04)'
              : 'translateY(0) translateZ(0) scale(1)',
            transition:
              'transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, z-index 0.01s 0.3s',
            overflow: 'hidden',
          }}
        >
          {/* Inner Double Gold Border */}
          <div
            style={{
              position: 'absolute',
              inset: '6px',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              borderRadius: '8px',
              pointerEvents: 'none',
            }}
          >
            <span style={{ position: 'absolute', top: 3, left: 4, color: '#C5A059', fontSize: '9px' }}>✦</span>
            <span style={{ position: 'absolute', top: 3, right: 4, color: '#C5A059', fontSize: '9px' }}>✦</span>
            <span style={{ position: 'absolute', bottom: 3, left: 4, color: '#C5A059', fontSize: '9px' }}>✦</span>
            <span style={{ position: 'absolute', bottom: 3, right: 4, color: '#C5A059', fontSize: '9px' }}>✦</span>
          </div>

          {/* Shimmer Light Bar Gliding Across Card */}
          {isOpen && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.75) 50%, transparent 65%)',
                animation: 'cardShimmer 1.8s ease-out 0.4s',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* ── LUXURY ROYAL MONOGRAM CREST (Mạ vàng, vương miện nhẫn cưới và vòng nguyệt quế) ── */}
          <div style={{ marginTop: '2px' }}>
            <svg
              width="70"
              height="70"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(128, 29, 36, 0.18))' }}
            >
              <defs>
                <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9E8C4" />
                  <stop offset="30%" stopColor="#D4AF37" />
                  <stop offset="70%" stopColor="#9C7224" />
                  <stop offset="100%" stopColor="#E2C98D" />
                </linearGradient>
                <linearGradient id="crestWine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8A131B" />
                  <stop offset="100%" stopColor="#5E0C11" />
                </linearGradient>
              </defs>

              {/* Intertwined Wedding Rings Crown */}
              <circle cx="44" cy="13" r="5" stroke="url(#crestGold)" strokeWidth="1.6" fill="none" />
              <circle cx="56" cy="13" r="5" stroke="url(#crestGold)" strokeWidth="1.6" fill="none" />
              <path
                d="M50 7L51.5 10.5L55 11L52.5 13L53.5 16.5L50 14.5L46.5 16.5L47.5 13L45 11L48.5 10.5L50 7Z"
                fill="url(#crestGold)"
              />

              {/* Left Laurel Branch */}
              <path
                d="M32 78C20 66 18 45 28 28C30 32 30 38 28 42C24 50 25 62 32 70C34 66 38 64 40 68"
                stroke="url(#crestGold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M22 36C18 34 16 38 18 42C20 40 22 38 22 36Z" fill="url(#crestGold)" />
              <path d="M21 47C17 46 16 51 18 55C20 53 22 50 21 47Z" fill="url(#crestGold)" />
              <path d="M24 59C20 60 21 65 24 68C25 65 26 62 24 59Z" fill="url(#crestGold)" />

              {/* Right Laurel Branch */}
              <path
                d="M68 78C80 66 82 45 72 28C70 32 70 38 72 42C76 50 75 62 68 70C66 66 62 64 60 68"
                stroke="url(#crestGold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M78 36C82 34 84 38 82 42C80 40 78 38 78 36Z" fill="url(#crestGold)" />
              <path d="M79 47C83 46 84 51 82 55C80 53 78 50 79 47Z" fill="url(#crestGold)" />
              <path d="M76 59C80 60 79 65 76 68C75 65 74 62 76 59Z" fill="url(#crestGold)" />

              {/* Central Intertwined Monogram: Đ & N */}
              <text
                x="37"
                y="54"
                fontFamily="'Playfair Display', Georgia, serif"
                fontStyle="italic"
                fontSize="25"
                fontWeight="700"
                fill="url(#crestWine)"
                textAnchor="middle"
              >
                Đ
              </text>
              <text
                x="50"
                y="48"
                fontFamily="'Cormorant Garamond', serif"
                fontStyle="italic"
                fontSize="16"
                fontWeight="300"
                fill="url(#crestGold)"
                textAnchor="middle"
              >
                &amp;
              </text>
              <text
                x="63"
                y="54"
                fontFamily="'Playfair Display', Georgia, serif"
                fontStyle="italic"
                fontSize="25"
                fontWeight="700"
                fill="url(#crestWine)"
                textAnchor="middle"
              >
                N
              </text>

              {/* Bottom Ribbon */}
              <path
                d="M36 74C44 77 56 77 64 74M45 80L50 83L55 80"
                stroke="url(#crestGold)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>

            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.62rem',
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

          {/* Couple Names in Rich Burgundy */}
          <div style={{ margin: '4px 0' }}>
            <h1
              style={{
                fontFamily: "'Alex Brush', cursive",
                fontSize: 'clamp(2.1rem, 6vw, 3.4rem)',
                color: '#7D141A',
                lineHeight: 1.15,
                margin: '0 0 4px 0',
                fontWeight: 400,
                textShadow: '0 1px 4px rgba(125, 20, 26, 0.1)',
                wordBreak: 'break-word',
              }}
            >
              {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName}
            </h1>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.98rem, 2.3vw, 1.2rem)',
                fontStyle: 'italic',
                fontWeight: 500,
                color: '#42332A',
                margin: 0,
              }}
            >
              ({COUPLE.groom.fullName} &amp; {COUPLE.bride.fullName})
            </p>
          </div>

          {/* Gold Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '180px',
              margin: '2px auto',
            }}
          >
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #C5A059)' }} />
            <span style={{ color: '#C5A059', fontSize: '11px' }}>❦</span>
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #C5A059)' }} />
          </div>

          {/* Date & Venue */}
          <div>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(0.92rem, 2vw, 1.08rem)',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#1E1612',
                margin: '0 0 2px 0',
              }}
            >
              {WEDDING.date}
            </p>

            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 'clamp(0.68rem, 1.3vw, 0.76rem)',
                fontWeight: 500,
                color: '#6E5F57',
                margin: 0,
              }}
            >
              {WEDDING.venue} · TP. Hồ Chí Minh
            </p>
          </div>

          {/* Interactive Hint */}
          <div
            style={{
              marginTop: '4px',
              padding: '4px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(128, 29, 36, 0.08)',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 0.4s ease 0.6s',
            }}
          >
            <span
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.64rem',
                fontWeight: 600,
                color: '#801D24',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Chạm để xem toàn bộ thiệp ✦
            </span>
          </div>
        </div>

        {/* 3. ENVELOPE FRONT POCKET (Túi đựng đằng trước giữ thiệp) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '62%',
            background: 'linear-gradient(175deg, #38201B 0%, #221310 100%)',
            borderRadius: '0 0 16px 16px',
            border: '1.5px solid rgba(197, 160, 89, 0.5)',
            borderTop: 'none',
            zIndex: 10,
            overflow: 'hidden',
            boxShadow: '0 -4px 18px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Subtle V-Neck Pocket Stitching */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 350 280"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            <path
              d="M0 0 L175 95 L350 0"
              stroke="rgba(197, 160, 89, 0.55)"
              strokeWidth="2"
              fill="rgba(24, 13, 10, 0.65)"
            />
            <path
              d="M0 8 L175 103 L350 8"
              stroke="rgba(197, 160, 89, 0.3)"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
          </svg>

          {/* Foil Inscription on Lower Pocket */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.68rem',
                letterSpacing: '0.25em',
                color: '#C5A059',
                margin: 0,
                textTransform: 'uppercase',
                opacity: 0.85,
              }}
            >
              Trân Trọng Kính Mời
            </p>
          </div>
        </div>

        {/* 4. 3D ENVELOPE TOP FLAP (Nắp phong bì lật mở mượt mà) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '44%',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            zIndex: isOpen ? 1 : 15,
            transform: isOpen ? 'rotateX(170deg) translateZ(-20px)' : 'rotateX(0deg) translateZ(10px)',
            opacity: isOpen ? 0.35 : 1,
            transition: 'transform 0.75s cubic-bezier(0.35, 0, 0.15, 1), opacity 0.6s ease, z-index 0.01s 0.2s',
            pointerEvents: 'none',
          }}
        >
          {/* Outer Flap Graphic */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              filter: 'drop-shadow(0 10px 14px rgba(0,0,0,0.5))',
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 350 200"
              preserveAspectRatio="none"
              style={{ display: 'block' }}
            >
              <defs>
                <linearGradient id="flapOuterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3E251F" />
                  <stop offset="100%" stopColor="#281612" />
                </linearGradient>
              </defs>
              <path
                d="M0 0 L350 0 L175 200 Z"
                fill="url(#flapOuterGrad)"
                stroke="rgba(197, 160, 89, 0.55)"
                strokeWidth="2"
              />
              <path
                d="M14 6 L336 6 L175 186 Z"
                fill="none"
                stroke="rgba(197, 160, 89, 0.3)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </div>

        {/* ── 5. REALISTIC 3D WAX SEAL WITH GOLD SONG HỶ (囍) ── */}
        <div
          style={{
            position: 'absolute',
            top: '38%',
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
              width: '86px',
              height: '86px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
              outline: 'none',
              transform: isOpen ? 'scale(1.25) rotate(12deg)' : 'scale(1)',
              opacity: isOpen ? 0 : 1,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
              filter:
                'drop-shadow(0 12px 28px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 18px rgba(180, 30, 40, 0.45))',
              animation: phase === 'idle' ? 'waxSealPulse 3s ease-in-out infinite' : 'none',
            }}
          >
            <svg
              width="86"
              height="86"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Molten Red Wax Lacquer Radial Gradient */}
                <radialGradient id="waxLacquer" cx="38%" cy="32%" r="68%">
                  <stop offset="0%" stopColor="#C92A34" />
                  <stop offset="45%" stopColor="#8A131B" />
                  <stop offset="85%" stopColor="#550A0E" />
                  <stop offset="100%" stopColor="#300407" />
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
              marginTop: '14px',
              padding: '6px 20px',
              borderRadius: '999px',
              background: 'rgba(255, 253, 249, 0.96)',
              border: '1.5px solid #C5A059',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45)',
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
                letterSpacing: '0.14em',
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

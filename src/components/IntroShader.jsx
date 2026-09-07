import { useState, useEffect, useCallback } from 'react';
import { COUPLE, WEDDING } from '../weddingData';

export default function IntroShader({ onComplete, onStartMusic }) {
  const [entered, setEntered] = useState(false);
  const [opening, setOpening] = useState(false);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = useCallback(() => {
    if (opening) return;

    // Immediately trigger music on user click
    onStartMusic?.();

    setOpening(true);

    if (reducedMotion) {
      setTimeout(() => onComplete?.(), 300);
      return;
    }

    // Smooth reveal animation
    setTimeout(() => {
      onComplete?.();
    }, 1000);
  }, [opening, onComplete, onStartMusic, reducedMotion]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleOpen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleOpen]);

  return (
    <div
      role="dialog"
      aria-label="Thiệp cưới Đại Nghĩa & Thị Nhung — Chạm để mở thiệp"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5EFE6',
        background: 'radial-gradient(circle at 50% 40%, #FFFDF9 0%, #EDE3D1 100%)',
        opacity: opening ? 0 : 1,
        transform: opening ? 'scale(1.05)' : 'scale(1)',
        transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
        overflow: 'hidden',
        cursor: opening ? 'default' : 'pointer',
        padding: '16px',
      }}
      onClick={handleOpen}
    >
      {/* Background Soft Glow & Polka Texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(197, 160, 89, 0.16) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          opacity: 0.75,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Sparkles in Background */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <span style={{ position: 'absolute', top: '15%', left: '15%', color: '#C5A059', opacity: 0.5, fontSize: '18px', animation: 'floatSlow 4s infinite' }}>✦</span>
        <span style={{ position: 'absolute', top: '22%', right: '16%', color: '#C5A059', opacity: 0.45, fontSize: '14px', animation: 'floatSlow 5s infinite 1s' }}>✦</span>
        <span style={{ position: 'absolute', bottom: '18%', left: '18%', color: '#C5A059', opacity: 0.5, fontSize: '16px', animation: 'floatSlow 4.5s infinite 2s' }}>✦</span>
        <span style={{ position: 'absolute', bottom: '24%', right: '15%', color: '#C5A059', opacity: 0.4, fontSize: '13px', animation: 'floatSlow 6s infinite 1.5s' }}>✦</span>
      </div>

      {/* ── THE LUXURY EMBOSSED WEDDING CARD ── */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(330px, 90vw, 440px)',
          backgroundColor: '#FFFDF9',
          borderRadius: '20px',
          border: '2px solid #C5A059',
          boxShadow: opening
            ? '0 30px 80px rgba(50, 30, 15, 0.35)'
            : '0 20px 60px -10px rgba(50, 30, 15, 0.22), 0 8px 25px rgba(50, 30, 15, 0.08)',
          padding: 'clamp(36px, 7vw, 48px) clamp(24px, 6vw, 36px)',
          textAlign: 'center',
          transform: !entered
            ? 'translateY(40px) scale(0.94)'
            : opening
            ? 'translateY(-12px) scale(1.02)'
            : 'translateY(0) scale(1)',
          opacity: entered ? 1 : 0,
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
        }}
      >
        {/* Inner Gold Foil Frame */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '10px',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            borderRadius: '14px',
            pointerEvents: 'none',
          }}
        >
          {/* Corner Floral Ornaments */}
          <span style={{ position: 'absolute', top: 5, left: 7, fontSize: '11px', color: '#C5A059' }}>✦</span>
          <span style={{ position: 'absolute', top: 5, right: 7, fontSize: '11px', color: '#C5A059' }}>✦</span>
          <span style={{ position: 'absolute', bottom: 5, left: 7, fontSize: '11px', color: '#C5A059' }}>✦</span>
          <span style={{ position: 'absolute', bottom: 5, right: 7, fontSize: '11px', color: '#C5A059' }}>✦</span>
        </div>

        {/* Top Monogram Seal */}
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              margin: '0 auto 10px auto',
              borderRadius: '50%',
              border: '1.5px solid #C5A059',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #FFF9ED 0%, #FAF0DE 100%)',
              boxShadow: '0 4px 14px rgba(197, 160, 89, 0.25)',
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.5rem',
                fontStyle: 'italic',
                fontWeight: 600,
                letterSpacing: '1px',
                color: '#7D141A',
                whiteSpace: 'nowrap',
              }}
            >
              ĐN
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#9A7836',
              margin: 0,
            }}
          >
            Thiệp Cưới Báo Hỷ
          </p>
        </div>

        {/* Couple Names in Rich Deep Royal Burgundy */}
        <div style={{ margin: '10px 0 14px 0' }}>
          <h1
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.8rem, 8vw, 3.8rem)',
              color: '#7D141A',
              lineHeight: 1.1,
              margin: '0 0 6px 0',
              fontWeight: 400,
              textShadow: '0 1px 4px rgba(125, 20, 26, 0.1)',
            }}
          >
            {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName}
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              fontStyle: 'italic',
              fontWeight: 500,
              color: '#3A2C23',
              margin: 0,
            }}
          >
            {COUPLE.groom.fullName} &amp; {COUPLE.bride.fullName}
          </p>
        </div>

        {/* Symmetrical Gold Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '200px',
            margin: '0 auto 16px auto',
          }}
        >
          <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #C5A059)' }} />
          <span style={{ color: '#C5A059', fontSize: '13px' }}>❦</span>
          <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #C5A059)' }} />
        </div>

        {/* Date and Venue */}
        <div style={{ marginBottom: '24px' }}>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: '#1E1612',
              marginBottom: '4px',
            }}
          >
            20 . 10 . 2026
          </p>

          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(0.72rem, 1.4vw, 0.80rem)',
              fontWeight: 500,
              color: '#6E5F57',
              margin: 0,
            }}
          >
            {WEDDING.venue} · TP. Hồ Chí Minh
          </p>
        </div>

        {/* ── 3D WAX SEAL TAP TARGET ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            type="button"
            aria-label="Chạm để mở thiệp cưới và bật nhạc"
            style={{
              position: 'relative',
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #B22222 0%, #7D141A 55%, #4F0E13 100%)',
              border: '2.5px solid rgba(255, 230, 180, 0.65)',
              boxShadow: '0 8px 25px rgba(80, 15, 20, 0.45), 0 0 18px rgba(220, 50, 60, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'sealPulse 2.8s ease-in-out infinite',
              transition: 'transform 0.2s ease',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '1px dashed rgba(255, 240, 210, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '19px',
                  fontWeight: 700,
                  color: '#FFE8C2',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                  letterSpacing: '1px',
                }}
              >
                HỶ
              </span>
            </div>
          </button>

          {/* Invitation Whisper Pill */}
          <div
            style={{
              marginTop: '12px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              boxShadow: '0 4px 14px rgba(50, 30, 15, 0.08)',
              animation: 'pulseSlow 2.2s infinite',
            }}
          >
            <span
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.66rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#7D141A',
              }}
            >
              ✉ Chạm để mở thiệp &amp; bật nhạc
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sealPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 8px 25px rgba(80, 15, 20, 0.45), 0 0 14px rgba(220, 50, 60, 0.25);
          }
          50% {
            transform: scale(1.07);
            box-shadow: 0 12px 32px rgba(80, 15, 20, 0.6), 0 0 24px rgba(220, 50, 60, 0.45);
          }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.9; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-2px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

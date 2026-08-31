/* ══════════════════════════════════════════════════════════════════════
   INTRO — Simplified editorial opening screen
   Removed: WebGL Canvas, react-three-fiber, rose petals, golden dust,
            film grain, frosted glass, rotating ornament, complex shader.
   Design: Clean cream screen, couple names, thin line, one subtle
           fade-in animation. Opens quickly so user sees content fast.
══════════════════════════════════════════════════════════════════════ */
import { useState, useEffect } from 'react';

export default function IntroShader({ onComplete }) {
  const [phase, setPhase] = useState('visible'); // 'visible' | 'fadeout'
  const [entered, setEntered] = useState(false);

  /* Auto-reveal text */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    setPhase('fadeout');
    setTimeout(onComplete, 700);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#F8F4EC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.65s ease',
      }}
    >
      {/* Thin horizontal lines — editorial frame */}
      <div style={{
        position: 'absolute',
        top: 'clamp(24px, 5vw, 40px)',
        left: 'clamp(24px, 5vw, 48px)',
        right: 'clamp(24px, 5vw, 48px)',
        height: '1px',
        backgroundColor: 'rgba(184,149,85,0.4)',
        opacity: entered ? 1 : 0,
        transition: 'opacity 1s 0.2s ease',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 'clamp(24px, 5vw, 40px)',
        left: 'clamp(24px, 5vw, 48px)',
        right: 'clamp(24px, 5vw, 48px)',
        height: '1px',
        backgroundColor: 'rgba(184,149,85,0.4)',
        opacity: entered ? 1 : 0,
        transition: 'opacity 1s 0.2s ease',
      }} />

      {/* Top label */}
      <p style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.65rem',
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#8B1E22',
        marginBottom: 'clamp(40px, 8vw, 72px)',
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.8s 0.3s ease',
      }}>
        Lễ Thành Hôn · 20.10.2026
      </p>

      {/* Main — couple names */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 5vw, 40px)' }}>
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#756B63',
          marginBottom: 'clamp(12px, 2.5vw, 20px)',
          opacity: entered ? 1 : 0,
          transition: 'opacity 0.8s 0.5s ease',
        }}>
          Trân trọng kính mời
        </p>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
          fontWeight: 400,
          color: '#231B15',
          lineHeight: 1.05,
          margin: 0,
          letterSpacing: '-0.01em',
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 1.0s 0.6s ease',
        }}>
          Đại Nghĩa
        </h1>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: '#B89555',
          margin: 'clamp(4px, 1vw, 8px) 0',
          opacity: entered ? 1 : 0,
          transition: 'opacity 0.8s 0.85s ease',
        }}>
          &amp;
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
          fontWeight: 400,
          color: '#231B15',
          lineHeight: 1.05,
          margin: 0,
          letterSpacing: '-0.01em',
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 1.0s 0.9s ease',
        }}>
          Thị Nhung
        </h1>
      </div>

      {/* Thin champagne line */}
      <div style={{
        width: entered ? '48px' : '0px',
        height: '1px',
        backgroundColor: '#B89555',
        marginBottom: 'clamp(24px, 5vw, 40px)',
        transition: 'width 0.8s 1.2s ease',
      }} />

      {/* Date and venue */}
      <p style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.7rem',
        fontWeight: 400,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#756B63',
        marginBottom: 'clamp(36px, 7vw, 60px)',
        opacity: entered ? 1 : 0,
        transition: 'opacity 0.8s 1.4s ease',
      }}>
        Gem Center · TP.HCM
      </p>

      {/* CTA Button */}
      <button
        onClick={handleOpen}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 40px',
          backgroundColor: '#8B1E22',
          color: '#FDFBF7',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          border: 'none',
          borderRadius: '2px',
          cursor: 'pointer',
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.8s 1.6s ease, background 0.2s ease, transform 0.15s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = '#6D1013';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = '#8B1E22';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Mở thiệp cưới
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5"/>
        </svg>
      </button>

      {/* Bottom: venue line */}
      <p style={{
        position: 'absolute',
        bottom: 'clamp(32px, 6vw, 52px)',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.6rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#B89555',
        opacity: entered ? 1 : 0,
        transition: 'opacity 0.8s 1.8s ease',
      }}>
        Gem Center · 8 Nguyễn Bỉnh Khiêm · Quận 1
      </p>
    </div>
  );
}

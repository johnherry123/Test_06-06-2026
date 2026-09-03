/*
  INVITATION — Inside the invitation, family information
  ─────────────────────────────────────────────────────────────────
  
  This is the family page of the wedding invitation.
  A real Vietnamese wedding invitation lists:
  - Nhà trai / Nhà gái (family names)
  - A heartfelt invitation line
  - Date and venue reiterated
  
  Keep it honest. Keep it warm. Keep it invitation-like.
*/
import React from 'react';
import { COUPLE, FAMILY, WEDDING } from '../weddingData';

export default function Invitation() {
  return (
    <section
      id="loi-ngo"
      aria-label="Lời ngỏ và thông tin gia đình"
      style={{
        backgroundColor: '#FAF6EC',
        padding: 'clamp(64px, 10vw, 96px) clamp(24px, 5vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Paper grain */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.022'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
      }} />

      <div style={{
        maxWidth: '640px', margin: '0 auto',
        position: 'relative', zIndex: 1,
        textAlign: 'center',
      }}>

        {/* Invitation heading */}
        <p className="gsap-reveal" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.75rem, 1.4vw, 0.88rem)',
          fontStyle: 'italic',
          color: 'rgba(80,54,16,0.55)',
          letterSpacing: '0.04em',
          marginBottom: 'clamp(14px, 3vw, 20px)',
        }}>
          Hai gia đình trân trọng kính mời
        </p>

        {/* Names — prominent, invitation-style */}
        <h2 className="gsap-reveal" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.0rem, 5.5vw, 3.5rem)',
          fontWeight: 500,
          color: '#1A1008',
          lineHeight: 1.10,
          letterSpacing: '0.01em',
          marginBottom: 'clamp(6px, 1.2vw, 10px)',
        }}>
          {COUPLE.groom.fullName}
        </h2>

        <p className="gsap-reveal" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          fontStyle: 'italic', fontWeight: 300,
          color: 'rgba(155,115,42,0.72)',
          margin: 'clamp(4px, 0.8vw, 8px) 0',
        }}>
          &amp;
        </p>

        <p className="gsap-reveal" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.0rem, 5.5vw, 3.5rem)',
          fontWeight: 500,
          color: '#1A1008',
          lineHeight: 1.10,
          letterSpacing: '0.01em',
          marginBottom: 'clamp(32px, 6vw, 48px)',
        }}>
          {COUPLE.bride.fullName}
        </p>

        {/* Champagne rule */}
        <div className="gsap-line champagne-rule" style={{ marginBottom: 'clamp(32px, 6vw, 48px)' }} />

        {/* Two columns: Nhà Trai + Nhà Gái */}
        <div className="gsap-stagger invitation-families" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(24px, 5vw, 48px)',
          textAlign: 'left',
          marginBottom: 'clamp(36px, 6vw, 52px)',
        }}>
          {/* Nhà Trai */}
          <div>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.60rem', fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#7C1D21',
              marginBottom: 'clamp(10px, 2vw, 14px)',
            }}>Nhà Trai</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.88rem, 1.6vw, 1.02rem)',
              fontWeight: 500,
              color: '#1A1008',
              lineHeight: 1.65,
              marginBottom: '4px',
            }}>{FAMILY.groom.father}</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.88rem, 1.6vw, 1.02rem)',
              fontWeight: 500,
              color: '#1A1008',
              lineHeight: 1.65,
              marginBottom: '10px',
            }}>{FAMILY.groom.mother}</p>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.72rem',
              color: 'rgba(80,54,16,0.48)',
              lineHeight: 1.6,
            }}>{FAMILY.groom.address}</p>
          </div>

          {/* Nhà Gái */}
          <div>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.60rem', fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#7C1D21',
              marginBottom: 'clamp(10px, 2vw, 14px)',
            }}>Nhà Gái</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.88rem, 1.6vw, 1.02rem)',
              fontWeight: 500,
              color: '#1A1008',
              lineHeight: 1.65,
              marginBottom: '4px',
            }}>{FAMILY.bride.father}</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.88rem, 1.6vw, 1.02rem)',
              fontWeight: 500,
              color: '#1A1008',
              lineHeight: 1.65,
              marginBottom: '10px',
            }}>{FAMILY.bride.mother}</p>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.72rem',
              color: 'rgba(80,54,16,0.48)',
              lineHeight: 1.6,
            }}>{FAMILY.bride.address}</p>
          </div>
        </div>

        {/* Invitation quote */}
        <div className="gsap-reveal" style={{
          borderTop: '0.5px solid rgba(160,120,50,0.20)',
          paddingTop: 'clamp(24px, 4.5vw, 36px)',
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.05rem, 2.0vw, 1.28rem)',
            fontStyle: 'italic',
            color: '#3D2C12',
            lineHeight: 1.90,
            marginBottom: 'clamp(14px, 2.5vw, 20px)',
          }}>
            Sự hiện diện của Quý khách là niềm vinh hạnh
            và món quà quý giá nhất trong ngày trọng đại này.
          </p>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.68rem, 1.3vw, 0.78rem)',
            fontWeight: 500,
            color: 'rgba(80,54,16,0.50)',
            letterSpacing: '0.06em',
          }}>
            {WEDDING.dateDisplay} · {WEDDING.venue}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .invitation-families {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

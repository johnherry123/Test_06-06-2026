/* Invitation / Lời Ngỏ — Redesigned */
import React from 'react';
import { COUPLE, FAMILY, WEDDING } from '../weddingData';

export default function Invitation() {
  return (
    <section
      id="loi-ngo"
      aria-label="Lời ngỏ và thông tin gia đình"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 11vw, 108px) clamp(24px, 5vw, 72px)',
        backgroundColor: '#F5EFE3',
        overflow: 'hidden',
      }}
    >
      {/* Paper texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '220px 220px',
      }} />

      <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Names — emotional anchor */}
        <div className="gsap-reveal" style={{ marginBottom: 'clamp(36px, 5.5vw, 56px)', textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#1E1410',
            lineHeight: 1.1,
            letterSpacing: '0.01em',
            marginBottom: 'clamp(8px, 1.5vw, 12px)',
            maxWidth: '760px',
            margin: '0 auto clamp(8px, 1.5vw, 12px)',
          }}>
            {COUPLE.groom.fullName}
            <span style={{ color: '#B08C4E', fontWeight: 300, margin: '0 clamp(10px, 1.8vw, 20px)' }}>
              &amp;
            </span>
            {COUPLE.bride.fullName}
          </div>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.60rem, 1.1vw, 0.68rem)',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#9E8E82',
            margin: 0,
          }}>
            {COUPLE.groom.roleLabel}&nbsp;·&nbsp;{COUPLE.bride.roleLabel}
          </p>
        </div>

        {/* Champagne rule */}
        <div className="gsap-line" style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(176,140,78,0.40) 20%, rgba(176,140,78,0.40) 80%, transparent)',
          marginBottom: 'clamp(36px, 5.5vw, 56px)',
        }} />

        {/* Two column layout */}
        <div className="invitation-grid gsap-stagger" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(36px, 6vw, 80px)',
          alignItems: 'start',
        }}>
          {/* LEFT: Family lineage */}
          <div>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.60rem',
              fontWeight: 600,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: '#7C1D21',
              marginBottom: 'clamp(18px, 3vw, 28px)',
            }}>
              Hai gia đình trân trọng kính báo
            </p>

            {/* Nhà Trai */}
            <div style={{ marginBottom: 'clamp(22px, 3.5vw, 32px)' }}>
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.58rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B08C4E',
                marginBottom: '10px',
              }}>Nhà Trai</p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.90rem, 1.5vw, 1.02rem)',
                fontWeight: 500,
                color: '#1E1410',
                lineHeight: 1.6,
                marginBottom: '2px',
              }}>{FAMILY.groom.father}</p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.90rem, 1.5vw, 1.02rem)',
                fontWeight: 500,
                color: '#1E1410',
                lineHeight: 1.6,
                marginBottom: '8px',
              }}>{FAMILY.groom.mother}</p>
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.74rem',
                color: '#9E8E82',
                lineHeight: 1.5,
              }}>{FAMILY.groom.address}</p>
            </div>

            {/* Nhà Gái */}
            <div>
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.58rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B08C4E',
                marginBottom: '10px',
              }}>Nhà Gái</p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.90rem, 1.5vw, 1.02rem)',
                fontWeight: 500,
                color: '#1E1410',
                lineHeight: 1.6,
                marginBottom: '2px',
              }}>{FAMILY.bride.father}</p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.90rem, 1.5vw, 1.02rem)',
                fontWeight: 500,
                color: '#1E1410',
                lineHeight: 1.6,
                marginBottom: '8px',
              }}>{FAMILY.bride.mother}</p>
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.74rem',
                color: '#9E8E82',
                lineHeight: 1.5,
              }}>{FAMILY.bride.address}</p>
            </div>
          </div>

          {/* RIGHT: Invitation message */}
          <div className="gsap-reveal" style={{ paddingTop: 'clamp(0px, 1.5vw, 12px)' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
              fontWeight: 300,
              color: 'rgba(176,140,78,0.25)',
              lineHeight: 0.8,
              marginBottom: 'clamp(8px, 1.5vw, 12px)',
              userSelect: 'none',
            }}>"</div>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.2rem, 2.3vw, 1.6rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#3D3228',
              lineHeight: 1.80,
              marginBottom: 'clamp(22px, 3.8vw, 34px)',
            }}>
              Sự hiện diện của Quý khách là niềm vinh hạnh
              và món quà quý giá nhất trong ngày trọng đại này.
            </p>

            <div style={{
              borderLeft: '2px solid rgba(176,140,78,0.35)',
              paddingLeft: 'clamp(14px, 2.5vw, 20px)',
            }}>
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 'clamp(0.74rem, 1.3vw, 0.86rem)',
                fontWeight: 500,
                color: '#6B5D52',
                letterSpacing: '0.03em',
                marginBottom: '6px',
              }}>{WEDDING.dateDisplay}</p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(0.86rem, 1.5vw, 0.98rem)',
                fontStyle: 'italic',
                color: '#9E8E82',
              }}>{WEDDING.venue} · {WEDDING.venueHall}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

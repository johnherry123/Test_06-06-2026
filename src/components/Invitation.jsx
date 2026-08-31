/* ══════════════════════════════════════════════════════════════════════
   INVITATION / LỜI NGỎ
   ──────────────────────────────────────────────────────────────────────
   Art direction: Warm ivory, stationery aesthetic, family lineage.
   Reduced decorative elements vs previous version.
   Data: from weddingData.js (family names clearly marked as placeholders).

   Removed:
   - Wax seal image from top (redundant decoration)
   - Bottom lotus SVG ornament (redundant)
   - Kept: family lineage grid, couple names, invitation message, branch-divider
══════════════════════════════════════════════════════════════════════ */
import React from 'react';
import { COUPLE, FAMILY, WEDDING } from '../weddingData';

export default function Invitation() {
  return (
    <section
      id="loi-ngo"
      aria-label="Lời ngỏ và thông tin gia đình"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 12vw, 120px) 24px',
        backgroundColor: '#F8F4EC',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section label ── */}
        <p className="section-label gsap-reveal" style={{ textAlign: 'center', marginBottom: '16px' }}>
          Lời Ngỏ
        </p>

        {/* ── Main heading ── */}
        <h2 className="gsap-reveal" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 500,
          color: '#231B15',
          textAlign: 'center',
          marginBottom: 'clamp(32px, 5vw, 48px)',
          lineHeight: 1.1,
        }}>
          Trân trọng kính mời
        </h2>

        {/* ── Family lineage — editorial two-column ── */}
        <div
          className="gsap-stagger invitation-family-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(28px, 5vw, 52px)',
            marginBottom: 'clamp(40px, 6vw, 56px)',
          }}
        >
          {/* Nhà Trai */}
          <div>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#8B1E22',
              marginBottom: '14px',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(184,149,85,0.3)',
            }}>
              Nhà Trai
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem', fontWeight: 500,
              color: '#231B15', lineHeight: 1.5, marginBottom: '2px',
            }}>
              {FAMILY.groom.father}
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem', fontWeight: 500,
              color: '#231B15', lineHeight: 1.5, marginBottom: '10px',
            }}>
              {FAMILY.groom.mother}
            </p>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.78rem', color: '#9E9188', lineHeight: 1.5,
            }}>
              {FAMILY.groom.address}
            </p>
          </div>

          {/* Nhà Gái */}
          <div>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#8B1E22',
              marginBottom: '14px',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(184,149,85,0.3)',
            }}>
              Nhà Gái
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem', fontWeight: 500,
              color: '#231B15', lineHeight: 1.5, marginBottom: '2px',
            }}>
              {FAMILY.bride.father}
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem', fontWeight: 500,
              color: '#231B15', lineHeight: 1.5, marginBottom: '10px',
            }}>
              {FAMILY.bride.mother}
            </p>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.78rem', color: '#9E9188', lineHeight: 1.5,
            }}>
              {FAMILY.bride.address}
            </p>
          </div>
        </div>

        {/* ── Champagne rule ── */}
        <div className="gsap-line" style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.45) 20%, rgba(184,149,85,0.45) 80%, transparent)',
          marginBottom: 'clamp(32px, 5vw, 48px)',
        }} />

        {/* ── Couple names ── */}
        <div className="gsap-reveal" style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4.5vw, 40px)' }}>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.60rem', fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#9E9188', marginBottom: '14px',
          }}>
            Trưởng Nam &nbsp;·&nbsp; Út Nữ
          </p>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.7rem, 4vw, 2.7rem)',
            fontStyle: 'italic', fontWeight: 400,
            color: '#231B15', lineHeight: 1.15,
          }}>
            {COUPLE.groom.fullName}{' '}
            <span style={{ color: '#B89555', fontWeight: 300 }}>&amp;</span>{' '}
            {COUPLE.bride.fullName}
          </div>
        </div>

        {/* ── Second rule ── */}
        <div className="gsap-line" style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(35,27,21,0.1) 20%, rgba(35,27,21,0.1) 80%, transparent)',
          marginBottom: 'clamp(28px, 4vw, 40px)',
        }} />

        {/* ── Botanical branch divider ── */}
        <div className="gsap-reveal" style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4vw, 38px)', opacity: 0.65 }}>
          <img
            src="/Test_06-06-2026/branch-divider.svg"
            alt="" role="presentation" aria-hidden="true"
            style={{ width: '100%', maxWidth: '240px', height: '32px', display: 'inline-block' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* ── Invitation message ── */}
        <div className="gsap-reveal" style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            fontStyle: 'italic',
            color: '#4A3F38',
            lineHeight: 1.9,
            marginBottom: '16px',
          }}>
            Sự hiện diện của Quý khách là niềm vinh hạnh
            <br />và món quà quý giá nhất trong ngày trọng đại này.
          </p>

          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.78rem',
            color: '#9E9188',
            letterSpacing: '0.04em',
          }}>
            {WEDDING.dateDisplay} · {WEDDING.venue}
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 560px) {
          .invitation-family-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

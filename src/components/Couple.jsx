/* ══════════════════════════════════════════════════════════════════════
   COUPLE / HAI CHÚNG MÌNH
   ──────────────────────────────────────────────────────────────────────
   Art direction: Editorial photography, asymmetric, light ivory.
   Data: sourced from centralized weddingData.js.

   Removed:
   - Invented personal quotes
   - Fragile aria-label CSS selector for mobile

   Added:
   - Personal detail fields (placeholders in weddingData.js)
   - Proper className-based mobile CSS
══════════════════════════════════════════════════════════════════════ */
import React from 'react';
import { COUPLE } from '../weddingData';

function PersonCard({ person, reversed }) {
  return (
    <article
      className="couple-card gsap-reveal"
      aria-label={`Giới thiệu ${person.role}: ${person.fullName}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(28px, 5vw, 64px)',
        alignItems: 'start',
        marginBottom: 'clamp(64px, 10vw, 96px)',
      }}
    >
      {/* ── Portrait photograph ── */}
      <div
        className="couple-photo-col"
        style={{
          order: reversed ? 2 : 1,
          overflow: 'hidden',
          position: 'relative',
          lineHeight: 0,
        }}
      >
        <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
          <img
            src={person.photo.src}
            alt={person.photo.alt}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              display: 'block',
              transition: 'transform 7s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
            onError={e => { e.target.src = person.photo.fallback; }}
          />
          {/* Subtle warm overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(35,27,21,0.08) 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Thin champagne accent line */}
        <div style={{
          position: 'absolute',
          top: '8%', bottom: '8%',
          [reversed ? 'left' : 'right']: '-1px',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(184,149,85,0.4) 30%, rgba(184,149,85,0.4) 70%, transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Text content ── */}
      <div
        className="couple-text-col"
        style={{
          order: reversed ? 1 : 2,
          paddingTop: 'clamp(8px, 2vw, 24px)',
          alignSelf: 'center',
        }}
      >
        {/* Role labels */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.60rem',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#8B1E22',
          marginBottom: '4px',
        }}>
          {person.role}
        </p>
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.60rem',
          fontWeight: 400,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#9E9188',
          marginBottom: '18px',
        }}>
          {person.roleLabel}
        </p>

        {/* Name */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 500,
          color: '#231B15',
          lineHeight: 1.1,
          marginBottom: '20px',
          letterSpacing: '-0.01em',
        }}>
          {person.fullName}
        </h3>

        {/* Champagne rule */}
        <div style={{
          width: '28px', height: '1px',
          backgroundColor: '#B89555',
          marginBottom: '22px',
          opacity: 0.7,
        }} />

        {/* Personal details — from weddingData.js */}
        {person.details && person.details.length > 0 && (
          <dl style={{ margin: 0 }}>
            {person.details.map((detail, i) => (
              <div key={i} style={{
                marginBottom: i < person.details.length - 1 ? '12px' : 0,
              }}>
                <dt style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.62rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#9E9188',
                  marginBottom: '3px',
                }}>
                  {detail.label}
                </dt>
                <dd style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
                  fontStyle: 'italic',
                  color: detail.value.startsWith('[') ? 'rgba(120,100,80,0.45)' : '#4A3F38',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

export default function Couple() {
  return (
    <section
      id="couple"
      aria-label="Cô dâu và chú rể"
      style={{
        padding: 'clamp(80px, 12vw, 120px) 0 clamp(40px, 6vw, 64px)',
        backgroundColor: '#FDFBF7',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>

        {/* Section header */}
        <div style={{ marginBottom: 'clamp(48px, 7vw, 72px)' }}>
          <p className="section-label gsap-reveal" style={{ marginBottom: '14px' }}>
            Đôi Uyên Ương
          </p>
          <h2 className="gsap-reveal" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 500,
            color: '#231B15',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}>
            Hai Chúng Mình
          </h2>
        </div>

        {/* Couple portraits — alternating layout */}
        {[COUPLE.groom, COUPLE.bride].map((person, i) => (
          <PersonCard key={person.id} person={person} reversed={i % 2 !== 0} />
        ))}
      </div>

      {/* Responsive: stack on mobile using className */}
      <style>{`
        @media (max-width: 640px) {
          .couple-card {
            grid-template-columns: 1fr !important;
          }
          .couple-photo-col,
          .couple-text-col {
            order: unset !important;
          }
          .couple-photo-col {
            max-width: 300px;
            margin: 0 auto;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

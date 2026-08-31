/* ══════════════════════════════════════════════════════════════════════
   COUPLE / HAI CHÚNG MÌNH  [REDESIGNED]
   ──────────────────────────────────────────────────────────────────────
   ART DIRECTION:
   Full-bleed asymmetric split — photography fills its entire column.
   No portrait cards. No frames. No containers. Just photograph and text.

   Structure (each person):
   [55% photo column — position:absolute fill, object-fit:cover]
   [45% text column — vertically centered, generous padding]

   Groom: photo LEFT, text right
   Bride:  text left,  photo RIGHT

   This creates a visual relationship between the two —
   they face toward each other's text.

   Previous version problems:
   • 2-col grid with portrait photos + separate card structure
   • Photo constrained to aspectRatio:3/4 container = smaller than it could be
   • Felt like "profile cards" on a dating site, not a wedding
   • Too much padding and borders creating UI feel

   New version:
   • Photo fills entire column at section height (clamp 520px–680px)
   • Text column: flex column, vertically centered
   • Mobile: full-width photo on top, text below (stack)
   • No decorative champagne lines — let the photography breathe
══════════════════════════════════════════════════════════════════════ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COUPLE } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

function PersonPanel({ person, photoLeft }) {
  const panelRef = useRef(null);
  const textRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.0, stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panelRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, panelRef);
    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={panelRef}
      className="couple-panel"
      aria-label={`${person.role}: ${person.fullName}`}
      style={{
        display: 'grid',
        /* 55% photo / 45% text — or reversed */
        gridTemplateColumns: photoLeft ? '55% 45%' : '45% 55%',
        /* Tall enough to be immersive — photo dominates */
        minHeight: 'clamp(520px, 68vh, 680px)',
        overflow: 'hidden',
      }}
    >
      {/* ── Photo column ── */}
      <div
        className="couple-photo-col"
        style={{
          order: photoLeft ? 1 : 2,
          position: 'relative',
          overflow: 'hidden',
          /* Subtle scale on hover — barely perceptible zoom */
        }}
      >
        <img
          src={person.photo.src}
          alt={person.photo.alt}
          loading="lazy"
          decoding="async"
          style={{
            /* Position absolute — fills the column completely, no letterboxing */
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 12%',
            display: 'block',
            transition: 'transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          onError={e => { e.currentTarget.src = person.photo.fallback; }}
        />
        {/* Subtle bottom gradient — grounds the photo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '35%',
            background: 'linear-gradient(to top, rgba(26,18,13,0.18), transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Text column ── */}
      <div
        ref={textRef}
        className="couple-text-col"
        style={{
          order: photoLeft ? 2 : 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 6vw, 80px) clamp(32px, 5vw, 64px)',
          backgroundColor: '#FDFBF7',
          /* Subtle border between columns */
          borderLeft: photoLeft ? '1px solid rgba(35,27,21,0.07)' : 'none',
          borderRight: photoLeft ? 'none' : '1px solid rgba(35,27,21,0.07)',
        }}
      >

        {/* Role eyebrow */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.60rem',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#8B1E22',
          marginBottom: 'clamp(12px, 2.5vw, 18px)',
        }}>
          {person.role}
        </p>

        {/* Full name — large, dominant */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 500,
          color: '#231B15',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          marginBottom: 'clamp(18px, 3vw, 28px)',
          margin: '0 0 clamp(18px, 3vw, 28px)',
        }}>
          {person.fullName}
        </h2>

        {/* Champagne rule — only one, not every section */}
        <div style={{
          width: '32px',
          height: '1px',
          background: 'linear-gradient(to right, rgba(184,149,85,0.7), transparent)',
          marginBottom: 'clamp(20px, 3.5vw, 32px)',
        }} />

        {/* Personal details — if provided */}
        {person.details && person.details.length > 0 && (
          <dl style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px, 2vw, 18px)',
            margin: 0,
          }}>
            {person.details.map((d, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <dt style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.62rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#9E9188',
                }}>
                  {d.label}
                </dt>
                <dd style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: '#4A3F38',
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {d.value}
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
      aria-label="Hai chúng mình"
      style={{ backgroundColor: '#F8F4EC' }}
    >
      {/* Section header — minimal, above the panels */}
      <div
        className="gsap-reveal"
        style={{
          textAlign: 'center',
          padding: 'clamp(56px, 8vw, 88px) 24px clamp(28px, 4vw, 44px)',
        }}
      >
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.62rem',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#8B1E22',
          marginBottom: '14px',
        }}>
          Hai Chúng Mình
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 500,
          color: '#231B15',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          {COUPLE.groom.firstName}&nbsp;
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#B89555',
          }}>
            &amp;
          </span>&nbsp;
          {COUPLE.bride.firstName}
        </h2>
      </div>

      {/* Panels — no gap between them, they stack edge-to-edge */}
      <PersonPanel person={COUPLE.groom} photoLeft={true} />
      <PersonPanel person={COUPLE.bride} photoLeft={false} />

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 680px) {
          .couple-panel {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .couple-photo-col {
            order: 1 !important;
            height: clamp(300px, 55vw, 400px) !important;
            position: relative !important;
          }
          .couple-text-col {
            order: 2 !important;
            border-left: none !important;
            border-right: none !important;
            border-top: 1px solid rgba(35,27,21,0.07) !important;
          }
        }
      `}</style>
    </section>
  );
}

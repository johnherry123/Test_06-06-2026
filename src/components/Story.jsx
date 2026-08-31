/* ══════════════════════════════════════════════════════════════════════
   STORY / CÂU CHUYỆN CỦA CHÚNG MÌNH
   ──────────────────────────────────────────────────────────────────────
   Art direction: Editorial dark — espresso background, warm photo light.
   This section is the emotional CONTRAST moment in the visual rhythm.

   Layout: Alternating text-left/photo-right composition.
   The final entry (wedding day) uses a closing typographic treatment.

   ⚠️ All story content is PLACEHOLDER — see src/weddingData.js to edit.
   NEVER add personal facts here that weren't confirmed by the couple.
══════════════════════════════════════════════════════════════════════ */
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORY, COUPLE, WEDDING } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

function StoryEntry({ entry, index, isLast }) {
  const ref = useRef(null);

  const isEven = index % 2 === 0;

  if (isLast) {
    /* Final entry — closing typographic treatment */
    return (
      <div
        ref={ref}
        className="gsap-reveal"
        style={{
          textAlign: 'center',
          paddingTop: 'clamp(56px, 8vw, 80px)',
          paddingBottom: 'clamp(12px, 2vw, 20px)',
          borderTop: '1px solid rgba(248,244,236,0.08)',
          marginTop: 'clamp(48px, 7vw, 72px)',
        }}
      >
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.62rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#B89555',
          marginBottom: '20px',
        }}>
          {entry.year}
        </p>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(248,244,236,0.92)',
          lineHeight: 1.2,
          letterSpacing: '0.01em',
          marginBottom: '16px',
        }}>
          {COUPLE.groom.firstName}
          <span style={{ color: '#B89555', fontWeight: 300, margin: '0 16px' }}>&amp;</span>
          {COUPLE.bride.firstName}
        </div>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
          fontStyle: 'italic',
          color: 'rgba(248,244,236,0.45)',
          marginBottom: '8px',
        }}>
          {entry.title}
        </p>

        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.75rem',
          letterSpacing: '0.06em',
          color: 'rgba(248,244,236,0.25)',
        }}>
          {entry.content}
        </p>

        {/* Champagne rule */}
        <div style={{
          width: '40px', height: '0.7px',
          background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.5), transparent)',
          margin: '32px auto 0',
        }} />
      </div>
    );
  }

  return (
    <article
      ref={ref}
      className="story-entry gsap-reveal"
      aria-label={`Câu chuyện: ${entry.title}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 5vw, 64px)',
        alignItems: 'center',
        marginBottom: 'clamp(56px, 9vw, 80px)',
      }}
    >
      {/* Text side */}
      <div style={{ order: isEven ? 1 : 2 }}>
        {/* Year label */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.60rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#B89555',
          marginBottom: '14px',
        }}>
          {entry.year}
        </p>

        {/* Thin champagne rule */}
        <div style={{
          width: '24px', height: '0.7px',
          backgroundColor: 'rgba(184,149,85,0.45)',
          marginBottom: '18px',
        }} />

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
          fontWeight: 500,
          color: 'rgba(248,244,236,0.90)',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '16px',
        }}>
          {entry.title}
        </h3>

        {/* Story content */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          fontStyle: 'italic',
          color: 'rgba(248,244,236,0.55)',
          lineHeight: 1.85,
          margin: 0,
        }}>
          {entry.content}
        </p>
      </div>

      {/* Photo side */}
      <div
        style={{
          order: isEven ? 2 : 1,
          aspectRatio: '4/5',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={entry.photo?.src}
          alt={entry.photo?.alt || entry.title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            display: 'block',
            /* Warm editorial tone — slight sepia feel */
            filter: 'brightness(0.88) contrast(1.04)',
            transition: 'transform 6s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          onMouseEnter={e => { e.target.style.transform = 'scale(1.03)'; }}
          onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
          onError={e => { e.target.parentElement.style.background = 'rgba(255,255,255,0.04)'; }}
        />
        {/* Subtle warm overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, rgba(26,18,13,0.25) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Thin border */}
        <div style={{
          position: 'absolute', inset: 0,
          border: '1px solid rgba(184,149,85,0.12)',
          pointerEvents: 'none',
        }} />
      </div>
    </article>
  );
}

export default function Story() {
  return (
    <section
      id="story"
      aria-label="Câu chuyện của chúng mình"
      style={{
        /* DARK MOMENT — editorial espresso background for visual contrast */
        backgroundColor: '#1A120D',
        padding: 'clamp(80px, 12vw, 120px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Very subtle warm texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
      }} />

      <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <div style={{ marginBottom: 'clamp(56px, 8vw, 80px)' }}>
          <p className="gsap-reveal" style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.60rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#B89555',
            marginBottom: '16px',
          }}>
            Hành Trình
          </p>

          <h2 className="gsap-reveal" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            fontWeight: 500,
            color: 'rgba(248,244,236,0.92)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            Câu Chuyện<br />
            <span style={{
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(248,244,236,0.55)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
            }}>
              của chúng mình
            </span>
          </h2>

          {/* Placeholder notice — remove when real story is added */}
          <p className="gsap-reveal" style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.70rem',
            color: 'rgba(184,149,85,0.45)',
            marginTop: '20px',
            fontStyle: 'italic',
          }}>
            ✦ Nội dung bên dưới là chỗ giữ. Cập nhật câu chuyện thật trong <code style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: '2px' }}>src/weddingData.js</code>
          </p>
        </div>

        {/* Story entries */}
        {STORY.map((entry, i) => (
          <StoryEntry
            key={i}
            entry={entry}
            index={i}
            isLast={i === STORY.length - 1}
          />
        ))}
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 640px) {
          .story-entry {
            grid-template-columns: 1fr !important;
          }
          .story-entry > div {
            order: unset !important;
          }
          .story-entry > div[style*="aspectRatio"] {
            max-height: 280px;
          }
        }
      `}</style>
    </section>
  );
}

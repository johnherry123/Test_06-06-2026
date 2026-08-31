/* ══════════════════════════════════════════════════════════════════════
   STORY / CÂU CHUYỆN CỦA CHÚNG MÌNH  [ELEVATED]
   ──────────────────────────────────────────────────────────────────────
   ART DIRECTION: Editorial dark — espresso bg, warm photo light.
   This section is the emotional CONTRAST moment in the visual rhythm.

   Changes in this version:
   • First story entry: FULL WIDTH photo (cinematic horizontal), not 2-col
     — creates a "chapter opener" feeling before the alternating entries
   • Remaining entries: alternating left/right composition (unchanged)
   • Placeholder notice: reduced to a single editorial footnote style
   • Mobile: photo max-height 260px (was too tall), text density improved

   ⚠️ All story content is PLACEHOLDER — see src/weddingData.js to edit.
   NEVER add personal facts here without confirmation from the couple.
══════════════════════════════════════════════════════════════════════ */
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORY, COUPLE, WEDDING } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

/* ── Full-width hero story entry — first entry only ── */
function HeroStoryEntry({ entry }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: 'clamp(56px, 9vw, 80px)' }}>

      {/* Full-width photo — cinematic wide crop */}
      <div style={{
        width: '100%',
        height: 'clamp(220px, 42vw, 480px)',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 'clamp(24px, 4vw, 36px)',
      }}>
        <img
          src={entry.photo?.src}
          alt={entry.photo?.alt || entry.title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            display: 'block',
            filter: 'brightness(0.82) contrast(1.06)',
            transition: 'transform 8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.025)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          onError={e => { e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.04)'; }}
        />
        {/* Gradient overlays — bottom and left edge */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(26,18,13,0.55) 0%, transparent 45%)',
          pointerEvents: 'none',
        }} />
        {/* Year label over photo */}
        <p style={{
          position: 'absolute',
          bottom: 'clamp(14px, 3vw, 22px)',
          left: 'clamp(16px, 3vw, 24px)',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.58rem',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(200,170,100,0.85)',
          margin: 0,
          zIndex: 2,
        }}>
          {entry.year}
        </p>
      </div>

      {/* Title + content — centered text under full-width photo */}
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.4rem, 3vw, 2.1rem)',
          fontWeight: 500,
          color: 'rgba(248,244,236,0.92)',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: 'clamp(10px, 2vw, 16px)',
        }}>
          {entry.title}
        </h3>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          fontStyle: 'italic',
          color: 'rgba(248,244,236,0.50)',
          lineHeight: 1.85,
          margin: 0,
        }}>
          {entry.content}
        </p>
      </div>
    </div>
  );
}

/* ── Alternating 2-col story entry ── */
function StoryEntry({ entry, index, isLast }) {
  const ref    = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 83%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  /* Final entry — closing typographic treatment */
  if (isLast) {
    return (
      <div
        ref={ref}
        style={{
          textAlign: 'center',
          paddingTop: 'clamp(56px, 8vw, 80px)',
          paddingBottom: 'clamp(12px, 2vw, 20px)',
          borderTop: '1px solid rgba(248,244,236,0.07)',
          marginTop: 'clamp(48px, 7vw, 72px)',
        }}
      >
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.60rem',
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
          fontSize: 'clamp(2rem, 5vw, 3.4rem)',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(248,244,236,0.92)',
          lineHeight: 1.2,
          letterSpacing: '0.01em',
          marginBottom: '16px',
        }}>
          {COUPLE.groom.firstName}
          <span style={{ color: '#B89555', fontWeight: 300, margin: '0 18px' }}>&amp;</span>
          {COUPLE.bride.firstName}
        </div>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
          fontStyle: 'italic',
          color: 'rgba(248,244,236,0.42)',
          marginBottom: '8px',
        }}>
          {entry.title}
        </p>
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.73rem',
          letterSpacing: '0.06em',
          color: 'rgba(248,244,236,0.22)',
        }}>
          {entry.content}
        </p>
        <div style={{
          width: '32px', height: '0.7px',
          background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.5), transparent)',
          margin: '32px auto 0',
        }} />
      </div>
    );
  }

  return (
    <article
      ref={ref}
      className="story-entry"
      aria-label={`Câu chuyện: ${entry.title}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(28px, 5vw, 60px)',
        alignItems: 'center',
        marginBottom: 'clamp(52px, 9vw, 80px)',
      }}
    >
      {/* Text */}
      <div style={{ order: isEven ? 1 : 2 }}>
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.58rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#B89555',
          marginBottom: '12px',
        }}>
          {entry.year}
        </p>
        <div style={{
          width: '22px', height: '0.7px',
          backgroundColor: 'rgba(184,149,85,0.40)',
          marginBottom: '16px',
        }} />
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)',
          fontWeight: 500,
          color: 'rgba(248,244,236,0.90)',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '14px',
        }}>
          {entry.title}
        </h3>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.98rem, 1.7vw, 1.12rem)',
          fontStyle: 'italic',
          color: 'rgba(248,244,236,0.50)',
          lineHeight: 1.85,
          margin: 0,
        }}>
          {entry.content}
        </p>
      </div>

      {/* Photo */}
      <div style={{
        order: isEven ? 2 : 1,
        aspectRatio: '4/5',
        overflow: 'hidden',
        position: 'relative',
      }}>
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
            filter: 'brightness(0.88) contrast(1.04)',
            transition: 'transform 7s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          onError={e => { e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.04)'; }}
        />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, rgba(26,18,13,0.28) 100%)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          border: '1px solid rgba(184,149,85,0.10)',
          pointerEvents: 'none',
        }} />
      </div>
    </article>
  );
}

export default function Story() {
  /* Split: first entry = full-width hero, rest = alternating */
  const [first, ...rest] = STORY;
  const restWithoutLast  = rest.slice(0, -1);
  const lastEntry        = rest[rest.length - 1];

  return (
    <section
      id="story"
      aria-label="Câu chuyện của chúng mình"
      style={{
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

      <div style={{
        maxWidth: '1060px',
        margin: '0 auto',
        padding: '0 clamp(20px, 4vw, 48px)',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Section header */}
        <div className="gsap-reveal" style={{ marginBottom: 'clamp(48px, 7vw, 72px)' }}>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.60rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#B89555',
            marginBottom: '14px',
          }}>
            Hành Trình
          </p>
          <h2 style={{
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
              color: 'rgba(248,244,236,0.48)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
            }}>
              của chúng mình
            </span>
          </h2>
        </div>

        {/* First entry — full width hero moment */}
        {first && <HeroStoryEntry entry={first} />}

        {/* Remaining entries — alternating 2-col */}
        {restWithoutLast.map((entry, i) => (
          <StoryEntry
            key={i}
            entry={entry}
            index={i}
            isLast={false}
          />
        ))}

        {/* Final entry — closing typography */}
        {lastEntry && (
          <StoryEntry
            entry={lastEntry}
            index={restWithoutLast.length}
            isLast={true}
          />
        )}

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
            max-height: 260px;
          }
        }
      `}</style>
    </section>
  );
}

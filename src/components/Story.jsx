/* ══════════════════════════════════════════════════════════════════════
   STORY — Visual Memoir / Photo Essay  [REDESIGNED]
   ART DIRECTION: Dark espresso — cinematic, intimate chapters.
   Each entry has a distinct visual personality.
   Placeholder text is clearly styled as placeholder, not broken UI.
   ⚠️ All story content is PLACEHOLDER — edit src/weddingData.js
══════════════════════════════════════════════════════════════════════ */
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORY, COUPLE, WEDDING } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

/* ── Entry 1: Full-width cinematic opener ── */
function FullWidthEntry({ entry }) {
  const ref = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: 'clamp(60px, 10vw, 92px)' }}>
      {/* Full-width photo */}
      <div style={{
        width: '100%',
        height: 'clamp(240px, 48vw, 540px)',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 'clamp(26px, 4vw, 40px)',
        backgroundColor: '#1A120D',
      }}>
        {!imgError ? (
          <img
            src={entry.photo?.src}
            alt={entry.photo?.alt || entry.title}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 25%',
              display: 'block',
              filter: 'brightness(0.76) contrast(1.08) saturate(0.86)',
              transition: 'transform 10s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.022)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #1A120D 0%, #2A1C0A 50%, #1A120D 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: '1px solid rgba(176,140,78,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'rgba(176,140,78,0.40)' }} />
            </div>
          </div>
        )}
        {/* Bottom gradient + year overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(26,18,13,0.65) 0%, rgba(26,18,13,0.10) 42%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <p style={{
          position: 'absolute',
          bottom: 'clamp(14px, 2.5vw, 24px)',
          left: 'clamp(18px, 3.5vw, 32px)',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 'clamp(0.54rem, 1vw, 0.62rem)',
          fontWeight: 600,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(190,158,90,0.85)',
          margin: 0,
        }}>
          {entry.year}
        </p>
      </div>

      {/* Title + content */}
      <div style={{ maxWidth: '660px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 500,
          color: 'rgba(248,244,236,0.93)',
          lineHeight: 1.18,
          letterSpacing: '-0.01em',
          marginBottom: 'clamp(10px, 1.8vw, 16px)',
        }}>{entry.title}</h3>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.02rem, 1.8vw, 1.18rem)',
          fontStyle: 'italic',
          color: 'rgba(248,244,236,0.45)',
          lineHeight: 1.85,
          margin: 0,
        }}>{entry.content}</p>
      </div>
    </div>
  );
}

/* ── Entries 2 & 4: Alternating asymmetric layout ── */
function AlternatingEntry({ entry, index }) {
  const ref = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={ref}
      className="story-alt-entry"
      aria-label={`Câu chuyện: ${entry.title}`}
      style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '58% 42%' : '42% 58%',
        gap: 'clamp(28px, 5vw, 60px)',
        alignItems: 'center',
        marginBottom: 'clamp(52px, 9vw, 84px)',
      }}
    >
      {/* Photo */}
      <div style={{
        order: isEven ? 1 : 2,
        aspectRatio: '3/4',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          src={entry.photo?.src}
          alt={entry.photo?.alt || entry.title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 18%',
            display: 'block',
            filter: 'brightness(0.82) contrast(1.06) saturate(0.88)',
            transition: 'transform 8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.032)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          onError={e => { e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.03)'; }}
        />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 55%, rgba(26,18,13,0.28) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Text */}
      <div style={{ order: isEven ? 2 : 1 }}>
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.56rem', fontWeight: 600,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: '#B08C4E',
          marginBottom: 'clamp(8px, 1.5vw, 14px)',
        }}>{entry.year}</p>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.28rem, 2.6vw, 1.9rem)',
          fontWeight: 500,
          color: 'rgba(248,244,236,0.92)',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: 'clamp(12px, 2vw, 18px)',
        }}>{entry.title}</h3>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.98rem, 1.7vw, 1.12rem)',
          fontStyle: 'italic',
          color: 'rgba(248,244,236,0.48)',
          lineHeight: 1.85,
          margin: 0,
        }}>{entry.content}</p>
      </div>
    </article>
  );
}

/* ── Entry 3: Large quote / text-forward ── */
function QuoteEntry({ entry }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="story-quote-entry" style={{
      marginBottom: 'clamp(52px, 9vw, 84px)',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', gap: 'clamp(28px, 5vw, 60px)', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 55%' }}>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.56rem', fontWeight: 600,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#B08C4E',
            marginBottom: 'clamp(10px, 1.8vw, 16px)',
          }}>{entry.year}</p>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.7rem, 3.8vw, 2.9rem)',
            fontStyle: 'italic', fontWeight: 400,
            color: 'rgba(248,244,236,0.90)',
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            marginBottom: 'clamp(14px, 2.2vw, 22px)',
          }}>{entry.title}</h3>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)',
            color: 'rgba(248,244,236,0.40)',
            lineHeight: 1.78,
            margin: 0,
            maxWidth: '420px',
          }}>{entry.content}</p>
        </div>

        {entry.photo?.src && (
          <div style={{
            flex: '0 0 clamp(130px, 26vw, 250px)',
            aspectRatio: '3/4',
            overflow: 'hidden',
            marginTop: 'clamp(18px, 3vw, 38px)',
            position: 'relative',
          }}>
            <img
              src={entry.photo.src}
              alt={entry.photo.alt || entry.title}
              loading="lazy" decoding="async"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center 20%',
                display: 'block',
                filter: 'brightness(0.78) contrast(1.06) saturate(0.83)',
              }}
              onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Entry 5: Closing — pure typography ── */
function ClosingEntry({ entry }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 86%', once: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{
      textAlign: 'center',
      borderTop: '1px solid rgba(248,244,236,0.07)',
      paddingTop: 'clamp(52px, 9vw, 84px)',
      paddingBottom: 'clamp(8px, 1.5vw, 14px)',
    }}>
      <p style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.56rem', fontWeight: 600,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: '#B08C4E',
        marginBottom: 'clamp(14px, 2.8vw, 22px)',
      }}>{entry.year}</p>

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
        fontStyle: 'italic', fontWeight: 400,
        color: 'rgba(248,244,236,0.93)',
        lineHeight: 1.1,
        letterSpacing: '0.01em',
        marginBottom: 'clamp(10px, 1.8vw, 16px)',
      }}>
        {COUPLE.groom.firstName}
        <span style={{ color: '#B08C4E', fontWeight: 300, margin: '0 clamp(12px, 2.2vw, 22px)' }}>
          &amp;
        </span>
        {COUPLE.bride.firstName}
      </div>

      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(0.92rem, 1.7vw, 1.1rem)',
        fontStyle: 'italic',
        color: 'rgba(248,244,236,0.38)',
        marginBottom: 'clamp(5px, 0.9vw, 9px)',
      }}>{entry.title}</p>

      <p style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.72rem',
        letterSpacing: '0.05em',
        color: 'rgba(248,244,236,0.20)',
      }}>{entry.content}</p>

      <div style={{
        width: '36px', height: '0.7px',
        background: 'linear-gradient(to right, transparent, rgba(176,140,78,0.50), transparent)',
        margin: 'clamp(26px, 4.5vw, 38px) auto 0',
      }} />
    </div>
  );
}

export default function Story() {
  if (!STORY || STORY.length === 0) return null;
  const entries = STORY;

  return (
    <section
      id="story"
      aria-label="Câu chuyện của chúng mình"
      style={{
        backgroundColor: '#1E1410',
        padding: 'clamp(84px, 13vw, 124px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Barely visible warm texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.014'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
      }} />

      <div style={{
        maxWidth: '1060px', margin: '0 auto',
        padding: '0 clamp(20px, 4.5vw, 56px)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Section header */}
        <div className="gsap-reveal" style={{ marginBottom: 'clamp(52px, 8vw, 76px)' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.1rem, 4.8vw, 3.6rem)',
            fontWeight: 500,
            color: 'rgba(248,244,236,0.92)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            Câu Chuyện<br />
            <span style={{
              fontStyle: 'italic', fontWeight: 400,
              color: 'rgba(248,244,236,0.38)',
              fontSize: 'clamp(1.65rem, 3.6vw, 2.8rem)',
            }}>của chúng mình</span>
          </h2>
        </div>

        {/* Distribute entries */}
        {entries[0] && <FullWidthEntry entry={entries[0]} />}
        {entries[1] && <AlternatingEntry entry={entries[1]} index={0} />}
        {entries[2] && <QuoteEntry entry={entries[2]} />}
        {entries[3] && <AlternatingEntry entry={entries[3]} index={1} />}
        {entries[4] && <ClosingEntry entry={entries[4]} />}
      </div>
    </section>
  );
}

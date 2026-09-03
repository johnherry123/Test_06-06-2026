/*
  STORY — Three moments
  ─────────────────────────────────────────────────────────────────
  
  Philosophy:
  Pages of a photo album. Compact. Warm.
  
  Rules:
  - Maximum 3 story entries rendered (first 3 from data)
  - No vertical timeline line
  - No year badges
  - No huge photos
  - Photo is small/medium and secondary to the text
  - Each entry: year annotation → title → one-line content → small photo
  - Entry layout alternates: text-left photo-right, then text-right photo-left
  
  Section bg: espresso (#1E1410) — keep for contrast, but make it brief and warm.
*/
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORY, COUPLE } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

function isPlaceholder(s) {
  return !s || s.startsWith('[') || s.trim() === '';
}

function StoryEntry({ entry, flip }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 86%', once: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const hasPhoto = entry.photo?.src;
  const titleText = isPlaceholder(entry.title) ? 'Câu chuyện chờ được kể...' : entry.title;
  const contentText = isPlaceholder(entry.content) ? null : entry.content;
  const yearText = isPlaceholder(entry.year) ? null : entry.year;

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: hasPhoto ? (flip ? '1fr clamp(100px, 26vw, 180px)' : 'clamp(100px, 26vw, 180px) 1fr') : '1fr',
        gap: 'clamp(18px, 4vw, 36px)',
        alignItems: 'center',
        paddingBottom: 'clamp(32px, 6vw, 48px)',
        borderBottom: '0.5px solid rgba(248,244,236,0.07)',
        marginBottom: 'clamp(32px, 6vw, 48px)',
      }}
      className="story-entry"
    >
      {/* Text — order changes on flip */}
      <div style={{ order: flip ? 0 : (hasPhoto ? 1 : 0) }}>
        {yearText && (
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.56rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#B08C4E', opacity: 0.80,
            marginBottom: '8px',
          }}>{yearText}</p>
        )}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: isPlaceholder(entry.title)
            ? 'clamp(1.05rem, 2.2vw, 1.40rem)'
            : 'clamp(1.30rem, 3.0vw, 1.85rem)',
          fontWeight: isPlaceholder(entry.title) ? 400 : 500,
          fontStyle: isPlaceholder(entry.title) ? 'italic' : 'normal',
          color: isPlaceholder(entry.title)
            ? 'rgba(248,244,236,0.22)'
            : 'rgba(248,244,236,0.90)',
          lineHeight: 1.20,
          letterSpacing: '0.01em',
          marginBottom: contentText ? '10px' : 0,
        }}>
          {titleText}
        </p>
        {contentText && (
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.76rem, 1.3vw, 0.86rem)',
            color: 'rgba(248,244,236,0.32)',
            lineHeight: 1.78, margin: 0,
          }}>{contentText}</p>
        )}
      </div>

      {/* Photo — small, not dominant */}
      {hasPhoto && (
        <div style={{
          order: flip ? 1 : 0,
          aspectRatio: '3/4',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <img
            src={entry.photo.src}
            alt={entry.photo.alt || titleText}
            loading="lazy" decoding="async"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 15%',
              display: 'block',
              filter: 'brightness(0.78) contrast(1.06) saturate(0.82)',
            }}
            onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
          />
        </div>
      )}
    </div>
  );
}

export default function Story() {
  /* Only render first 3 entries; skip the closing entry (no photo = closing) */
  const entries = (STORY || []).filter(e => e.photo !== null).slice(0, 3);

  if (entries.length === 0) return null;

  return (
    <section
      id="story"
      aria-label="Câu chuyện của chúng mình"
      style={{
        backgroundColor: '#1E1410',
        padding: 'clamp(64px, 10vw, 96px) clamp(24px, 5vw, 56px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header — minimal */}
        <div style={{ marginBottom: 'clamp(40px, 7vw, 60px)' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)',
            fontStyle: 'italic',
            color: 'rgba(248,244,236,0.30)',
            letterSpacing: '0.04em', marginBottom: '7px',
          }}>
            Hành trình của chúng mình
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.9rem, 5vw, 2.9rem)',
            fontWeight: 500, fontStyle: 'italic',
            color: 'rgba(248,244,236,0.90)',
            lineHeight: 1.08, letterSpacing: '0.01em', margin: 0,
          }}>
            {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName}
          </h2>
        </div>

        {/* Three story entries */}
        {entries.map((entry, i) => (
          <StoryEntry key={i} entry={entry} flip={i % 2 !== 0} />
        ))}

        {/* Closing line */}
        <div style={{ textAlign: 'center', paddingTop: 'clamp(4px, 1vw, 8px)' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.88rem, 1.7vw, 1.05rem)',
            fontStyle: 'italic',
            color: 'rgba(248,244,236,0.28)',
          }}>
            20 tháng Mười, 2026 — Ngày chúng mình về chung một nhà.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 500px) {
          .story-entry {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

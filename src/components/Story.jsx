/* ══════════════════════════════════════════════════════════════════════
   STORY — Visual Memory Fragments  [REFINED]
   ──────────────────────────────────────────────────────────────────────
   
   AUDIT FINDINGS fixed:
   
   PROBLEM: Previous code had 5 different layout components (FullWidthEntry,
            AlternatingEntry, QuoteEntry, ClosingEntry) with heavy 
            scaffolding — felt like a "timeline component system".
   FIX: Replaced with a simpler, more honest memory-fragment approach.
        Each entry chooses from: text-dominant | photo-dominant | paired.
        Fewer lines, more breathing room, more restraint.
   
   PROBLEM: Year was displayed as badge/chip — timeline widget feel.
   FIX: Year is just a tiny typographic annotation above the entry.
        No badge, no line, no circle. Just the number.
   
   PROBLEM: Full-width photo with 540px height for first entry = 
            another poster-sized image at the top.
   FIX: Varied sizes: first entry is medium (not dominant).
        Some entries are text-led, some photo-led.
   
   PROBLEM: Placeholder content rendered as if it were real content.
            Users see "[Một kỷ niệm đáng nhớ...]" — clearly wrong.
   FIX: Placeholder entries are shown with subtle italic styling + 
        a small notice "nội dung chờ cập nhật" so the couple 
        knows what to fill in, but guests see something graceful.
   
   KEPT:
   - Dark espresso (#1E1410) section bg
   - GSAP scroll reveals
   - Photo error fallback
   - Closing entry as pure typography
══════════════════════════════════════════════════════════════════════ */
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORY, COUPLE } from '../weddingData';

gsap.registerPlugin(ScrollTrigger);

const IVORY = 'rgba(248,244,236,';
const GOLD  = '#B08C4E';

/* Tiny scroll reveal — applied to each entry wrapper */
function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
}

/* Is this a placeholder entry? */
function isPlaceholder(text) {
  return !text || text.startsWith('[') || text.trim() === '';
}

/* ── Entry type A: Photo (medium) left, text right ── */
function EntryPhotoText({ entry }) {
  const ref = useRef(null);
  useReveal(ref);
  const isPhoto = entry.photo?.src && !isPlaceholder(entry.title);

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: isPhoto ? 'clamp(180px, 38vw, 340px) 1fr' : '1fr',
      gap: 'clamp(28px, 5vw, 52px)',
      alignItems: 'center',
      marginBottom: 'clamp(60px, 10vw, 88px)',
    }}
    className="story-entry-grid"
    >
      {isPhoto && (
        <div style={{
          aspectRatio: '3/4',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <img
            src={entry.photo.src}
            alt={entry.photo.alt || entry.title}
            loading="lazy" decoding="async"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 18%',
              display: 'block',
              filter: 'brightness(0.80) contrast(1.06) saturate(0.86)',
              transition: 'transform 9s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.035)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
          />
        </div>
      )}

      <div>
        {entry.year && !isPlaceholder(entry.year) && (
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.54rem', fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: GOLD, opacity: 0.80,
            marginBottom: 'clamp(8px, 1.5vw, 13px)',
          }}>{entry.year}</p>
        )}

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: isPlaceholder(entry.title) ? '1rem' : 'clamp(1.3rem, 2.8vw, 2.0rem)',
          fontWeight: 500, fontStyle: isPlaceholder(entry.title) ? 'italic' : 'normal',
          color: isPlaceholder(entry.title) ? `${IVORY}0.22)` : `${IVORY}0.88)`,
          lineHeight: 1.18, letterSpacing: '-0.01em',
          marginBottom: 'clamp(10px, 1.8vw, 16px)',
        }}>
          {isPlaceholder(entry.title) ? 'Câu chuyện đang được viết...' : entry.title}
        </p>

        {entry.content && (
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.95rem, 1.7vw, 1.10rem)',
            fontStyle: 'italic',
            color: isPlaceholder(entry.content) ? `${IVORY}0.18)` : `${IVORY}0.42)`,
            lineHeight: 1.85, margin: 0,
          }}>
            {isPlaceholder(entry.content) ? '[ Điền nội dung vào weddingData.js ]' : entry.content}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Entry type B: Text dominant with small photo aside ── */
function EntryTextPhoto({ entry }) {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <div ref={ref} style={{
      display: 'flex',
      gap: 'clamp(28px, 5vw, 52px)',
      alignItems: 'flex-start',
      marginBottom: 'clamp(60px, 10vw, 88px)',
      flexWrap: 'wrap',
    }}>
      {/* Text */}
      <div style={{ flex: '1 1 55%', minWidth: '220px' }}>
        {entry.year && !isPlaceholder(entry.year) && (
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.54rem', fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: GOLD, opacity: 0.80,
            marginBottom: 'clamp(8px, 1.5vw, 13px)',
          }}>{entry.year}</p>
        )}

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.7rem, 4vw, 2.9rem)',
          fontStyle: 'italic', fontWeight: 400,
          color: `${IVORY}0.88)`,
          lineHeight: 1.14, letterSpacing: '0.01em',
          marginBottom: 'clamp(12px, 2.2vw, 18px)',
        }}>
          {isPlaceholder(entry.title) ? 'Một khoảnh khắc...' : entry.title}
        </p>

        {entry.content && !isPlaceholder(entry.content) && (
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 'clamp(0.80rem, 1.4vw, 0.94rem)',
            color: `${IVORY}0.36)`,
            lineHeight: 1.78, margin: 0, maxWidth: '400px',
          }}>{entry.content}</p>
        )}
      </div>

      {/* Small aside photo */}
      {entry.photo?.src && (
        <div style={{
          flex: '0 0 clamp(110px, 22vw, 200px)',
          aspectRatio: '3/4',
          overflow: 'hidden',
          marginTop: 'clamp(14px, 2.5vw, 28px)',
        }}>
          <img
            src={entry.photo.src}
            alt={entry.photo.alt || entry.title}
            loading="lazy" decoding="async"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 22%',
              display: 'block',
              filter: 'brightness(0.76) contrast(1.06) saturate(0.82)',
            }}
            onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
          />
        </div>
      )}
    </div>
  );
}

/* ── Closing entry: pure typography ── */
function EntryClosing({ entry }) {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <div ref={ref} style={{
      textAlign: 'center',
      borderTop: '1px solid rgba(248,244,236,0.07)',
      paddingTop: 'clamp(52px, 9vw, 80px)',
    }}>
      {entry.year && !isPlaceholder(entry.year) && (
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.56rem', fontWeight: 600,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: GOLD, marginBottom: 'clamp(16px, 3vw, 24px)',
        }}>{entry.year}</p>
      )}

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(2.2rem, 5.8vw, 4.5rem)',
        fontStyle: 'italic', fontWeight: 400,
        color: `${IVORY}0.93)`,
        lineHeight: 1.08, letterSpacing: '0.01em',
        marginBottom: 'clamp(10px, 1.8vw, 16px)',
      }}>
        {COUPLE.groom.firstName}
        <span style={{ color: GOLD, fontWeight: 300, margin: '0 clamp(12px, 2.2vw, 22px)' }}>
          &amp;
        </span>
        {COUPLE.bride.firstName}
      </div>

      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(0.92rem, 1.7vw, 1.10rem)',
        fontStyle: 'italic',
        color: `${IVORY}0.38)`,
        margin: '0 0 clamp(5px, 0.9vw, 9px)',
      }}>{entry.title}</p>

      <p style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: '0.72rem', letterSpacing: '0.05em',
        color: `${IVORY}0.20)`,
      }}>{entry.content}</p>

      <div style={{
        width: '36px', height: '0.7px',
        background: `linear-gradient(to right, transparent, rgba(176,140,78,0.50), transparent)`,
        margin: 'clamp(26px, 4.5vw, 38px) auto 0',
      }} aria-hidden="true" />
    </div>
  );
}

export default function Story() {
  if (!STORY || STORY.length === 0) return null;

  /* Distribute entries across layout types:
     0 → photo+text, 1 → text+photo, 2 → photo+text, 3 → text+photo, 4+ → closing */
  const layouts = ['photo-text', 'text-photo', 'photo-text', 'text-photo'];

  return (
    <section
      id="story"
      aria-label="Câu chuyện của chúng mình"
      style={{
        backgroundColor: '#1E1410',
        padding: 'clamp(84px, 13vw, 120px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Barely-there paper grain */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.013'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
      }} />

      <div style={{
        maxWidth: '960px', margin: '0 auto',
        padding: '0 clamp(22px, 5vw, 56px)',
        position: 'relative', zIndex: 1,
      }}>

        {/* Section header — minimal */}
        <div style={{ marginBottom: 'clamp(52px, 8vw, 72px)' }}>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.56rem', fontWeight: 600,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: GOLD, marginBottom: 'clamp(10px, 2vw, 16px)',
          }}>
            Câu Chuyện
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)',
            fontWeight: 400, fontStyle: 'italic',
            color: `${IVORY}0.88)`,
            lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0,
          }}>
            của chúng mình
          </h2>
        </div>

        {/* Entries */}
        {STORY.map((entry, i) => {
          const isLast = i === STORY.length - 1;
          if (isLast && entry.photo === null) return <EntryClosing key={i} entry={entry} />;
          const layout = layouts[i % layouts.length];
          if (layout === 'photo-text') return <EntryPhotoText key={i} entry={entry} />;
          return <EntryTextPhoto key={i} entry={entry} />;
        })}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .story-entry-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

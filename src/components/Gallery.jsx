/* ══════════════════════════════════════════════════════════════════════
   GALLERY — Photo Essay  [REDESIGNED]
   ART DIRECTION: Near-black — photography is everything.
   Asymmetric editorial layout with varied sizes.
   Lightbox with keyboard navigation.
   No category filters — this is a photo essay, not a portfolio.
══════════════════════════════════════════════════════════════════════ */
import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY } from '../weddingData';

/* Lightbox */
function Lightbox({ photos, activeIdx, onClose, onPrev, onNext }) {
  if (activeIdx === null) return null;
  const photo = photos[activeIdx];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Xem ảnh: ${photo.alt}`}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(8,5,3,0.98)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'lbFadeIn 0.22s ease',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Đóng"
        style={{
          position: 'absolute', top: '20px', right: '20px', zIndex: 10,
          width: '42px', height: '42px', borderRadius: '50%',
          background: 'transparent',
          border: '1px solid rgba(248,244,236,0.18)',
          color: 'rgba(248,244,236,0.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(248,244,236,0.55)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,244,236,0.18)'; }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M1.5 1.5l10 10M11.5 1.5l-10 10"/>
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label="Ảnh trước"
        style={{
          position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
          width: '46px', height: '46px', borderRadius: '50%',
          background: 'transparent',
          border: '1px solid rgba(248,244,236,0.18)',
          color: 'rgba(248,244,236,0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 3L5 8l5 5"/>
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Ảnh tiếp theo"
        style={{
          position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
          width: '46px', height: '46px', borderRadius: '50%',
          background: 'transparent',
          border: '1px solid rgba(248,244,236,0.18)',
          color: 'rgba(248,244,236,0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3l5 5-5 5"/>
        </svg>
      </button>

      {/* Image */}
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }}>
        <img
          src={photo.src}
          alt={photo.alt}
          style={{
            maxWidth: '100%', maxHeight: '78vh',
            objectFit: 'contain', display: 'block', margin: '0 auto',
          }}
          onError={e => { e.target.src = photo.fallback; }}
        />
        <div style={{ marginTop: '16px' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem', fontStyle: 'italic',
            color: 'rgba(248,244,236,0.55)', margin: 0,
          }}>{photo.alt}</p>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.62rem',
            color: 'rgba(248,244,236,0.25)',
            marginTop: '5px', letterSpacing: '0.1em',
          }}>{activeIdx + 1} / {photos.length}</p>
        </div>
      </div>
    </div>
  );
}

/* Photo cell */
function PhotoCell({ photo, idx, onOpen, aspectRatio, style = {} }) {
  return (
    <div
      onClick={() => onOpen(idx)}
      tabIndex={0}
      role="button"
      aria-label={`Xem ảnh: ${photo.alt}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onOpen(idx); }}
      className="gallery-cell"
      style={{ aspectRatio, ...style }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: 'center 22%' }}
        onError={e => { e.target.src = photo.fallback; }}
      />
      <div className="gallery-cell-overlay" aria-hidden="true" />
    </div>
  );
}

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState(null);
  const photos = GALLERY;

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = e => {
      if (activeIdx === null) return;
      if (e.key === 'Escape')     setActiveIdx(null);
      if (e.key === 'ArrowLeft')  setActiveIdx(i => (i > 0 ? i - 1 : photos.length - 1));
      if (e.key === 'ArrowRight') setActiveIdx(i => (i < photos.length - 1 ? i + 1 : 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, photos.length]);

  const p = useCallback((n) => photos[n % photos.length], [photos]);

  const gap = 'clamp(4px, 0.6vw, 7px)';

  return (
    <section
      id="gallery"
      aria-label="Album ảnh cưới"
      style={{
        backgroundColor: '#0E0A07',
        paddingBottom: 'clamp(68px, 10vw, 100px)',
        overflow: 'hidden',
      }}
    >
      {/* Featured opener — full bleed */}
      <div
        style={{
          width: '100%',
          height: 'clamp(220px, 44vw, 500px)',
          overflow: 'hidden', position: 'relative', cursor: 'pointer',
        }}
        onClick={() => setActiveIdx(0)}
        role="button"
        tabIndex={0}
        aria-label={`Xem ảnh: ${photos[0]?.alt}`}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setActiveIdx(0); }}
      >
        {photos[0] && (
          <>
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              loading="eager"
              decoding="async"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center 30%',
                display: 'block',
                filter: 'brightness(0.68) contrast(1.08) saturate(0.83)',
                transition: 'transform 10s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.022)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
            />
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(14,10,7,0.90) 0%, rgba(14,10,7,0.20) 44%, transparent 68%)',
              pointerEvents: 'none',
            }} />
            {/* Title overlay */}
            <div style={{
              position: 'absolute',
              bottom: 'clamp(22px, 3.8vw, 38px)',
              left: 'clamp(22px, 4.5vw, 52px)',
            }}>
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.58rem', fontWeight: 500,
                letterSpacing: '0.24em', textTransform: 'uppercase',
                color: '#B08C4E', marginBottom: '7px',
              }}>Album Ảnh</p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.9rem, 4.8vw, 3.6rem)',
                fontWeight: 400,
                color: 'rgba(248,244,236,0.96)',
                lineHeight: 1.0, letterSpacing: '-0.02em',
                margin: 0,
                textShadow: '0 2px 28px rgba(0,0,0,0.28)',
              }}>
                Khoảnh Khắc<br/>
                <span style={{ fontStyle: 'italic', fontWeight: 400, fontSize: '0.80em', color: 'rgba(248,244,236,0.56)' }}>
                  hạnh phúc
                </span>
              </h2>
            </div>
          </>
        )}
      </div>

      {/* Editorial grid */}
      <div style={{ padding: `${gap}` }}>

        {/* Row 1: Portrait + two landscape stacked */}
        <div className="gallery-row-1" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap, marginBottom: gap,
        }}>
          <PhotoCell photo={p(1)} idx={1} onOpen={setActiveIdx} aspectRatio="3/4" />
          <div style={{ display: 'flex', flexDirection: 'column', gap }}>
            <PhotoCell photo={p(2)} idx={2} onOpen={setActiveIdx} aspectRatio="4/3" />
            <PhotoCell photo={p(3)} idx={3} onOpen={setActiveIdx} aspectRatio="4/3" />
          </div>
        </div>

        {/* Row 2: Full-width cinematic strip */}
        <div style={{ marginBottom: gap }}>
          <PhotoCell photo={p(4)} idx={4} onOpen={setActiveIdx} aspectRatio="16/5" style={{ width: '100%' }} />
        </div>

        {/* Row 3: Three equal portraits */}
        <div className="gallery-row-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap, marginBottom: gap,
        }}>
          <PhotoCell photo={p(5)} idx={5} onOpen={setActiveIdx} aspectRatio="3/4" />
          <PhotoCell photo={p(6)} idx={6} onOpen={setActiveIdx} aspectRatio="3/4" />
          <PhotoCell photo={p(7)} idx={7} onOpen={setActiveIdx} aspectRatio="3/4" />
        </div>

        {/* Row 4: Portrait + landscape */}
        <div className="gallery-row-4" style={{
          display: 'grid',
          gridTemplateColumns: '38% 62%',
          gap,
        }}>
          <PhotoCell photo={p(0)} idx={0} onOpen={setActiveIdx} aspectRatio="3/4" />
          <PhotoCell photo={p(2)} idx={2} onOpen={setActiveIdx} aspectRatio="4/3" style={{ height: '100%' }} />
        </div>
      </div>

      <Lightbox
        photos={photos}
        activeIdx={activeIdx}
        onClose={() => setActiveIdx(null)}
        onPrev={() => setActiveIdx(i => (i > 0 ? i - 1 : photos.length - 1))}
        onNext={() => setActiveIdx(i => (i < photos.length - 1 ? i + 1 : 0))}
      />
    </section>
  );
}

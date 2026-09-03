/*
  GALLERY — Compact Contact Sheet Album
  ─────────────────────────────────────────────────────────────────
  
  Philosophy:
  A wedding album, not a photographer's portfolio.
  
  Layout:
  - 2-col grid on mobile, 3-col on desktop
  - aspect-ratio 4/5 — uniform, compact
  - Show 6 photos on page (first 6)
  - "Xem toàn bộ" opens lightbox with all photos
  - No featured full-bleed image
  - No category filters
  - No cinematic strips
  - Lightbox: all photos, keyboard nav, swipe-friendly
  
  Section bg: warm cream (#F5EFE3) — NOT near-black
  This section should feel like a printed photo album page,
  not a photographer's dark-mode portfolio.
*/
import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY, COUPLE } from '../weddingData';

/* ── Lightbox — full photo access ── */
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
        backgroundColor: 'rgba(10,6,3,0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'lbFadeIn 0.22s ease',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Đóng"
        style={{
          position: 'absolute', top: '16px', right: '16px', zIndex: 10,
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'transparent',
          border: '1px solid rgba(248,244,236,0.20)',
          color: 'rgba(248,244,236,0.70)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M1 1l10 10M11 1L1 11"/>
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label="Ảnh trước"
        style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'transparent',
          border: '1px solid rgba(248,244,236,0.18)',
          color: 'rgba(248,244,236,0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 2.5L4.5 7 9 11.5"/>
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Ảnh tiếp theo"
        style={{
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'transparent',
          border: '1px solid rgba(248,244,236,0.18)',
          color: 'rgba(248,244,236,0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 2.5L9.5 7 5 11.5"/>
        </svg>
      </button>

      {/* Image */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '88vw', maxHeight: '84vh', textAlign: 'center' }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          style={{
            maxWidth: '100%', maxHeight: '76vh',
            objectFit: 'contain', display: 'block', margin: '0 auto',
          }}
          onError={e => { e.target.src = photo.fallback; }}
        />
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.60rem',
          color: 'rgba(248,244,236,0.22)',
          marginTop: '12px', letterSpacing: '0.08em',
        }}>
          {activeIdx + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState(null);
  const photos = GALLERY;

  /* Show first 6 on page */
  const VISIBLE = 6;
  const visible = photos.slice(0, VISIBLE);

  /* Keyboard navigation */
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = e => {
      if (e.key === 'Escape')     setActiveIdx(null);
      if (e.key === 'ArrowLeft')  setActiveIdx(i => (i > 0 ? i - 1 : photos.length - 1));
      if (e.key === 'ArrowRight') setActiveIdx(i => (i < photos.length - 1 ? i + 1 : 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, photos.length]);

  return (
    <section
      id="gallery"
      aria-label="Album ảnh cưới"
      style={{
        backgroundColor: '#F5EFE3',
        padding: 'clamp(64px, 10vw, 96px) 0',
        overflow: 'hidden',
      }}
    >
      {/* Section header — minimal */}
      <div style={{
        textAlign: 'center',
        padding: '0 clamp(24px, 5vw, 48px) clamp(28px, 5vw, 40px)',
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)',
          fontStyle: 'italic',
          color: 'rgba(80,54,16,0.42)',
          letterSpacing: '0.04em',
          marginBottom: '6px',
        }}>
          Album
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.65rem, 4.2vw, 2.6rem)',
          fontWeight: 500, color: '#1A1008',
          lineHeight: 1.10, letterSpacing: '0.01em',
          margin: 0,
        }}>
          {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName}
        </h2>
      </div>

      {/* ── 2-col / 3-col contact-sheet grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '3px',
        padding: '0',
      }}
      className="gallery-grid"
      >
        {visible.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setActiveIdx(idx)}
            aria-label={`Mở ảnh ${idx + 1}: ${photo.alt}`}
            style={{
              display: 'block',
              aspectRatio: '4/5',
              overflow: 'hidden',
              position: 'relative',
              background: '#1A1008',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block',
                transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
                filter: 'brightness(0.88) contrast(1.04) saturate(0.88)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              onError={e => { e.currentTarget.src = photo.fallback; }}
            />
          </button>
        ))}
      </div>

      {/* "View all" link */}
      {photos.length > VISIBLE && (
        <div style={{ textAlign: 'center', paddingTop: 'clamp(22px, 4vw, 32px)' }}>
          <button
            onClick={() => setActiveIdx(VISIBLE)}
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.72rem', fontWeight: 500,
              letterSpacing: '0.10em', textTransform: 'uppercase',
              color: '#7C1D21',
              background: 'transparent', border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '8px 0',
            }}
          >
            Xem toàn bộ album
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M2.5 6h7M7 3l3 3-3 3"/>
            </svg>
          </button>
        </div>
      )}

      <Lightbox
        photos={photos}
        activeIdx={activeIdx}
        onClose={() => setActiveIdx(null)}
        onPrev={() => setActiveIdx(i => (i > 0 ? i - 1 : photos.length - 1))}
        onNext={() => setActiveIdx(i => (i < photos.length - 1 ? i + 1 : 0))}
      />

      <style>{`
        @media (min-width: 640px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

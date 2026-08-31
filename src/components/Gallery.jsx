/* ══════════════════════════════════════════════════════════════════════
   GALLERY — Editorial Photo Story
   ────────────────────────────────────────────────────────────
   Art direction: DARK BACKGROUND — immersive photo story moment.
   Near-black background makes photographs feel gallery-quality.
   Data: from weddingData.js (centralized placeholder photo config).
   Layout: 2-col mobile, 3-col desktop grid with controlled aspect ratios.
   Preserved: lightbox, keyboard navigation, accessibility, lazy loading.
══════════════════════════════════════════════════════════════════════ */
import React, { useState, useEffect } from 'react';
import { GALLERY } from '../weddingData';

const GALLERY_PHOTOS = GALLERY;

const CATEGORIES = [
  { key: 'all',         label: 'Tất cả' },
  { key: 'traditional', label: 'Truyền thống' },
  { key: 'romance',     label: 'Lãng mạn' },
  { key: 'outdoor',     label: 'Ngoại cảnh' },
  { key: 'moments',     label: 'Khoảnh khắc' },
];

/* ── Lightbox ── */
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
      aria-label={`Xem ảnh: ${photo.title}`}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(14,9,6,0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Đóng lightbox"
        style={{
          position: 'absolute', top: '20px', right: '20px', zIndex: 10,
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'transparent',
          border: '1px solid rgba(248,244,236,0.2)',
          color: 'rgba(248,244,236,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(248,244,236,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,244,236,0.2)'; }}
      >
        {/* Close X */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M2 2l10 10M12 2L2 12"/>
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
          border: '1px solid rgba(248,244,236,0.2)',
          color: 'rgba(248,244,236,0.7)',
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
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'transparent',
          border: '1px solid rgba(248,244,236,0.2)',
          color: 'rgba(248,244,236,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3l5 5-5 5"/>
        </svg>
      </button>

      {/* Photo */}
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
        <div style={{ marginTop: '14px' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem', fontStyle: 'italic',
            color: 'rgba(248,244,236,0.7)', margin: 0,
          }}>{photo.title}</p>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.65rem', color: 'rgba(248,244,236,0.3)',
            marginTop: '4px', letterSpacing: '0.1em',
          }}>
            {activeIdx + 1} / {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [activeIdx, setActiveIdx]     = useState(null);

  const filtered = selectedCat === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === selectedCat);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = e => {
      if (activeIdx === null) return;
      if (e.key === 'Escape')     setActiveIdx(null);
      if (e.key === 'ArrowLeft')  setActiveIdx(i => (i > 0 ? i - 1 : filtered.length - 1));
      if (e.key === 'ArrowRight') setActiveIdx(i => (i < filtered.length - 1 ? i + 1 : 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, filtered.length]);

  return (
    <section
      id="gallery"
      aria-label="Album ảnh cưới"
      style={{
        padding: 'clamp(80px, 12vw, 120px) 0',
        /* DARK MOMENT — near-black for immersive editorial photo story */
        backgroundColor: '#0E0905',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 32px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(36px, 5vw, 52px)', padding: '0 clamp(4px, 1vw, 16px)' }}>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.60rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#B89555',
            marginBottom: '14px',
          }} className="gsap-reveal">
            Album Ảnh
          </p>
          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 500, color: 'rgba(248,244,236,0.92)',
              lineHeight: 1.1, letterSpacing: '-0.01em',
            }}
          >
            Khoảnh Khắc Hạnh Phúc
          </h2>
        </div>

        {/* Category filter — plain text underline style */}
        <div
          role="tablist"
          aria-label="Lọc ảnh theo danh mục"
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '4px 28px',
            marginBottom: 'clamp(28px, 4vw, 40px)',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(248,244,236,0.1)',
            padding: '0 clamp(4px, 1vw, 16px)',
          }}
        >
          {CATEGORIES.map(cat => {
            const isActive = selectedCat === cat.key;
            return (
              <button
                key={cat.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCat(cat.key)}
                style={{
                  background: 'transparent', border: 'none', padding: '4px 0',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'rgba(248,244,236,0.92)' : 'rgba(248,244,236,0.38)',
                  cursor: 'pointer',
                  borderBottom: isActive ? '1px solid #B89555' : '1px solid transparent',
                  paddingBottom: '3px',
                  transition: 'color 0.2s, border-color 0.2s',
                  letterSpacing: '0.02em',
                  marginBottom: '12px',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(248,244,236,0.65)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(248,244,236,0.38)'; }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── CSS Grid — editorial 2-col mobile, 3-col desktop ──
             Visual rhythm: alternating portrait/landscape ratios
             Mobile:  2 columns, 10px gap — deliberate editorial rhythm
             Desktop: 3 columns, 14px gap — masonry-like variety */}
        <div
          className="gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
          }}
        >
          <style>{`
            .gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
            @media (min-width: 640px) {
              .gallery-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
            }
          `}</style>
          {filtered.map((photo, idx) => {
            /*
             * Aspect ratio per item for visual rhythm:
             * Odd items (0,2,4,...) — portrait  4:5
             * Even items (1,3,5,...) — landscape 4:3
             * tall:true override keeps portrait items taller
             */
            const aspectRatio = photo.tall ? '3/4' : (idx % 2 === 1 ? '4/3' : '3/4');
            return (
              <div
                key={photo.id}
                onClick={() => setActiveIdx(idx)}
                tabIndex={0}
                role="button"
                aria-label={`Xem ảnh: ${photo.title}`}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setActiveIdx(idx); }}
                style={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                  lineHeight: 0,
                  /* Controlled aspect ratio — no image dominates entire screen */
                  aspectRatio,
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'center 25%',
                    transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                  }}
                  onMouseEnter={e => { e.target.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
                  onError={e => { e.target.src = photo.fallback; }}
                />
                {/* Hover caption */}
                <div
                  className="photo-caption"
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '16px 12px 10px',
                    background: 'linear-gradient(to top, rgba(18,10,6,0.55) 0%, transparent 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.82rem', fontStyle: 'italic',
                    color: 'rgba(248,244,236,0.9)',
                    margin: 0, lineHeight: 1,
                  }}>
                    {photo.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox */}
      <Lightbox
        photos={filtered}
        activeIdx={activeIdx}
        onClose={() => setActiveIdx(null)}
        onPrev={() => setActiveIdx(i => (i > 0 ? i - 1 : filtered.length - 1))}
        onNext={() => setActiveIdx(i => (i < filtered.length - 1 ? i + 1 : 0))}
      />

      <style>{`
        .photo-caption { opacity: 0 !important; }
        div[role="button"]:hover .photo-caption,
        div[role="button"]:focus-visible .photo-caption {
          opacity: 1 !important;
        }
        div[role="button"]:focus-visible {
          outline: 2px solid #8B1E22;
          outline-offset: 2px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

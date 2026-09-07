import { useState, useEffect } from 'react';
import { GALLERY, COUPLE } from '../weddingData';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

/* ── Lightbox Component ── */
function Lightbox({ photos, activeIdx, onClose, onPrev, onNext }) {
  if (activeIdx === null) return null;
  const photo = photos[activeIdx];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Xem ảnh: ${photo.title || photo.alt}`}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(12, 8, 6, 0.94)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng ảnh"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(128, 29, 36, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        }}
      >
        <X size={20} />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Ảnh trước"
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Ảnh tiếp theo"
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <ChevronRight size={24} />
      </button>

      {/* Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
            border: '2px solid rgba(197, 160, 89, 0.4)',
          }}
        >
          <img
            src={photo.src}
            alt={photo.title || photo.alt}
            style={{
              maxWidth: '85vw',
              maxHeight: '75vh',
              objectFit: 'contain',
              display: 'block',
            }}
            onError={(e) => {
              e.currentTarget.src = photo.fallback;
            }}
          />
        </div>

        {/* Title & Counter */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.25rem',
              color: '#FFFFFF',
              fontStyle: 'italic',
              margin: '0 0 4px 0',
            }}
          >
            {photo.title}
          </p>
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.74rem',
              color: 'rgba(255, 255, 255, 0.6)',
              letterSpacing: '0.1em',
            }}
          >
            {activeIdx + 1} / {photos.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredPhotos = filter === 'all'
    ? GALLERY
    : GALLERY.filter((p) => p.category === filter);

  useEffect(() => {
    if (activeIdx === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowLeft') setActiveIdx((i) => (i > 0 ? i - 1 : filteredPhotos.length - 1));
      if (e.key === 'ArrowRight') setActiveIdx((i) => (i < filteredPhotos.length - 1 ? i + 1 : 0));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIdx, filteredPhotos.length]);

  return (
    <section
      id="gallery"
      aria-label="Album ảnh cưới nghệ thuật"
      style={{
        backgroundColor: '#FAF7F2',
        background: 'radial-gradient(circle at center, #FFFDF9 0%, #F5EDE0 100%)',
        padding: 'clamp(50px, 8vw, 90px) clamp(12px, 3vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1080px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 50px)' }}>
          <div
            className="gsap-reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 16px',
              borderRadius: '999px',
              background: 'rgba(128, 29, 36, 0.08)',
              color: '#801D24',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            <Camera size={13} />
            Khoảnh Khắc Yêu Thương
          </div>

          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.2rem, 6vw, 4.2rem)',
              color: '#801D24',
              lineHeight: 1.15,
              margin: '0 0 8px 0',
              fontWeight: 400,
              wordBreak: 'break-word',
            }}
          >
            Album Kỷ Niệm
          </h2>

          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.0rem, 2.2vw, 1.25rem)',
              fontStyle: 'italic',
              color: '#584A42',
            }}
          >
            {COUPLE.groom.firstName} &amp; {COUPLE.bride.firstName} — Từng khoảnh khắc đong đầy tình yêu
          </p>

          {/* Filter Pills */}
          <div
            className="gsap-reveal gallery-filter-bar"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: '20px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {[
              { key: 'all', label: 'Tất Cả' },
              { key: 'romance', label: 'Lãng Mạn' },
              { key: 'moments', label: 'Khoảnh Khắc' },
              { key: 'traditional', label: 'Truyền Thống' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                className="gallery-filter-pill"
                onClick={() => setFilter(tab.key)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '999px',
                  border: filter === tab.key ? '1px solid #801D24' : '1px solid rgba(197, 160, 89, 0.35)',
                  background: filter === tab.key ? '#801D24' : 'rgba(255, 255, 255, 0.85)',
                  color: filter === tab.key ? '#FFFFFF' : '#584A42',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── MASONRY EDITORIAL PHOTO GRID ── */}
        <div
          className="gallery-masonry-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
            gap: 'clamp(10px, 2vw, 20px)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="gsap-reveal gallery-photo-card"
              onClick={() => setActiveIdx(idx)}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: photo.tall ? '3 / 4' : '4 / 3',
                backgroundColor: '#EBE3D5',
                cursor: 'pointer',
                boxShadow: '0 8px 24px -4px rgba(45, 30, 20, 0.08)',
                border: '1px solid rgba(197, 160, 89, 0.3)',
              }}
            >
              <img
                src={photo.src}
                alt={photo.title || photo.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onError={(e) => {
                  e.currentTarget.src = photo.fallback;
                }}
              />

              {/* Mobile Permanent Subtle Caption */}
              <div
                className="gallery-mobile-caption"
                style={{
                  display: 'none',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 10px 8px',
                  background: 'linear-gradient(to top, rgba(30, 10, 12, 0.75) 0%, transparent 100%)',
                  color: '#FAF7F2',
                  pointerEvents: 'none',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '0.88rem',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {photo.title}
                </p>
              </div>

              {/* Desktop Hover Overlay with Title and Zoom Icon */}
              <div
                className="gallery-desktop-hover"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(128, 29, 36, 0.75) 0%, rgba(20, 10, 5, 0.2) 60%, transparent 100%)',
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  color: '#FFFFFF',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '1.2rem',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    {photo.title}
                  </p>
                  <Maximize2 size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        photos={filteredPhotos}
        activeIdx={activeIdx}
        onClose={() => setActiveIdx(null)}
        onPrev={() => setActiveIdx((i) => (i > 0 ? i - 1 : filteredPhotos.length - 1))}
        onNext={() => setActiveIdx((i) => (i < filteredPhotos.length - 1 ? i + 1 : 0))}
      />

      <style>{`
        @media (max-width: 640px) {
          .gallery-filter-bar {
            justify-content: flex-start !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding: 4px 6px 12px !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }
          .gallery-filter-bar::-webkit-scrollbar {
            display: none !important;
          }
          .gallery-filter-pill {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
          }
          .gallery-masonry-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 10px !important;
          }
          .gallery-photo-card {
            aspect-ratio: 4 / 5 !important;
            border-radius: 12px !important;
          }
          .gallery-mobile-caption {
            display: flex !important;
          }
          .gallery-desktop-hover {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

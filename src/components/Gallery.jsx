import { useState, useEffect, useRef } from 'react';
import { GALLERY, COUPLE } from '../weddingData';
import { X, ChevronLeft, ChevronRight, Maximize2, Film, Sparkles } from 'lucide-react';

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
      aria-label={`Xem ảnh lớn: ${photo.title || photo.alt}`}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(12, 8, 6, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
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
          zIndex: 20,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(128, 29, 36, 0.85)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
        }}
      >
        <X size={22} />
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
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 20,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(197, 160, 89, 0.85)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        }}
      >
        <ChevronLeft size={26} />
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
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 20,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(197, 160, 89, 0.85)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        }}
      >
        <ChevronRight size={26} />
      </button>

      {/* Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '92vw',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7)',
            border: '2px solid rgba(197, 160, 89, 0.45)',
          }}
        >
          <img
            src={photo.src}
            alt={photo.title || photo.alt}
            style={{
              maxWidth: '88vw',
              maxHeight: '74vh',
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
              fontSize: '1.35rem',
              color: '#FFFFFF',
              fontStyle: 'italic',
              margin: '0 0 4px 0',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {photo.title}
          </p>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '0.74rem',
              color: '#C5A059',
              letterSpacing: '0.14em',
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
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const touchStartXRef = useRef(null);

  const totalPhotos = GALLERY.length;
  const currentPhoto = GALLERY[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : totalPhotos - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev < totalPhotos - 1 ? prev + 1 : 0));
  };

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIdx !== null) {
        if (e.key === 'Escape') setLightboxIdx(null);
        if (e.key === 'ArrowLeft') setLightboxIdx((i) => (i > 0 ? i - 1 : totalPhotos - 1));
        if (e.key === 'ArrowRight') setLightboxIdx((i) => (i < totalPhotos - 1 ? i + 1 : 0));
      } else {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIdx, totalPhotos]);

  /* ── Touch gestures for mobile ── */
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      id="moments"
      aria-label="Chapter III · Cinematic Moments - Album ảnh cưới nghệ thuật"
      style={{
        backgroundColor: '#FAF7F2',
        background: 'radial-gradient(ellipse 90% 70% at 50% 30%, #FFFDF9 0%, #F5ECE0 100%)',
        padding: 'clamp(60px, 9vw, 95px) clamp(16px, 4vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      {/* Anchor alias for compatibility */}
      <span id="gallery" style={{ position: 'absolute', top: 0, left: 0 }} />

      <div
        style={{
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4vw, 42px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(128, 29, 36, 0.08)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              color: '#801D24',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            <Film size={12} />
            Chapter III · Cinematic Moments
          </div>

          <h2
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)',
              color: '#801D24',
              lineHeight: 1.15,
              margin: '0 0 10px 0',
              fontWeight: 400,
            }}
          >
            Những Khoảnh Khắc Bất Tận
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.02rem, 2.2vw, 1.25rem)',
              fontStyle: 'italic',
              color: '#584A42',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Từng ánh mắt, nụ cười và dấu ấn thời gian được khắc ghi trong từng thước phim tình yêu của{' '}
            <span style={{ color: '#801D24', fontWeight: 600 }}>{COUPLE.groom.firstName}</span> &amp;{' '}
            <span style={{ color: '#801D24', fontWeight: 600 }}>{COUPLE.bride.firstName}</span>.
          </p>
        </div>

        {/* ── Main Editorial Lookbook Viewer ── */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: '#1C1510',
            border: '2px solid rgba(197, 160, 89, 0.45)',
            boxShadow: '0 24px 60px -10px rgba(50, 30, 15, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
            aspectRatio: '16 / 11',
            maxHeight: '560px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            touchAction: 'pan-y',
            cursor: 'pointer',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setLightboxIdx(currentIdx)}
          title="Nhấn để phóng to toàn màn hình"
        >
          {/* Main Photo with smooth crossfade */}
          <img
            key={currentPhoto.id}
            src={currentPhoto.src}
            alt={currentPhoto.title || currentPhoto.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              animation: 'fadeIn 0.4s ease',
              transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            onError={(e) => {
              e.currentTarget.src = currentPhoto.fallback;
            }}
          />

          {/* Vignette & Gradient Overlays */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Top Bar: Expand button & Photo Counter Pill */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 3,
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#FAF7F2',
                backgroundColor: 'rgba(28, 21, 16, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(197, 160, 89, 0.4)',
              }}
            >
              {String(currentIdx + 1).padStart(2, '0')} / {String(totalPhotos).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(currentIdx);
              }}
              aria-label="Phóng to ảnh"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(28, 21, 16, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                color: '#FAF7F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Previous / Next Arrow Buttons */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Ảnh trước"
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(28, 21, 16, 0.8)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(197, 160, 89, 0.5)',
              color: '#FAF7F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 3,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(128, 29, 36, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(28, 21, 16, 0.8)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Ảnh sau"
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(28, 21, 16, 0.8)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(197, 160, 89, 0.5)',
              color: '#FAF7F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 3,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(128, 29, 36, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(28, 21, 16, 0.8)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={22} />
          </button>

          {/* Bottom Title Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '20px',
              right: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.2rem, 3.2vw, 1.75rem)',
                fontWeight: 600,
                color: '#FFFDF9',
                margin: '0 0 4px 0',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
              }}
            >
              {currentPhoto.title}
            </h3>
            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.72rem',
                color: 'rgba(255, 255, 255, 0.8)',
                letterSpacing: '0.08em',
                margin: 0,
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
              }}
            >
              {currentPhoto.alt}
            </p>
          </div>
        </div>

        {/* ── Filmstrip Thumbnails Bar ── */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            overflowX: 'auto',
            padding: '6px 4px',
            scrollbarWidth: 'none',
          }}
        >
          {GALLERY.map((photo, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Chuyển đến ảnh ${idx + 1}`}
                style={{
                  width: isActive ? '68px' : '52px',
                  height: '52px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  padding: 0,
                  border: isActive
                    ? '2px solid #C5A059'
                    : '1px solid rgba(197, 160, 89, 0.25)',
                  boxShadow: isActive ? '0 4px 14px rgba(197, 160, 89, 0.45)' : 'none',
                  opacity: isActive ? 1 : 0.6,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  backgroundColor: '#1E1612',
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  onError={(e) => {
                    e.currentTarget.src = photo.fallback;
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <Lightbox
          photos={GALLERY}
          activeIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() =>
            setLightboxIdx((i) => (i > 0 ? i - 1 : totalPhotos - 1))
          }
          onNext={() =>
            setLightboxIdx((i) => (i < totalPhotos - 1 ? i + 1 : 0))
          }
        />
      )}
    </section>
  );
}

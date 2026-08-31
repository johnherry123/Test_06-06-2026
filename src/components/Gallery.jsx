/* ══════════════════════════════════════════════════════════════════════
   GALLERY — Vietnamese Editorial Masonry
   Removed: equal-card grid, gold borders, heavy overlays.
   Design: Editorial asymmetric composition, varied proportions.
   Preserved: filtering, lightbox, keyboard navigation.
══════════════════════════════════════════════════════════════════════ */
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_PHOTOS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    title: 'Ánh Nhìn Hạnh Phúc',
    category: 'romance',
    span: 'tall',   /* col-span-1, row-span-2 */
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85',
    title: 'Nắm Chặt Bàn Tay',
    category: 'moments',
    span: 'wide',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=85',
    title: 'Nụ Cười Rạng Rỡ',
    category: 'romance',
    span: 'square',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=85',
    title: 'Áo Dài Truyền Thống',
    category: 'traditional',
    span: 'wide',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=1200&q=85',
    title: 'Bên Nhau Bình Yên',
    category: 'outdoor',
    span: 'tall',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=85',
    title: 'Lời Hẹn Ước Trăm Năm',
    category: 'moments',
    span: 'square',
  },
];

const CATEGORIES = [
  { key: 'all',         label: 'Tất cả'            },
  { key: 'traditional', label: 'Lễ truyền thống'   },
  { key: 'romance',     label: 'Khoảnh khắc đẹp'  },
  { key: 'outdoor',     label: 'Ngoại cảnh'        },
];

const SPAN_STYLES = {
  tall:   { aspectRatio: '3/4' },
  wide:   { aspectRatio: '16/9' },
  square: { aspectRatio: '1/1' },
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeIdx, setActiveIdx]               = useState(null);

  const filtered = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const onKey = (e) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape')      setActiveIdx(null);
      if (e.key === 'ArrowLeft')   setActiveIdx(i => (i > 0 ? i - 1 : filtered.length - 1));
      if (e.key === 'ArrowRight')  setActiveIdx(i => (i < filtered.length - 1 ? i + 1 : 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, filtered.length]);

  return (
    <section
      id="gallery"
      style={{
        padding: 'clamp(80px, 12vw, 120px) 24px',
        backgroundColor: '#FDFBF7',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(36px, 5vw, 56px)' }}>
          <p className="section-label gsap-reveal" style={{ marginBottom: '16px' }}>
            Album Ảnh
          </p>
          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.15,
            }}
          >
            Khoảnh Khắc Hạnh Phúc
          </h2>
        </div>

        {/* Filter — plain text links */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: 'clamp(32px, 5vw, 48px)',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(35,27,21,0.1)',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '0',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.8rem',
                fontWeight: selectedCategory === cat.key ? 600 : 400,
                color: selectedCategory === cat.key ? '#8B1E22' : '#756B63',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                letterSpacing: '0.04em',
                textDecoration: selectedCategory === cat.key ? 'none' : 'none',
                borderBottom: selectedCategory === cat.key ? '1px solid #8B1E22' : '1px solid transparent',
                paddingBottom: '2px',
              }}
              onMouseEnter={e => { if (selectedCategory !== cat.key) e.currentTarget.style.color = '#231B15'; }}
              onMouseLeave={e => { if (selectedCategory !== cat.key) e.currentTarget.style.color = '#756B63'; }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial masonry grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(8px, 1.5vw, 16px)',
        }}>
          {filtered.map((photo, idx) => {
            /* Editorial column spans — varies by position */
            const colSpan = idx % 3 === 0 ? '1 / 6'   /* large left */
                          : idx % 3 === 1 ? '6 / 9'   /* medium center */
                          : '9 / 13';                   /* medium right */
            return (
              <div
                key={photo.id}
                onClick={() => setActiveIdx(idx)}
                style={{
                  gridColumn: colSpan,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  ...SPAN_STYLES[photo.span],
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.7s var(--ease-out)',
                  }}
                  onMouseEnter={e => { e.target.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
                />
                {/* Minimal hover caption */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '16px',
                  background: 'linear-gradient(to top, rgba(35,27,21,0.5) 0%, transparent 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                    color: '#FDFBF7',
                    margin: 0,
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
      {activeIdx !== null && (
        <div
          onClick={() => setActiveIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh phóng to"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(18,12,10,0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          {/* Close */}
          <button
            onClick={() => setActiveIdx(null)}
            aria-label="Đóng"
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'transparent',
              border: '1px solid rgba(253,251,247,0.2)',
              color: '#FDFBF7',
              width: '40px', height: '40px',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
              zIndex: 10,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(253,251,247,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(253,251,247,0.2)'; }}
          >
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setActiveIdx(i => (i > 0 ? i - 1 : filtered.length - 1)); }}
            aria-label="Ảnh trước"
            style={{
              position: 'absolute', left: '16px', top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: '1px solid rgba(253,251,247,0.2)',
              color: '#FDFBF7',
              width: '44px', height: '44px',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10,
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setActiveIdx(i => (i < filtered.length - 1 ? i + 1 : 0)); }}
            aria-label="Ảnh tiếp theo"
            style={{
              position: 'absolute', right: '16px', top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: '1px solid rgba(253,251,247,0.2)',
              color: '#FDFBF7',
              width: '44px', height: '44px',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10,
            }}
          >
            <ChevronRight size={22} />
          </button>

          {/* Photo */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '88vw', maxHeight: '84vh', textAlign: 'center' }}
          >
            <img
              src={filtered[activeIdx].url}
              alt={filtered[activeIdx].title}
              style={{
                maxWidth: '100%', maxHeight: '76vh',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
              }}
            />
            <div style={{ marginTop: '12px' }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'rgba(253,251,247,0.8)',
                margin: 0,
              }}>
                {filtered[activeIdx].title}
              </p>
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.7rem',
                color: 'rgba(253,251,247,0.4)',
                marginTop: '4px',
                letterSpacing: '0.1em',
              }}>
                {activeIdx + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile: stack columns */}
      <style>{`
        @media (max-width: 640px) {
          #gallery [style*="grid-column"] {
            grid-column: 1 / -1 !important;
          }
        }
        /* Hover overlay trigger on parent */
        #gallery .photo-item:hover .photo-caption {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}

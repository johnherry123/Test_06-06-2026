import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════
   PHOTO GALLERY SECTION (ALBUM ẢNH CƯỚI)
   100% Native Vietnamese Typography & Verified Masonry Grid
══════════════════════════════════════════════════════════════════════ */

const GALLERY_PHOTOS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90',
    title: 'Ánh Nhìn Hạnh Phúc',
    category: 'romance',
    aspect: 'tall',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=90',
    title: 'Nắm Chặt Bàn Tay',
    category: 'moments',
    aspect: 'wide',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=90',
    title: 'Nụ Cười Rạng Rỡ',
    category: 'romance',
    aspect: 'tall',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=90',
    title: 'Áo Dài Truyền Thống',
    category: 'traditional',
    aspect: 'wide',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=1200&q=90',
    title: 'Bên Nhau Bình Yên',
    category: 'outdoor',
    aspect: 'tall',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=90',
    title: 'Lời Hẹn Ước Trăm Năm',
    category: 'moments',
    aspect: 'wide',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'Tất Cả' },
  { key: 'traditional', label: 'Lễ Truyền Thống' },
  { key: 'romance', label: 'Khoảnh Khắc Đẹp' },
  { key: 'outdoor', label: 'Ngoại Cảnh' },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIdx === null) return;
      if (e.key === 'Escape') setActivePhotoIdx(null);
      if (e.key === 'ArrowLeft') {
        setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setActivePhotoIdx((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIdx, filteredPhotos.length]);

  return (
    <section
      id="gallery"
      style={{
        padding: 'clamp(70px, 10vw, 110px) 24px',
        backgroundColor: '#FAF7F2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="eyebrow-luxury">Kỷ Niệm Tình Yêu</div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              color: '#231B15',
              fontWeight: 700,
              margin: '0 0 12px',
            }}
          >
            Khoảnh Khắc <span style={{ color: '#8B1E22' }}>Hạnh Phúc</span>
          </h2>
          <div className="divider-luxury">
            <span style={{ color: '#C5A059' }}>✦</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '36px',
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              style={{
                padding: '8px 22px',
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '20px',
                border: selectedCategory === cat.key
                  ? '1.5px solid #8B1E22'
                  : '1px solid rgba(197, 160, 89, 0.3)',
                backgroundColor: selectedCategory === cat.key ? '#8B1E22' : '#FFFFFF',
                color: selectedCategory === cat.key ? '#FFFFFF' : '#584A40',
                boxShadow: selectedCategory === cat.key ? '0 4px 14px rgba(139, 30, 34, 0.25)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIdx(idx)}
              style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                aspectRatio: photo.aspect === 'tall' ? '3/4' : '4/3',
                backgroundColor: '#EDE6DB',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(35, 27, 21, 0.08)',
                border: '1px solid rgba(197, 160, 89, 0.2)',
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
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.06)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(24, 17, 14, 0.75) 0%, transparent 60%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '24px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              >
                <div style={{ color: '#FFFFFF' }}>
                  <span
                    className="font-serif"
                    style={{ fontSize: '1.3rem', fontStyle: 'italic', display: 'block', marginBottom: '4px' }}
                  >
                    {photo.title}
                  </span>
                  <span
                    className="font-sans"
                    style={{ fontSize: '0.78rem', color: '#E5C378', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  >
                    Xem chi tiết ✦
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIdx !== null && (
        <div
          onClick={() => setActivePhotoIdx(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(18, 12, 10, 0.95)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <button
            onClick={() => setActivePhotoIdx(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(229, 195, 120, 0.3)',
              color: '#FFFFFF',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
            }}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(229, 195, 120, 0.3)',
              color: '#FFFFFF',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIdx((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
            }}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(229, 195, 120, 0.3)',
              color: '#FFFFFF',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronRight size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '85vh',
              textAlign: 'center',
            }}
          >
            <img
              src={filteredPhotos[activePhotoIdx].url}
              alt={filteredPhotos[activePhotoIdx].title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(229, 195, 120, 0.35)',
              }}
            />

            <div style={{ marginTop: '16px', color: '#FFFFFF' }}>
              <h4 className="font-serif" style={{ fontSize: '1.45rem', fontStyle: 'italic', margin: 0 }}>
                {filteredPhotos[activePhotoIdx].title}
              </h4>
              <p className="font-display" style={{ fontSize: '0.85rem', color: '#E5C378', marginTop: '4px' }}>
                {activePhotoIdx + 1} / {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

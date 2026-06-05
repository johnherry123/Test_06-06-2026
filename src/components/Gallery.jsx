import React, { useState } from 'react';

const PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=85',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=560&fit=crop&q=85',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=560&fit=crop&q=85',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=1000&fit=crop&q=85',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=560&fit=crop&q=85',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=560&fit=crop&q=85',
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="sec s-warm" id="gallery">
      {/* Decorative top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(139,0,0,.3) 30%, rgba(139,0,0,.3) 70%, transparent)',
      }} />

      <div className="sec-head fu">
        <span className="eyebrow">Khoảnh Khắc</span>
        <h2>Bộ Sưu Tập</h2>
        <div className="rule-crimson" style={{ width: '60px', margin: '0 auto' }} />
      </div>

      {/* Masonry grid */}
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
          gap: '10px',
        }}>
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className="fu"
              style={{
                transitionDelay: `${i * .08}s`,
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: i % 3 === 0 ? '3/4' : '4/3',
                position: 'relative',
                background: 'var(--parchment)',
              }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={src}
                alt={`Khoảnh khắc ${i + 1}`}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform .65s cubic-bezier(.16,1,.3,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.07)';
                  e.currentTarget.nextElementSibling.style.opacity = '1';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.nextElementSibling.style.opacity = '0';
                }}
              />
              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent 30%, rgba(80,0,0,.55) 100%)',
                opacity: 0,
                transition: 'opacity .4s',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                paddingBottom: '16px',
                pointerEvents: 'none',
              }}>
                <span className="eyebrow" style={{ color: 'rgba(232,201,122,.9)', fontSize: '7px' }}>Xem ảnh</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(10,0,0,.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
            backdropFilter: 'blur(8px)',
          }}
        >
          <img src={PHOTOS[lightbox]} alt="" style={{
            maxWidth: '88vw', maxHeight: '88vh',
            objectFit: 'contain',
            boxShadow: '0 40px 120px rgba(0,0,0,.8)',
          }} />

          {/* Prev */}
          {lightbox > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setLightbox(l => l - 1); }}
              style={{
                position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,.07)', border: '1px solid rgba(232,201,122,.3)',
                color: 'var(--gold)', width: '48px', height: '48px',
                fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', backdropFilter: 'blur(4px)', transition: 'all .2s',
              }}
            >‹</button>
          )}

          {/* Next */}
          {lightbox < PHOTOS.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setLightbox(l => l + 1); }}
              style={{
                position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,.07)', border: '1px solid rgba(232,201,122,.3)',
                color: 'var(--gold)', width: '48px', height: '48px',
                fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', backdropFilter: 'blur(4px)', transition: 'all .2s',
              }}
            >›</button>
          )}

          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'transparent', border: 'none',
              color: 'rgba(232,201,122,.6)', fontSize: '2.2rem',
              cursor: 'pointer', lineHeight: 1, transition: 'color .2s',
            }}
          >×</button>

          {/* Counter */}
          <span className="eyebrow" style={{
            position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(232,201,122,.5)', fontSize: '8px',
          }}>
            {lightbox + 1} / {PHOTOS.length}
          </span>
        </div>
      )}
    </section>
  );
}

import React from 'react';

const PHOTOS = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
];

export default function Gallery() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-cream)' }}>
      <div className="fade-up" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="font-script" style={{ fontSize: '4rem', color: 'var(--cherry-dark)', margin: 0 }}>Khoảnh Khắc</h2>
          <div className="divider-gold" style={{ margin: '1rem auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {PHOTOS.map((src, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <img src={src} alt={`Gallery ${i}`} style={{
                width: '100%', height: '350px', objectFit: 'cover', display: 'block',
                transition: 'transform 0.5s ease'
              }} 
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

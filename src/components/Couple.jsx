/* ══════════════════════════════════════════════════════════════════════
   COUPLE — Fine Art Editorial Photography Layout
   Direction: Asymmetric photo-dominant composition
   Photos: Curated Unsplash editorial portraits (free license)
   Design: Overlapping composition, large portraits, italic quote
   Replace: src URLs with real couple photographs when available
   Specs: Portrait 3:4 ratio, editorial/cinematic light, warm tones
══════════════════════════════════════════════════════════════════════ */
import React from 'react';

/* ── Photography specifications ──
   Recommended: 3:4 portrait orientation
   Style: editorial, natural light, intimate, sophisticated
   NOT: cheesy studio backgrounds, heavy retouching, bright white
   Source: Unsplash free license — replace with real photos
*/
const COUPLE_DATA = [
  {
    id:        'groom',
    role:      'Chú Rể',
    nameLabel: 'Trưởng Nam',
    name:      'Nguyễn Đại Nghĩa',
    photo: {
      src:      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=90&fm=webp',
      fallback: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=85',
      alt:      'Chú rể Nguyễn Đại Nghĩa — ảnh minh họa, thay thế bằng ảnh thật',
    },
    quote: 'Em là bến đỗ bình yên nhất sau mọi bộn bề cuộc sống. Cảm ơn em đã bước vào cuộc đời anh và biến mỗi ngày thành một niềm hạnh phúc.',
  },
  {
    id:        'bride',
    role:      'Cô Dâu',
    nameLabel: 'Út Nữ',
    name:      'Lê Thị Nhung',
    photo: {
      src:      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=90&fm=webp',
      fallback: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85',
      alt:      'Cô dâu Lê Thị Nhung — ảnh minh họa, thay thế bằng ảnh thật',
    },
    quote: 'Cảm ơn anh vì luôn kiên nhẫn, yêu thương và chở che. Bên anh, em được là chính mình dịu dàng và hạnh phúc nhất.',
  },
];

function PersonCard({ person, reversed }) {
  return (
    <article
      className="gsap-reveal"
      aria-label={`Thông tin về ${person.role}: ${person.name}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(28px, 5vw, 64px)',
        alignItems: 'start',
        marginBottom: 'clamp(64px, 10vw, 96px)',
      }}
    >
      {/* ── Portrait photograph ── */}
      <div
        style={{
          order: reversed ? 2 : 1,
          overflow: 'hidden',
          position: 'relative',
          lineHeight: 0,
        }}
      >
        {/* Aspect ratio container — 3:4 portrait */}
        <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
          <img
            src={person.photo.src}
            alt={person.photo.alt}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              display: 'block',
              transition: 'transform 7s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
            onError={e => { e.target.src = person.photo.fallback; }}
          />

          {/* Very subtle warm overlay — creates cohesion */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(35,27,21,0.08) 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Thin champagne line — runs along right edge */}
        <div style={{
          position: 'absolute',
          top: '8%', bottom: '8%',
          [reversed ? 'left' : 'right']: '-1px',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(184,149,85,0.4) 30%, rgba(184,149,85,0.4) 70%, transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Text content ── */}
      <div
        style={{
          order: reversed ? 1 : 2,
          paddingTop: 'clamp(8px, 2vw, 24px)',
          alignSelf: 'center',
        }}
      >
        {/* Role label */}
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#8B1E22',
          marginBottom: '6px',
        }}>
          {person.role}
        </p>

        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.65rem',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#9E9188',
          marginBottom: '18px',
        }}>
          {person.nameLabel}
        </p>

        {/* Name — elegant serif */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
          fontWeight: 500,
          color: '#231B15',
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-0.01em',
        }}>
          {person.name}
        </h3>

        {/* Champagne accent rule */}
        <div style={{
          width: '28px', height: '1px',
          backgroundColor: '#B89555',
          marginBottom: '22px',
          opacity: 0.8,
        }} />

        {/* Quote — intimate, literary */}
        <blockquote style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
          fontStyle: 'italic',
          color: '#4A3F38',
          lineHeight: 1.85,
          margin: 0,
        }}>
          "{person.quote}"
        </blockquote>
      </div>
    </article>
  );
}

export default function Couple() {
  return (
    <section
      id="couple"
      aria-label="Cô dâu và chú rể"
      style={{
        padding: 'clamp(80px, 12vw, 120px) 0 clamp(40px, 6vw, 64px)',
        backgroundColor: '#FDFBF7',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
        <div style={{ marginBottom: 'clamp(48px, 7vw, 72px)' }}>
          <p className="section-label gsap-reveal" style={{ marginBottom: '14px' }}>
            Đôi Uyên Ương
          </p>
          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Cô Dâu &amp; Chú Rể
          </h2>
        </div>

        {/* Couple portraits — alternating layout */}
        {COUPLE_DATA.map((person, i) => (
          <PersonCard key={person.id} person={person} reversed={i % 2 !== 0} />
        ))}
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 640px) {
          article[aria-label*="Thông tin"] {
            grid-template-columns: 1fr !important;
          }
          article[aria-label*="Thông tin"] > div {
            order: unset !important;
          }
          article[aria-label*="Thông tin"] > div:first-child {
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}

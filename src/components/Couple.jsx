/* ══════════════════════════════════════════════════════════════════════
   COUPLE — Vietnamese Editorial
   Layout: Asymmetric editorial. Photography dominant.
   Removed: card UI, role pill badges, trait chips, quote box with border,
            glass-luxury-card, divider-luxury, eyebrow-luxury.
   Design: One full-bleed photograph + text alongside.
══════════════════════════════════════════════════════════════════════ */
import React from 'react';

const COUPLE_INFO = [
  {
    role:   'Chú Rể',
    title:  'Trưởng Nam',
    name:   'Nguyễn Đại Nghĩa',
    photo:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=85',
    quote:  'Em là bến đỗ bình yên nhất sau mọi bộn bề cuộc sống. Cảm ơn em đã bước vào cuộc đời anh và biến mỗi ngày thành một niềm hạnh phúc.',
    photoAlt: 'Chú rể Nguyễn Đại Nghĩa',
    errorSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=85',
  },
  {
    role:   'Cô Dâu',
    title:  'Út Nữ',
    name:   'Lê Thị Nhung',
    photo:  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&q=85',
    quote:  'Cảm ơn anh vì luôn kiên nhẫn, yêu thương và chở che. Bên anh, em được là chính mình dịu dàng và hạnh phúc nhất.',
    photoAlt: 'Cô dâu Lê Thị Nhung',
    errorSrc: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&q=85',
  },
];

function CoupleItem({ person, reversed }) {
  return (
    <div
      className="gsap-reveal couple-item"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 5vw, 64px)',
        alignItems: 'center',
        marginBottom: 'clamp(64px, 10vw, 96px)',
      }}
    >
      {/* Photo */}
      <div style={{ order: reversed ? 2 : 1, overflow: 'hidden' }}>
        <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
          <img
            src={person.photo}
            alt={person.photoAlt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 6s ease',
            }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
            onError={e => { e.target.src = person.errorSrc; }}
          />
        </div>
      </div>

      {/* Text */}
      <div style={{
        order: reversed ? 1 : 2,
        paddingTop: '8px',
      }}>
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8B1E22',
          marginBottom: '8px',
        }}>
          {person.role} &nbsp;·&nbsp; {person.title}
        </p>

        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          fontWeight: 500,
          color: '#231B15',
          marginBottom: '24px',
          lineHeight: 1.15,
        }}>
          {person.name}
        </h3>

        {/* Thin champagne rule */}
        <div style={{
          width: '32px', height: '1px',
          backgroundColor: '#B89555',
          marginBottom: '24px',
        }} />

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
          fontStyle: 'italic',
          color: '#4A3F38',
          lineHeight: 1.85,
        }}>
          "{person.quote}"
        </p>
      </div>
    </div>
  );
}

export default function Couple() {
  return (
    <section
      id="couple"
      style={{
        padding: 'clamp(80px, 12vw, 120px) 24px clamp(40px, 6vw, 64px)',
        backgroundColor: '#FDFBF7',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: 'clamp(48px, 7vw, 72px)' }}>
          <p className="section-label gsap-reveal" style={{ marginBottom: '16px' }}>
            Đôi Uyên Ương
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
            Cô Dâu &amp; Chú Rể
          </h2>
        </div>

        {/* Couple items — alternating layout */}
        {COUPLE_INFO.map((person, i) => (
          <CoupleItem key={i} person={person} reversed={i % 2 !== 0} />
        ))}

      </div>

      {/* Mobile responsive */}
      <style>{`
        .couple-item {
          grid-template-columns: 1fr 1fr !important;
        }
        @media (max-width: 700px) {
          .couple-item {
            grid-template-columns: 1fr !important;
          }
          .couple-item > div {
            order: unset !important;
          }
        }
      `}</style>
    </section>
  );
}

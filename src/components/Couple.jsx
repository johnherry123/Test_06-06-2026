import React from 'react';

/* ══════════════════════════════════════════════════════════════════════
   THE HAPPY COUPLE SECTION (CÔ DÂU & CHÚ RỂ)
   Modern Fashion Editorial Portraits (NO Arch/Tombstone Shapes)
══════════════════════════════════════════════════════════════════════ */

const COUPLE_INFO = [
  {
    role: 'Chú Rể',
    name: 'Nguyễn Đại Nghĩa',
    title: 'Trưởng Nam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=90',
    quote: 'Em là bến đỗ bình yên nhất sau mọi bộn bề cuộc sống. Cảm ơn em đã bước vào cuộc đời anh và biến mỗi ngày thành một niềm hạnh phúc trọn vẹn.',
    traits: ['Chân thành', 'Yêu thương', 'Trách nhiệm'],
  },
  {
    role: 'Cô Dâu',
    name: 'Lê Thị Nhung',
    title: 'Út Nữ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=90',
    quote: 'Cảm ơn anh vì luôn kiên nhẫn, yêu thương và chở che cho em. Bên anh, em được là chính mình dịu dàng và hạnh phúc nhất.',
    traits: ['Dịu dàng', 'Lạc quan', 'Thấu hiểu'],
  },
];

export default function Couple() {
  return (
    <section
      id="couple"
      style={{
        padding: 'clamp(70px, 10vw, 110px) 24px',
        backgroundColor: '#F7F4EC',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <div className="eyebrow-luxury">Đôi Uyên Ương</div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              color: '#231B15',
              fontWeight: 700,
              margin: '0 0 12px',
            }}
          >
            Cô Dâu <span style={{ color: '#8B1E22' }}>&</span> Chú Rể
          </h2>
          <div className="divider-luxury">
            <span style={{ color: '#C5A059' }}>✦</span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(28px, 4vw, 48px)',
          }}
        >
          {COUPLE_INFO.map((person, idx) => (
            <div
              key={idx}
              className="glass-luxury-card"
              style={{
                padding: 'clamp(28px, 4vw, 40px) 24px',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
              }}
            >
              {/* Modern Fashion Portrait Frame (Rounded Rect with Gold Border) */}
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(200px, 50vw, 240px)',
                  height: 'clamp(240px, 60vw, 300px)',
                  margin: '0 auto 28px',
                  borderRadius: '16px',
                  padding: '8px',
                  border: '1.5px solid rgba(197, 160, 89, 0.45)',
                  backgroundColor: '#FAF7F2',
                  boxShadow: '0 12px 30px rgba(35, 27, 21, 0.08)',
                }}
              >
                <img
                  src={person.avatar}
                  alt={person.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    display: 'block',
                  }}
                  onError={(e) => {
                    e.target.src = idx === 0
                      ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=90'
                      : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=90';
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#8B1E22',
                    color: '#FFFFFF',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '5px 20px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 12px rgba(139, 30, 34, 0.35)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {person.role}
                </div>
              </div>

              <span
                className="font-display"
                style={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  color: '#8F7E73',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 600,
                }}
              >
                {person.title}
              </span>

              <h3
                className="font-display"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#231B15',
                  margin: '0 0 16px',
                }}
              >
                {person.name}
              </h3>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '20px',
                }}
              >
                {person.traits.map((trait, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '0.78rem',
                      color: '#8B1E22',
                      backgroundColor: 'rgba(139, 30, 34, 0.06)',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}
                  >
                    • {trait}
                  </span>
                ))}
              </div>

              <div
                style={{
                  position: 'relative',
                  padding: '16px 20px',
                  backgroundColor: '#FAF7F0',
                  border: '1px solid rgba(197, 160, 89, 0.25)',
                  borderRadius: '10px',
                }}
              >
                <p
                  className="font-serif"
                  style={{
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: '#584A40',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  "{person.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

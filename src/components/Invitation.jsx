/* ══════════════════════════════════════════════════════════════════════
   INVITATION / LỜI NGỎ — Vietnamese Editorial
   Removed: dot-grid background, gold-frame, corner-ornament, divider-luxury,
            eyebrow-luxury, 囍 emoji, excessive borders.
   Design: Large typography + editorial spacing + thin champagne accent.
══════════════════════════════════════════════════════════════════════ */
import React from 'react';

export default function Invitation() {
  return (
    <section
      id="invitation"
      style={{
        padding: 'clamp(80px, 12vw, 120px) 24px',
        backgroundColor: '#F8F4EC',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Section label */}
        <p className="section-label gsap-reveal" style={{ textAlign: 'center', marginBottom: '24px' }}>
          Lời Ngỏ
        </p>

        {/* Main heading */}
        <h2
          className="gsap-reveal"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 500,
            color: '#231B15',
            textAlign: 'center',
            marginBottom: '32px',
            lineHeight: 1.15,
          }}
        >
          Trân trọng kính mời
        </h2>

        {/* Thin champagne rule */}
        <div className="gsap-line" style={{
          width: '100%', height: '1px',
          backgroundColor: 'rgba(184,149,85,0.35)',
          marginBottom: '48px',
        }} />

        {/* Family lineage — clean table-style */}
        <div
          className="gsap-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Nhà Trai */}
          <div>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#8B1E22',
              marginBottom: '12px',
            }}>
              Nhà Trai
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1rem',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.6,
              marginBottom: '4px',
            }}>
              Ông Nguyễn Văn Hùng
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1rem',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.6,
              marginBottom: '8px',
            }}>
              Bà Trần Thị Mai
            </p>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.82rem',
              color: '#756B63',
            }}>
              Tân Bình, TP. Hồ Chí Minh
            </p>
          </div>

          {/* Nhà Gái */}
          <div>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#8B1E22',
              marginBottom: '12px',
            }}>
              Nhà Gái
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1rem',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.6,
              marginBottom: '4px',
            }}>
              Ông Lê Văn Thành
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1rem',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.6,
              marginBottom: '8px',
            }}>
              Bà Phạm Thị Lan
            </p>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.82rem',
              color: '#756B63',
            }}>
              Quận 3, TP. Hồ Chí Minh
            </p>
          </div>
        </div>

        {/* Thin rule */}
        <div className="gsap-line" style={{
          width: '100%', height: '1px',
          backgroundColor: 'rgba(35,27,21,0.1)',
          marginBottom: '48px',
        }} />

        {/* Couple names — editorial */}
        <div className="gsap-reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#756B63',
            marginBottom: '12px',
          }}>
            Trưởng Nam &nbsp;·&nbsp; Út Nữ
          </p>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#231B15',
            lineHeight: 1.2,
          }}>
            Nguyễn Đại Nghĩa <span style={{ color: '#B89555', fontWeight: 300 }}>&amp;</span> Lê Thị Nhung
          </div>
        </div>

        {/* Thin rule */}
        <div className="gsap-line" style={{
          width: '100%', height: '1px',
          backgroundColor: 'rgba(184,149,85,0.35)',
          marginBottom: '40px',
        }} />

        {/* Message */}
        <div className="gsap-reveal">
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
            fontStyle: 'italic',
            color: '#4A3F38',
            lineHeight: 1.9,
            textAlign: 'center',
            marginBottom: '20px',
          }}>
            "Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng.
            Sau hành trình tìm hiểu và gắn kết, chúng tôi quyết định nắm tay nhau
            bước vào chương mới của cuộc đời."
          </p>

          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.9rem',
            color: '#4A3F38',
            lineHeight: 1.8,
            textAlign: 'center',
          }}>
            Sự hiện diện và lời chúc phúc của Quý khách là niềm vinh hạnh và
            món quà quý giá nhất trong ngày trọng đại này.
          </p>
        </div>

      </div>
    </section>
  );
}

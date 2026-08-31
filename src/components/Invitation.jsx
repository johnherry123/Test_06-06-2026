/* ══════════════════════════════════════════════════════════════════════
   INVITATION / LỜI NGỎ — Premium Wedding Stationery
   Direction: Physical wedding invitation feeling on screen
   Assets: Wax seal monogram, botanical branch, subtle paper texture
   Design: Warm ivory paper + espresso typography + champagne gold accents
   Vietnamese: Understated elegance, family lineage in editorial layout
══════════════════════════════════════════════════════════════════════ */
import React from 'react';

/* Inline paper texture component — avoids extra HTTP request for tiny decorative element */
function PaperTexture() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
      }}
    />
  );
}

export default function Invitation() {
  return (
    <section
      id="invitation"
      aria-label="Lời ngỏ và thông tin gia đình"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 12vw, 120px) 24px',
        backgroundColor: '#F8F4EC',
        overflow: 'hidden',
      }}
    >
      <PaperTexture />

      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Wax seal — visual centerpiece of invitation ── */}
        <div className="gsap-reveal" style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4vw, 40px)' }}>
          <img
            src="/Test_06-06-2026/wax-seal.svg"
            alt="Dấu phong bì ĐN"
            aria-hidden="true"
            width="72"
            height="72"
            style={{ display: 'inline-block', opacity: 0.92 }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* ── Section label ── */}
        <p className="section-label gsap-reveal" style={{ textAlign: 'center', marginBottom: '16px' }}>
          Lời Ngỏ
        </p>

        {/* ── Main heading ── */}
        <h2
          className="gsap-reveal"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 500,
            color: '#231B15',
            textAlign: 'center',
            marginBottom: 'clamp(24px, 4vw, 36px)',
            lineHeight: 1.1,
          }}
        >
          Trân trọng kính mời
        </h2>

        {/* ── Botanical branch — center divider ── */}
        <div className="gsap-reveal" style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)', opacity: 0.75 }}>
          <img
            src="/Test_06-06-2026/branch-divider.svg"
            alt=""
            role="presentation"
            aria-hidden="true"
            style={{ width: '100%', maxWidth: '280px', height: '36px', display: 'inline-block' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* ── Family lineage — editorial two-column ── */}
        <div
          className="gsap-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(32px, 5vw, 56px)',
            marginBottom: 'clamp(40px, 6vw, 56px)',
          }}
        >
          {/* Nhà Trai */}
          <div>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8B1E22',
              marginBottom: '14px',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(184,149,85,0.3)',
            }}>
              Nhà Trai
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.5,
              marginBottom: '3px',
            }}>
              Ông Nguyễn Văn Hùng
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.5,
              marginBottom: '10px',
            }}>
              Bà Trần Thị Mai
            </p>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.8rem',
              color: '#756B63',
              lineHeight: 1.5,
            }}>
              Tân Bình, TP. Hồ Chí Minh
            </p>
          </div>

          {/* Nhà Gái */}
          <div>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8B1E22',
              marginBottom: '14px',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(184,149,85,0.3)',
            }}>
              Nhà Gái
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.5,
              marginBottom: '3px',
            }}>
              Ông Lê Văn Thành
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem',
              fontWeight: 500,
              color: '#231B15',
              lineHeight: 1.5,
              marginBottom: '10px',
            }}>
              Bà Phạm Thị Lan
            </p>
            <p style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.8rem',
              color: '#756B63',
              lineHeight: 1.5,
            }}>
              Quận 3, TP. Hồ Chí Minh
            </p>
          </div>
        </div>

        {/* ── Champagne rule ── */}
        <div className="gsap-line" style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(184,149,85,0.5) 20%, rgba(184,149,85,0.5) 80%, transparent)',
          marginBottom: 'clamp(32px, 5vw, 48px)',
        }} />

        {/* ── Couple names — elegant centered ── */}
        <div className="gsap-reveal" style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 44px)' }}>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.62rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#756B63',
            marginBottom: '16px',
          }}>
            Trưởng Nam &nbsp;·&nbsp; Út Nữ
          </p>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.9rem, 4.5vw, 2.9rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#231B15',
            lineHeight: 1.15,
          }}>
            Nguyễn Đại Nghĩa{' '}
            <span style={{ color: '#B89555', fontWeight: 300 }}>&amp;</span>{' '}
            Lê Thị Nhung
          </div>
        </div>

        {/* ── Second champagne rule ── */}
        <div className="gsap-line" style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(35,27,21,0.12) 20%, rgba(35,27,21,0.12) 80%, transparent)',
          marginBottom: 'clamp(28px, 4vw, 40px)',
        }} />

        {/* ── Invitation message — literary quality ── */}
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
            color: '#756B63',
            lineHeight: 1.8,
            textAlign: 'center',
          }}>
            Sự hiện diện và lời chúc phúc của Quý khách là niềm vinh hạnh
            và món quà quý giá nhất trong ngày trọng đại này.
          </p>
        </div>

        {/* ── Botanical lotus — subtle bottom ornament ── */}
        <div className="gsap-reveal" style={{ textAlign: 'center', marginTop: 'clamp(36px, 5vw, 52px)', opacity: 0.5 }}>
          <img
            src="/Test_06-06-2026/lotus-botanical.svg"
            alt=""
            role="presentation"
            aria-hidden="true"
            width="64"
            height="64"
            style={{ display: 'inline-block', opacity: 0.8 }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

      </div>
    </section>
  );
}
